"use client"

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { getAllMembers } from '../lib/data'
import FamilyTree from '../components/FamilyTree'
import Link from 'next/link'

export default async function ViewPage() {
  const members = await getAllMembers()
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Family Tree</h1>
              <div className="flex space-x-4">
                <Link 
                  href="/"
                  className="text-blue-600 hover:text-blue-800 text-sm sm:text-base"
                >
                  Home
                </Link>
                <Link 
                  href="/login"
                  className="text-blue-600 hover:text-blue-800 text-sm sm:text-base"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 px-2 sm:px-0">Family Tree Visualization</h2>
            
            <div className="bg-white rounded-lg shadow p-2 sm:p-4">
              {/* Responsive help text for mobile users */}
              <div className="md:hidden p-2 mb-4 bg-blue-50 text-blue-700 rounded text-sm">
                <p>Scroll horizontally to view the complete family tree.</p>
              </div>
              
              <FamilyTree initialMembers={members} />
            </div>
          </div>
        </main>
      </div>
    </DndProvider>
  )
}
