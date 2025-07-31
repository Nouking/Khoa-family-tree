import { getAllMembers } from '../lib/data'
import FamilyTree from '../components/FamilyTree'
import Link from 'next/link'

export default async function ViewPage() {
  const members = await getAllMembers()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Family Tree</h1>
            <Link 
              href="/"
              className="text-blue-600 hover:text-blue-800"
            >
              Home
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Family Tree Visualization</h2>
          
          <div className="bg-white rounded-lg shadow p-4">
            <FamilyTree members={members} />
          </div>
        </div>
      </main>
    </div>
  )
}