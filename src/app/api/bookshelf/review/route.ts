import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const { docId, rating, review } = await request.json();

    if (!docId) {
      return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
    }

    if (rating === undefined || review === undefined) {
      return NextResponse.json({ error: 'Rating and review fields are required' }, { status: 400 });
    }

    const docRef = doc(db, 'bookshelves', docId);

    // Update the existing document with the new rating and review
    await updateDoc(docRef, {
      rating: rating,
      review: review,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}
