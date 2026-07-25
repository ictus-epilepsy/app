import { createClient } from '@supabase/supabase-js';

// Reads from .env.local — see README. The anon key is safe in the browser;
// your Row-Level Security policies are what actually protect the data.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
