import { getAllMembers } from '../../lib/data';
import ErrorBoundary from '../../lib/errorBoundary';

import ViewPageV2Client from './ViewPageV2Client';

// Server Component for data fetching
export default async function ViewV2Page() {
  try {
    const members = await getAllMembers();
    
    return (
      <ErrorBoundary>
        <ViewPageV2Client initialMembers={members} />
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('Failed to load family members:', error);
    
    // Provide fallback with empty members array and error state
    return (
      <ErrorBoundary>
        <ViewPageV2Client initialMembers={[]} />
      </ErrorBoundary>
    );
  }
}