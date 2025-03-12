import React from 'react';
import type { CatBreed, SelectedBreed } from '../../types/cat-types';

interface ISingleBreedProps extends CatBreed {
  selectBreed: (cat: SelectedBreed) => void
}

const SingleBreed: React.FC<ISingleBreedProps> = function ({ selectBreed, ...breed }) {
  return (
    <div
      // Comes from cat breeds so it has all the info
      onClick={ () => { selectBreed({ ...breed, hasAllInfo: true });} }
      className='rounded-xl dark:bg-gray-800 dark:border-gray-700 mb-4 shadow-lg break-inside-avoid cursor-pointer'>
      {
        breed.image?.url && (
          <img className='rounded-t-xl' src={ breed.image.url } alt={ breed.name } />
        )
      }
      <div className='p-5'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{breed.name}</h5>
        <p className='mb-3 line-clamp-3 font-normal text-gray-700 dark:text-gray-400'>{breed.description}</p>
      </div>
    </div>
  );
};

export default SingleBreed;