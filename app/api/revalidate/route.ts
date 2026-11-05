import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase'

/** Called by /admin after saving, so the public page shows the new content immediately. */
export async function POST(req: Request) {
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!token) return NextResponse.json({ error: 'Not logged in' }, { status: 401 })

  const supabase = getServerSupabase(token)
  const { data: isAdmin, error } = await supabase.rpc('is_admin')
  if (error || isAdmin !== true) return NextResponse.json({ error: 'Not an admin' }, { status: 403 })

  revalidatePath('/', 'layout')
  return NextResponse.json({ ok: true })
}
