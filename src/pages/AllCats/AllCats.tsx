import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { request } from '../../utilities/apiClient'
import SingleCat from './SingleCat'

const AllCats: React.FC = function () {
  const { data: cats, isLoading: catsLoading } = useQuery({
    queryKey: [ 'cats' ],
    queryFn: () => {
      return request.get('images/search?limit=10');
    }
  })

  if (catsLoading || !cats) {
    return null;
  }

  return (
    <div className='columns-1 sm:columns-2 md:columns-3 gap-4 row-gap-4'>
      {
        cats.map((cat) => {
          return <SingleCat key={ cat.id } src={ cat.url }/>
        })
      }
    </div>
  )
}

export default AllCats