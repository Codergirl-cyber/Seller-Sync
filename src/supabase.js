import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

if (!import.meta.env.VITE_SUPABASE_URL) {
  console.warn('VITE_SUPABASE_URL is missing. Please restart your dev server after adding it to .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Basic connection test
supabase.from('test_table').select('id').limit(1).then(({ error }) => {
  if (error) {
    console.warn('Supabase Connection Warning:', error.message);
    if (error.message.includes('RLS')) {
      console.error('ACTION REQUIRED: Enable RLS policies for public access in your Supabase dashboard.');
    }
  } else {
    console.log('Supabase connected successfully.');
  }
});


