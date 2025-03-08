import { CatImage } from '../../types/cat-types';

const SingleCat: React.FC<CatImage> = function ({ url }) {
  return (
    <img
      src={ url }
      className='w-full h-full mb-4 rounded-xl'
    />
  )
}

export default SingleCat;