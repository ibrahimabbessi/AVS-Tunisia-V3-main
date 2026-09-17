import { getDb } from './mongodb'

export type CloudinaryAsset = {
  publicId: string
  url: string
  width: number
  height: number
  format: string
  bytes?: number
  originalFilename?: string
}

export type Video = {
  _id: string
  slug: string
  title: string
  youtubeUrl: string
  description: string
  coverImage?: CloudinaryAsset | null
  body: null
  status: 'published' | 'draft'
  type: 'video'
  publishedAt: string
}

/**
 * The CMS sometimes bakes a date prefix into the title/description
 * (e.g. "Sep 8, 2026 L'école …"). Strip it so the UI can show the date
 * in its own dedicated slot instead.
 */
function stripDatePrefix(s: string): string {
  return String(s || '')
    .replace(
      /^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},\s*\d{4}\s*/i,
      ''
    )
    .replace(
      /^\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\s*/i,
      ''
    )
    .trim()
}

function serialize(doc: any): Video | null {
  if (!doc) return null
  return {
    _id: String(doc._id),
    slug: doc.slug,
    title: stripDatePrefix(doc.title ?? '') || doc.title || '',
    youtubeUrl: doc.youtubeUrl ?? '',
    description: doc.description ?? '',
    coverImage: doc.coverImage
      ? {
          publicId: doc.coverImage.publicId,
          url: doc.coverImage.url,
          width: doc.coverImage.width,
          height: doc.coverImage.height,
          format: doc.coverImage.format,
          bytes: doc.coverImage.bytes,
          originalFilename: doc.coverImage.originalFilename
        }
      : null,
    body: null,
    status: doc.status,
    type: 'video',
    publishedAt: doc.publishedAt
      ? new Date(doc.publishedAt).toISOString()
      : new Date(doc.createdAt ?? Date.now()).toISOString()
  }
}

export async function getVideos(): Promise<Video[]> {
  const db = await getDb()
  const rows = await db
    .collection('contents')
    .find({ type: 'video', status: 'published' })
    .sort({ publishedAt: -1 })
    .toArray()
  return rows.map(serialize).filter(Boolean) as Video[]
}