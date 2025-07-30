import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center py-8 text-gray-800">
          Family Tree Application
        </h1>
        
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg text-gray-700 mb-4">
            Welcome to the Family Tree application. This platform allows you to:
          </p>
          
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>View and explore family relationships</li>
            <li>Search for specific family members</li>
            <li>Export family tree data</li>
            <li>Add, edit, and delete members (authentication required)</li>
          </ul>
          
          <div className="flex justify-center space-x-4 mt-6">
            <Link 
              href="/view" 
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View Family Tree
            </Link>
            <Link 
              href="/login" 
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Login to Edit
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Family Tree Application
      </footer>
    </div>
  )
}