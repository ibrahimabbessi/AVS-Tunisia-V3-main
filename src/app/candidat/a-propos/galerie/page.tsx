import { getGalleryWithItems } from '@/lib/db/gallery'
import GalerieClient from './GalerieClient'
export const revalidate = 60

export default async function GaleriePage() {
  const { folders, itemsByFolder } = await getGalleryWithItems()
  return <GalerieClient initialFolders={folders} initialItems={itemsByFolder} />
}