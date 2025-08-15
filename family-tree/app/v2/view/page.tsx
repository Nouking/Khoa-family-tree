import { getAllMembers } from '../../lib/data';

import ViewPageV2Client from './ViewPageV2Client';

// Server Component for data fetching
export default async function ViewV2Page() {
  const members = await getAllMembers();
  
  return <ViewPageV2Client initialMembers={members} />;
}