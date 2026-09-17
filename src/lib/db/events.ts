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

export type Event = {
  _id: string
  slug: string
  title: string
  body: string
  coverImage?: CloudinaryAsset | null
  photos?: CloudinaryAsset[]
  startDate?: string
  endDate?: string
  startTime?: string
  endTime?: string
  location?: string
  registrationUrl?: string
  youtubeUrls?: string[]
  facebookReelUrls?: string[]
  // Optional — only if you add them to the CMS schema
  categorySlugs?: string[]
  tags?: string[]
  status: 'published' | 'draft'
  type: 'event'
  publishedAt: string
  createdAt?: string
  updatedAt?: string
}

function serialize(doc: any): Event | null {
  if (!doc) return null
  return {
    _id: String(doc._id),
    slug: doc.slug,
    title: doc.title,
    body: doc.body ?? '',
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
    photos: Array.isArray(doc.photos)
      ? doc.photos.map((p: any) => ({
          publicId: p.publicId,
          url: p.url,
          width: p.width,
          height: p.height,
          format: p.format,
          bytes: p.bytes,
          originalFilename: p.originalFilename
        }))
      : [],
    startDate: doc.startDate,
    endDate: doc.endDate,
    startTime: doc.startTime,
    endTime: doc.endTime,
    location: doc.location,
    registrationUrl: doc.registrationUrl,
    youtubeUrls: Array.isArray(doc.youtubeUrls) ? doc.youtubeUrls : [],
    facebookReelUrls: Array.isArray(doc.facebookReelUrls) ? doc.facebookReelUrls : [],
    categorySlugs: Array.isArray(doc.categorySlugs) ? doc.categorySlugs : [],
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    status: doc.status,
    type: 'event',
    publishedAt: doc.publishedAt
      ? new Date(doc.publishedAt).toISOString()
      : new Date(doc.createdAt ?? Date.now()).toISOString(),
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined
  }
}

export async function getEvents(): Promise<Event[]> {
  const db = await getDb()
  const rows = await db
    .collection('contents')
    .find({ type: 'event', status: 'published' })
    .sort({ startDate: -1 })
    .toArray()
  return rows.map(serialize).filter(Boolean) as Event[]
}