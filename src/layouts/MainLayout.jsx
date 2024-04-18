import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'





function MainLayout(props) {
    return (
        <div className="flex flex-col w-full min-h-dvh items-center">
            <Header/>
                {/* {props.children} */}
                <Outlet/>
            <Footer/>
        </div>
    )
}

export default MainLayout