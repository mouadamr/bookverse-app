import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// The 'params' object is automatically populated by Next.js
// with the dynamic parts of the URL.
export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const bookshelfCol = collection(db, 'bookshelves');

    // Create a query to get all documents where the 'userId' field matches.
    const q = query(bookshelfCol, where('userId', '==', userId));

    const querySnapshot = await getDocs(q);

    const books: any[] = [];
    querySnapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json(books);

  } catch (error) {
    console.error(`Error fetching bookshelf for user ${params.userId}:`, error);
    return NextResponse.json({ error: 'Failed to fetch bookshelf data' }, { status: 500 });
  }
}
