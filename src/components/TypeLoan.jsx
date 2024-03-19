import React from 'react'

function TypeLoan({typeLoan, maxAmount, payments}) {
    return (
            <div className='flex flex-col items-center flex-wrap justify-center bg-gray-200 rounded-2xl py-6 shadow-black shadow-lg px-3 hover:scale-105 transition-all duration-[350ms] ease-in'>
                <img className='w-64' src={`/${typeLoan}.png`} alt="Image type loan" />
                <div className='p-3 flex gap-2 items-center'>
                    <div className='w-[265px]'>
                        <div className='flex justify-center items-center gap-3 bg-white rounded-br-[50px] rounded-tl-[50px] p-3 shadow-black shadow-sm'>
                            <img className='w-8' src="/LoanIcon.png" alt="Loan icon" />
                            <div className='flex flex-col'>
                                <p className='font-bold text-xl  mb-[-10px]'>Loan</p>
                                <p className='font-bold text-2xl italic text-red-600'>{typeLoan}</p>
                            </div>
                        </div>
                        <div className='flex flex-col pt-3'>
                            <p className='font-bold text-center'>Maximum financeable amount:</p>
                            <p className='font-bold text-2xl  text-red-600 text-center'>{maxAmount.toLocaleString('en-US', {style:'currency', currency:'USD'})}</p>
                            <p className='font-bold text-center'>Number of installments available:</p>
                            <p className='font-bold text-2xl  text-red-600 text-center'>{payments.join(', ')}</p>
                            <p className='font-bold text-2xl  text-red-600 text-center'>payments</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default TypeLoan

