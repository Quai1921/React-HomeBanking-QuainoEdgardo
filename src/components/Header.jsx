import React from 'react'
import { LINKS_HEADER } from '../utils/Links'
import Anchor from './Anchor'


const Header = () => {
    return (
        <header className="flex flex-col justify-between items-center gap-10 w-full py-6 px-20 bg-gray-300 min-[950px]:flex-row">
            <img className='w-26 h-24' src="/LogoRed.png" alt="Logo Mind Hub Bank" />
            <nav className="flex flex-col gap-4 justify-center items-center min-[600px]:flex-row">
                {LINKS_HEADER.map((link) =>{
                        return (
                            <Anchor key={link.href} href={link.href} title={link.title}></Anchor> 
                        )
                    })
                }
            </nav>
            <div>
                <img className='w-8 h-8 cursor-pointer' src="/LogOut.png" alt="Icon log out" />
            </div>
        </header>
    )
}

export default Header