import React, { useCallback, useState } from 'react';
import type { CatBreed, SelectedBreed } from '../../types/cat-types';
import SingleBreed from './SingleBreed';
import CatBreedModal from './CatBreedModal';
import Spinner from '../../components/Spinner';
import { useGetCatBreeds, useSetBreedInfoFromUrl } from './hooks';
import { useSearchParams } from 'react-router';
import { Masonry, RenderComponentProps } from 'masonic';

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

  const SingleBreedRenderer = useCallback((props: RenderComponentProps<CatBreed>) => {
    return (
      <SingleBreed
        { ...props.data }
        selectBreed={ selectBreed }
      />
    );
  }, [ selectBreed ]);

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
        breedsLoading || !breeds ? (
          <Spinner className='size-[40px] text-white fixed left-[50%] top-[50%] -translate-1/2'/>
        ) : (
          <Masonry
            items={ breeds }
            columnGutter={ 16 }
            columnWidth={ 400 }
            maxColumnCount={ 3 }
            itemKey={ (item) => {return item.id;} }
            render={ SingleBreedRenderer }
          />
        )
      }
    </>
  );
};

export default CatImages;