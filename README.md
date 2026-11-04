# Abdul Alim Mridha — Portfolio

Next.js 16 + Tailwind CSS 4 · Vercel-এ হোস্ট করা · লাইভ: https://www.abdulalimmridha.top

## কন্টেন্ট আপডেট করবেন যেভাবে
সব লেখা, প্রজেক্ট, সার্ভিস, স্কিল, টেস্টিমোনিয়াল আর সোশ্যাল লিংক এক জায়গায়:

**`lib/portfolio-data.ts`**

1. GitHub-এ ফাইলটা খুলুন → ✏️ (Edit) চাপুন।
2. নতুন প্রজেক্ট যোগ করতে `projects` লিস্টে একটা `{ ... }` লাইন কপি করে নিচে পেস্ট করুন, লেখা বদলান।
3. ছবি `public/` ফোল্ডারে আপলোড করুন, তারপর `image: '/ছবির-নাম.jpg'` লিখুন।
4. **Commit changes** চাপুন — ১–২ মিনিটে Vercel নিজে থেকে সাইট আপডেট করে দেবে।

> শীঘ্রই: Supabase যুক্ত হলে `/admin` প্যানেল থেকে লগইন করে ফর্মের মাধ্যমে আপডেট করা যাবে।

## ফাইল গঠন
| পাথ | কাজ |
|---|---|
| `lib/portfolio-data.ts` | সব কন্টেন্ট |
| `lib/content.ts` | কন্টেন্ট লোড করে (পরে Supabase থেকে পড়বে) |
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
