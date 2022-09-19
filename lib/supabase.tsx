import { createClient } from '@supabase/supabase-js'

const supabaseUrl:string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey:string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
import { Database } from "../types/supabase.types";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

