import React from 'react';
import { CatBreed, SelectedBreed } from '../../types/cat-types';
import { request } from '../../utilities/apiClient';
import { useQuery } from '@tanstack/react-query';

const CatBreedDetails: React.FC<SelectedBreed> = function ({ hasAllInfo, id, ...props }) {
  const { data: breed, isLoading: breedLoading } = useQuery({
    queryKey: [ 'breed', id ],
    queryFn: () => { return request.get<CatBreed>(`breeds/${ id }`); },
  });

  const breedInfo = hasAllInfo ? props : breed;
  if (!breedInfo || breedLoading) {
    return null;
  }

  return (
    <div>
        BreedDetails
    </div>
  );
};

export default CatBreedDetails;