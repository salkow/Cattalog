import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { request } from '../../utilities/apiClient'
import { Breed } from '../../types/cat-types'
import SingleBreed from './SingleBreed'

const CatImages: React.FC = function () {
  const { data: breeds, isLoading: breedsLoading } = useQuery({
    queryKey: [ 'breeds' ],
    queryFn: () => {
      return request.get<Breed[]>('breeds?limit=10');
    }
  })

  if (breedsLoading || !breeds) {
    return null;
  }

  return (
    <div className='columns-1 sm:columns-2 lg:columns-3 gap-4 row-gap-4'>
      {
        breeds.map((breed) => {
          return (
            <SingleBreed key={ breed.id } { ...breed } />
          );
        })
      }
    </div>
  )
}

export default CatImages