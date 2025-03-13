import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY: string = import.meta.env.VITE_SUPABASE_KEY

// configurando o supabase

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY)

