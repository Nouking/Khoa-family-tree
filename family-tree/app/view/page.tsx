import { getAllMembers } from '../lib/data'
import MemberCard from '../components/MemberCard'
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
          <h2 className="text-2xl font-semibold mb-4">Family Members</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}