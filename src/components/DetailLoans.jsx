import React from 'react'


function DetailLoans({name, amount, payments, id}) {

    
    return (
        <div className='flex flex-wrap gap-6 justify-center pt-6 lg:gap-40'>
            
                <div key={id} className='max-w-[350px] flex flex-col gap-3 border-2 border-gray-400 bg-gray-300 rounded-2xl p-6 shadow-lg cursor-pointer lg:w-[600px]'>
                    <div className='flex gap-3'>
                        <img className='w-6 h-6' src="/Loan.png" alt="Icon Account" />
                        <p className='font-bold text-gray-500'>Loan: </p>
                        <div className='flex-grow'></div>
                        <span className='text-black font-bold'>{name}</span>
                    </div>
                    <div className='flex gap-3'>
                        <img className='w-6 h-6' src="/IconMoney.png" alt="Icon Balance" />
                        <p className='font-bold text-gray-500'>Amount: </p>
                        <div className='flex-grow'></div>
                        <span className='text-black font-bold'>{amount.toLocaleString('en-US', {style:'currency', currency:'USD'})}</span>
                    </div>
                    <div className='flex gap-3'>
                        <img className='w-6 h-6' src="/Payments.png" alt="Icon Creation Date" />
                        <p className='font-bold text-gray-500'>Payments: </p>
                        <div className='flex-grow'></div>
                        <span className='text-black font-bold'>{payments}</span>
                    </div>
                </div>
            
        </div>
    )
}

export default DetailLoans