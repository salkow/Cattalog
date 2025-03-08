interface ISingleCatProps {
    src: string
}

const SingleCat: React.FC<ISingleCatProps> = function ({ src }) {
  return (
    <img
      src={ src }
      className='w-full h-full mb-4 rounded-xl'
    />
  )
}

export default SingleCat;