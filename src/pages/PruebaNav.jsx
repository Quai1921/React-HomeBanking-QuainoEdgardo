import { useState } from 'react';
import { LINKS_HEADER } from '../utils/Links'
import { NavLink } from 'react-router-dom';

const PruebaNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    function Anchor({href, title}) {
        return (
                <NavLink to={href} className={({ isActive }) =>
                isActive 
                ? "bg-white rounded-md py-2 px-1 hover:bg-red-700 hover:text-white w-32 text-center font-bold text-red-600" 
                : "bg-red-600 rounded-md py-2 px-1 hover:bg-red-700 w-32 text-center font-bold text-white"}
                >{title}</NavLink>
        )
    }


    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* puede ser  */}
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
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            </div>
            {isOpen && (
                <div className="md:hidden mt-2">
                    {LINKS_HEADER.map((link) =>{
                            return (
                                <NavLink to={link.href} className="block text-white py-2">{link.title}</NavLink> 
                            )
                        })
                    }

                </div>
            )}
        </nav>
    );
};

export default PruebaNav;

<a href="#" className="block text-white py-2">Cuentas</a>