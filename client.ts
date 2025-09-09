import { createClient } from '@supabase/supabase-js'

// Lee las variables de entorno para la URL y la clave anónima de Supabase.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and anon key are required.')
}

// Crea y exporta una única instancia del cliente de Supabase.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
