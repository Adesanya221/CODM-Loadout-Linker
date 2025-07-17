# Supabase Setup for Loadout Sharing

This guide will help you set up Supabase to enable loadout sharing functionality.

## Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com/)
2. Sign up for a free account
3. Create a new project

## Step 2: Set Up Database

1. In your Supabase dashboard, go to the **SQL Editor**
2. Run the following SQL to create the loadouts table:

```sql
CREATE TABLE loadouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE loadouts ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read loadouts
CREATE POLICY "Allow public read access" ON loadouts
  FOR SELECT USING (true);

-- Create a policy that allows anyone to insert loadouts
CREATE POLICY "Allow public insert access" ON loadouts
  FOR INSERT WITH CHECK (true);
```

## Step 3: Get Your API Keys

1. In your Supabase dashboard, go to **Settings > API**
2. Copy the **Project URL** (looks like: `https://your-project.supabase.co`)
3. Copy the **anon public** key (starts with `eyJ...`)

## Step 4: Configure Your Project

1. Open `src/config/supabase.ts`
2. Replace the placeholder values with your actual credentials:

```typescript
export const SUPABASE_CONFIG = {
  url: 'https://svgpjurodurenxzbqkox.supabase.co', // Your Project URL
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2Z3BqdXJvZHVyZW54emJxa294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMjI1NTIsImV4cCI6MjA2Nzg5ODU1Mn0.pgvoUqkmrNtidXsFK6UlEBzBHGHAATz0HJrcAeNWE_U' // Your anon public key
};
```

## Step 5: Test the Setup

1. Start your development server: `npm run dev`
2. Create a loadout in the app
3. The loadout should be saved to Supabase and you'll get a shareable link
4. Open the link in a new browser/incognito window to test sharing

## Features Enabled

✅ **Loadout Creation**: Users can create loadouts that are saved to Supabase  
✅ **Shareable Links**: Each loadout gets a unique URL that can be shared  
✅ **Cross-Device Access**: Anyone with the link can view the loadout  
✅ **Real-time Sharing**: No login required to view shared loadouts  

## Troubleshooting

- **"Please configure your Supabase credentials"**: Make sure you've updated the config file with your actual credentials
- **"Failed to create loadout"**: Check that your Supabase project is active and the table was created correctly
- **"Loadout not found"**: Verify the RLS policies are set up correctly

## Next Steps

Once this is working, you could add:
- User authentication to track who created which loadouts
- Loadout editing and deletion
- User profiles with saved loadouts
- Loadout ratings and comments 