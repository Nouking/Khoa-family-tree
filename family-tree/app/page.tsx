import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center py-6 sm:py-8 text-gray-800">
          Family Tree Application
        </h1>
        
        <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
            Welcome to the Family Tree application. This platform allows you to:
          </p>
          
          <ul className="list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 text-sm sm:text-base text-gray-700">
            <li className="mb-1 sm:mb-2">View and explore family relationships</li>
            <li className="mb-1 sm:mb-2">Search for specific family members</li>
            <li className="mb-1 sm:mb-2">Export family tree data</li>
            <li>Add, edit, and delete members (authentication required)</li>
          </ul>
          
          <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 mt-4 sm:mt-6 space-y-3 sm:space-y-0">
            <Link 
              href="/v2/view" 
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors"
            >
              View Family Tree (v2)
            </Link>
            <Link 
              href="/view" 
              className="w-full sm:w-auto px-6 py-2 bg-gray-600 text-white text-center rounded-md hover:bg-gray-700 transition-colors"
            >
              View Family Tree (v1)
            </Link>
            <Link 
              href="/login" 
              className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 text-center rounded-md hover:bg-gray-300 transition-colors"
            >
              Login to Edit
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="py-4 text-center text-gray-500 text-xs sm:text-sm">
        &copy; {new Date().getFullYear()} Family Tree Application
      </footer>
    </div>
  )
}