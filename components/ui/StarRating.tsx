'use client';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void; // Optional: Makes the component interactive
  size?: number; // Size of the stars
}

export default function StarRating({ rating, setRating, size = 6 }: StarRatingProps) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => setRating && setRating(star)}
          className={`
            w-${size} h-${size} 
            ${setRating ? 'cursor-pointer' : ''}
            ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}
          `}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
}
