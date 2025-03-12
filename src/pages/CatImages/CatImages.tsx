import React, { useCallback, useMemo, useState } from 'react';
import SingleCat from './SingleCat';
import type { CatImage, SelectedImage } from '../../types/cat-types';
import { useGetFavouriteCats } from '../FavouriteCats/hooks';
import LoadingButton from '../../components/LoadingButton';
import CatImageModal from './CatImageModal';
import Spinner from '../../components/Spinner';
import { useGetCatImages, useGetMoreCatImages } from './hooks';
import { useSetImageInfoFromUrl } from '../../utilities/hooks';
import { useSearchParams } from 'react-router';

const CatImages: React.FC = function () {
  const { data: cats, isLoading: catsLoading } = useGetCatImages();

  const [ _, setSearchParams ] = useSearchParams();

  const [ moreImagesLoading, setMoreImagesLoading ] = useState(false);
  const getMoreImage = useGetMoreCatImages();

  const loadMoreImages = (): Promise<CatImage[] | undefined> => {
    setMoreImagesLoading(true);
    return getMoreImage()
      .finally(() => { setMoreImagesLoading(false); });
  };

  // Fetch favourites cats here and  not in component to avoid rerender when favouriteCats changes.
  const { data: favouriteCats, isLoading: favouriteCatsLoading } = useGetFavouriteCats();

  const [ selectedImage, setSelectedImage ] = useState<SelectedImage | undefined>();

  const selectImage = useCallback((cat: SelectedImage): void => {
    setSelectedImage(cat);
  }, []);

  const deselectImage = useCallback((): void => {
    setSearchParams({});
    setSelectedImage(undefined);
  }, [ setSearchParams ]);

  useSetImageInfoFromUrl(selectImage);

  // Inside useMemo to avoid children rerender when the selected image changes
  const SingleCats = useMemo(() => {
    return (
      <>
        {
          cats?.map((cat) => {
            return (
              <SingleCat
                key={ cat.id }
                { ...cat }
                favouriteId={ favouriteCats?.[cat.id]?.id }
                selectImage={ selectImage }
                className='mb-4'
                favouriteCatsLoading={ favouriteCatsLoading }
              />
            );
          })
        }
      </>
    );
  }, [ cats, favouriteCats, favouriteCatsLoading, selectImage ]);

  return (
    <>
      {
        selectedImage && (
          <CatImageModal
            image={ selectedImage }
            open={ selectedImage !== undefined }
            handleClose={ deselectImage }
            favouriteId={ favouriteCats?.[selectedImage.id]?.id }
            favouriteCatsLoading={ favouriteCatsLoading }
          />
        )
      }

      {
        catsLoading ? (
          <Spinner className='size-[40px] text-white fixed left-[50%] top-[50%] -translate-1/2'/>
        ) : (
          <div className='columns-1 sm:columns-2 md:columns-3 gap-4 row-gap-4 pb-8'>
            { SingleCats }
          </div>
        )
      }

      <LoadingButton
        loading={ moreImagesLoading }
        onClick={ loadMoreImages }
        className='relative bottom-4 -translate-x-1/2 left-1/2'
        startIcon={ <img src='/plus.svg' alt='plus' /> }
      >
        Load more
      </LoadingButton>
    </>
  );
};

export default CatImages;