import { NextRequest, NextResponse } from 'next/server'
import { getGalleryItems } from '@/lib/db/gallery'

export const revalidate = 60

export async function GET(req: NextRequest) {
  const folderId = req.nextUrl.searchParams.get('folderId')
  if (!folderId) {
    return NextResponse.json({ error: 'folderId is required' }, { status: 400 })
  }

  try {
    const items = await getGalleryItems(folderId)
    return NextResponse.json({ items })
  } catch (err: any) {
    console.error('[api/gallery/items]', err)
    return NextResponse.json(
      { error: err?.message ?? 'Failed to load gallery items' },
      { status: 500 }
    )
  }
}