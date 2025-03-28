import React from 'react';

interface IRatingProps {
  rating: number;
  label?: string
}

const Rating: React.FC<IRatingProps> = function ({ rating, label }) {
  if (rating < 0 || rating > 5 || isNaN(rating)) {
    throw new Error('Rating must be between 0 and 10');
  }

  const enabledStars = Array.from({ length: rating }).map((_, idx) => {
    return (
      <svg
        key={ idx }
        className='w-4 h-4 text-yellow-300 ms-1' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 22 20'>
        <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z'/>
      </svg>
    );});

  const disabledStars = Array.from({ length: 5 - rating }).map((_, idx) => {
    return (
      <svg
        key={ idx }
        className='w-4 h-4 ms-1 text-gray-300 dark:text-gray-500' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 22 20'>
        <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z'/>
      </svg>
    );});

  return (
    <div className='flex gap-2 justify-between '>
      {
        label && (
          <span>
            {label}
          </span>
        )
      }

      <div className='flex items-center'>
        { enabledStars }

        { disabledStars }
      </div>
    </div>
  );
};

export default Rating;