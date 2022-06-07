import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import './styles.css'
import { Autoplay } from 'swiper';

interface BannerProps {
    itemSlide: {
        url_image: string;
        alt_image: string;
    }[]
}

export const Banner = ({ itemSlide }: BannerProps) => {
    return (
        <div className='slideContainer'>
            <Swiper
                className='mySwiper'
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false
                }}
                modules={[Autoplay]}
            >
                {itemSlide.map((value, index) => {
                    return (
                        <SwiperSlide key={index} className='swiperSlide'>
                            <div className="slideImg">
                                <img src={value.url_image} alt={value.alt_image} />
                            </div>
                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </div>
    );
}