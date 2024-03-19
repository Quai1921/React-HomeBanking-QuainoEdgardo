import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import CarrouselHome from '../components/CarrouselHome'
import Footer from '../components/Footer'

function Home() {
    return (
    <div>
        <header className="flex flex-col flex-wrap justify-between items-center w-full py-6 px-2  bg-white gap-4 md:flex-row md:px-20">
            <div className='flex flex-col gap-3 lg:flex-row lg:gap-14'>
                <img className='w-26 h-10' src="/MindHub.png" alt="Logo Mind Hub Bank" />
                <nav className="flex flex-wrap gap-4 justify-center items-center">
                    <NavLink to={"/"} style={{ textDecoration: 'none' }} className="text-center font-bold text-red-600">
                    <span style={{ borderBottom: '2px solid', paddingBottom: '2px' }}>
                    Home</span></NavLink>
                    
                    <NavLink className={({ isActive }) => isActive 
                    ? " text-center font-bold text-red-600" 
                    : " text-center font-bold text-red-600"}>About Us</NavLink>
                    
                    <NavLink className={({ isActive }) => isActive 
                    ? " text-center font-bold text-red-600" 
                    : " text-center font-bold text-red-600"}>Contact</NavLink>
            </nav>
            </div>
            
            <div className="flex gap-4 justify-center items-center">
                <NavLink to={"/register"} className="flex items-center justify-center bg-white border-2 border-red-600 rounded-3xl h-10 w-32 text-center font-bold text-red-600  hover:bg-red-700  hover:text-white hover:border-0">Sing up</NavLink>
                <NavLink to={"/login"} className="flex items-center justify-center bg-red-600 rounded-3xl h-10 w-32 text-center font-bold text-white  hover:bg-red-700  hover:text-white hover:border-0">Sing in</NavLink>
            </div>
        </header>
        <main className='flex flex-col flex-1 w-full'>
                <img className='w-full' src="/CoverHome.png" alt="Image persons smiling - Cover Home" />
                <h1 className='font-bold text-center text-4xl pt-6'>MindHub Bank Services:</h1>
                <div className='min-[1500px]:px-[250px]'>
                    <CarrouselHome/>
                </div>
                
                <div className='flex flex-col gap-6 justify-center items-center pt-10 px-3 w-full pb-10 lg:flex-row min-[1500px]:px-[250px]'>
                    <img className='w-[500px]' src="/Home-About.png" alt="" />
                    <p className='font-semibold italic px-2 md:px-10 text-justify border-x-2 border-red-900'>At MindHub Bank, we stand at the intersection of innovation and financial empowerment. Founded on the principles of trust, transparency, and technological advancement, MindHub Bank is more than just a financial institution. We are your dedicated partner in achieving your financial aspirations.
                    Our journey began with a commitment to redefine traditional banking, integrating cutting-edge technology to simplify and enhance your financial experience. MindHub Bank is not just a place to store your money; it's a dynamic platform where financial solutions meet the demands of the modern world.
                    We take pride in fostering a culture that prioritizes customer-centricity, ethical practices, and continuous innovation. Our team is driven by a passion for delivering personalized financial services that adapt to your evolving needs. From seamless online transactions to personalized wealth management, MindHub Bank is here to support you at every step of your financial journey.
                    As a responsible financial entity, we are deeply rooted in the communities we serve. MindHub Bank actively contributes to the well-being of society through various initiatives and partnerships that aim to make a positive impact.
                    Join us on this journey towards financial excellence. At MindHub Bank, we go beyond banking. We empower your financial future.</p>
                </div>
        </main>
        <footer>
            <Footer/>
        </footer>
        
    </div>
    )
}

export default Home