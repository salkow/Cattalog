import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { Link } from 'react-router';

export interface ICarouzelProps {
  images: {
    alt: string
    url: string
    redirectUrl: string
  }[]
}

const Carouzel: React.FC<ICarouzelProps> = function ({ images }) {
  return (
    <Swiper
      navigation
      modules={ [ Navigation ] }
      className='h-full w-full'
    >
      {
        images.map((img) => {
          const image = (
            <img
              className='max-w-full ml-auto mr-auto rounded-xl max-h-[400px]'
              src={ img.url }
              alt={ img.alt }
            />
          );

          return (
            <SwiperSlide
              key={ img.url }
              className='h-full w-full !flex items-center justify-center p-4 my-auto mx-auto'>
              {
                img.redirectUrl ? (
                  <Link
                    className='inline-block h-full w-fit'
                    to={ img.redirectUrl }>
                    <> {image} </>
                  </Link>
                ) : (
                  <> {image} </>
                )
              }
            </SwiperSlide>
          );
        })
      }
    </Swiper>
  );
};

export default Carouzel;