-- Create contact_info table for About page
-- Run this in your Supabase SQL Editor

-- Create table
CREATE TABLE IF NOT EXISTS contact_info (
  id INTEGER PRIMARY KEY DEFAULT 1,
  phone TEXT NOT NULL DEFAULT '+63 9XX XXX XXXX',
  facebook_page TEXT NOT NULL DEFAULT 'Secret Corner Events',
  facebook_url TEXT NOT NULL DEFAULT 'https://facebook.com/secretcorner',
  instagram_handle TEXT NOT NULL DEFAULT '@secretcornerevents',
  instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com/secretcorner',
  location TEXT NOT NULL DEFAULT 'Cebu City, Philippines',
  email TEXT NOT NULL DEFAULT 'secretcorner@email.com',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default data
INSERT INTO contact_info (id, phone, facebook_page, facebook_url, instagram_handle, instagram_url, location, email)
VALUES (1, '+63 9XX XXX XXXX', 'Secret Corner Events', 'https://facebook.com/secretcorner', '@secretcornerevents', 'https://instagram.com/secretcorner', 'Cebu City, Philippines', 'secretcorner@email.com')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Enable read access for all users" ON contact_info;
CREATE POLICY "Enable read access for all users" 
ON contact_info 
FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Enable update for all users" ON contact_info;
CREATE POLICY "Enable update for all users" 
ON contact_info 
FOR UPDATE 
USING (true);
