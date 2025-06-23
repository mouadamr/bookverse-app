import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          BookVerse
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
          <Link href="/books" className="text-gray-600 hover:text-indigo-600">Books</Link>
          <Link href="/profile/me" className="text-gray-600 hover:text-indigo-600">Profile</Link>
        </div>
        <div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}
