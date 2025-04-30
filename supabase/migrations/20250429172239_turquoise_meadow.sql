/*
  # Create food history table

  1. New Tables
    - `food_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `food_name` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `food_history` table
    - Add policy for authenticated users to read their own history
    - Add policy for authenticated users to insert their own history
*/

CREATE TABLE IF NOT EXISTS food_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  food_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE food_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own food history"
  ON food_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own food history"
  ON food_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_food_history_user_id_created_at 
  ON food_history(user_id, created_at DESC);