import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { type, slug } = await req.json()

  const pathMap: Record<string, string> = {
    success_story: '/candidat/a-propos/success-stories',
    press:         '/candidat/a-propos/presse',
    video:         '/candidat/a-propos/videos',
    event:         '/candidat/a-propos/events',
    gallery:       '/candidat/a-propos/gallery'
  }

  const base = pathMap[type]
  if (base) {
    revalidatePath(base)
    if (slug) revalidatePath(`${base}/${slug}`)
  }
  return NextResponse.json({ revalidated: true })
}