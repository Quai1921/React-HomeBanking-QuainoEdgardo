import React from 'react'
import { Link } from 'react-router-dom'



function DetailAccounts({number, balance, creationDate, id}) {


    // console.log(user)

    return (
        <div className='flex flex-wrap gap-6 justify-center pt-6 lg:gap-40'>
                <div>
                    <div key={id} className='max-w-[380px] flex flex-col gap-3 border-2 border-gray-400 bg-gray-300 rounded-2xl p-6 shadow-lg lg:w-[600px]'>
                        <div className='flex gap-3'>
                            <img className='w-6 h-6' src="/IconAccount.png" alt="Icon Account" />
                            <p className='font-bold text-gray-500'>Account Number: </p>
                            <div className='flex-grow'></div>
                            <span className='text-black font-bold'>{number}</span>
                        </div>
                        <div className='flex gap-3'>
                            <img className='w-6 h-6' src="/IconMoney.png" alt="Icon Balance" />
                            <p className='font-bold text-gray-500'>Balance: </p>
                            <div className='flex-grow'></div>
                            <span className='text-black font-bold'>{balance.toLocaleString('en-US', {style:'currency', currency:'USD'})}</span>
                        </div>
                        <div className='flex gap-3'>
                            <img className='w-6 h-6' src="/IconCalendar.png" alt="Icon Creation Date" />
                            <p className='font-bold text-gray-500'>Creation Date:</p>
                            <div className='flex-grow'></div>
                            <span className='text-black font-bold'>{creationDate.toLocaleString('en-US', {style:'currency', currency:'USD'})}</span>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center pt-1 pl-4'>
                        <Link to={`/accounts/${id}`} className='flex items-center justify-center bg-red-600 rounded-lg hover:bg-red-700 w-32 h-10 text-center font-bold text-white'>More Details</Link>
                    </div>
                </div>
        </div>
    )
}

export default DetailAccounts