import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Carrousel from '../components/Carrousel'
import { useSelector } from 'react-redux'





function AccountDetail() {

    const [accountDetail, setAccountDetail] = useState([])
    const { id } = useParams()

    // console.log(id)
    const user = useSelector(store => store.authReducer.user)

    const navigate = useNavigate()


    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get(`/api/clients/current/accounts/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(response => {
            setAccountDetail(response.data)
        })
        .catch(error => {
            console.log(error)
            navigate("/accounts")
        })
    }, [])

    // console.log(accountDetail)
    // console.log(accountDetail[0].number);

    return (
        <main className='flex flex-col flex-1 w-full'>
            <Carrousel />
            <h1 className='font-bold text-center text-3xl pt-10'>Account Details:</h1>
            <div className='flex flex-wrap gap-6 justify-center pt-6 lg:gap-40'>
                
                    <div key={id} className='max-w-[380px] flex flex-col gap-3 border-2 border-gray-400 bg-gray-300 rounded-2xl p-6 shadow-lg lg:w-[600px]'>
                        <div className='flex gap-3'>
                            <img className='w-6 h-6' src="/IconAccount.png" alt="Icon Account" />
                            <p className='font-bold text-gray-500'>Account Number: <span className='text-black'>{accountDetail.number}</span></p>
                        </div>
                        <div className='flex gap-3'>
                            <img className='w-6 h-6' src="/IconMoney.png" alt="Icon Balance" />
                            <p className='font-bold text-gray-500'>Balance: <span className='text-black'>{accountDetail.balance?.toLocaleString('en-US', {style:'currency', currency:'USD'})}</span></p>
                        </div>
                        <div className='flex gap-3'>
                            <img className='w-6 h-6' src="/IconCalendar.png" alt="Icon Creation Date" />
                            <p className='font-bold text-gray-500'>Creation Date: <span className='text-black'>{accountDetail.creationDate?.toLocaleString('en-US', {style:'currency', currency:'USD'})}</span></p>
                        </div>
                    </div>
            </div>
            <h2 className='font-bold text-center text-3xl text-red-600 pt-10 pb-4'>Your Transactions:</h2>

            <div className='flex flex-col justify-center items-center'>
            {accountDetail.transactions?.length > 0 ? (
                <table className='min-w-[360px]'>
                    <thead>
                        <tr className='bg-gray-300 border-b-2 border-black'>
                            <th className='rounded-tl-xl py-1 text-center font-bold text-xs min-w-[60px] min-[600px]:text-base h-10'>Type</th>
                            <th className='rounded-sm py-1 text-right pr-1 font-bold text-xs min-w-[100px] min-[600px]:text-base h-10'>Amount</th>
                            <th className='rounded-sm py-1 text-center font-bold text-xs min-w-[100px] min-[600px]:text-base h-10'>Date</th>
                            <th className='rounded-tr-xl py-1 text-left font-bold text-xs min-w-[100px] min-[600px]:text-base pl-2 h-10'>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accountDetail.transactions.map(transaction => (
                            <tr key={transaction.id} className='border-b-2 border-gray-400'>
                                <td className='font-semibold text-center text-xs min-[600px]:text-base h-10'>{transaction.type?.toLowerCase()}</td>
                                <td className={`font-semibold text-right pr-1 text-xs min-[600px]:text-base h-10 ${transaction.amount < 0 ? "text-red-600" : "text-black"}`}>
                                    {(transaction.amount?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))}</td>
                                <td className='font-semibold text-center text-xs min-[600px]:text-base h-10'>{transaction.date?.toLocaleString('en-US').slice(0, 10)}</td>
                                <td className='font-semibold pl-2 text-xs min-[600px]:text-base h-10'>{transaction.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (<p className='font-bold text-center text-lg pt-10'>You have no transactions.</p>)}
                <div className='flex flex-col justify-center items-center pt-10'>
                    <Link to={"/accounts"} className='flex items-center justify-center bg-red-600 rounded-lg hover:bg-red-700 w-32 h-10 text-center font-bold text-white'>Go Back</Link>
                </div>
            </div>
                
        </main>
        
    )
}

export default AccountDetail


            {/* <div className='flex flex-col justify-center items-center'>
                {accountDetail.transactions?.length > 0 

                    ? <div className='flex gap-4 p-2 min-w-[370px]'>
                        <div>
                            <div className='bg-gray-300 rounded-sm p-1 w-12 text-center font-bold text-xs min-[600px]:text-base min-[600px]:w-24 min-[600px]:rounded-lg'>Type</div>
                            {accountDetail.transactions?.map(transaction => (<p className="font-semibold text-center text-xs min-[600px]:text-base" key={transaction.id}>{transaction.type?.toLowerCase()}</p>))}
                        </div>

                        <div>
                            <div className='bg-gray-300 rounded-sm p-1 w-16 text-right pr-1 font-bold text-xs min-[600px]:text-base min-[600px]:w-32 min-[600px]:text-center min-[600px]:rounded-lg'>Amount</div>
                            {accountDetail.transactions?.map(transaction => (<p className={`font-semibold ${transaction.amount < 0 ? "text-red-600" : "text-black"} text-right pr-1 text-xs min-[600px]:text-base min-[600px]:pr-6`}
                                key={transaction.id}>{(transaction.amount?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))}</p>))}
                        </div>

                        <div>
                            <div className='bg-gray-300 rounded-sm p-1 w-20 text-center font-bold text-xs min-[600px]:text-base min-[600px]:w-28 min-[600px]:rounded-lg'>Data</div>
                            {accountDetail.transactions?.map(transaction => (<p className="font-semibold text-center text-xs min-[600px]:text-base" key={transaction.id}>{transaction.date?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).slice(0, 10)}</p>))}
                        </div>

                        <div>
                            <div className='bg-gray-300 rounded-sm p-1 w-28 text-center font-bold text-xs min-[600px]:text-base min-[600px]:w-48 min-[600px]:rounded-lg'>Description</div>
                            {accountDetail.transactions?.map(transaction => (<p className="font-semibold pl-2 text-xs min-[600px]:text-base" key={transaction.id}>{transaction.description}</p>))}
                        </div>
                    </div>
                    
                    : <p className='font-bold text-center text-lg pt-10'>You have no transactions.</p>}

                    <div className='flex flex-col justify-center items-center pt-10'>
                            <Link to={"/accounts"} className='flex items-center justify-center bg-red-600 rounded-lg hover:bg-red-700 w-32 h-10 text-center font-bold text-white'>Go Back</Link>
                    </div>
                </div> */}