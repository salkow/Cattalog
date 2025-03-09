import React, { memo } from 'react';
import { useAddToFavourites, useRemoveFromFavourites } from '../FavouriteCats/hooks';
import { SelectedImage } from '../../types/cat-types';

interface ISingleCatProps {
  favouriteId: number | undefined
  selectImage?: (cat: SelectedImage) => void
  id: string
  url: string
  className?: React.HTMLProps<HTMLElement>['className'];
}

const SingleCat: React.FC<ISingleCatProps> = function ({ selectImage, favouriteId, id, url, className }) {
  const removeFavouriteCat = useRemoveFromFavourites();
  const makeFavourite = useAddToFavourites();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (favouriteId) {
      removeFavouriteCat?.mutate({ favouriteId, imageId: id });
    } else {
      makeFavourite.mutate({ imageId: id, url: url });
    }
  };

  return (
    <form className={ `relative ${ className ?? '' }` } onSubmit={ handleSubmit }>
      <button
        className='absolute left-3 top-3 cursor-pointer'
        type='submit'
      >
        <img
          src={ favouriteId ? 'heart.svg' : '/heart-outline.svg' }
          alt='heart-outline'
          height='35px'
          width='35px'
        />
      </button>

      <img
        src={ url }
        alt={ url }
        className='w-full h-full rounded-xl outline-stone-500/50 outline shadow-lg cursor-pointer max-h-[calc(100vh-5vh)]'
        onClick={ () => { selectImage?.({ id: id, url: url });} }
      />
    </form>
  );
};

// memo to avoid rerender when the favourite images are updated.
export default memo(SingleCat);