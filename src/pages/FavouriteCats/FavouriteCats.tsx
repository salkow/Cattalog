import React, { useCallback, useMemo, useState } from 'react';
import SingleCat from '../CatImages/SingleCat';
import { useGetFavouriteCats } from './hooks';
import { FavouriteCat, SelectedImage } from '../../types/cat-types';
import CatImageModal from '../CatImages/CatImageModal';
import Spinner from '../../components/Spinner';
import { useSetImageInfoFromUrl } from '../../utilities/hooks';
import { useSearchParams } from 'react-router';
import { RenderComponentProps, usePositioner, useResizeObserver, useContainerPosition, MasonryScroller } from 'masonic';
import { useWindowSize } from '@react-hook/window-size';

const FavoriteCats: React.FC = function () {
  const { data: favouriteCats, isLoading: favouriteCatsLoading } = useGetFavouriteCats();

  const [ _, setSearchParams ] = useSearchParams();

  const [ selectedImage, setSelectedImage ] = useState<SelectedImage | undefined>();

  const selectImage = useCallback((cat: SelectedImage): void => {
    setSelectedImage(cat);
  }, []);

  const deselectImage = useCallback((): void => {
    setSearchParams({});
    setSelectedImage(undefined);
  }, [ setSearchParams ]);

  useSetImageInfoFromUrl(selectImage);

  const favouriteCatsArr = useMemo(() => {
    return Object.values(favouriteCats ?? []);
  }, [ favouriteCats ]);

  const containerRef = React.useRef(null);
  const [ windowWidth, windowHeight ] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight,
  ]);

  const positioner = usePositioner(
    { width, columnWidth: 400, columnGutter: 16, maxColumnCount: 3 },
    [ favouriteCatsArr ]
  );

  const resizeObserver = useResizeObserver(positioner);

  const SingleCatRenderer = useCallback((props: RenderComponentProps<FavouriteCat>) => {
    return (
      <SingleCat
        { ...props.data.image }
        favouriteId={ props.data.id }
        selectImage={ selectImage }
        favouriteCatsLoading={ false } // we already know the cats are loaded
      />
    );
  }, [ selectImage ]);

  return (
    <>
      {
        selectedImage && (
          <CatImageModal
            open={ selectedImage !== undefined }
            handleClose={ deselectImage }
            image={ selectedImage }
            favouriteId={ favouriteCats?.[selectedImage.id]?.id }
            favouriteCatsLoading={ favouriteCatsLoading }
          />
        )
      }

      {
        favouriteCatsLoading && (
          <Spinner className='size-[40px] text-white fixed left-[50%] top-[50%] -translate-1/2'/>
        )
      }

      <MasonryScroller
        className={ favouriteCatsLoading ? 'invisible' : '' }
        items={ favouriteCatsArr }
        resizeObserver={ resizeObserver }
        offset={ offset }
        itemKey={ (item: FavouriteCat) => { return item.id; } }
        containerRef={ containerRef }
        render={ SingleCatRenderer }
        positioner={ positioner }
        height={ windowHeight }
      />
    </>
  );
};

export default FavoriteCats;