'use client';

import { useEffect, useState, useCallback } from 'react';
import Bookshelf, { ShelfBook } from '@/components/features/book/Bookshelf';
import ReviewModal from '@/components/features/book/ReviewModal';

export default function ProfilePage({ params }: { params: { userId: string } }) {
    const [books, setBooks] = useState<ShelfBook[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reviewingBook, setReviewingBook] = useState<ShelfBook | null>(null);

    // Using useCallback to prevent re-creating the function on every render
    const fetchBookshelf = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/bookshelf/${params.userId}`);
            const data = await response.json();
            if (response.ok) {
                // We need to map the Firestore doc ID correctly
                const booksWithDocId = data.map((b: any) => ({ ...b, docId: b.id }));
                setBooks(booksWithDocId);
            } else {
                console.error("Failed to fetch bookshelf:", data.error);
            }
        } catch (error) {
            console.error("An error occurred while fetching bookshelf:", error);
        } finally {
            setIsLoading(false);
        }
    }, [params.userId]);

    useEffect(() => {
        fetchBookshelf();
    }, [fetchBookshelf]);

    const handleOpenModal = (book: ShelfBook) => {
        setReviewingBook(book);
    };

    const handleCloseModal = () => {
        setReviewingBook(null);
    };

    const handleSaveReview = () => {
        // After saving, re-fetch the data to show the updated rating
        fetchBookshelf();
    };

    const currentlyReading = books.filter(b => b.shelf === 'reading');
    const wantToRead = books.filter(b => b.shelf === 'wantToRead');
    const read = books.filter(b => b.shelf === 'read');

    if (isLoading && books.length === 0) {
        return <p className="text-center">Loading profile...</p>
    }

    return (
        <>
            {/* The Review Modal will only appear when a book is selected for review */}
            {reviewingBook && (
                <ReviewModal 
                    book={{
                        ...reviewingBook,
                        initialRating: reviewingBook.rating,
                        initialReview: reviewingBook.review
                    }}
                    onClose={handleCloseModal}
                    onSave={handleSaveReview}
                />
            )}

            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center space-x-6 mb-10">
                    <img src="https://placehold.co/128x128/E0E7FF/4F46E5?text=User" alt="User Avatar" className="w-32 h-32 rounded-full"/>
                    <div>
                        <h1 className="text-3xl font-bold">User Profile</h1>
                        <p className="text-gray-600 mt-1">Viewing profile for user: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{params.userId}</span></p>
                    </div>
                </div>

                <Bookshelf title="Currently Reading" books={currentlyReading} onRateBook={() => {}} />
                <Bookshelf title="Want to Read" books={wantToRead} onRateBook={() => {}} />
                <Bookshelf title="Books Read" books={read} onRateBook={handleOpenModal} />
            </div>
        </>
    );
}
