import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { request } from '../../utilities/apiClient';
import SingleCat from './SingleCat';
import { CatImage } from '../../types/cat-types';
import { useGetFavouriteCats } from '../FavouriteCats/hooks';

const CatImages: React.FC = function () {
  const { data: cats, isLoading: catsLoading } = useQuery({
    queryKey: [ 'cats' ],
    queryFn: () => {
      return request.get<CatImage[]>('images/search?limit=10');
    }
  });

  const { data: favouriteCats } = useGetFavouriteCats();

  if (catsLoading || !cats) {
    return null;
  }

  return (
    <div className='columns-1 sm:columns-2 md:columns-3 gap-4 row-gap-4'>
      {
        cats.map((cat) => {
          return <SingleCat
            key={ cat.id }
            id={ cat.id }
            url={ cat.url }
            favouriteId={ favouriteCats?.[cat.id]?.id }
          />;
        })
      }
    </div>
  );
};

export default CatImages;