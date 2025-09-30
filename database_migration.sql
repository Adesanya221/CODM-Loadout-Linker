-- Add user_id column to loadouts table
-- Run this in your Supabase SQL Editor

ALTER TABLE loadouts
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create an index on user_id for better performance
CREATE INDEX idx_loadouts_user_id ON loadouts(user_id);

-- Update existing loadouts to have a user_id (optional - only if you want to assign existing loadouts to users)
-- UPDATE loadouts SET user_id = 'your-user-id-here' WHERE user_id IS NULL;
