import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { validateEmail, sanitizeEmail, handleSupabaseError, rateLimiter } from '@/lib/validation';

interface SimpleWaitlistProps {
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

const SimpleWaitlist: React.FC<SimpleWaitlistProps> = ({
  placeholder = "Ihre E-Mail-Adresse",
  buttonText = "Anmelden",
  className = "flex max-w-md w-full"
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = sanitizeEmail(email);
    
    // Enhanced email validation
    if (!validateEmail(trimmedEmail)) {
      toast.error('Bitte geben Sie eine gültige E-Mail-Adresse ein');
      return;
    }

    // Rate limiting check
    if (!rateLimiter.canSubmit(trimmedEmail)) {
      const remainingTime = Math.ceil(rateLimiter.getRemainingTime(trimmedEmail) / 1000);
      toast.error(`Zu viele Versuche. Bitte warten Sie ${remainingTime} Sekunden.`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Record the attempt for rate limiting
      rateLimiter.recordAttempt(trimmedEmail);

      // Check for existing email with better error handling
      const { data: existingEntry, error: checkError } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', trimmedEmail)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        const errorMessage = handleSupabaseError(checkError);
        if (errorMessage) {
          toast.error(errorMessage);
        } else {
          toast.error('Ein Fehler beim Überprüfen der Daten ist aufgetreten.');
        }
        setIsSubmitting(false);
        return;
      }

      if (existingEntry) {
        toast.error('Diese E-Mail-Adresse ist bereits registriert! Sie erhalten bereits Updates.');
        setIsSubmitting(false);
        return;
      }

      // Create user account with Supabase Auth (simple signup)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: trimmedEmail,
        password: crypto.randomUUID(), // Generate random password
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            simple_signup: true
          }
        }
      });

      if (authError && authError.message !== 'User already registered') {
        console.error('Auth error:', authError);
        // Continue with data insertion even if auth fails
      }

      // Insert new entry with minimal data and better error handling
      const { error } = await supabase
        .from('waitlist')
        .insert([{
          user_id: authData?.user?.id || null,
          email: trimmedEmail,
          first_name: '',
          last_name: '',
          stage: 'other',
          motivation: 'Newsletter signup',
          interests: ['newsletter'],
          newsletter: true,
        }]);

      if (error) {
        const errorMessage = handleSupabaseError(error);
        toast.error(errorMessage || 'Ein unerwarteter Fehler ist aufgetreten.');
      } else {
        // Send confirmation email
        try {
          await supabase.functions.invoke('send-confirmation-email', {
            body: {
              email: trimmedEmail,
              firstName: '',
              lastName: ''
            }
          });
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError);
          // Don't fail the registration if email fails
        }

        toast.success('🎉 Erfolgreich angemeldet! Prüfen Sie Ihre E-Mails für die Bestätigung.');
        setEmail('');
      }
    } catch (error) {
      console.error('Unexpected error submitting email:', error);
      toast.error('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Input
        type="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-l-md border-0 focus:ring-2 focus:ring-primary"
        disabled={isSubmitting}
      />
      <Button 
        type="submit"
        className="bg-primary hover:bg-primary/90 text-black font-bold rounded-l-none min-w-[120px] shadow-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            <span>...</span>
          </div>
        ) : (
          buttonText
        )}
      </Button>
    </form>
  );
};

export default SimpleWaitlist;
