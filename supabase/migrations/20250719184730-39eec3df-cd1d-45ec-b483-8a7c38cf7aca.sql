-- Create the waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  company VARCHAR(255),
  role VARCHAR(255),
  stage VARCHAR(50) NOT NULL CHECK (stage IN ('idea', 'prototype', 'mvp', 'growth', 'scale', 'investor', 'other')),
  motivation TEXT NOT NULL,
  interests TEXT[] NOT NULL DEFAULT '{}',
  newsletter BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_user_id ON public.waitlist(user_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at);

-- Create trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_waitlist_updated_at 
    BEFORE UPDATE ON public.waitlist 
    FOR EACH ROW 
    EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Policy for public signup (anyone can insert)
CREATE POLICY "Allow public signup" ON public.waitlist
  FOR INSERT WITH CHECK (true);

-- Policy for users to view their own data
CREATE POLICY "Users can view own data" ON public.waitlist
  FOR SELECT USING (auth.email() = email);

-- Policy for authenticated users to view all (for admin purposes)
CREATE POLICY "Authenticated users can view all" ON public.waitlist
  FOR SELECT TO authenticated USING (true);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT, SELECT ON public.waitlist TO anon, authenticated;