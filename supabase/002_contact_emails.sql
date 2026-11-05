-- =========================================================
-- Contact form → email notifications (Resend)
-- Safe to re-run. Applied 2026-11-05.
-- =========================================================

-- email delivery status shown in /admin → Messages
alter table public.messages add column if not exists ip_hash text;
alter table public.messages add column if not exists notify_status text;   -- 'sent' / 'failed: …' / 'skipped: …'
alter table public.messages add column if not exists confirm_status text;
create index if not exists messages_created_at_idx on public.messages (created_at desc);

-- Browsers can no longer insert directly: everything goes through
-- /api/contact → submit_message(), which enforces the rate limits below.
drop policy if exists "messages anyone can send" on public.messages;

create or replace function public.submit_message(
  p_name text, p_email text, p_subject text, p_message text, p_ip_hash text
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
begin
  if p_email !~* '^[^\s@]+@[^\s@]+\.[^\s@]+$' then
    raise exception 'invalid_email' using errcode = 'P0001';
  end if;
  -- same visitor: max 3 messages / 10 min
  if p_ip_hash is not null and (
    select count(*) from messages where ip_hash = p_ip_hash and created_at > now() - interval '10 minutes'
  ) >= 3 then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;
  -- same recipient address: max 3 / hour (stops using the form to spam someone's inbox)
  if (select count(*) from messages where lower(email) = lower(p_email) and created_at > now() - interval '1 hour') >= 3 then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;
  -- whole site: max 40 / hour
  if (select count(*) from messages where created_at > now() - interval '1 hour') >= 40 then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  insert into messages (name, email, subject, message, ip_hash)
  values (left(trim(p_name), 200), left(trim(p_email), 320), nullif(left(trim(coalesce(p_subject, '')), 300), ''),
          left(trim(p_message), 5000), p_ip_hash)
  returning id into new_id;
  return new_id;
end;
$$;
revoke execute on function public.submit_message(text, text, text, text, text) from public;
grant execute on function public.submit_message(text, text, text, text, text) to anon, authenticated;

-- /api/contact records whether the two emails went out (only once, only for fresh rows)
create or replace function public.set_message_mail_status(p_id uuid, p_notify text, p_confirm text)
returns void
language sql
security definer
set search_path = public
as $$
  update messages
     set notify_status = left(p_notify, 300), confirm_status = left(p_confirm, 300)
   where id = p_id and notify_status is null and created_at > now() - interval '10 minutes';
$$;
revoke execute on function public.set_message_mail_status(uuid, text, text) from public;
grant execute on function public.set_message_mail_status(uuid, text, text) to anon, authenticated;
