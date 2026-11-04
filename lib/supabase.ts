import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Public Supabase settings. The anon key is designed to be public — every
 * visitor's browser receives it. Data is protected by Row Level Security
 * policies in supabase/schema.sql (only admins can edit content or read messages).
 * NEVER put the service_role / secret key in this project.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dyumqsvgccujcwiepzsh.supabase.co'
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5dW1xc3ZnY2N1amN3aWVwenNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4MDEzNTQsImV4cCI6MjEwOTM3NzM1NH0.m-Bl5X9I4KpA1pexC9mQnlyJopshZfVZqO9eWJpwAso'

export const MEDIA_BUCKET = 'media'
export const CONTENT_ID = 'main'

let browserClient: SupabaseClient | null = null

/** Shared client for the browser (keeps the admin logged in via localStorage). */
export function getBrowserSupabase() {
  if (!browserClient) browserClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  return browserClient
}

/** Stateless client for server code, optionally acting as a logged-in user. */
export function getServerSupabase(accessToken?: string) {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : undefined,
  })
}
