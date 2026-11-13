import type { SiteText } from './portfolio-data'

/**
 * Sends email through Resend (https://resend.com).
 * Needs the RESEND_API_KEY environment variable in Vercel.
 * MAIL_FROM (optional) = sender address on the verified domain.
 */
const FROM_ADDRESS = process.env.MAIL_FROM || 'hello@abdulalimmridha.top'
const SITE = 'https://www.abdulalimmridha.top'

export type Submission = {
  name: string; email: string; subject: string; message: string
  /** project-inquiry extras (optional so older callers still work) */
  phone?: string; service?: string; budget?: string; timeline?: string; details?: string
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
const nl2br = (s: string) => esc(s).replace(/\r?\n/g, '<br>')
const fill = (tpl: string, v: Submission) =>
  tpl.replace(/\{name\}/g, v.name).replace(/\{subject\}/g, v.subject || 'your project')
/** Header-safe: no line breaks, limited length. */
const oneLine = (s: string, max = 180) => s.replace(/[\r\n]+/g, ' ').trim().slice(0, max)

function shell(title: string, inner: string) {
  return `<!doctype html><html><body style="margin:0;background:#f4f4f5;padding:28px 12px;font-family:Inter,Segoe UI,Arial,sans-serif;color:#18181b">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e4e4e7">
<tr><td style="background:#050505;padding:22px 28px;color:#fff;font-family:Consolas,monospace;font-size:12px;letter-spacing:.25em;text-transform:uppercase">${esc(title)}</td></tr>
<tr><td style="padding:28px;font-size:15px;line-height:1.6">${inner}</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #f0f0f0;font-size:12px;color:#71717a"><a href="${SITE}" style="color:#71717a">abdulalimmridha.top</a></td></tr>
</table></td></tr></table></body></html>`
}

async function send(payload: { from: string; to: string; subject: string; html: string; text: string; reply_to?: string }) {
  const key = process.env.RESEND_API_KEY
  if (!key) return 'skipped: RESEND_API_KEY not set'
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, to: [payload.to] }),
      signal: AbortSignal.timeout(10_000),
    })
    if (res.ok) return 'sent'
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    return `failed: ${res.status} ${err.message || ''}`.trim()
  } catch (e) {
    return `failed: ${(e as Error).message}`
  }
}

/** Email to the site owner with the full message. Reply goes straight to the visitor. */
export function sendOwnerNotification(v: Submission, t: SiteText['emails']) {
  const rows = [
    ['Name', esc(v.name)],
    ['Email', `<a href="mailto:${esc(v.email)}">${esc(v.email)}</a>`],
    ...(v.phone
      ? [['Phone', `<a href="tel:${esc(v.phone.replace(/[^\d+]/g, ''))}">${esc(v.phone)}</a> · <a href="https://wa.me/${v.phone.replace(/\D/g, '')}">WhatsApp</a>`]]
      : []),
    ['Service', esc(v.service || '—')],
    ['Budget', esc(v.budget || '—')],
    ['Timeline', esc(v.timeline || '—')],
  ]
    .map(([k, val]) => `<tr><td style="padding:4px 14px 4px 0;color:#71717a;white-space:nowrap">${k}</td><td style="padding:4px 0">${val}</td></tr>`)
    .join('')
  const html = shell('New project inquiry', `
    <table role="presentation" cellpadding="0" cellspacing="0">${rows}</table>
    <div style="margin:18px 0;padding:16px 18px;background:#fafafa;border-left:3px solid #ff5a1f;border-radius:6px;white-space:normal">${nl2br(v.details ?? v.message)}</div>
    <p style="margin:0"><a href="mailto:${esc(v.email)}" style="display:inline-block;background:#050505;color:#fff;text-decoration:none;padding:10px 20px;border-radius:999px;font-weight:600">Reply to ${esc(v.name)}</a>
    &nbsp; <a href="${SITE}/admin" style="color:#52525b">Open admin →</a></p>`)
  const text = `New project inquiry\n\nName: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone || '—'}\nService: ${v.service || '—'}\nBudget: ${v.budget || '—'}\nTimeline: ${v.timeline || '—'}\n\n${v.details ?? v.message}\n\nAdmin: ${SITE}/admin`
  return send({
    from: `${oneLine(t.fromName, 60) || 'Portfolio'} <${FROM_ADDRESS}>`,
    to: t.notifyTo,
    reply_to: v.email,
    subject: oneLine(fill(t.notifySubject, v)),
    html,
    text,
  })
}

/**
 * Confirmation to the visitor. Deliberately does NOT repeat their message text,
 * so nobody can use the form to send their own content to someone else's inbox.
 */
export function sendVisitorConfirmation(v: Submission, t: SiteText['emails']) {
  const heading = fill(t.confirmHeading, v)
  const body = fill(t.confirmBody, v)
  const html = shell('Message received', `
    <h1 style="margin:0 0 14px;font-size:22px;line-height:1.3">${esc(heading)}</h1>
    <p style="margin:0 0 18px;color:#3f3f46">${nl2br(body)}</p>
    <p style="margin:0 0 22px"><a href="${SITE}" style="display:inline-block;background:#050505;color:#fff;text-decoration:none;padding:10px 20px;border-radius:999px;font-weight:600">Visit my portfolio ↗</a></p>
    <p style="margin:0;color:#52525b">${nl2br(t.signature)}</p>`)
  return send({
    from: `${oneLine(t.fromName, 60) || 'Portfolio'} <${FROM_ADDRESS}>`,
    to: v.email,
    reply_to: FROM_ADDRESS, // public domain address (Cloudflare routes it to Gmail) — keeps the private Gmail hidden
    subject: oneLine(fill(t.confirmSubject, v)),
    html,
    text: `${heading}\n\n${body}\n\n${t.signature}\n${SITE}`,
  })
}
