// Replace these values with your actual Supabase project URL and anon key
// You can find these in your Supabase project dashboard under Settings > API

export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY
};

if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
  throw new Error('https://svgpjurodurenxzbqkox.supabase.co and eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2Z3BqdXJvZHVyZW54emJxa294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMjI1NTIsImV4cCI6MjA2Nzg5ODU1Mn0.pgvoUqkmrNtidXsFK6UlEBzBHGHAATz0HJrcAeNWE_U');
}

// Validate the Supabase URL format early to avoid downstream "Invalid URL" errors
try {
  // new URL will throw if malformed or missing protocol
  // Accept only http/https to match Supabase endpoints
  const parsed = new URL(SUPABASE_CONFIG.url as string);
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw new Error('VITE_SUPABASE_URL must start with http:// or https://');
  }
} catch (e) {
  throw new Error('Invalid VITE_SUPABASE_URL. Ensure it is a full URL like https://xyzcompany.supabase.co');
}

// Instructions:
// 1. Go to your Supabase project dashboard
// 2. Navigate to Settings > API
// 3. Copy the "Project URL" and "anon public" key
// 4. Replace the values above with your actual credentials 