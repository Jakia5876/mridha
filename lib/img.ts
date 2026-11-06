import { SUPABASE_URL } from './supabase'

const SUPABASE_HOST = new URL(SUPABASE_URL).host

/**
 * next/image only optimizes images from hosts listed in next.config.mjs.
 * Local files and our Supabase storage get resized + served as AVIF/WebP;
 * any other URL (pasted in /admin) is shown as-is instead of breaking the page.
 */
export function unoptimized(src: string | undefined) {
  if (!src || src.startsWith('/')) return false
  try {
    return new URL(src).host !== SUPABASE_HOST
  } catch {
    return true
  }
}
