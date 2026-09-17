import { getEvents } from '@/lib/db/events'
import EventsClient from './EventsClient'

export const revalidate = 60

export default async function EventsPage() {
  const events = await getEvents()
  return <EventsClient events={events} />
}