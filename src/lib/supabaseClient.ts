// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Use environment variables for sensitive data
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tkcrfnbmucdhkbtmrwyl.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrY3JmbmJtdWNkaGtidG1yd3lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MzI1NjAsImV4cCI6MjA1NTQwODU2MH0.5mubSVniZJIJEWzT5lbqygr4iJ05s5IDN_WudqUaUj8';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true, // Automatically refresh the token when it expires
    persistSession: true,   // Persist the session in local storage
    detectSessionInUrl: true, // Detect session from the URL (for OAuth callbacks)
  },
});