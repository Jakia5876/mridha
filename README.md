# Abdul Alim Mridha — Portfolio

Next.js 16 + Tailwind CSS 4 · Vercel-এ হোস্ট করা · লাইভ: https://www.abdulalimmridha.top

## কন্টেন্ট আপডেট করবেন যেভাবে — Admin Panel
**https://www.abdulalimmridha.top/admin** → ইমেইল + পাসওয়ার্ড দিয়ে লগইন।

| ট্যাব | কী করা যায় |
|---|---|
| Profile | নাম, পদবি, বায়ো, ছবি, ইমেইল, ফোন, CV, সোশ্যাল লিংক, ফোনের স্কিল বার |
| Hero cards | হিরোর বাম কোণের স্লাইডিং কার্ড |
| Services / Case studies / Projects / Testimonials | যোগ, এডিট, ক্রম বদল (↑↓), ডিলিট (✕); ছবি **Upload** বাটনে |
| Skills & tools | স্কিল গ্রুপ আর চলন্ত টুলস স্ট্রিপ |
| Messages | Contact ফর্মে আসা সব মেসেজ — Reply / Mark read / Delete |
| Account | পাসওয়ার্ড বদলানো |

এডিট করে **Save changes** চাপলেই সাইট সাথে সাথে আপডেট হয়।

## কীভাবে কাজ করে
- কন্টেন্ট থাকে **Supabase**-এর `site_content` টেবিলে (একটা JSON), ছবি `media` স্টোরেজ বাকেটে, মেসেজ `messages` টেবিলে।
- নিরাপত্তা: Row Level Security — ভিজিটর শুধু পড়তে ও মেসেজ পাঠাতে পারে; এডিট ও মেসেজ পড়া শুধু `admins` টেবিলে থাকা ইমেইলের জন্য। পুরো স্কিমা: `supabase/schema.sql`।
- Supabase কোনো কারণে বন্ধ থাকলে সাইট `lib/portfolio-data.ts`-এর ডাটা দেখায় (ব্যাকআপ)।
- নতুন admin যোগ করতে: Supabase → Authentication-এ ইউজার বানান, তারপর SQL Editor-এ
  `insert into public.admins(email) values ('new@email.com');`
- ⚠️ `service_role` / secret key কখনো এই প্রজেক্টে বা GitHub-এ রাখবেন না।

## ফাইল গঠন
| পাথ | কাজ |
|---|---|
| `app/admin/`, `components/admin/` | Admin panel |
| `app/api/revalidate/` | সেভের পর সাইট রিফ্রেশ করে (শুধু admin) |
| `lib/supabase.ts` | Supabase URL + public anon key |
| `lib/content.ts` | Supabase থেকে কন্টেন্ট লোড করে |
| `lib/portfolio-data.ts` | ডাটার ধরন (types) + ব্যাকআপ কন্টেন্ট |
| `supabase/schema.sql` | ডাটাবেস টেবিল ও নিরাপত্তা নিয়ম |
| `app/page.tsx` | পেজের সেকশনগুলো |
| `app/globals.css` | ডিজাইন — হাইলাইট রঙ বদলাতে `--accent` এডিট করুন |
| `components/site/` | মেনু, ফোন মকআপ, স্লাইডার, কন্ট্যাক্ট ফর্ম, অ্যানিমেশন |
| `public/` | ছবি, CV |

## লোকালি চালানো
```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # প্রোডাকশন বিল্ড চেক
```
