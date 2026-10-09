const { createClient } = require("@supabase/supabase-js");

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_URL_SUPABASE || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_PUBLIC_ANON_KEY || "placeholder-anon-key"
);

