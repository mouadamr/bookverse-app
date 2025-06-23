import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase'; // It imports db from the file above
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// This is a simplified version. We'll add real user auth later.
const MOCK_USER_ID = "user_12345"; 

export async function POST(request: Request) {
  try {
    const { book, shelf } = await request.json();

    if (!book || !shelf) {
      return NextResponse.json({ error: 'Book and shelf are required' }, { status: 400 });
    }

    // A unique ID for the document will be the user ID plus the book ID
    const docId = `${MOCK_USER_ID}_${book.id}`;
    const docRef = doc(db, 'bookshelves', docId);

    await setDoc(docRef, {
      userId: MOCK_USER_ID,
      bookId: book.id,
      shelf: shelf, // e.g., 'read', 'wantToRead'
      title: book.title,
      authors: book.authors,
      thumbnail: book.thumbnail,
      addedAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true, docId: docRef.id });
  } catch (error) {
    console.error('Error adding to bookshelf:', error);
    return NextResponse.json({ error: 'Failed to update bookshelf' }, { status: 500 });
  }
}
