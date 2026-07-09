-- RUN THIS SQL IN YOUR SUPABASE SQL EDITOR TO UPGRADE THE SCHEMA

-- 1. Add min_aps and required_subjects to courses table
ALTER TABLE courses ADD COLUMN IF NOT EXISTS min_aps integer DEFAULT 20;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS required_subjects jsonb DEFAULT '{}'::jsonb;

-- 2. Create policy to allow public update access for seeding
CREATE POLICY "Allow anon update for seeding" ON institutions FOR UPDATE TO anon USING (true);
CREATE POLICY "Allow anon update for seeding" ON courses FOR UPDATE TO anon USING (true);
