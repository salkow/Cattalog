import React, { useCallback, useMemo, useState } from 'react';
import SingleCat from '../CatImages/SingleCat';
import { useGetFavouriteCats } from './hooks';
import { SelectedImage } from '../../types/cat-types';
import Modal from '../../components/Modal';

const FavoriteCats: React.FC = function () {

  const { data: favouriteCats, isLoading: favouriteCatsLoading } = useGetFavouriteCats();

  const [ selectedImage, setSelectedImage ] = useState<SelectedImage | undefined>();

  const selectImage = useCallback((cat: SelectedImage): void => {
    setSelectedImage(cat);
  }, []);

  const deselectImage = useCallback((): void => {
    setSelectedImage(undefined);
  }, []);

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
          <Modal
            open={ selectedImage !== undefined }
            handleClose={ deselectImage }
          >
            <SingleCat
              id={ selectedImage.id }
              url={ selectedImage.url }
              favouriteId={ favouriteCats?.[selectedImage.id]?.id }
            />
          </Modal>
        )
      }

      <div className='columns-1 sm:columns-2 md:columns-3 gap-4 row-gap-4'>
        { SingleCats }
      </div>
    </>

  );
};

export default FavoriteCats;