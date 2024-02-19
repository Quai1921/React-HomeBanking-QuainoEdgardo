import React from 'react'
import { Link } from 'react-router-dom'

function DetailAccounts({number, balance, creationDate, id}) {
    return (
        <div className='flex flex-wrap gap-6 justify-center pt-6 lg:gap-40'>
                <div>
                    <div key={id} className='max-w-[380px] flex flex-col gap-3 border-2 border-gray-400 bg-gray-300 rounded-2xl p-6 shadow-lg lg:w-[600px]'>
                        <div className='flex gap-3'>
                            <img className='w-6 h-6' src="/IconAccount.png" alt="Icon Account" />
                            <p className='font-bold text-gray-500'>Account Number: <span className='text-black'>{number}</span></p>
                        </div>
                        <div className='flex gap-3'>
                            <img className='w-6 h-6' src="/IconMoney.png" alt="Icon Balance" />
                            <p className='font-bold text-gray-500'>Balance: <span className='text-black'>{balance.toLocaleString('en-US', {style:'currency', currency:'USD'})}</span></p>
                        </div>
                        <div className='flex gap-3'>
                            <img className='w-6 h-6' src="/IconCalendar.png" alt="Icon Creation Date" />
                            <p className='font-bold text-gray-500'>Creation Date: <span className='text-black'>{creationDate.toLocaleString('en-US', {style:'currency', currency:'USD'})}</span></p>
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