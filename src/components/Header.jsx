import React, { Fragment, useState, useEffect } from 'react'
import { LINKS_HEADER } from '../utils/Links'
import Anchor from './Anchor'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authActions from '../redux/actions/auth.actions.js'
import { NavLink } from 'react-router-dom'




const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [confirmLogout, setConfirmLogout] = useState(false)
    
    const { logout } = authActions

    const [isOpen, setIsOpen] = useState(false)


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
        setConfirmLogout(true)
    }

    const handleCancel = () => {
        setConfirmLogout(false)
    }



    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])


    return (
        <header className='w-full'>
            <nav className="bg-gray-300 py-4 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <img className='w-[200px] h-10' src="/MindHub.png" alt="Logo Mind Hub Bank" />
                    </div>
                <div className="hidden md:flex space-x-4">
                    {LINKS_HEADER.map((link) =>{
                            return (
                                <Anchor key={link.href} href={link.href} title={link.title}></Anchor> 
                            )
                        })
                    }
                </div>
                <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="black">
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                    <div className='max-[768px]:hidden'>
                        <img className='w-8 h-8 cursor-pointer' src="/LogOut.png" alt="Icon log out" onClick={handleConfirm}/>
                    </div>
                </div>
                {isOpen && (
                    <div className="absolute top-19 left-0 w-full bg-gray-300 md:hidden mt-2 z-50">
                        {LINKS_HEADER.map((link) =>{
                                return (
                                    <Fragment key={link.href}>
                                    <div className='flex items-center gap-2 pt-4 px-6'>
                                        <NavLink to={link.href}><img className='w-5 h-5 cursor-pointer' src={`${link.title}.png`} alt={`Icon ${link.title}`} onClick={toggleMenu}/></NavLink>
                                        <NavLink to={link.href} className="block text-black font-semibold" onClick={toggleMenu}>{link.title}</NavLink>
                                    </div>
                                    <hr/>
                                    </Fragment>
                                    
                                )
                            })
                        }
                        <div className='flex items-center gap-2 cursor-pointer py-6 px-6 ' onClick={handleConfirm}>
                            <img className='w-5 h-5' src="/LogOut.png" alt="Icon log out"/>
                            <p className="block text-black font-semibold">Sign off</p>
                        </div>
                        
                        
                    </div>
                )}

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
            </nav>
        </header>
    )
}

export default Header





// className="absolute top-19 left-0 w-full bg-gray-300 md:hidden mt-2 z-50"

