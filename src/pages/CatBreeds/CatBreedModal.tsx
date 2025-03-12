import React, { useMemo } from 'react';
import Modal from '../../components/Modal';
import type { CatBreedImage, SelectedBreed } from '../../types/cat-types';
import Rating from '../../components/Rating';
import Carouzel, { ICarouzelProps } from '../../components/Carouzel';
import { useGetBreedImages, useGetSingleBreed, useSetBreedInfoToUrl } from './hooks';
import Spinner from '../../components/Spinner';
import { removeDuplicates } from '../../utilities/utils';

interface ICatBreedModalProps {
  open: boolean
  handleClose: () => void
  breed: SelectedBreed
}

const CatBreedModal: React.FC<ICatBreedModalProps> = function ({ open, handleClose, breed }) {
  useSetBreedInfoToUrl(breed);

  // If from link to cat breed detail.
  const { data: alternativeBreedInfo, isLoading: breedInfoLoading } = useGetSingleBreed(breed.id, !breed.hasAllInfo);

  // Fetch more breed images to show.
  // No need to wait to finish loading, just hide the missing info.
  const { data: breedImages } = useGetBreedImages(breed.id);

  const breedWithInfo = breed.hasAllInfo ? breed : { ...breed, ...alternativeBreedInfo };

  const carouzelImages = useMemo(() => {
    const getImageInfo = (image: {id: CatBreedImage['id'], url: CatBreedImage['url']}): ICarouzelProps['images'][0] => {
      return {
        url: image.url,
        alt: image.id,
        redirectUrl: `/?id=${ image.id }&url=${ image.url }`
      };
    };

    const images = [ ];

    // If the default breed image exists use it to prevent empty modal.
    if (breedWithInfo.image?.url && breedWithInfo.image?.id) {
      images.push(getImageInfo({ id: breedWithInfo.image.id, url: breedWithInfo.image.url }));
    }
    if (breedImages) {
      images.push(...breedImages.map(getImageInfo));
    }

    return removeDuplicates(images, 'url');
  }, [ breedImages, breedWithInfo.image ]);

  return (
    <Modal
      open={ open }
      handleClose={ handleClose }>
      <div className='p-4 w-3xl max-w-full bg-layout dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl'>
        <Carouzel
          images={ carouzelImages }
        />

        <h5 className='my-4 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {breedWithInfo.name}
        </h5>

        {
          // Sind the query is disabled if we have all the info, we can use that variable to show a loading spinner.
          !breedInfoLoading ? (
            <>
              <p>
                {breedWithInfo.description}
              </p>

              <div className='columns-1 md:columns-2 mt-4 p-4 text-center md:text-left'>
                <div className='mb-4'>
                  <div>
                    Origin: {breedWithInfo.origin}
                  </div>

                  <div>
                    Weight: {breedWithInfo.weight?.metric} kg
                  </div>

                  <div>
                    Life Span: {breedWithInfo.life_span} years
                  </div>
                </div>

                <div className='flex flex-col items-center md:items-end max-w-[250px] md:max-w-full mx-auto md:mx-0'>
                  <div className='w-full md:w-auto'>
                    <Rating
                      label={ 'Affection Level:' }
                      rating={ breedWithInfo.affection_level ?? 0 }/>
                  </div>

                  <div className='w-full md:w-auto'>
                    <Rating
                      label={ 'Intelligence:' }
                      rating={ breedWithInfo.intelligence ?? 0 }/>
                  </div>

                  <div className='w-full md:w-auto'>
                    <Rating
                      label={ 'Vocalisation:' }
                      rating={ breedWithInfo.vocalisation ?? 0 }/>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className='flex justify-center items-center h-full min-h-[200px]'>
              <Spinner className='size-[40px]'/>
            </div>
          )
        }
      </div>
    </Modal>
  );
};

export default CatBreedModal;