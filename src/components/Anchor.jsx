import React from 'react'
import { Link, NavLink } from 'react-router-dom'


function Anchor({href, title}) {
    return (
            <NavLink to={href} className={({ isActive }) =>
            isActive 
            ? "bg-white rounded-md py-2 px-1 hover:bg-red-700 hover:text-white w-28 text-center font-bold text-red-600" 
            : "bg-red-600 rounded-md py-2 px-1 hover:bg-red-700 w-28 text-center font-bold text-white"}
            >{title}</NavLink>
    )
}

export default Anchor


// className='bg-red-600 rounded-md py-2 px-1 hover:bg-red-700 w-32 text-center font-bold text-white'


