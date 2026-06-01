-- Fix delete permissions for bookings table
-- Run this in your Supabase SQL Editor

-- First, drop existing policies if any
DROP POLICY IF EXISTS "Enable delete for all users" ON bookings;
DROP POLICY IF EXISTS "Allow public delete" ON bookings;

-- Enable RLS (if not already enabled)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow DELETE operations
CREATE POLICY "Enable delete for all users" 
ON bookings 
FOR DELETE 
USING (true);

-- Also ensure SELECT, INSERT, and UPDATE policies exist
DROP POLICY IF EXISTS "Enable read access for all users" ON bookings;
CREATE POLICY "Enable read access for all users" 
ON bookings 
FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Enable insert for all users" ON bookings;
CREATE POLICY "Enable insert for all users" 
ON bookings 
FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for all users" ON bookings;
CREATE POLICY "Enable update for all users" 
ON bookings 
FOR UPDATE 
USING (true);
