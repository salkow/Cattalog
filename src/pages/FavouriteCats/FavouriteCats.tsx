import React from 'react'
import SingleCat from '../CatImages/SingleCat';
import { useGetFavouriteCats } from './hooks';

const FavoriteCats: React.FC = function () {

  const { data: favouriteCats, isLoading: favouriteCatsLoading } = useGetFavouriteCats()

  if (favouriteCatsLoading || !favouriteCats) {
    return null;
  }

  return (
    <div className='columns-1 sm:columns-2 md:columns-3 gap-4 row-gap-4'>
      {
        Object.values(favouriteCats)
          .map((favCat) => {
            return (
              <SingleCat
                key={ favCat.id }
                id={ favCat.image.id }
                favouriteId={ favCat.id }
                url={ favCat.image.url }
              />
            )
          })
      }
    </div>
  )
}

export default FavoriteCats