import React, { useCallback, useMemo, useState } from 'react';
import SingleCat from '../CatImages/SingleCat';
import { useGetFavouriteCats } from './hooks';
import { SelectedImage } from '../../types/cat-types';
import CatImageModal from '../CatImages/CatImageModal';
import Spinner from '../../components/Spinner';
import { useSetImageInfoFromUrl } from '../../utilities/hooks';
import { useSearchParams } from 'react-router';

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

  // Inside useMemo to avoid children rerender when the selected image changes
  const SingleCats = useMemo(() => {
    if (!favouriteCats) {
      return null;
    }

    return (
      <>
        {
          Object.values(favouriteCats).map((cat) => {
            return (
              <SingleCat
                key={ cat.id }
                { ...cat.image }
                favouriteId={ cat.id }
                selectImage={ selectImage }
                className='mb-4'
                favouriteCatsLoading={ false } // we already know the cats are loaded
              />
            );
          })
        }
      </>
    );
  }, [ favouriteCats, selectImage ]);

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
        favouriteCatsLoading ? (
          <Spinner className='size-[40px] text-white fixed left-[50%] top-[50%] -translate-1/2'/>
        ) : (
          <div className='columns-1 sm:columns-2 md:columns-3 gap-4 row-gap-4'>
            { SingleCats }
          </div>
        )
      }

    </>

  );
};

export default FavoriteCats;