// Centralized backend environment values with safe fallbacks.
//
// In rare preview/build edge cases, `import.meta.env` can be temporarily empty.
// These fallbacks prevent a blank screen by ensuring the app always has a URL/key.

const FALLBACK_BACKEND_URL = "https://epzjffdslivfhmetnkfa.supabase.co";
const FALLBACK_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwempmZmRzbGl2ZmhtZXRua2ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNDc4MjQsImV4cCI6MjA4MjkyMzgyNH0.ImS57JANm4tHtFCAMfcsWgBLbGQv68gjb4lyQQpVzHI";

export const BACKEND_URL = import.meta.env.VITE_SUPABASE_URL || FALLBACK_BACKEND_URL;
export const BACKEND_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_PUBLISHABLE_KEY;

export const HAS_BACKEND_ENV = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);
