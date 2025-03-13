import React, { memo } from 'react';
import { useAddToFavourites, useRemoveFromFavourites } from '../FavouriteCats/hooks';
import { CatImage, FavouriteCat, SelectedImage } from '../../types/cat-types';
import { Link } from 'react-router';
import Pill from '../../components/Pill';

interface ISingleCatProps {
  favouriteId: FavouriteCat['id'] | undefined
  selectImage?: (cat: SelectedImage) => void
  id: CatImage['id']
  url: CatImage['url']
  breeds?: CatImage['breeds']

  width?: number
  originalHeight?: number
  originalWidth?: number

  // No need to block the rendering while the favourites are loading.
  // We just hide the favourite button.
  favouriteCatsLoading: boolean
}

const SingleCat: React.FC<ISingleCatProps> = function ({ selectImage, favouriteId, id, url,
  breeds, favouriteCatsLoading, width, originalHeight, originalWidth }) {
  const removeFavouriteCat = useRemoveFromFavourites();
  const makeFavourite = useAddToFavourites();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (favouriteId) {
      removeFavouriteCat?.mutate({ favouriteId, imageId: id });
    } else {
      makeFavourite.mutate({ imageId: id, url });
    }
  };

  const imgStyle: React.CSSProperties = { };
  if (originalHeight && originalWidth && width) {
    const aspectRatio = originalWidth / originalHeight;
    const newHeight = width / aspectRatio;

    imgStyle.height = `${ newHeight }px`;
  }

  return (
    <form className={ 'relative' } onSubmit={ handleSubmit }>
      {
        !favouriteCatsLoading && (
          <button
            className={ 'absolute left-3 top-3 cursor-pointer' }
            type='submit'
          >
            <img
              src={ favouriteId ? 'heart.svg' : '/heart-outline.svg' }
              alt='heart-outline'
              height='35px'
              width='35px'
            />
          </button>
        )
      }

      <img
        src={ url }
        alt={ url }
        style={ imgStyle }
        className='w-full h-full rounded-xl outline-stone-500/50 outline shadow-lg cursor-pointer max-h-[calc(100vh-5vh)]'
        onClick={ () => { selectImage?.({ id, url, breeds, hasAllInfo: !!breeds });} }
      />

      {
        breeds && breeds.length > 0 && (
          <div className='absolute bottom-2 flex gap-2 left-2'>
            {breeds?.map((breed) => {
              const breedUrl = `/breeds?id=${ breed.id }&name=${ breed.name }&url=${ encodeURIComponent(url) }&image_id=${ id }`;

              return (
                <div key={ breed.id }>
                  <Pill>
                    <Link to={ breedUrl }>
                      {breed.name}
                    </Link>
                  </Pill>
                </div>
              );
            })
            }
          </div>
        )
      }
    </form>
  );
};

// memo to avoid rerender when the favourite images are updated.
export default memo(SingleCat);