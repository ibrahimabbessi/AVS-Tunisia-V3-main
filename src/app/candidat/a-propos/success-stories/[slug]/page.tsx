import { notFound } from 'next/navigation'
import { getSuccessStoryBySlug } from '@/lib/db/successStories'
import SuccessStoryDetailClient from './SuccessStoryDetailClient'

export const revalidate = 60

export default async function SuccessStoryPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params          // ← await here
  const story = await getSuccessStoryBySlug(slug)
  if (!story) notFound()
  return <SuccessStoryDetailClient story={story} />
}