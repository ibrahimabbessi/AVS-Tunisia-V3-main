import { ObjectId } from 'mongodb'
import { getDb } from './mongodb'

export type CloudinaryAsset = {
  publicId: string
  url: string
  width: number
  height: number
  format: string
  bytes?: number
}

export type SuccessStory = {
  _id: string
  slug: string
  title: string
  subtitle?: string
  badge?: string
  categorySlug?: string
  rating?: number
  body?: string
  meta?: { personName?: string; program?: string; outcome?: string }
  period?: { display?: string }
  location?: { country?: string; display?: string }
  coverImage?: CloudinaryAsset | null
  photos?: CloudinaryAsset[]
  publishedAt?: string | Date
}

// Convert BSON types to plain JSON so the client component doesn't
// choke on ObjectId / Date instances.
function serialize(doc: any): SuccessStory | null {
  if (!doc) return null
  return {
    ...doc,
    _id: String(doc._id),
    publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toISOString() : undefined
  }
}

export async function getSuccessStories(): Promise<SuccessStory[]> {
  const db = await getDb()
  const rows = await db
    .collection('contents')
    .find({ type: 'success_story', status: 'published' })
    .sort({ order: 1, publishedAt: -1 })
    .toArray()
  return rows.map(serialize).filter(Boolean) as SuccessStory[]
}

export async function getSuccessStoryBySlug(slug: string): Promise<SuccessStory | null> {
  const db = await getDb()
  const doc = await db
    .collection('contents')
    .findOne({ type: 'success_story', status: 'published', slug })
  return serialize(doc)
}

export async function getSuccessStoryById(id: string): Promise<SuccessStory | null> {
  const db = await getDb()
  const doc = await db
    .collection('contents')
    .findOne({ type: 'success_story', status: 'published', _id: new ObjectId(id) })
  return serialize(doc)
}