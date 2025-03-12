import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CatBreed, CatImage, SelectedBreed } from '../../types/cat-types';
import { request } from '../../utilities/apiClient';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';

export const useGetCatBreeds = (): UseQueryResult<CatBreed[], Error> => {
  return useQuery({
    queryKey: [ 'breeds' ],
    queryFn: () => {
      return request.get<CatBreed[]>('breeds');
    }
  });
};

export const useGetSingleBreed = (id: CatBreed['id'], enabled: boolean): UseQueryResult<CatBreed, Error> => {
  return useQuery({
    queryKey: [ 'breeds', id ],
    queryFn: () => {
      return request.get<CatBreed>(`breeds/${ id }`);
    },
    enabled,
  });
};

export const useGetBreedImages = (id: CatBreed['id']): UseQueryResult<CatImage[], Error> => {
  return useQuery({
    queryKey: [ 'images', 'breed', id ],
    queryFn: () => {
      return request.get<CatImage[]>(`images/search?limit=5&include_categories=0&include_breeds=0&breed_ids=${ id }`);
    }
  });
};

export const useSetBreedInfoFromUrl = (selectImage: (cat: SelectedBreed) => void): void => {
  const [ currentQueryParameters ] = useSearchParams();
  useEffect(() => {
    const id = currentQueryParameters.get('id');
    const name = currentQueryParameters.get('name');
    const url = currentQueryParameters.get('url');
    const imageId = currentQueryParameters.get('image_id');
    if (id && name) { // Should always be present
      selectImage({
        id,
        ...(url && imageId && { image: {
          url: decodeURIComponent(url),
          id: imageId
        } } ),
        name,
        hasAllInfo: false
      });
    }

    // no need to run every time the query params change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);
};

export const useSetBreedInfoToUrl = (breed: SelectedBreed): void => {
  const [ searchParams, setSearchParams ] = useSearchParams();

  useEffect(() => {
    // Search params already set.
    if (searchParams.get('id') !== null && searchParams.get('name') !== null) {
      return;
    }

    // Set necessary breed info to url when selecting a breed.
    const newQueryParameters = new URLSearchParams();
    newQueryParameters.set('id', breed.id);
    newQueryParameters.set('name', breed.name);
    if (breed.image?.url && breed.image?.id) {
      newQueryParameters.set('url', breed.image?.url);
      newQueryParameters.set('image_id', breed.image?.id);
    }
    setSearchParams(newQueryParameters);

    // No need to run again if search params change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ breed ]);
};