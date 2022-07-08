import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import './styles.css';
import { Autoplay } from 'swiper';

interface BannerProps {
  itemSlide: {
    id: number;
    url_image: string;
    alt_image: string;
  }[];
}

export function Banner({ itemSlide }: BannerProps) {
  return (
    <div className="slideContainer">
      <Swiper
        className="mySwiper"
        centeredSlides
        loop
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {itemSlide.map(value => (
          <SwiperSlide key={value.id} className="swiperSlide">
            <div className="slideImg">
              <img src={value.url_image} alt={value.alt_image} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
