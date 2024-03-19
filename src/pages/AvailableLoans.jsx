import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink} from 'react-router-dom'
import Footer from '../components/Footer'
import TypeLoan from '../components/TypeLoan'

function AvailableLoans() {

    const [activeLoans, setactiveLoans] = useState([])
    useEffect(() => {

        axios("/api/loans/")
            .then(response => {
                setactiveLoans(response.data)
            })
            .catch(error => console.log(error))

    }, [])

    // console.log(activeLoans)



    return (
    <div className='flex flex-col flex-1'>
        <header className="flex flex-col flex-wrap justify-between items-center w-full py-6 px-2  bg-white gap-4 md:flex-row md:px-20">
            <div className='flex flex-col gap-3 lg:flex-row lg:gap-14'>
                <img className='w-26 h-10' src="/MindHub.png" alt="Logo Mind Hub Bank" />
                <nav className="flex flex-wrap gap-4 justify-center items-center">
                    <NavLink to={"/"} className="text-center font-bold text-red-600">
                    <span>Home</span></NavLink>
                    
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
                <img className='w-full object-cover' src="/CoverHome.png" alt="Image persons smiling - Cover Home" />
                <h1 className='font-bold text-center text-4xl pt-6 px-2 pb-4'>Unlocking Your Financial Goals!</h1>
                <div className='px-3 md:flex md:flex-col md:justify-center md:items-center xl:px-80'>
                    <h3 className='font-bold px-3 bg-red-700 text-white rounded-md py-2 text-center italic'>Securing Your Home with Mortgage Loans</h3>
                    <p className='px-3 pt-4 pb-14'>Are you dreaming of owning your own home? Our mortgage loans offer a pathway to turn that dream into a reality. Whether you're a first-time buyer or looking to 
                        upgrade, our flexible and competitive mortgage options are designed to suit your unique needs.</p>
                    <h3 className='font-bold px-3  bg-red-700 text-white rounded-md py-2 text-center italic'>Empowering Your Personal Aspirations with Personal Loans</h3>
                    <p className='px-3 pt-4 pb-14'>Life is full of opportunities, and sometimes, you need an extra financial push to seize them. Our personal loans provide the financial flexibility you need to fund 
                        your passions, be it education, travel, or unexpected expenses. We understand that your goals are personal, and our loans are tailored to match your individual journey.</p>
                    <h3 className='font-bold px-3  bg-red-700 text-white rounded-md py-2 text-center italic'>Accelerating Your Drive with Auto Loans</h3>
                    <p className='px-3 py-4'>Hit the road with confidence by exploring our auto loan options. Whether you're eyeing your dream car or simply need a reliable vehicle, our financing solutions offer 
                        competitive rates and convenient terms. Get behind the wheel faster and embark on your next adventure with the support of our auto loans.</p>
                    <p className='px-3 py-4'>Embark on a journey towards financial empowerment with our diverse range of bank loans. From securing your dream home to pursuing personal aspirations and hitting the 
                        road with your new vehicle, we're here to make your dreams a reality. Discover the possibilities with our tailored mortgage, personal, and auto loan options.</p>
                    </div>
                <div className='flex flex-wrap gap-6 justify-center pt-6 lg:gap-20'>
                    {activeLoans.map((loan) =>{
                                return (
                                    <TypeLoan key={loan.id} typeLoan={loan.name} maxAmount={loan.maxAmount} payments={loan.payments}> </TypeLoan> 
                                )
                            })
                        }
                </div>
                

                
                
        </main>
        <footer>
            <Footer/>
        </footer>
    </div>
    )
}

export default AvailableLoans