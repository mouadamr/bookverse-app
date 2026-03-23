'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Navbar() {
    const { user } = useAuth(); // Get the current user from our context
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            // Redirect to homepage after sign-out
            router.push('/');
        } catch (error) {
            console.error("Failed to sign out:", error);
        }
    };

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 z-10">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-700 hover:text-blue-800">
                    BookVerse
                </Link>
                
                <div className="flex items-center space-x-6">
                    {user ? (
                        // --- Shows when user IS logged in ---
                        <>
                            <Link href="/books" className="text-zinc-600 hover:text-blue-700 hidden sm:block">
                                Find Books
                            </Link>
                            <Link href={`/profile/${user.uid}`} className="text-zinc-600 hover:text-blue-700">
                                My Profile
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 font-semibold"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        // --- Shows when user IS NOT logged in ---
                        <>
                            <Link href="/sign-in" className="text-zinc-600 hover:text-blue-700 font-semibold">
                                Sign In
                            </Link>
                            <Link href="/sign-up" className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 font-semibold">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
