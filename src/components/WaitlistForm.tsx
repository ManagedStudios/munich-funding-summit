import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { validateEmail, sanitizeEmail, sanitizeName, handleSupabaseError, rateLimiter } from '@/lib/validation';

// Validation schema for the complete form with enhanced validation
const waitlistSchema = z.object({
  email: z.string()
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein')
    .min(1, 'E-Mail-Adresse ist erforderlich')
    .transform(email => email.toLowerCase().trim()),
  firstName: z.string()
    .min(2, 'Vorname muss mindestens 2 Zeichen haben')
    .max(50, 'Vorname darf maximal 50 Zeichen haben')
    .regex(/^[a-zA-ZäöüÄÖÜß\s-]+$/, 'Vorname darf nur Buchstaben, Leerzeichen und Bindestriche enthalten')
    .transform(name => name.trim()),
  lastName: z.string()
    .min(2, 'Nachname muss mindestens 2 Zeichen haben')
    .max(50, 'Nachname darf maximal 50 Zeichen haben')
    .regex(/^[a-zA-ZäöüÄÖÜß\s-]+$/, 'Nachname darf nur Buchstaben, Leerzeichen und Bindestriche enthalten')
    .transform(name => name.trim()),
  company: z.string()
    .max(100, 'Firmenname darf maximal 100 Zeichen haben')
    .optional()
    .transform(name => name?.trim() || undefined),
  role: z.string()
    .max(100, 'Position darf maximal 100 Zeichen haben')
    .optional()
    .transform(role => role?.trim() || undefined),
  stage: z.enum(['idea', 'prototype', 'mvp', 'growth', 'scale', 'investor', 'other'], {
    errorMap: () => ({ message: 'Bitte wählen Sie eine gültige Phase aus' })
  }),
  motivation: z.string()
    .min(10, 'Bitte beschreiben Sie Ihre Motivation (mindestens 10 Zeichen)')
    .max(1000, 'Motivation darf maximal 1000 Zeichen haben')
    .transform(text => text.trim()),
  interests: z.array(z.string())
    .min(1, 'Bitte wählen Sie mindestens ein Interesse')
    .max(6, 'Wählen Sie maximal 6 Interessen'),
  newsletter: z.boolean().default(true),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistFormProps {
  isVisible: boolean;
  onClose: () => void;
  initialEmail?: string;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ isVisible, onClose, initialEmail = '' }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: initialEmail,
      interests: [],
      newsletter: true,
    },
    mode: 'onChange',
  });

  const watchedValues = watch();

  const interestOptions = [
    { value: 'funding', label: 'Funding & Investment' },
    { value: 'networking', label: 'Networking' },
    { value: 'mentorship', label: 'Mentorship' },
    { value: 'partnerships', label: 'Partnerships' },
    { value: 'learning', label: 'Learning & Workshops' },
    { value: 'pitching', label: 'Pitching Opportunities' },
  ];

  const stageOptions = [
    { value: 'idea', label: 'Idea Stage' },
    { value: 'prototype', label: 'Prototype' },
    { value: 'mvp', label: 'MVP' },
    { value: 'growth', label: 'Growth Stage' },
    { value: 'scale', label: 'Scale-up' },
    { value: 'investor', label: 'Investor' },
    { value: 'other', label: 'Anderes' },
  ];

  const handleInterestToggle = (interest: string) => {
    const current = watchedValues.interests || [];
    const updated = current.includes(interest)
      ? current.filter(i => i !== interest)
      : [...current, interest];
    setValue('interests', updated, { shouldValidate: true });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    
    try {
      const sanitizedEmail = sanitizeEmail(data.email);
      
      // Additional client-side validation
      if (!validateEmail(sanitizedEmail)) {
        toast.error('Bitte geben Sie eine gültige E-Mail-Adresse ein');
        setIsSubmitting(false);
        return;
      }

      // Rate limiting check
      if (!rateLimiter.canSubmit(sanitizedEmail)) {
        const remainingTime = Math.ceil(rateLimiter.getRemainingTime(sanitizedEmail) / 1000);
        toast.error(`Zu viele Versuche. Bitte warten Sie ${remainingTime} Sekunden.`);
        setIsSubmitting(false);
        return;
      }

      // Record the attempt for rate limiting
      rateLimiter.recordAttempt(sanitizedEmail);

      // Check for existing email with proper error handling
      const { data: existingEntry, error: checkError } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', sanitizedEmail)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        const errorMessage = handleSupabaseError(checkError);
        toast.error(errorMessage || 'Ein Fehler beim Überprüfen der Daten ist aufgetreten.');
        setIsSubmitting(false);
        return;
      }

      if (existingEntry) {
        toast.error('Diese E-Mail-Adresse ist bereits registriert! Sie erhalten bereits Updates.');
        setIsSubmitting(false);
        return;
      }

      // Sanitize and prepare data
      const sanitizedData = {
        email: sanitizedEmail,
        first_name: sanitizeName(data.firstName),
        last_name: sanitizeName(data.lastName),
        company: data.company ? sanitizeName(data.company) : null,
        role: data.role ? sanitizeName(data.role) : null,
        stage: data.stage,
        motivation: data.motivation.trim(),
        interests: data.interests,
        newsletter: data.newsletter,
        created_at: new Date().toISOString(),
      };

      // Insert new entry with retry logic
      const { error } = await supabase
        .from('waitlist')
        .insert([sanitizedData]);

      if (error) {
        const errorMessage = handleSupabaseError(error);
        toast.error(errorMessage || 'Ein unerwarteter Fehler ist aufgetreten.');
        setIsSubmitting(false);
        return;
      }

      // Success handling
      toast.success('🎉 Erfolgreich zur Warteliste hinzugefügt! Sie erhalten bald Updates zum Munich Funding Summit.');
      reset();
      setCurrentStep(1);
      
      // Close modal with slight delay for better UX
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (error) {
      console.error('Unexpected error submitting form:', error);
      toast.error('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!watchedValues.email && !errors.email && !!watchedValues.firstName && !errors.firstName && !!watchedValues.lastName && !errors.lastName;
      case 2:
        return !!watchedValues.stage && !errors.stage;
      case 3:
        return !!watchedValues.motivation && !errors.motivation && (watchedValues.interests?.length || 0) > 0;
      case 4:
        return true; // Review step
      default:
        return false;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-black font-inter text-gray-900">
            Jetzt zur Warteliste anmelden
          </CardTitle>
          <div className="space-y-2">
            <Progress value={(currentStep / totalSteps) * 100} className="w-full" />
            <p className="text-sm text-gray-600">Schritt {currentStep} von {totalSteps}</p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold font-inter mb-4">Persönliche Daten</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail-Adresse *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="w-full"
                    placeholder="ihre.email@beispiel.de"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Vorname *</Label>
                    <Input
                      id="firstName"
                      {...register('firstName')}
                      className="w-full"
                      placeholder="Max"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nachname *</Label>
                    <Input
                      id="lastName"
                      {...register('lastName')}
                      className="w-full"
                      placeholder="Mustermann"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Unternehmen (optional)</Label>
                  <Input
                    id="company"
                    {...register('company')}
                    className="w-full"
                    placeholder="Ihr Startup oder Unternehmen"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Position (optional)</Label>
                  <Input
                    id="role"
                    {...register('role')}
                    className="w-full"
                    placeholder="CEO, CTO, Investor, Student..."
                  />
                </div>
              </div>
            )}

            {/* Step 2: Startup Stage */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold font-inter mb-4">In welcher Phase befinden Sie sich?</h3>
                
                <div className="space-y-2">
                  <Label>Startup-Phase *</Label>
                  <Select 
                    value={watchedValues.stage} 
                    onValueChange={(value) => setValue('stage', value as any, { shouldValidate: true })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wählen Sie Ihre aktuelle Phase" />
                    </SelectTrigger>
                    <SelectContent>
                      {stageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.stage && (
                    <p className="text-sm text-red-500">{errors.stage.message}</p>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Warum ist das wichtig?</h4>
                  <p className="text-sm text-gray-600">
                    Wir möchten sicherstellen, dass die Inhalte und Networking-Möglichkeiten 
                    perfekt auf Ihre aktuelle Situation zugeschnitten sind.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Motivation & Interests */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold font-inter mb-4">Was motiviert Sie?</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="motivation">Was erhoffen Sie sich vom Munich Funding Summit? *</Label>
                  <Textarea
                    id="motivation"
                    {...register('motivation')}
                    className="w-full min-h-[100px]"
                    placeholder="Beschreiben Sie Ihre Ziele und Erwartungen..."
                  />
                  {errors.motivation && (
                    <p className="text-sm text-red-500">{errors.motivation.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Welche Bereiche interessieren Sie am meisten? *</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {interestOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleInterestToggle(option.value)}
                        className={`p-3 text-sm rounded-lg border transition-all ${
                          watchedValues.interests?.includes(option.value)
                            ? 'bg-primary text-black border-primary'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-primary'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  {errors.interests && (
                    <p className="text-sm text-red-500">{errors.interests.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold font-inter mb-4">Bestätigung</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div>
                    <strong>Name:</strong> {watchedValues.firstName} {watchedValues.lastName}
                  </div>
                  <div>
                    <strong>E-Mail:</strong> {watchedValues.email}
                  </div>
                  {watchedValues.company && (
                    <div>
                      <strong>Unternehmen:</strong> {watchedValues.company}
                    </div>
                  )}
                  <div>
                    <strong>Phase:</strong> {stageOptions.find(s => s.value === watchedValues.stage)?.label}
                  </div>
                  <div>
                    <strong>Interessen:</strong> {
                      (watchedValues.interests || [])
                        .map(i => interestOptions.find(opt => opt.value === i)?.label)
                        .filter(Boolean)
                        .join(', ')
                    }
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register('newsletter')}
                      className="rounded"
                    />
                    <span className="text-sm">
                      Ich möchte Updates zum Munich Funding Summit erhalten
                    </span>
                  </label>
                </div>

                <div className="text-xs text-gray-600">
                  Mit der Anmeldung stimmen Sie unseren Datenschutzbestimmungen zu. 
                  Ihre Daten werden ausschließlich für die Organisation des Events verwendet.
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <div className="flex space-x-2">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="shadow-md"
                  >
                    Zurück
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="shadow-md"
                >
                  Abbrechen
                </Button>
              </div>

              <div>
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid(currentStep) || isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-black font-bold shadow-lg"
                  >
                    Weiter
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-black font-bold min-w-[120px] shadow-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        <span>Senden...</span>
                      </div>
                    ) : (
                      'Anmelden'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitlistForm;
