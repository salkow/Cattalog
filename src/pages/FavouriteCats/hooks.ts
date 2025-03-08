import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { FavouriteCat } from '../../types/cat-types';
import { request } from '../../utilities/apiClient';

export type FavouriteCatsQueryData = Record<FavouriteCat['image_id'], FavouriteCat>

export type RemoveFromFavouritesMutation =
    UseMutationResult<unknown, Error,
        { favouriteId: number, imageId: string }, { previousFavouriteCats: FavouriteCatsQueryData | undefined; }>

export type AddToFavouritesMutation =
    UseMutationResult<FavouriteCat, Error, {
        imageId: string;
        url: string;
    }, { previousFavouriteCats: FavouriteCatsQueryData | undefined; }>

export const useRemoveFromFavourites = (): RemoveFromFavouritesMutation => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ favouriteId }) => {
      return request.delete(`favourites/${ favouriteId }`)
    },
    onMutate: async ({ imageId }) => {
      // Cancel any ongoing queries
      await queryClient.cancelQueries({ queryKey: [ 'favourite-cats' ] });

      const previousFavouriteCats = queryClient.getQueryData<FavouriteCatsQueryData>([ 'favourite-cats' ]);
      if (previousFavouriteCats) {
        const { [ imageId ]: _, ...restOfTheFavourites } = previousFavouriteCats;
        // Optimistic update
        queryClient.setQueryData<FavouriteCatsQueryData>([ 'favourite-cats' ], restOfTheFavourites);
      }

      return { previousFavouriteCats };
    },
    onError: (err, _newTodo, context) => {
      console.error('error', err)
      if (context) {
        // Rollback to the previous value
        queryClient.setQueryData<FavouriteCatsQueryData>([ 'favourite-cats' ], context.previousFavouriteCats);
      }
    },
  });
};

export const useAddToFavourites = (): AddToFavouritesMutation => {
  const queryClient = useQueryClient();

  const createFavourite = (id: number, imageId: string, url: string): FavouriteCat => {
    return {
      id,
      user_id: import.meta.env.USERNAME,
      image_id: imageId,
      sub_id: '',
      created_at: '',
      image: {
        id: imageId,
        url
      }
    }
  }

  return useMutation<FavouriteCat, Error, { imageId: string, url: string }, { previousFavouriteCats: FavouriteCatsQueryData | undefined }>({
    mutationFn: ({ imageId }) => {
      return request.post('favourites', { image_id: imageId, sub_id: import.meta.env.VITE_USERNAME })
    },
    onMutate: async ({ imageId, url }) => {
      // Cancel any ongoing queries
      await queryClient.cancelQueries({ queryKey: [ 'favourite-cats' ] });

      const previousFavouriteCats = queryClient.getQueryData<FavouriteCatsQueryData>([ 'favourite-cats' ]);
      if (previousFavouriteCats) {
        // Optimistic update
        queryClient.setQueryData<FavouriteCatsQueryData>([ 'favourite-cats' ], {
          ...previousFavouriteCats,
          [imageId]: createFavourite(Math.random(), imageId, url)
        });
      }

      return { previousFavouriteCats };
    },
    onError: (err, _newTodo, context) => {
      console.error('error', err)
      if (context) {
        // Rollback to the previous value
        queryClient.setQueryData<FavouriteCatsQueryData>([ 'favourite-cats' ], context.previousFavouriteCats);
      }
    },
    onSuccess: (data, variables, context) => {
      if (context.previousFavouriteCats) {
        // Update favourite with real id
        queryClient.setQueryData<FavouriteCatsQueryData>([ 'favourite-cats' ], {
          ...context.previousFavouriteCats,
          [variables.imageId]: createFavourite(data.id, variables.imageId, variables.url)
        });
      }
    },
  });
};

export const useGetFavouriteCats = (): UseQueryResult<FavouriteCatsQueryData, Error> => {
  return useQuery({
    queryKey: [ 'favourite-cats' ],
    queryFn: () => {
      return request.get<FavouriteCat[]>(`favourites?sub_id=${ import.meta.env.VITE_USERNAME }`)
        .then((response) => {
          return response.reduce((a, v) => {
            return { ...a, [v.image_id]: v }
          }, {}) as FavouriteCatsQueryData;
        })
    }
  })
}
