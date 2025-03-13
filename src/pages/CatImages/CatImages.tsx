import React, { useCallback, useState } from 'react';
import SingleCat from './SingleCat';
import { Masonry, RenderComponentProps } from 'masonic';
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

  const SingleCatRenderer = useCallback((props: RenderComponentProps<CatImage>) => {
    const cat = props.data;
    return (
      <SingleCat
        { ...cat }
        favouriteId={ favouriteCats?.[cat.id]?.id }
        selectImage={ selectImage }
        width={ props.width }
        originalHeight={ props.data.height }
        originalWidth={ props.data.width }
        favouriteCatsLoading={ favouriteCatsLoading }
      />
    );
  }, [ favouriteCats, favouriteCatsLoading, selectImage ]);


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
        catsLoading || !cats ? (
          <Spinner className='size-[40px] text-white fixed left-[50%] top-[50%] -translate-1/2'/>
        ) : (
          <>
            <Masonry
              items={ cats }
              columnGutter={ 16 }
              columnWidth={ 400 }
              maxColumnCount={ 3 }
              itemKey={ (item) => {return item.id;} }
              render={ SingleCatRenderer }
            />

            <LoadingButton
              loading={ moreImagesLoading }
              onClick={ loadMoreImages }
              className='relative bottom-4 -translate-x-1/2 left-1/2 z-4 mt-4'
              startIcon={ <img src='/plus.svg' alt='plus' /> }
            >
            Load more
            </LoadingButton>
          </>
        )
      }
    </>
  );
};

export default CatImages;