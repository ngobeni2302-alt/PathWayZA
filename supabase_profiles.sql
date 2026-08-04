-- RUN THIS SQL IN YOUR SUPABASE SQL EDITOR TO CREATE THE PROFILES TABLE
-- 
-- This table links to Supabase Auth and stores profile details for each user.
-- RLS policies ensure that users can only read/update their own profile data.

CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name text,
  level text, -- 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'TVET College', 'Completed School'
  province text, -- 'Gauteng', 'Western Cape', 'KwaZulu-Natal', etc.
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to prevent duplicates)
DROP POLICY IF EXISTS "Allow public read access to profiles" ON profiles;
DROP POLICY IF EXISTS "Allow users to manage own profile" ON profiles;

-- Create policy to allow public READ access (anon and authenticated)
CREATE POLICY "Allow public read access to profiles" ON profiles 
  FOR SELECT 
  USING (true);

-- Create policy to allow users to INSERT/UPDATE/DELETE their own profile
CREATE POLICY "Allow users to manage own profile" ON profiles 
  FOR ALL 
  TO authenticated 
  USING (auth.uid() = id) 
  WITH CHECK (auth.uid() = id);
