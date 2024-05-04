import React, { useEffect, useState } from 'react'


function DetailCards({id, type, color, number, cardholder, thruDate, cvv}) {

    const [isHidden, setIsHidden] = useState(true)
    const [cardExpired, setCardExpired] = useState(true)


    useEffect(() => {
        if(new Date(thruDate).getTime() < Date.now()) {
            
            setCardExpired(true)
        } else {
            setCardExpired(false)
        }
    })


    const handleToggleVisibility = () => {
        setIsHidden(!isHidden)
    }
    
    // console.log(cardExpired)
    // console.log(new Date(thruDate).getTime())
    // console.log(Date.now())



    return (
        <div className='flex flex-wrap gap-6 justify-center pt-8'>
                <div key={id} className="w-[372px] h-64 flex flex-col gap-2 rounded-2xl py-4 px-6 cursor-pointer" style={{ background: `url(/${color}.png)`, backgroundSize: 'contain' }}>
                    <div>
                        <p className='font-bold text-gray-500 text-2xl pl-60 italic leading-[20px]'>{type}</p>
                    </div>
                    <div>
                        <p className='font-bold text-gray-500 text-xs pl-60 italic leading-[0px]'>{color}</p>
                    </div>
                    <div className='flex gap-3'>
                        <p className='font-bold text-gray-500 text-2xl pt-12'>{number}</p>
                    </div>
                    <div className='flex gap-3'>
                        <p className='font-bold text-gray-500'>{cardholder}</p>
                    </div>
                    <div className='flex gap-3'>
                        <p className='font-bold text-gray-500'>Valid: {thruDate.toLocaleString('en-US', {style:'currency', currency:'USD'})}</p>
                    </div>
                    <div className='flex gap-3'>
                        {isHidden ? (<p className='font-bold text-gray-500' onClick={handleToggleVisibility}>cvv: ***</p>) : (<p className='font-bold text-gray-500' onClick={handleToggleVisibility}>cvv: {cvv}</p>)}
                    </div>
                    {cardExpired && <p className='text-red-600 font-bold italic text-xs text-center pt-2'>Your card is expired. Please renew it.</p>}
                </div>
                
                
        </div>
    )
}

export default DetailCards