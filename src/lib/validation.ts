/**
 * Email validation utility functions
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-ZäöüÄÖÜß\s-]+$/;
  return nameRegex.test(name.trim()) && name.trim().length >= 2;
};

export const sanitizeName = (name: string): string => {
  return name.trim().replace(/\s+/g, ' ');
};

/**
 * Form validation helpers
 */
export const validateWaitlistForm = (data: {
  email: string;
  firstName: string;
  lastName: string;
  stage: string;
  motivation: string;
  interests: string[];
}) => {
  const errors: Record<string, string> = {};

  if (!validateEmail(data.email)) {
    errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
  }

  if (!validateName(data.firstName)) {
    errors.firstName = 'Vorname muss mindestens 2 Zeichen haben und darf nur Buchstaben enthalten';
  }

  if (!validateName(data.lastName)) {
    errors.lastName = 'Nachname muss mindestens 2 Zeichen haben und darf nur Buchstaben enthalten';
  }

  if (!data.stage) {
    errors.stage = 'Bitte wählen Sie eine Phase aus';
  }

  if (!data.motivation || data.motivation.trim().length < 10) {
    errors.motivation = 'Bitte beschreiben Sie Ihre Motivation (mindestens 10 Zeichen)';
  }

  if (!data.interests || data.interests.length === 0) {
    errors.interests = 'Bitte wählen Sie mindestens ein Interesse';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Supabase error handling
 */
export const handleSupabaseError = (error: any): string => {
  console.error('Supabase error:', error);
  
  if (error.code === '23505') {
    return 'Diese E-Mail-Adresse ist bereits registriert!';
  }
  
  if (error.code === '23514') {
    return 'Ungültige Eingabedaten. Bitte überprüfen Sie Ihre Angaben.';
  }
  
  if (error.code === 'PGRST116') {
    // No rows returned - this is expected when checking for existing entries
    return '';
  }
  
  return 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
};

/**
 * Rate limiting for form submissions
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts = 3;
  private readonly timeWindow = 60000; // 1 minute

  canSubmit(identifier: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the time window
    const recentAttempts = userAttempts.filter(time => now - time < this.timeWindow);
    
    this.attempts.set(identifier, recentAttempts);
    
    return recentAttempts.length < this.maxAttempts;
  }

  recordAttempt(identifier: string): void {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    userAttempts.push(now);
    this.attempts.set(identifier, userAttempts);
  }

  getRemainingTime(identifier: string): number {
    const userAttempts = this.attempts.get(identifier) || [];
    if (userAttempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...userAttempts);
    const remainingTime = this.timeWindow - (Date.now() - oldestAttempt);
    
    return Math.max(0, remainingTime);
  }
}

export const rateLimiter = new RateLimiter();
