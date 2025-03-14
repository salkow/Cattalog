import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import type { CatBreed, CatImage } from '../../types/cat-types';
import { request } from '../../utilities/apiClient';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';

const getCatImage = (): Promise<CatImage[]> => {
  // No need to include categories since we don't display them.
  return request.get<CatImage[]>('images/search?limit=10&include_categories=0');
};

export const useGetCatImages = (): UseQueryResult<CatImage[], Error> => {
  return useQuery({
    queryKey: [ 'cats' ],
    queryFn: () => {
      return getCatImage();
    }
  });
};

export const useGetMoreCatImages = (): () => Promise<CatImage[] | undefined> => {
  const queryClient = useQueryClient();

  return () => {
    return getCatImage().then((dd) => {
      return queryClient.setQueryData<CatImage[]>([ 'cats' ], (old: CatImage[] | undefined) => {
        return [ ...(old ?? []), ...dd ];
      });
    });
  };

};

export const useGetCatImageBreeds = (id: CatImage['id'], enabled: boolean): UseQueryResult<CatBreed[], Error> => {
  return useQuery({
    queryKey: [ 'cats', id, 'breeds' ],
    queryFn: () => {
      return request.get<CatBreed[]>(`images/${ id }/breeds`);
    },
    enabled
  });
};

export const useSetImageInfoToUrl = (id: CatImage['id'], url: CatImage['url']): void => {
  const [ _, setSearchParams ] = useSearchParams();

  useEffect(() => {
    // Set necessary image info to url when selecting an image.
    const newQueryParameters = new URLSearchParams();
    newQueryParameters.set('url', encodeURIComponent(url));
    newQueryParameters.set('id', id);
    setSearchParams(newQueryParameters);
  }, [ id, setSearchParams, url ]);
};
