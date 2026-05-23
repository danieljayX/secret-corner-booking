-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customerName TEXT NOT NULL,
  eventName TEXT,
  packageName TEXT NOT NULL,
  packagePrice INTEGER NOT NULL,
  location TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  status TEXT DEFAULT 'Pending',
  customerPhone TEXT NOT NULL,
  socialLink TEXT,
  specialRequests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users to insert
CREATE POLICY "Allow anonymous users to insert bookings"
ON public.bookings
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy for all users to read their own bookings
CREATE POLICY "Allow users to read all bookings"
ON public.bookings
FOR SELECT
USING (true);

-- Create policy for authenticated users to update bookings
CREATE POLICY "Allow authenticated users to update bookings"
ON public.bookings
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create policy for authenticated users to delete bookings
CREATE POLICY "Allow authenticated users to delete bookings"
ON public.bookings
FOR DELETE
TO authenticated
USING (true);
