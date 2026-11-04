import { portfolioData, type Portfolio } from './portfolio-data'

/**
 * সাইটের সব কন্টেন্ট এখান থেকে আসে।
 * এখন portfolio-data.ts থেকে পড়ে; Supabase যুক্ত হলে শুধু এই ফাংশনটা বদলাবে
 * (ডাটাবেস থেকে পড়বে, না পেলে portfolio-data.ts ব্যবহার করবে)।
 */
export async function getPortfolio(): Promise<Portfolio> {
  return portfolioData
}
