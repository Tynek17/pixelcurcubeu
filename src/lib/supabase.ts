import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function resolveEnv(...names: Array<string | undefined>) {
  // Use globalThis to avoid TypeScript complaints about `process` in browser configs
  const env = (globalThis as any).process?.env ?? (globalThis as any).__ENV ?? {};
  for (const n of names) {
    if (!n) continue;
    const v = env[n];
    if (v) return v as string;
  }
  return undefined;
}

export function hasSupabaseConfig(): boolean {
  const url = resolveEnv('NEXT_PUBLIC_SUPABASE_URL', 'VITE_SUPABASE_URL', 'SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL');
  const key = resolveEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'VITE_SUPABASE_ANON_KEY', 'SUPABASE_ANON_KEY', 'SUPABASE_PUBLISHABLE_KEY');
  return Boolean(url && key);
}

export function createSupabaseClient(): SupabaseClient {
  const supabaseUrl = resolveEnv('NEXT_PUBLIC_SUPABASE_URL', 'VITE_SUPABASE_URL', 'SUPABASE_URL');
  const supabaseKey = resolveEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'VITE_SUPABASE_ANON_KEY', 'SUPABASE_ANON_KEY', 'SUPABASE_PUBLISHABLE_KEY');

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseKey);
}
