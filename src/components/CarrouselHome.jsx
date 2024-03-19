import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { NavLink } from 'react-router-dom'



function CarrouselHome() {


    const [swiperConfig, setSwiperConfig] = useState({
            slidesPerView: 3,
            spaceBetween: 40,
    })

    const handleResize = () => {
        let newSwiperConfig = {slidesPerView: 3, spaceBetween: 40}
        switch (true) {
            case window.innerWidth <= 600:
                newSwiperConfig = { slidesPerView: 1, spaceBetween: 20 }
                break
            case window.innerWidth < 1024:
                newSwiperConfig = { slidesPerView: 2, spaceBetween: 20 }
                break
            default:
                newSwiperConfig = { slidesPerView: 3, spaceBetween: 20 }
                break
        }
        setSwiperConfig(newSwiperConfig)
    }

    useEffect(() => {
            handleResize()
            window.addEventListener('resize', handleResize)
            return () => {
                window.removeEventListener('resize', handleResize)
            }
    }, [])


    return (
    <div className='pt-10'>
        <Swiper
        {...swiperConfig}
        pagination={{clickable: true,}}
        modules={[Pagination]}
        className='w-full h-[450px] object-cover px-3'
        onSwiper={(swiper) => {
            swiper.pagination.el.style.display = 'none'
        }}
        >
            <SwiperSlide style={{ maxWidth: '500px'}}><div className='rounded-2xl h-full relative' >
                            <div className='bg-red-600 rounded-t-xl py-6'>
                                <h2 className='font-semibold text-xl text-center text-white'>Loan Options Tailored for You</h2>
                            </div>
                            <div className='bg-[url("/Bg-Card-01.png")] bg-cover rounded-b-xl h-[370px]'>
                                <p className='text-center font-semibold pt-2 md:pt-8 px-3 italic bg-white bg-opacity-65 h-[370px] rounded-b-xl'>Explore a range of personalized loan solutions designed to meet your unique financial needs. 
                                Whether you're dreaming of a new home, planning a major purchase, or need extra funds for unexpected expenses, our diverse loan offerings 
                                    provide flexible terms and competitive rates. Let us help you turn your financial goals into reality with our comprehensive 
                                    and customer-centric loan services.</p>
                                <div className='absolute bottom-0 left-0 right-0 flex justify-center py-6'>
                                    <NavLink to={'/avaiableLoans'} className='bg-red-600 rounded-md py-2 px-1 w-32 text-center font-bold text-white hover:bg-red-700'>View More!</NavLink>
                                </div>
                            </div>
                        </div></SwiperSlide>
            <SwiperSlide style={{ maxWidth: '500px'}}><div className='rounded-2xl h-full relative'>
                            <div className='bg-red-600 rounded-t-xl py-6'>
                                <h2 className='font-semibold text-xl text-center text-white'>Seamless Account Opening</h2>
                            </div>
                            <div className='bg-[url("/Bg-Card-02.png")] bg-cover rounded-b-xl h-[370px]'>
                                <p className='text-center font-semibold pt-2 md:pt-8 px-3 italic bg-white bg-opacity-65 h-[370px] rounded-b-xl'>Experience the simplicity of opening a bank account with us. Our streamlined process ensures that you 
                                can start enjoying the benefits of banking quickly and effortlessly. From hassle-free documentation to user-friendly interfaces, we've made it easy for 
                                you to join our community. Open an account today and embark on a journey of financial convenience.</p>
                                <div className=' absolute bottom-0 left-0 right-0 flex justify-center py-6'>
                                    <button className='bg-red-600 rounded-md py-2 px-1 w-32 text-center font-bold text-white hover:bg-red-700'>View More!</button>
                                </div>
                            </div>
                        </div></SwiperSlide>
            <SwiperSlide style={{ maxWidth: '500px'}}><div className='rounded-2xl h-full relative'>
                            <div className='bg-red-600 rounded-t-xl py-6'>
                                <h2 className='font-semibold text-xl text-center text-white'>Card Solutions</h2>
                            </div>
                            <div className=' bg-[url("/Bg-Card-03.png")] bg-cover rounded-b-xl h-[370px]'>
                                <p className='text-center font-semibold pt-2 md:pt-8 px-3 italic bg-white bg-opacity-65 h-[370px] rounded-b-xl'>At Mind Hub Bank, we redefine simplicity in financial services. Acquiring credit and debit cards has 
                                never been smoother. Our streamlined process ensures that you can effortlessly access a range of cards tailored to your needs. Experience hassle-free 
                                banking with our easy application and approval process. Your journey to financial convenience starts here.</p>
                                <div className=' absolute bottom-0 left-0 right-0 flex justify-center py-6'>
                                    <button className='bg-red-600 rounded-md py-2 px-1 w-32 text-center font-bold text-white hover:bg-red-700'>View More!</button>
                                </div>
                            </div>
                        </div></SwiperSlide>
            <SwiperSlide style={{ maxWidth: '500px'}}><div className='rounded-2xl h-full relative'>
                            <div className='bg-red-600 rounded-t-xl py-6'>
                                <h2 className='font-semibold text-xl text-center text-white'>Secure Digital Banking</h2>
                            </div>
                            <div className=' bg-[url("/Bg-Card-04.png")] bg-cover rounded-b-xl h-[370px]'>
                                <p className='text-center font-semibold pt-2 md:pt-8 px-3 italic bg-white bg-opacity-65 h-[370px] rounded-b-xl'>Experience the freedom of banking on your terms. Our online services provide a secure and 
                                straightforward way to conduct transactions, giving you control over your finances at your fingertips.</p>
                                <div className='absolute bottom-0 left-0 right-0 flex justify-center py-6'>
                                    <button className='bg-red-600 rounded-md py-2 px-1 w-32 text-center font-bold text-white hover:bg-red-700'>View More!</button>
                                </div>
                            </div>
                        </div></SwiperSlide>
            <SwiperSlide style={{ maxWidth: '500px'}}><div className='rounded-2xl h-full relative'>
                            <div className='bg-red-600 rounded-t-xl py-6'>
                                <h2 className='font-semibold text-xl text-center text-white'>Financial Management</h2>
                            </div>
                            <div className=' bg-[url("/Bg-Card-05.png")] bg-cover rounded-b-xl h-[370px]'>
                                <p className='text-center font-semibold pt-2 md:pt-8 px-3 italic bg-white bg-opacity-65 h-[370px] rounded-b-xl'>At Mind Hub Bank, we redefine convenience by offering effortless payment solutions and streamlined 
                                insurance enrollment. Manage your services with ease, from paying bills to securing insurance plans, all within the comfort of our banking platform. 
                                Experience simplicity in financial transactions, making life's essentials more accessible than ever.</p>
                                <div className=' absolute bottom-0 left-0 right-0 flex justify-center py-6'>
                                    <button className='bg-red-600 rounded-md py-2 px-1 w-32 text-center font-bold text-white hover:bg-red-700'>View More!</button>
                                </div>
                            </div>
                        </div></SwiperSlide>
        </Swiper>
    </div>
    )


}

export default CarrouselHome