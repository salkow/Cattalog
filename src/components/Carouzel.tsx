import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { Link } from 'react-router';

interface ICarouzelProps {
  images: {
    alt: string
    url: string
    redirectUrl: string
  }[]
}

const Carouzel: React.FC<ICarouzelProps> = function ({ images }) {
  return (
    <div className='h-[400px] '>
      <Swiper
        navigation
        modules={ [ Navigation ] }
        className='h-full w-full'
      >
        {
          images.map((img) => {
            const image = (
              <img
                className='max-h-full max-w-full ml-auto mr-auto rounded-xl'
                src={ img.url }
                alt='cat'
              />
            );

            return (
              <SwiperSlide key={ img.url }>
                <div className='h-full w-full flex items-center justify-center p-4'>
                  {
                    img.redirectUrl ? (
                      <Link
                        className='inline-block h-full w-fit'
                        to={ img.redirectUrl } >
                        <> {image} </>
                      </Link>
                    ) : (
                      <> {image} </>
                    )
                  }
                </div>
              </SwiperSlide>
            );
          })
        }
      </Swiper>
    </div>
  );
};

export default Carouzel;