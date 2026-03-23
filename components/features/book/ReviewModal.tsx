'use client';
import { useState } from 'react';
import StarRating from '@/components/ui/StarRating';
import { Book } from './BookCard';

interface ReviewModalProps {
    book: Book & { docId: string; initialRating?: number; initialReview?: string; };
    onClose: () => void;
    onSave: () => void;
}

export default function ReviewModal({ book, onClose, onSave }: ReviewModalProps) {
    const [rating, setRating] = useState(book.initialRating || 0);
    const [review, setReview] = useState(book.initialReview || '');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // We'll create this API route next
            const response = await fetch('/api/bookshelf/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ docId: book.docId, rating, review }),
            });

            if (!response.ok) throw new Error('Failed to save review');

            onSave(); // Tell the parent component to refresh data
            onClose(); // Close the modal
        } catch (error) {
            console.error(error);
            alert('Could not save your review. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Your Review for "{book.title}"</h2>
                
                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">Your Rating</label>
                    <StarRating rating={rating} setRating={setRating} size={8} />
                </div>

                <div className="mb-6">
                    <label htmlFor="review" className="block text-lg font-medium mb-2">Your Feedback</label>
                    <textarea
                        id="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="w-full p-3 border rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="What did you think of the book?"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                        Cancel
                    </button>
                    <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300">
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}
