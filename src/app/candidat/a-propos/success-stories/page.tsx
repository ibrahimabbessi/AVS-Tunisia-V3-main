import { getSuccessStories } from '@/lib/db/successStories'
import SuccessStoriesClient from './SuccessStoriesClient'

export const revalidate = 60

export default async function SuccessStoriesPage() {
  const stories = await getSuccessStories()
  return <SuccessStoriesClient stories={stories} />
}