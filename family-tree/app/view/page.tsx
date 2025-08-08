import { getAllMembers } from '../lib/data'

import ViewPageClient from './ViewPageClient'

// Server Component for data fetching
export default async function ViewPage() {
  const members = await getAllMembers()
  
  return <ViewPageClient initialMembers={members} />
}
