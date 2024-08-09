
-- Migration to create Events table
-- Supabase CLI: supabase migrate create --name="events"

CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  date date NOT NULL,
  image text,
  location text,
  created_at timestamp with time zone DEFAULT now()
);