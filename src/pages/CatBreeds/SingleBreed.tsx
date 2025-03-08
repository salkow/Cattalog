import React from 'react'
import { Breed } from '../../types/cat-types';

const SingleBreed: React.FC<Breed> = function ({ image, name ,description }) {
  if (!image?.url) {
    console.log('null')
    return null;
  }

  return (
    <div className='rounded-xl dark:bg-gray-800 dark:border-gray-700 mb-4 shadow-lg break-inside-avoid'>
      <img className='rounded-t-xl' src={ image.url } alt={ name } />
      <div className='p-5'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{name}</h5>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{description}</p>
      </div>
    </div>
  )
}

export default SingleBreed;