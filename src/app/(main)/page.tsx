'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function HomePage() {
    const { user } = useAuth();

    return (
        <div>
            {user ? (
                // --- Logged-in User View ---
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-zinc-800">
                        Welcome back, <span className="text-blue-700">{user.email}</span>!
                    </h1>
                    <p className="text-zinc-600 mb-8">What have you been reading lately?</p>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Community Feed</h2>
                        <p className="text-gray-700">
                            The main feed of posts from the community will appear here soon.
                        </p>
                    </div>
                </div>
            ) : (
                // --- Guest View ---
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold text-zinc-800 mb-4">Welcome to BookVerse</h1>
                    <p className="text-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
                        Your new favorite place to track what you've read, discover new books, and connect with a community of fellow readers.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/sign-up" className="bg-blue-700 text-white px-8 py-3 rounded-md hover:bg-blue-800 font-semibold text-lg">
                            Get Started
                        </Link>
                        <Link href="/books" className="bg-stone-200 text-zinc-800 px-8 py-3 rounded-md hover:bg-stone-300 font-semibold text-lg">
                            Browse Books
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
