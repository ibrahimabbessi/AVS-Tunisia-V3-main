import { getDb } from './mongodb'

export type CloudinaryAsset = {
  publicId: string
  url: string
  width: number
  height: number
  format: string
  bytes?: number
}

export type PressItem = {
  _id: string
  slug: string
  title: string
  source?: string
  url?: string            // external article link
  excerpt?: string
  body?: string           // full HTML
  coverImage?: CloudinaryAsset | null
  publishedAt?: string    // ISO string
}

function serialize(doc: any): PressItem | null {
  if (!doc) return null
  return {
    _id: String(doc._id),
    slug: doc.slug,
    title: doc.title,
    source: doc.source,
    url: doc.url,
    excerpt: doc.excerpt,
    body: doc.body,
    coverImage: doc.coverImage
      ? {
          publicId: doc.coverImage.publicId,
          url: doc.coverImage.url,
          width: doc.coverImage.width,
          height: doc.coverImage.height,
          format: doc.coverImage.format,
          bytes: doc.coverImage.bytes
        }
      : null,
    publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toISOString() : undefined
  }
}

export async function getPressItems(): Promise<PressItem[]> {
  const db = await getDb()
  const rows = await db
    .collection('contents')
    .find({ type: 'press', status: 'published' })
    .sort({ publishedAt: -1 })
    .toArray()
  return rows.map(serialize).filter(Boolean) as PressItem[]
}