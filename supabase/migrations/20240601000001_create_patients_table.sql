-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  date_of_birth DATE,
  address TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'United States',
  gender TEXT,
  medical_history TEXT,
  allergies TEXT,
  medications TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable row level security
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to select their own patients
DROP POLICY IF EXISTS "Users can view their own patients" ON patients;
CREATE POLICY "Users can view their own patients"
  ON patients FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own patients
DROP POLICY IF EXISTS "Users can insert their own patients" ON patients;
CREATE POLICY "Users can insert their own patients"
  ON patients FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own patients
DROP POLICY IF EXISTS "Users can update their own patients" ON patients;
CREATE POLICY "Users can update their own patients"
  ON patients FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own patients
DROP POLICY IF EXISTS "Users can delete their own patients" ON patients;
CREATE POLICY "Users can delete their own patients"
  ON patients FOR DELETE
  USING (auth.uid() = user_id);

-- Enable realtime subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE patients;

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS patients_user_id_idx ON patients(user_id);

-- Create index on patient name for faster searches
CREATE INDEX IF NOT EXISTS patients_name_idx ON patients(first_name, last_name);
