import { Book } from './BookCard';
import StarRating from '@/components/ui/StarRating';

export interface ShelfBook extends Book {
    shelf: 'read' | 'wantToRead' | 'reading';
    rating?: number;
    review?: string;
    docId: string; // The ID of the document in Firestore
}

interface BookshelfProps {
    title: string;
    books: ShelfBook[];
    onRateBook: (book: ShelfBook) => void; // Function to open the modal
}

export default function Bookshelf({ title, books, onRateBook }: BookshelfProps) {
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-indigo-200">{title}</h2>
            {books.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {books.map((book: ShelfBook) => (
                        <div key={book.docId} className="text-center group">
                            <img
                                src={book.thumbnail || 'https://placehold.co/128x192/E0E7FF/4F46E5?text=No+Cover'}
                                alt={`Cover of ${book.title}`}
                                className="w-full h-auto object-cover rounded-md shadow-lg mb-2"
                            />
                            {/* Display existing rating */}
                            {book.rating && <StarRating rating={book.rating} size={4} />}

                            <h4 className="font-semibold text-sm mt-1 truncate">{book.title}</h4>
                            
                            {/* Show Rate button only for the "Books Read" shelf */}
                            {book.shelf === 'read' && (
                                <button onClick={() => onRateBook(book)} className="mt-2 w-full text-sm bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300">
                                    {book.rating ? 'Edit Review' : 'Rate Book'}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No books on this shelf yet.</p>
            )}
        </div>
    );
}
