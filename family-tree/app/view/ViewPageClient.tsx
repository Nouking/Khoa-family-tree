'use client'

import { FamilyMember } from '@/types'

import { FamilyTreeProvider } from '../contexts/FamilyTreeContext'

import FamilyTree from '../components/FamilyTree'
import MainToolbar from '../components/MainToolbar'

interface ViewPageClientProps {
  initialMembers: FamilyMember[]
}

export default function ViewPageClient({ initialMembers }: ViewPageClientProps) {
  // Placeholder functions for toolbar actions
  const handleShare = () => {
    alert('Share functionality will be implemented in a future task')
  }
  
  const handleExport = () => {
    alert('Export functionality will be implemented in a future task')
  }
  
  const handleAddMember = () => {
    alert('Add Member functionality will be implemented in a future task')
  }

  const handleUndo = () => {
    alert('Undo functionality will be implemented in a future task')
  }

  const handleRedo = () => {
    alert('Redo functionality will be implemented in a future task')
  }
  
  return (
    <FamilyTreeProvider>
      <div className="min-h-screen bg-gray-50">
        <MainToolbar 
          title="Family Tree View"
          onShare={handleShare}
          onExport={handleExport}
        />
        
        <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 px-2 sm:px-0">Family Tree Visualization</h2>
            
            <div className="bg-white rounded-lg shadow p-2 sm:p-4">
              {/* Responsive help text for mobile users */}
              <div className="md:hidden p-2 mb-4 bg-blue-50 text-blue-700 rounded text-sm">
                <p>Scroll horizontally to view the complete family tree.</p>
              </div>
              
              <FamilyTree initialMembers={initialMembers} />
            </div>
          </div>
        </main>
      </div>
    </FamilyTreeProvider>
  )
} 