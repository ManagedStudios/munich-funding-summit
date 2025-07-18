-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_waitlist_updated_at 
    BEFORE UPDATE ON waitlist 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for data protection
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for public signup)
CREATE POLICY "Allow public signup" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows users to read their own data (optional)
CREATE POLICY "Users can view own data" ON waitlist
  FOR SELECT USING (auth.email() = email);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON waitlist TO anon;
GRANT SELECT ON waitlist TO anon;
