'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // On successful sign-up, Firebase automatically signs the user in.
            // The onAuthStateChanged listener in our AuthContext will handle the state change.
            router.push('/'); // Redirect to the homepage
        } catch (err: any) {
            // Handle Firebase errors
            if (err.code === 'auth/email-already-in-use') {
                setError('This email address is already in use.');
            } else {
                setError('Failed to create an account. Please try again.');
            }
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-stone-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-zinc-800">Create Your Account</h1>
                    <p className="text-zinc-600">Join the BookVerse community!</p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="text-sm text-center text-zinc-600">
                    Already have an account?{' '}
                    <Link href="/sign-in" className="font-medium text-blue-700 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
