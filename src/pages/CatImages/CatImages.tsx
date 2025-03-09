import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useMemo, useState } from 'react';
import { request } from '../../utilities/apiClient';
import SingleCat from './SingleCat';
import { CatImage, SelectedImage } from '../../types/cat-types';
import { useGetFavouriteCats } from '../FavouriteCats/hooks';
import Modal from '../../components/Modal';
import LoadingButton from '../../components/LoadingButton';

const CatImages: React.FC = function () {
  const { data: cats, isLoading: catsLoading } = useQuery({
    queryKey: [ 'cats' ],
    queryFn: () => {
      return request.get<CatImage[]>('images/search?limit=10');
    }
  });

  const queryClient = useQueryClient();

  const [ moreImagesLoading, setMoreImagesLoading ] = useState(false);
  const loadMoreImages = (): void => {
    setMoreImagesLoading(true);
    request.get<CatImage[]>('images/search?limit=10').then((dd) => {
      return queryClient.setQueryData([ 'cats' ], (old: CatImage[] | undefined) => {
        return [ ...(old ?? []), ...dd ];
      });
    })
      .finally(() => {
        setMoreImagesLoading(false);
      })
      .catch((err) => {
        console.error(err);
      })
    ;
  };

  const { data: favouriteCats } = useGetFavouriteCats();

  const [ selectedImage, setSelectedImage ] = useState<SelectedImage | undefined>();

  const selectImage = useCallback((cat: SelectedImage): void => {
    setSelectedImage(cat);
  }, []);

  const deselectImage = useCallback((): void => {
    setSelectedImage(undefined);
  }, []);

  // Inside useMemo to avoid children rerender when the selected image changes
  const SingleCats = useMemo(() => {
    return (
      <>
        {
          cats?.map((cat) => {
            return (
              <SingleCat
                key={ cat.id }
                id={ cat.id }
                url={ cat.url }
                favouriteId={ favouriteCats?.[cat.id]?.id }
                selectImage={ selectImage }
                className='mb-4'
              />
            );
          })
        }
      </>
    );
  }, [ cats, favouriteCats, selectImage ]);

  if (catsLoading || !cats) {
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

      <div className='columns-1 sm:columns-2 md:columns-3 gap-4 row-gap-4 pb-8'>
        { SingleCats }
      </div>

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