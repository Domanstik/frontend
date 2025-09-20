// Лёгкий клиент Supabase. Обязательно заведи .env:
// VITE_SUPABASE_URL=...
// VITE_SUPABASE_ANON_KEY=...
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  // не валим приложение — просто предупредим в консоли
  console.warn('[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY не заданы');
}

export const supabase = createClient(url || '', key || '', {
  auth: { persistSession: false },
});
