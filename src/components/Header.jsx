import React, { useState } from 'react';
import { LINKS_HEADER } from '../utils/Links'
import Anchor from './Anchor'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authActions from '../redux/actions/auth.actions.js';




const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [confirmLogout, setConfirmLogout] = useState(false);
    const { logout } = authActions


    //OTRA MANERA
    // const handleLogout = () => {
    //     localStorage.removeItem('token')
    //     dispatch(logout())
    //     navigate('/')
    // }

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    const handleConfirm = () => {
        setConfirmLogout(true);
    }

    const handleCancel = () => {
        setConfirmLogout(false);
    }





    return (
        <header className="flex flex-col justify-between items-center gap-10 w-full py-6 px-20 bg-gray-300 min-[950px]:flex-row">
            <div className='flex flex-wrap gap-10 justify-center items-center'>
                <img className='w-[200px] h-10' src="/MindHub.png" alt="Logo Mind Hub Bank" />
                <nav className="flex flex-col gap-4 justify-center items-center min-[600px]:flex-row">
                    {LINKS_HEADER.map((link) =>{
                            return (
                                <Anchor key={link.href} href={link.href} title={link.title}></Anchor> 
                            )
                        })
                    }
                </nav>
            </div>
            
            <div>
                <img className='w-8 h-8 cursor-pointer' src="/LogOut.png" alt="Icon log out" onClick={handleConfirm}/>
            </div>

            {confirmLogout && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className='font-semibold'>Do you really want to go out?</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md w-[90px]" onClick={handleLogout}>Sign off</button>
                            <button className="bg-gray-400 font-semibold px-4 py-2 rounded-md w-[90px]" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            

            
        </header>
    )
}

export default Header

