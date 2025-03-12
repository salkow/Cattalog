import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { SelectedImage } from '../types/cat-types';

export const useSetImageInfoFromUrl = (selectImage: (cat: SelectedImage) => void): void => {
  const [ currentQueryParameters ] = useSearchParams();
  useEffect(() => {
    const url = currentQueryParameters.get('url');
    const id = currentQueryParameters.get('id');
    if (url && id) { // Should always be present
      selectImage({
        id,
        url: decodeURIComponent(url),
        hasAllInfo: false
      });
    }

    // no need to run every time the query params change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);
};