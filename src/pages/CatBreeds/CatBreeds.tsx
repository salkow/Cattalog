import React, { useCallback, useState } from 'react';
import type { SelectedBreed } from '../../types/cat-types';
import SingleBreed from './SingleBreed';
import CatBreedModal from './CatBreedModal';
import Spinner from '../../components/Spinner';
import { useGetCatBreeds, useSetBreedInfoFromUrl } from './hooks';
import { useSearchParams } from 'react-router';

const CatImages: React.FC = function () {
  const { data: breeds, isLoading: breedsLoading } = useGetCatBreeds();

  const [ _, setSearchParams ] = useSearchParams();

  const [ selectedBreed, setSelectedBreed ] = useState<SelectedBreed | undefined>();

  const selectBreed = useCallback((cat: SelectedBreed): void => {
    setSelectedBreed(cat);
  }, []);

  const deselectBreed = useCallback((): void => {
    setSearchParams({});
    setSelectedBreed(undefined);
  }, [ setSearchParams ]);

  useSetBreedInfoFromUrl(selectBreed);

  return (
    <>
      {
        selectedBreed && (
          <CatBreedModal
            open={ selectBreed !== undefined }
            handleClose={ deselectBreed }
            breed={ selectedBreed }
          />
        )
      }

      {
        breedsLoading ? (
          <Spinner className='size-[40px] text-white fixed left-[50%] top-[50%] -translate-1/2'/>
        ) : (
          <div className='columns-1 sm:columns-2 lg:columns-3 gap-4 row-gap-4'>
            {
              breeds?.map((breed) => {
                return (
                  <SingleBreed
                    key={ breed.id }
                    { ...breed }
                    selectBreed={ selectBreed }
                  />
                );
              })
            }
          </div>
        )
      }
    </>
  );
};

export default CatImages;