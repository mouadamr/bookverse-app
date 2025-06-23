'use client';
import { useState } from 'react';
import BookSearch from '@/components/features/book/BookSearch';
import BookCard, { Book } from '@/components/features/book/BookCard';

export default function BooksPage() {
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleResults = (books: Book[]) => {
    setResults(books);
    setSearched(true); // Mark that a search has been performed
  };

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Find Your Next Read</h1>
      
      <BookSearch onSearchResults={handleResults} onLoading={handleLoading}/>

      {isLoading ? (
        <p className="text-center text-gray-500">Searching...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.length > 0 ? (
            results.map(book => <BookCard key={book.id} book={book} />)
          ) : (
            searched && <p className="text-center text-gray-500 col-span-full">No books found. Try another search!</p>
          )}
        </div>
      )}
    </div>
  );
}
