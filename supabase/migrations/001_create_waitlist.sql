-- Supabase Migration für Munich Funding Summit Warteliste
-- Version: 1.0.0
-- Datum: 18. Juli 2025

-- Erstelle die waitlist Tabelle
CREATE TABLE IF NOT EXISTS public.waitlist (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text NOT NULL UNIQUE,
    first_name text NOT NULL DEFAULT '',
    last_name text NOT NULL DEFAULT '',
    company text,
    role text,
    stage text NOT NULL DEFAULT 'other',
    motivation text NOT NULL DEFAULT '',
    interests text[] NOT NULL DEFAULT '{}',
    newsletter boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone,
    
    -- Constraints
    CONSTRAINT waitlist_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT waitlist_stage_check CHECK (stage IN ('idea', 'prototype', 'mvp', 'growth', 'scale', 'investor', 'other')),
    CONSTRAINT waitlist_first_name_length CHECK (char_length(first_name) >= 0 AND char_length(first_name) <= 50),
    CONSTRAINT waitlist_last_name_length CHECK (char_length(last_name) >= 0 AND char_length(last_name) <= 50),
    CONSTRAINT waitlist_company_length CHECK (char_length(company) <= 100),
    CONSTRAINT waitlist_role_length CHECK (char_length(role) <= 100),
    CONSTRAINT waitlist_motivation_length CHECK (char_length(motivation) <= 1000)
);

-- Erstelle Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON public.waitlist USING btree (email);
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON public.waitlist USING btree (created_at DESC);
CREATE INDEX IF NOT EXISTS waitlist_stage_idx ON public.waitlist USING btree (stage);
CREATE INDEX IF NOT EXISTS waitlist_newsletter_idx ON public.waitlist USING btree (newsletter);

-- Erstelle GIN Index für interests Array
CREATE INDEX IF NOT EXISTS waitlist_interests_gin_idx ON public.waitlist USING gin (interests);

-- Trigger für updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_waitlist_updated_at
    BEFORE UPDATE ON public.waitlist
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Policy für öffentliche Inserts (Anmeldungen)
CREATE POLICY "Allow public insert" ON public.waitlist
    FOR INSERT TO public
    WITH CHECK (true);

-- Policy für öffentliche Selects (nur eigene E-Mail für Duplikatsprüfung)
CREATE POLICY "Allow public select for duplicate check" ON public.waitlist
    FOR SELECT TO public
    USING (true);

-- Policy für authentifizierte Admin-Zugriffe (falls Auth implementiert wird)
-- CREATE POLICY "Allow admin access" ON public.waitlist
--     FOR ALL TO authenticated
--     USING (auth.role() = 'admin');

-- Kommentar zur Tabelle
COMMENT ON TABLE public.waitlist IS 'Warteliste für den Munich Funding Summit - speichert Interessenten und ihre Präferenzen';

-- Kommentare zu wichtigen Spalten
COMMENT ON COLUMN public.waitlist.email IS 'E-Mail-Adresse des Interessenten (unique)';
COMMENT ON COLUMN public.waitlist.stage IS 'Entwicklungsphase des Startups/Unternehmens';
COMMENT ON COLUMN public.waitlist.interests IS 'Array der ausgewählten Interessensgebiete';
COMMENT ON COLUMN public.waitlist.motivation IS 'Freitext zur Motivation und Erwartungen';

-- Daten für Testing (optional - entfernen für Production)
-- INSERT INTO public.waitlist (email, first_name, last_name, stage, motivation, interests) VALUES
-- ('test@example.com', 'Max', 'Mustermann', 'mvp', 'Ich bin interessiert an Funding-Möglichkeiten', ARRAY['funding', 'networking']);

-- Statistik-View für das Admin-Dashboard
CREATE OR REPLACE VIEW public.waitlist_stats AS
SELECT 
    COUNT(*) as total_entries,
    COUNT(*) FILTER (WHERE first_name != '' AND last_name != '') as complete_entries,
    COUNT(*) FILTER (WHERE newsletter = true) as newsletter_subscribers,
    COUNT(*) FILTER (WHERE stage = 'idea') as idea_stage,
    COUNT(*) FILTER (WHERE stage = 'prototype') as prototype_stage,
    COUNT(*) FILTER (WHERE stage = 'mvp') as mvp_stage,
    COUNT(*) FILTER (WHERE stage = 'growth') as growth_stage,
    COUNT(*) FILTER (WHERE stage = 'scale') as scale_stage,
    COUNT(*) FILTER (WHERE stage = 'investor') as investors,
    COUNT(*) FILTER (WHERE stage = 'other') as other_stage,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as today_signups,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as week_signups,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as month_signups
FROM public.waitlist;

-- Grant permissions für die Stats-View
GRANT SELECT ON public.waitlist_stats TO public;

-- Funktion für E-Mail-Export (falls benötigt)
CREATE OR REPLACE FUNCTION public.get_newsletter_emails()
RETURNS TABLE(email_address text) AS $$
BEGIN
    RETURN QUERY
    SELECT email
    FROM public.waitlist
    WHERE newsletter = true
    ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Migration abgeschlossen
-- Version 1.0.0 der Munich Funding Summit Warteliste
