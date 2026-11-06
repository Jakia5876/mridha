import { getPortfolio } from '@/lib/content'
import { llmsText } from '@/lib/seo'

export const revalidate = 3600

/** https://www.abdulalimmridha.top/llms.txt — summary for AI assistants & answer engines. */
export async function GET() {
  return new Response(llmsText(await getPortfolio()), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
