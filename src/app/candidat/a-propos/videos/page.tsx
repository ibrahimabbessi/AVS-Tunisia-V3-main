import { getVideos } from '@/lib/db/videos'
import VideosClient from './VideosClient'
export const revalidate = 60

export default async function VideosPage() {
  const videos = await getVideos()
  return <VideosClient videos={videos} />
}