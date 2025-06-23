'use client';

import { useState } from "react";

// Define a type for our book data for better TypeScript support
export interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail?: string;
}

// Function to add a book to a shelf
async function addBookToShelf(book: Book, shelf: 'wantToRead' | 'read' | 'reading') {
  try {
    const response = await fetch('/api/bookshelf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ book, shelf }),
    });

    if (!response.ok) {
        throw new Error('Failed to add book to shelf');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw to be caught by the component
  }
}


export default function BookCard({ book }: { book: Book }) {
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleShelfAction = async (shelf: 'wantToRead' | 'read' | 'reading') => {
    try {
        await addBookToShelf(book, shelf);
        let message = '';
        if (shelf === 'wantToRead') message = "Added to 'Want to Read'";
        if (shelf === 'reading') message = "Added to 'Currently Reading'";
        if (shelf === 'read') message = "Added to 'Read'";
        
        setFeedbackMessage(message);
        setTimeout(() => setFeedbackMessage(''), 2000); // Hide message after 2 seconds
    } catch (error) {
        setFeedbackMessage('Could not add book.');
        setTimeout(() => setFeedbackMessage(''), 2000);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col text-center transition-transform transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={book.thumbnail || 'https://placehold.co/128x192/E0E7FF/4F46E5?text=No+Cover'}
          alt={`Cover of ${book.title}`}
          className="w-32 h-48 object-cover rounded-md mb-4 mx-auto"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/128x192/E0E7FF/4F46E5?text=No+Cover'
          }}
        />
        {feedbackMessage && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-md">
                <p className="text-white text-lg font-semibold px-2">{feedbackMessage}</p>
            </div>
        )}
      </div>
      
      <h3 className="font-bold text-md flex-grow mt-2">{book.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{book.authors.join(', ')}</p>

      <div className="mt-4 space-y-2">
        <button onClick={() => handleShelfAction('wantToRead')} className="w-full bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 text-sm">Want to Read</button>
        <button onClick={() => handleShelfAction('reading')} className="w-full bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 text-sm">Reading</button>
        <button onClick={() => handleShelfAction('read')} className="w-full bg-purple-500 text-white py-1 px-2 rounded hover:bg-purple-600 text-sm">Read</button>
      </div>
    </div>
  );
}
