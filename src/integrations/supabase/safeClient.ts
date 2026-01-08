import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import { BACKEND_PUBLISHABLE_KEY, BACKEND_URL } from "@/lib/backendEnv";

// NOTE: We intentionally do NOT import from ./client here.
// The auto-generated client depends on `import.meta.env` being present at build-time.
// This wrapper provides safe fallbacks to avoid a blank screen.

export const supabase = createClient<Database>(BACKEND_URL, BACKEND_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
