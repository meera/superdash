import { createClient } from '@supabase/supabase-js'

const supabaseUrl:string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey:string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
import { Database } from "../supabase.types";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// export const channel = supabase.channel('room1', {
//     configs: {
//       broadcast: { ack: true },
//       presence: { key: '121' }

//     },
//   });
