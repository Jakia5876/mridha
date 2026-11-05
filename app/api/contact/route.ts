import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import { getPortfolio } from '@/lib/content'
import { sendOwnerNotification, sendVisitorConfirmation, type Submission } from '@/lib/email'
import { getServerSupabase, SUPABASE_URL } from '@/lib/supabase'

export const runtime = 'nodejs'

const bad = (error: string, status = 400) => NextResponse.json({ error }, { status })
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

/**
 * Contact form:
 *  1. save to Supabase (always first — the message is never lost)
 *  2. email the owner (full message, reply-to = visitor)
 *  3. email the visitor a confirmation
 */
export async function POST(req: Request) {
  // only accept posts from our own pages
  const origin = req.headers.get('origin')
  const host = req.headers.get('host')
  if (origin && host && new URL(origin).host !== host) return bad('Forbidden', 403)

  let body: Record<string, unknown>
  try { body = await req.json() } catch { return bad('Invalid request') }

  // honeypot: real people never fill this hidden field — pretend success
  if (str(body.website, 200)) return NextResponse.json({ ok: true })

  const v: Submission = {
    name: str(body.name, 200),
    email: str(body.email, 320),
    subject: str(body.subject, 300),
    message: str(body.message, 5000),
  }
  if (!v.name || !v.email || !v.message) return bad('Please fill in name, email and message.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) return bad('Please enter a valid email address.')

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || ''
  const ipHash = ip ? createHash('sha256').update(`${ip}|${process.env.IP_SALT || SUPABASE_URL}`).digest('hex').slice(0, 32) : null

  const sb = getServerSupabase()
  const { data: id, error } = await sb.rpc('submit_message', {
    p_name: v.name, p_email: v.email, p_subject: v.subject, p_message: v.message, p_ip_hash: ipHash,
  })
  if (error) {
    if (error.message.includes('rate_limited')) return bad('Too many messages — please try again a bit later.', 429)
    if (error.message.includes('invalid_email')) return bad('Please enter a valid email address.')
    console.error('[contact] save failed:', error.message)
    return bad('Could not send right now.', 500)
  }

  // emails (message is already saved, so failures here are only logged)
  const { site } = await getPortfolio()
  const [notify, confirm] = await Promise.all([
    sendOwnerNotification(v, site.emails),
    sendVisitorConfirmation(v, site.emails),
  ])
  if (notify !== 'sent' || confirm !== 'sent') console.warn('[contact] email:', { notify, confirm })
  await sb.rpc('set_message_mail_status', { p_id: id, p_notify: notify, p_confirm: confirm })

  return NextResponse.json({ ok: true })
}
