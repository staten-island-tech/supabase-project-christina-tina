
import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl: string = 'https://niuiihxrebzkozbldwau.supabase.co'
const supabaseAnonKey: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pdWlpaHhyZWJ6a296Ymxkd2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MjUwMjUsImV4cCI6MjA1ODUwMTAyNX0.n3fvXFErA7-QKwyLOc69JewuKwxkBDwMd4Gj3IwPsU0'

export const supabase: SupabaseClient<any> = createClient(supabaseUrl, supabaseAnonKey)
