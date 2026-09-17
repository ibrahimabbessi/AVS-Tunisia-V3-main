import { getPressItems } from '@/lib/db/press'
import PresseClient from './PresseClient'
export const revalidate = 60

export default async function PressePage() {
  const items = await getPressItems()
  return <PresseClient items={items} />
}