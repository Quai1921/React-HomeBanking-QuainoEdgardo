import React, { useState, useEffect, useRef } from 'react'
import Carrousel from '../components/Carrousel'
import { useSelector } from 'react-redux'
import axios from 'axios'
import OptionAccounts from '../components/OptionAccouns.jsx'
import authActions from '../redux/actions/auth.actions.js'
import { useDispatch } from 'react-redux'

function Transactions() {

    const user = useSelector(store => store.authReducer.user)
    // const token = useSelector(store => store.authReducer.token)

    // PARA ARMAR EL OBJETO
    const [transactionEntered, setTransactionEntered] = useState({
        numberDebit: "",
        numberCredit: "",
        amount: "",
        description: ""
    })

    const formRef = useRef(null)

    const [accountDebitEntered, setAccountDebitEntered] = useState(false)
    const [accountCreditEntered, setAccountCreditEntered] = useState(false)
    const [amountEntered, setAmountEntered] = useState(false)
    const [conceptEntered, setConceptEntered] = useState(false)
    const [accountDebitEqualsAccountCredit, setAccountDebitEqualsAccountCredit] = useState(false)
    const [amountNegative, setAmountNegative] = useState(false)

    const [transactionSuccess, setTransactionSuccess] = useState(false)
    const [amountExist, setAmountExist] = useState(false)
    const [insufficientFunds, setInsufficientFunds] = useState(false)
    const [accountDebitExist, setAccountDebitExist] = useState(false)
    const [accountCreditExist, setAccountCreditExist] = useState(false)

    const [confirmTransaction, setConfirmTransaction] = useState(false)

    const dispatch = useDispatch()

    const { current } = authActions




    function handleInput(e){
        const value = e.target.name === 'numberCredit' ? e.target.value.toUpperCase()  : e.target.value
        
        return setTransactionEntered({
            ...transactionEntered,
            [e.target.name]: value
        })
    }

    console.log(transactionEntered)




    function handleSubmit(e){
            e.preventDefault()

            setConfirmTransaction(false)

            let accountDebitValid = true
            let accountCreditValid = true
            let amountValid = true
            let conceptValid = true

            const token = localStorage.getItem("token")

            if(transactionEntered.numberDebit == ""){
                setAccountDebitEntered(true)
                accountDebitValid = false 
            } 

            if(transactionEntered.numberCredit == ""){
                setAccountCreditEntered(true)
                accountCreditValid = false
            }

            if(transactionEntered.amount == ""){
                setAmountEntered(true)
                amountValid = false
            }

            if(transactionEntered.description == ""){
                setConceptEntered(true)
                conceptValid = false
            }

            if(transactionEntered.numberCredit.toLowerCase() == transactionEntered.numberDebit.toLowerCase()){
                setAccountDebitEqualsAccountCredit(true)
                accountDebitValid = false
                accountCreditValid = false
            }

            if(transactionEntered.amount <= 0){
                setAmountNegative(true)
                amountValid = false
            }

            if(accountDebitValid && accountCreditValid && amountValid && conceptValid){
                axios.post("/api/clients/current/transactions", transactionEntered, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                    .then(response => {
                        console.log(response.data)
                        if (response.data == "Transaction created") {
                            setTransactionSuccess(true)
                            setTransactionEntered({
                                numberDebit: "",
                                numberCredit: "",
                                amount: "",
                                description: ""
                            })
                            formRef.current.reset()
                        }
                    })
                    .catch(error => {
                        console.log(error.response.data)
                        if (error.response.data == "The amount entered is not valid") {
                            setAmountExist(true)
                        }
                        if (error.response.data == "The origin account is not valid") {
                            setAccountDebitExist(true)
                        }
                        if(error.response.data == "The account entered does not exist") {
                            setAccountCreditExist(true)
                        }
                        if(error.response.data == "Insufficient funds. Please indicate a valid amount") {
                            setInsufficientFunds(true)
                        }
                    })
            }
    }


    function handleSelectChange(e) {
        if (e.target.name === "numberDebit") {
            setAccountDebitEntered(false)
            setAccountDebitExist(false)
            setTransactionSuccess(false)
        }
        if (e.target.name === "numberCredit") {
            setAccountCreditEntered(false)
            setAccountDebitEqualsAccountCredit(false)
            setAccountCreditExist(false)
            setTransactionSuccess(false)
        }
        if(e.target.name === "amount") {
            setAmountEntered(false)
            setAmountNegative(false)
            setAmountExist(false)
            setTransactionSuccess(false)
            setInsufficientFunds(false)
        }
        if(e.target.name === "description") {
            setConceptEntered(false)
            setTransactionSuccess(false)
        }
    }


    function handleConfirm(e) {
        e.preventDefault()

        let accountDebitValid = true
        let accountCreditValid = true
        let amountValid = true
        let conceptValid = true

        if(transactionEntered.numberDebit == ""){
            setAccountDebitEntered(true)
            accountDebitValid = false
            setConfirmTransaction(false) 
        } 
        if(transactionEntered.numberCredit == ""){
            setAccountCreditEntered(true)
            accountCreditValid = false
            setConfirmTransaction(false)
        }
        if(transactionEntered.amount == ""){
            setAmountEntered(true)
            amountValid = false
            setConfirmTransaction(false)
        }
        if(transactionEntered.description == ""){
            setConceptEntered(true)
            conceptValid = false
            setConfirmTransaction(false)
        }
        if(transactionEntered.numberCredit.toLowerCase() == transactionEntered.numberDebit.toLowerCase()){
            setAccountDebitEqualsAccountCredit(true)
            accountDebitValid = false
            accountCreditValid = false
            setConfirmTransaction(false)
        }
        if(transactionEntered.amount <= 0){
            setAmountNegative(true)
            setAmountExist(true)
            amountValid = false
            setConfirmTransaction(false)
        }
        if(!user.accounts?.some(account => account.number === transactionEntered.numberDebit)){
            setAccountDebitExist(true)
            accountDebitValid = false
            setConfirmTransaction(false)
        }
        if(user.accounts?.some(account => account.balance < transactionEntered.amount)){
            setInsufficientFunds(true)
            amountValid = false
            setConfirmTransaction(false)
        }
        if(accountDebitValid && accountCreditValid && amountValid && conceptValid){
            setConfirmTransaction(true)
        }
        
    }

    function handleCancel() {
        setConfirmTransaction(false)
    }

    function handleSuccess() {
        setTransactionSuccess(false)

        const token = localStorage.getItem("token")

        axios.get('/api/clients/current', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                dispatch(current(response.data))
            })
            .catch(error => console.log(error.response.data))
    }




    return (
    <main className='w-full flex flex-col flex-1'>
        <Carrousel/>
        
        <h1 className='font-bold text-center text-3xl pt-10'>Make New Transaction:</h1>
        <div className='flex flex-wrap justify-center items-center pt-4'>
            <div className='flex justify-center items-center border-2 border-gray-300 rounded-2xl w-72 h-20 gap-5'>
                <div className='flex justify-center items-center'>
                    <img className='w-8' src="/IconMoney.png" alt="" />
                </div>
                <div className='flex flex-col items-center '>
                    <p className='font-bold text-center'>Selected account balance:</p>
                    <span className='text-gray-500 italic font-bold text-center'>{user.accounts?.find(account => account.number === transactionEntered.numberDebit)?.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                </div>
            </div>
            
        </div>

        <div className='flex flex-wrap justify-center items-center'> 
                <div className='max-w-[600px] flex flex-wrap justify-center p-6'>
                    <img className='object-cover rounded-bl-[80px] rounded-tr-[80px]' src="/ApplyTransactions.png" alt="Image of man requesting credit" />
                </div>
                <div>
                    <form ref={formRef} className='flex flex-col justify-center items-center gap-5 p-6' onSubmit={handleConfirm} noValidate>
                        <fieldset>
                            <select name="numberDebit" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[350px] rounded-xl h-10" onInput={handleInput} onFocus={handleSelectChange}>
                            <option value="">Select debit account please...</option>
                            {user.accounts?.map(account => <OptionAccounts key={account.id} number={account.number}/>)}
                            </select>
                            {accountDebitEntered && <p className='text-red-600 font-bold italic text-xs absolute pl-2'>Please select a debit account.</p>}
                            {accountDebitExist && <p className='text-red-600 font-bold italic text-xs absolute pl-2'>The origin account is not valid.</p>}
                        </fieldset>

                        <fieldset>
                            <input name="numberCredit" type="text" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[350px] rounded-xl h-10 pl-1" placeholder="Select credit account please..." onInput={handleInput} onFocus={handleSelectChange}>
                            </input>
                            {accountCreditEntered && <p className='text-red-600 font-bold italic text-xs absolute pl-2'>Please select a credit account.</p>}
                            {accountDebitEqualsAccountCredit && <p className='text-red-600 font-bold italic text-xs absolute pl-2'>Invalid operation. The accounts entered are the same.</p>}
                            {accountCreditExist && <p className='text-red-600 font-bold italic text-xs absolute pl-2'>The account entered does not exist.</p>}
                        </fieldset>

                        <fieldset className='relative'>
                            <input name="amount" type="number" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[350px] rounded-xl h-10 pl-1 [appearance:textfield] 
                            [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Enter the amount to transfer:" onInput={handleInput} onFocus={handleSelectChange}>
                            </input>
                            {amountEntered && <p className='text-red-600 font-bold italic text-xs absolute pl-2'>Please enter an amount.</p>}
                            {amountNegative && <p className='text-red-600 font-bold italic text-xs absolute pl-2'>The amount entered is not valid.</p>}
                            {amountExist && <p className='text-red-600 font-bold italic text-xs absolute pl-2'>The amount entered is not valid.</p>}
                            {insufficientFunds && <p className='text-red-600 font-bold italic text-xs absolute pl-2'>Invalid operation. Insufficient funds.</p>}
                        </fieldset>

                        <fieldset>
                            <input name="description" type="text" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[350px] rounded-xl h-10 pl-1" 
                            placeholder="Concept..." onInput={handleInput} onFocus={handleSelectChange}/>
                            {conceptEntered && <p className='text-red-600 font-bold italic text-xs absolute pl-2'>Please enter a concept.</p>}
                        </fieldset>
                        <div>
                            <input type="submit" value="Transfer" className='bg-red-600 rounded-xl py-2 px-1 hover:bg-red-700 w-[350px] text-center font-bold text-white cursor-pointer'/>
                            {/* {transactionSuccess && <p className='text-green-600 font-bold italic absolute pl-[90px]'>Succesful transaction.</p>} */}
                            {transactionSuccess && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <p className='text-green-600 font-bold text-lg'>Succesful transaction!</p>
                                    <p className="pt-4">Thank you for trusting MindHub Bank.</p>
                                    <div className="flex justify-center gap-4 mt-6">
                                        <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-md w-[120px]" onClick={handleSuccess}>Continue</button>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {confirmTransaction && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className='font-semibold'>Do you confirm the operation?</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md w-[90px]" onClick={handleSubmit}>Confirm</button>
                            <button className="bg-gray-400 font-semibold px-4 py-2 rounded-md w-[90px]" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
    </main>
    )
}

export default Transactions




    // const dispatch = useDispatch()

    // const {current, login} = authActions

    // console.log(user)


    // useEffect(() => {

    //     const token = localStorage.getItem("token")

    //     if(!user.loggedIn && !!token){
    //         axios.get('/api/clients/current', {
    //             headers: {
    //                 Authorization: "Bearer " + token
    //             }
    //         })
    //         .then(response => {
    //             dispatch(current(response.data))
    //             dispatch(login(token))
    //         })
    //     }
    // }, [])

    // console.log(user)