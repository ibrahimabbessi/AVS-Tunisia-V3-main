import { ObjectId } from 'mongodb'
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

export type GalleryFolder = {
  _id: string
  title: string
  slug: string
  status: 'published' | 'draft'
  order: number
  coverImage?: CloudinaryAsset | null
  itemCount?: number
  createdAt?: string
  updatedAt?: string
}

export type GalleryItem = {
  _id: string
  folderId: string
  caption: string
  order: number
  cloudinary: CloudinaryAsset
  createdAt?: string
  updatedAt?: string
}

function serializeFolder(doc: any): GalleryFolder | null {
  if (!doc) return null
  return {
    _id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    status: doc.status,
    order: doc.order ?? 0,
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
    itemCount: doc.itemCount ?? 0,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined
  }
}

function serializeItem(doc: any): GalleryItem | null {
  if (!doc || !doc.cloudinary) return null
  return {
    _id: String(doc._id),
    folderId: String(doc.folderId),
    caption: doc.caption ?? '',
    order: doc.order ?? 0,
    cloudinary: {
      publicId: doc.cloudinary.publicId,
      url: doc.cloudinary.url,
      width: doc.cloudinary.width,
      height: doc.cloudinary.height,
      format: doc.cloudinary.format,
      bytes: doc.cloudinary.bytes,
      originalFilename: doc.cloudinary.originalFilename
    },
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined
  }
}

/**
 * Return all published folders, sorted by order, with a count of items
 * in each. Uses an aggregation so we get the counts in one round-trip.
 */
export async function getGalleryFolders(): Promise<GalleryFolder[]> {
  const db = await getDb()

  const folders = await db
    .collection('gallery_folders')
    .find({ status: 'published' })
    .sort({ order: 1, title: 1 })
    .toArray()

  const counts = await db
    .collection('gallery_items')
    .aggregate<{ _id: ObjectId; count: number }>([
      { $group: { _id: '$folderId', count: { $sum: 1 } } }
    ])
    .toArray()

  const countByFolder = new Map(counts.map((c) => [String(c._id), c.count]))

  return folders
    .map((f) => ({
      ...serializeFolder(f),
      itemCount: countByFolder.get(String(f._id)) || 0
    }))
    .filter(Boolean) as GalleryFolder[]
}

/**
 * Return all items in a folder, ordered by `order` then by
 * `cloudinary.createdAt` for tie-breaking. Fetches the full set — the
 * gallery page paginates client-side.
 */
export async function getGalleryItems(folderId: string): Promise<GalleryItem[]> {
  const db = await getDb()
  const rows = await db
    .collection('gallery_items')
    .find({ folderId: new ObjectId(folderId) })
    .sort({ order: 1, createdAt: -1 })
    .toArray()
  return rows.map(serializeItem).filter(Boolean) as GalleryItem[]
}

/**
 * Convenience: return folders + all their items in one call. Good for
 * a gallery page that wants to show counts and preload the first folder.
 * For very large galleries, fetch items lazily instead.
 */
export async function getGalleryWithItems(): Promise<{
  folders: GalleryFolder[]
  itemsByFolder: Record<string, GalleryItem[]>
}> {
  const folders = await getGalleryFolders()
  const itemsByFolder: Record<string, GalleryItem[]> = {}
  // Only preload the first folder to keep the initial payload small
  if (folders[0]) {
    itemsByFolder[folders[0]._id] = await getGalleryItems(folders[0]._id)
  }
  return { folders, itemsByFolder }
}