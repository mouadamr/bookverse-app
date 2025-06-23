'use client';
import { useState } from 'react';
import { Book } from './BookCard'; // Import the Book type

// Define a prop type to pass the search results up to the parent page
interface BookSearchProps {
  onSearchResults: (books: Book[]) => void;
  onLoading: (isLoading: boolean) => void;
}

export default function BookSearch({ onSearchResults, onLoading }: BookSearchProps) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query) return;

    onLoading(true); // Tell the parent page we are loading
    try {
      const response = await fetch(`/api/books/search?q=${query}`);
      const books = await response.json();
      onSearchResults(books);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      onSearchResults([]); // Clear results on error
    } finally {
      onLoading(false); // Tell the parent page we are done loading
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search for books by title or author..."
          className="flex-grow p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
        >
          Search
        </button>
      </div>
    </div>
  );
}
