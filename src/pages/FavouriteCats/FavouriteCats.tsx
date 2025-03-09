import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SingleCat from '../CatImages/SingleCat';
import { useGetFavouriteCats } from './hooks';
import { SelectedImage } from '../../types/cat-types';
import CatImageModal from '../../components/CatImageModal';
import { useSearchParams } from 'react-router';

const FavoriteCats: React.FC = function () {

  const { data: favouriteCats, isLoading: favouriteCatsLoading } = useGetFavouriteCats();

  const [ selectedImage, setSelectedImage ] = useState<SelectedImage | undefined>();

  const selectImage = useCallback((cat: SelectedImage): void => {
    setSelectedImage(cat);
  }, []);

  const deselectImage = useCallback((): void => {
    setSelectedImage(undefined);
  }, []);


  const [ currentQueryParameters ] = useSearchParams();
  useEffect(() => {
    const url = currentQueryParameters.get('url');
    const id = currentQueryParameters.get('id');
    if (url && id) {
      setSelectedImage({
        id,
        url: decodeURIComponent(url)
      });
    }

    // no need to run every time the query params change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

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
                id={ cat.image.id }
                url={ cat.image.url }
                favouriteId={ cat.id }
                selectImage={ selectImage }
                className='mb-4'
              />
            );
          })
        }
      </>
    );
  }, [ favouriteCats, selectImage ]);

  if (favouriteCatsLoading || !favouriteCats) {
    return null;
  }

  return (
    <>
      {
        selectedImage && (
          <CatImageModal
            open={ selectedImage !== undefined }
            handleClose={ deselectImage }
            id={ selectedImage.id }
            url={ selectedImage.url }
            favouriteId={ favouriteCats?.[selectedImage.id]?.id }
          />
        )
      }

      <div className='columns-1 sm:columns-2 md:columns-3 gap-4 row-gap-4'>
        { SingleCats }
      </div>
    </>

  );
};

export default FavoriteCats;