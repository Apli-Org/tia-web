-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);

-- Add index on subscribed_at for sorting
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_subscribed_at ON public.newsletter_subscribers(subscribed_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (subscribe)
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create policy to allow only authenticated users to read (for admin dashboard)
CREATE POLICY "Only authenticated users can view subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (true);

-- Create policy to prevent updates and deletes from anonymous users
CREATE POLICY "Only authenticated users can update subscribers"
ON public.newsletter_subscribers
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete subscribers"
ON public.newsletter_subscribers
FOR DELETE
TO authenticated
USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.newsletter_subscribers
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Add comment to table
COMMENT ON TABLE public.newsletter_subscribers IS 'Stores newsletter subscriber emails with subscription timestamp';
