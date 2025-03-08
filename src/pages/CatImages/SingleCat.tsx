import { useAddToFavourites, useRemoveFromFavourites } from '../FavouriteCats/hooks';

interface ISingleCatProps {
  url: string
  id: string
  favouriteId: number | undefined
}

const SingleCat: React.FC<ISingleCatProps> = function ({ url, id, favouriteId }) {
  const removeFavouriteCat = useRemoveFromFavourites();
  const makeFavourite = useAddToFavourites();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (favouriteId) {
      removeFavouriteCat?.mutate({ favouriteId, imageId: id })
    } else {
      makeFavourite.mutate({ imageId: id, url: url })
    }
  }

  return (
    <form className='relative' onSubmit={ handleSubmit }>
      <button
        className='absolute right-[10px] top-[10px] cursor-pointer'
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
        className='w-full h-full mb-4 rounded-xl outline-stone-500/50 outline shadow-lg'
      />
    </form>
  )
}

export default SingleCat;