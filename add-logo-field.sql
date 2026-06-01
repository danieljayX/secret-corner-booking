-- Add logo field to contact_info table
-- Run this in your Supabase SQL Editor

ALTER TABLE contact_info 
ADD COLUMN IF NOT EXISTS logo_url TEXT DEFAULT NULL;
