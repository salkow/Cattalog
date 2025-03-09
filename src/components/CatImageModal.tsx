import React, { useEffect } from 'react';
import SingleCat from '../pages/CatImages/SingleCat';
import Modal from './Modal';
import { useSearchParams } from 'react-router';

interface ICatImageModalProps {
  open: boolean
  handleClose: () => void
  id: string
  url: string
  favouriteId: number | undefined
}

const CatImageModal: React.FC<ICatImageModalProps> = function ({ open, handleClose, id, url, favouriteId }) {
  const [ _, setSearchParams ] = useSearchParams();

  useEffect(() => {
    const newQueryParameters : URLSearchParams = new URLSearchParams();
    newQueryParameters.set('url', encodeURIComponent(url));
    newQueryParameters.set('id', id);
    setSearchParams(newQueryParameters);

    return () => {
      setSearchParams({});
    };
  }, [ id, setSearchParams, url ]);

  return (
    <Modal
      open={ open }
      handleClose={ handleClose }
    >
      <SingleCat
        id={ id }
        url={ url }
        favouriteId={ favouriteId }
      />
    </Modal>
  );
};

export default CatImageModal;