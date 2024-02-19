import React from 'react'
import Carrousel from '../components/Carrousel'

function Transactions() {
    return (
    <main className='w-full flex flex-col flex-1'>
        <Carrousel/>
        
        <h1 className='font-bold text-center text-3xl pt-10'>Make New Transaction:</h1>
        
    </main>
    )
}

export default Transactions