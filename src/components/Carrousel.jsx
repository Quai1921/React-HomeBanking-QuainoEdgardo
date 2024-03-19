import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'


export default function Carrousel() {

    return (
    <>
    <Swiper
        autoplay={{
        delay: 4000, 
        disableOnInteraction: false, 
        }}

        pagination={{
            dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        className="w-full max-h-full object-cover"
    >
        <SwiperSlide><img src="/Image00.png" alt="Image family"/></SwiperSlide>
        <SwiperSlide><img src="/Image02.png" alt="image family" /></SwiperSlide>
        <SwiperSlide><img src="/Image03.png" alt="Image of woman smiling " /></SwiperSlide>
        <SwiperSlide><img src="/Image04.png" alt="Image of man smiling" /></SwiperSlide>
        <SwiperSlide><img src="/Image05.png" alt="Image of hat, airplane and glasses" /></SwiperSlide>
        <SwiperSlide><img src="/Image06.png" alt="Image of a boy looking at the sun" /></SwiperSlide>

    </Swiper>
    </>
    )
}
