import React from 'react';
import SingleCat from './SingleCat';
import Modal from '../../components/Modal';
import type { SelectedImage } from '../../types/cat-types';
import { useGetCatImageBreeds, useSetImageInfoToUrl } from './hooks';

interface ICatImageModalProps {
  open: boolean
  handleClose: () => void
  image: SelectedImage
  favouriteId: number | undefined
  favouriteCatsLoading: boolean
}

const CatImageModal: React.FC<ICatImageModalProps> = function ({ open, handleClose, image,
  favouriteId, favouriteCatsLoading }) {

  useSetImageInfoToUrl(image.id, image.url);

  // If from link to cat image detail
  // No need to wait to finish loading, just hide the breeds.
  const { data: breeds } = useGetCatImageBreeds(image.id, !image.hasAllInfo);

  const imageWithInfo = image.hasAllInfo ? image : { ...image, breeds: breeds ?? [] };

  return (
    <Modal
      open={ open }
      handleClose={ handleClose }
    >
      <SingleCat
        { ...imageWithInfo }
        favouriteId={ favouriteId }
        favouriteCatsLoading={ favouriteCatsLoading }
      />
    </Modal>
  );
};

export default CatImageModal;

