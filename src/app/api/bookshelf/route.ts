import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const MOCK_USER_ID = "user_12345"; // We will replace this with real Auth in Step 3

export async function POST(request: Request) {
  try {
    const { book, shelf } = await request.json();

    if (!book || !shelf) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    const docId = `${MOCK_USER_ID}_${book.id}`;
    const docRef = doc(db, 'bookshelves', docId);

    await setDoc(docRef, {
      userId: MOCK_USER_ID,
      bookId: book.id,
      shelf: shelf,
      title: book.title,
      authors: book.authors,
      thumbnail: book.thumbnail,
      addedAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Firestore Error:', error);
    return NextResponse.json({ error: 'Failed to save to shelf' }, { status: 500 });
  }
}