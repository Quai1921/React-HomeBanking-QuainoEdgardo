import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DetailAccounts from '../components/DetailAccounts';
import Carrousel from '../components/Carrousel';
import TermsAndConditions from '../components/TermsAndConditions';


function Accounts() {
    const [accounts, setAccount] = useState([])
    const [client, setClient] = useState([])
    const [termsAndConditions, setTermsAndConditions] = useState(false)

    useEffect(() => {
        axios("http://localhost:8080/api/clients/1")
            .then(response => {
                setAccount(response.data.accounts)
                setClient(response.data)
            })
            .catch(error => console.log(error))
    }, [])
    // console.log(accounts)
    // console.log(client)


    const handleAccount = () => {
        setTermsAndConditions(true)
    }
    
    return (
        <main className='w-full flex flex-col flex-1'>
            <div className='w-full flex flex-wrap justify-center items-center px-14 gap-2 md:gap-20'>
                <h1 className='font-bold text-center text-3xl p-2 md:p-6'>Welcome, {client.firstName} {client.lastName}!</h1>
                <p className='font-semibold text-center text-gray-400'>Last entry: {new Date().toLocaleDateString('en-US', {style:'currency', currency:'USD'})}</p>
            </div>
            <Carrousel/>
            <p className='font-bold text-center text-3xl pt-4'>Your Accounts:</p>
            <section className='flex flex-wrap gap-6 justify-center lg:gap-40'>
                
                {accounts.map(account => <DetailAccounts key={account.id} number={account.number} balance={account.balance} creationDate={account.creationDate} id={account.id} />
                )}
            </section>
            
            <div className='flex flex-wrap justify-center items-center pt-20 pb-10'> 
                <div className='w-[350px] h-40 flex flex-wrap justify-center p-6 bg-[url(/ApplyAccount.png)] bg-contain rounded-bl-[80px] rounded-tr-[80px] 
                min-[600px]:w-[500px] min-[600px]:h-52 min-[1000px]:w-[650px] min-[1000px]:h-72'>
                <button className='flex items-center justify-center bg-red-600 rounded-lg hover:bg-red-700 w-52 h-14 text-center font-bold text-xl
                text-white mt-28 min-[600px]:mt-40 min-[1000px]:mt-60' onClick={handleAccount}>JOIN US!</button>
                {/* <img className='object-cover rounded-bl-[80px] rounded-tr-[80px]' src="/ApplyAccount.png" alt="Image of man requesting credit" /> */}
                </div>
            </div>

            {termsAndConditions && <TermsAndConditions />}
            

        </main>
        
    )
    
}

export default Accounts


            // <TermsAndConditions/>