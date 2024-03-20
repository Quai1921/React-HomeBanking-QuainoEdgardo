import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import DetailLoans from '../components/DetailLoans'
import Carrousel from '../components/Carrousel'
import OptionLoans from '../components/OptionLoans'
import OptionAccounts from '../components/OptionAccouns'
import { useSelector, useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions.js'




function Loans() {
    // const [loans, setLoans] = useState([])
    // const [accounts, setAccount] = useState([])

    // console.log(loans)
    // console.log(accounts)

    // PARA ARMAR EL OBJETO A ENVIAR AL BACK ----------------------------------------------------------------------------------------------------------------
    const [loanSelected, setLoanSelected] = useState({
        loanName: "",
        numberAccount: "",
        amount: "",
        payments: ""
    })

    const [loanEntered, setLoanEntered] = useState(false)
    const [accountEntered, setAccountEntered] = useState(false)
    const [amountEntered, setAmountEntered] = useState(false)
    const [paymentEntered, setPaymentEntered] = useState(false)

    const [activeLoans, setactiveLoans] = useState([])

    const [selectedLoanType, setSelectedLoanType] = useState({})

    const [loanSuccess, setLoanSuccess] = useState(false)
    const [paymentsExist, setPaymentsExist] = useState(false)
    const [loanExist, setLoanExist] = useState(false)
    const [accountExist, setAccountExist] = useState(false)
    const [loanAlreadyRequest, setLoanAlreadyRequest] = useState(false)

    const [confirmLoan, setConfirmLoan] = useState(false)

    const dispatch = useDispatch()

    const { update } = authActions

    const formRef = useRef(null)

    const user = useSelector(store => store.authReducer.user)
    // const token = useSelector(store => store.authReducer.token)


    const loansQuantity = user.loans?.length

    useEffect(() => {
        axios.get('/api/loans/')
            .then(response => {
                setactiveLoans(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    // console.log(activeLoans)
    // console.log(loanSelected.loanName);
    // console.log(user.loans?.map(loan => loan.name));



// FUNCIÓN PARA HACER DINÁMICA LA CANTIDAD DE CUOTAS DE CADA TIPO DE PRÉSTAMO. --------------------------------------------------------------------------------------------

    const handleLoanSelect = (e) => {
        // console.log(e.target.value)
        const selectedLoan = activeLoans.find(loan => loan.name === e.target.value)
        // console.log(selectedLoan)
        if (selectedLoan) {
            setSelectedLoanType(selectedLoan)
            console.log(selectedLoan)
            // console.log(selectedLoan.maxAmount);
            // console.log(selectedLoan.payments)
        }
        }


    function handleInput(e){
        if(e.target.name === "amount" && e.target.value > selectedLoanType.maxAmount || e.target.value < 1){
            console.log(e.target.value);
            setAmountEntered(true)
        } else{
            setAmountEntered(false)
        }
        return setLoanSelected({
            ...loanSelected,
            [e.target.name]: e.target.value
        })
    }


    // SUBMIT CON LAS VALIDACIONES DE ENTRADA ---------------------------------------------------------------------------------------------------------------
    function handleSubmit (e){
        e.preventDefault()

        setConfirmLoan(false)

        let loanValid = true
        let accountValid = true
        let amountValid = true
        let paymentsValid = true

        const token = localStorage.getItem("token")

        if (loanSelected.amount > selectedLoanType.maxAmount || loanSelected.amount < 1 ){
            setAmountEntered(true)
            amountValid = false
        } else {
            setAmountEntered(false)
        }
        if(loanSelected.loanName == ""){
            setLoanEntered(true)
            loanValid = false
        } else {
            setLoanEntered(false)
            setLoanExist(false)
        }
        if (loanSelected.numberAccount == ""){
            setAccountEntered(true)
            accountValid = false
        } else {
            setAccountEntered(false)
            setAccountExist(false)
        }
        if (loanSelected.payments == ""){
            setPaymentEntered(true)
            paymentsValid = false
        } else {
            setPaymentEntered(false)
            setPaymentsExist(false)
        }
        if(user.loans?.map(loan => loan.name).includes(loanSelected.loanName)){
            setLoanAlreadyRequest(true)
            loanValid = false
        }

        if(loanValid && accountValid && amountValid && paymentsValid){

            axios.post("/api/clients/current/loans", loanSelected, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
                .then(response => {
                    console.log(response.data)
                    if (response.data.includes("Loan created. Total to pay: ")) {
                        setLoanSuccess(true)
                        setLoanSelected({
                            loan: "",
                            numberAccount: "",
                            amount: "",
                            payments: ""
                        })
                        formRef.current.reset()
                    }
                })
                .catch(error => {
                    console.log(error.response.data)
                    if (error.response.data == "The amount of payments must be between " + "[" + selectedLoanType.payments?.join(", ") + "]") {
                        setPaymentsExist(true)
                    }
                    if (error.response.data == "The selected loan does not exist") {
                        setLoanExist(true)
                    }
                    if(error.response.data == "The destination account is not valid") {
                        setAccountExist(true)
                    }
                })
        }
    }
    // console.log(amountEntered)
    // console.log(selectedLoanType)



    // PARA BORRAR LAS ALERTAS CUANDO SE ELIGE UNA OPCIÓN
    function handleSelectChange(e) {
        if (e.target.name === "loanName") {
            setLoanEntered(false)
            setLoanAlreadyRequest(false)
            setLoanExist(false)
            setLoanSuccess(false)
        }
        if (e.target.name === "numberAccount") {
            setAccountEntered(false)
            setAccountExist(false)
            setLoanSuccess(false)
        }
        if (e.target.name === "payments") {
            setPaymentEntered(false)
            setLoanSuccess(false)
            setPaymentsExist(false)
        }
        if (e.target.name === "amount") {
            setLoanSuccess(false)
        }
    }

    function handleConfirm(e) {
        e.preventDefault()

        let loanValid = true
        let accountValid = true
        let amountValid = true
        let paymentsValid = true


        if (loanSelected.loanName == ""){
            setLoanEntered(true)
            loanValid = false
            setConfirmLoan(false)
        }
        if (loanSelected.numberAccount == ""){
            setAccountEntered(true)
            accountValid = false
            setConfirmLoan(false)
        }
        if (loanSelected.amount > selectedLoanType.maxAmount || loanSelected.amount < 1){
            setAmountEntered(true)
            amountValid = false
            setConfirmLoan(false)
        }
        if (loanSelected.payments == ""){
            setPaymentEntered(true)
            paymentsValid = false
            setConfirmLoan(false)
        }
        if (user.loans?.map(loan => loan.name).includes(loanSelected.loanName)){
            setLoanAlreadyRequest(true)
            loanValid = false
            setConfirmLoan(false)
        }
        if (!activeLoans?.map(loan => loan.name).includes(loanSelected.loanName) && loanSelected.loanName != "") {
            setLoanExist(true)
            loanValid = false
            setConfirmLoan(false)
        }
        if (!activeLoans?.some(loan => loan.payments.includes(parseInt(loanSelected.payments))) && loanSelected.payments != "") {
            // console.log(activeLoans?.some(loan => loan.payments.includes(parseInt(loanSelected.payments))));
            // console.log(parseInt(loanSelected.payments));
            setPaymentsExist(true)
            paymentsValid = false
            setConfirmLoan(false)
        }
        if(!user.accounts?.some(account => account.number === loanSelected.numberAccount) && loanSelected.numberAccount != "") {
            console.log(!user.accounts?.some(account => account.number === loanSelected.numberAccount));
            setAccountExist(true)
            accountValid = false
            setConfirmLoan(false)
        }
        if (loanValid && accountValid && amountValid && paymentsValid) {
            setConfirmLoan(true)
        }
    }

    function handleCancel() {
        setConfirmLoan(false)
    }

    function handleSuccess() {
        setLoanSuccess(false)

        const token = localStorage.getItem("token")

        axios.get('/api/clients/current', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                // dispatch(current(response.data))
                dispatch(update({...user, 
                    loans: response.data.loans,
                    accounts: response.data.accounts}))
            })
            .catch(error => console.log(error.response.data))

    }


    console.log(loanSelected)



    return (
        <main className='w-full flex flex-col flex-1'>

            <Carrousel/>

            <div className='w-full flex flex-wrap justify-center items-center px-14 gap-2 md:gap-20'>
                <p className='font-semibold text-center text-gray-400'>Last entry: {new Date().toLocaleDateString('en-US', {style:'currency', currency:'USD'})}</p>
            </div>

            {loansQuantity > 0 ?(<h1 className='font-bold text-center text-3xl pt-4'>You have {loansQuantity} active loans:</h1>) : (<h1 className='font-bold text-center text-3xl pt-4'>You don't have any active loans.</h1>)}
            
            <div className='flex flex-wrap gap-6 justify-center pb-14 pt-6 lg:gap-30'>
            {user.loans?.map(loan => <DetailLoans key={loan.id} name={loan.name} amount={loan.amount} payments={loan.payments} id={loan.id}/>)}
            </div>
            
            <div className='flex flex-wrap justify-center items-center'> 
                <div className='max-w-[600px] flex flex-wrap justify-center p-6'>
                    <img className='object-cover rounded-bl-[80px] rounded-tr-[80px]' src="/ApplyLoan.png" alt="Image of man requesting credit" />
                </div>
                <div>
                    <form ref={formRef} className='flex flex-col justify-center items-center gap-5 p-6' onSubmit={handleConfirm} noValidate>
                        <fieldset>
                            <select name="loanName" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[350px] rounded-xl h-10" onInput={handleInput} onChange={handleLoanSelect} onFocus={handleSelectChange}>
                            <option value="">Select a loan please...</option>
                            {activeLoans.map(activeLoan => <OptionLoans key={activeLoan.id} name={activeLoan.name} value={loanSelected.loanName} maxAmount={activeLoan.maxAmount}/>)}
                            </select>
                            {loanEntered && (<p className='text-red-600 font-bold italic text-xs absolute pl-2'>Please select a loan type.</p>)}
                            {loanExist && (<p className='text-red-600 font-bold italic text-xs absolute pl-2'>The selected loan does not exist.</p>)}
                            {loanAlreadyRequest && (<p className='text-red-600 font-bold italic text-xs absolute pl-2'>You already have a loan of the type {loanSelected.loanName}.</p>)}
                        </fieldset>

                        <fieldset>
                            <select name="numberAccount" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[350px] rounded-xl h-10" onInput={handleInput} onFocus={handleSelectChange}>
                            <option value="">Select an account please...</option>
                            {user.accounts?.map(account => <OptionAccounts key={account.id} number={account.number} value={loanSelected.numberAccount}/>)}
                            </select>
                            {accountEntered && (<p className='text-red-600 font-bold italic text-xs absolute pl-2'>Please select an account.</p>)}
                            {accountExist && (<p className='text-red-600 font-bold italic text-xs absolute pl-2'>The selected account does not exist.</p>)}
                        </fieldset>

                        <fieldset className='relative'>
                            <input name="amount" type="number" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[350px] rounded-xl h-10 pl-1 [appearance:textfield] 
                            [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Enter the amount to request:" 
                            onInput={handleInput} max={selectedLoanType.maxAmount} min={0} value={loanSelected.amount} />
                            {amountEntered && (<p className='text-red-600 font-bold italic text-xs absolute pl-2'>Enter a value less than or equal to {selectedLoanType.maxAmount?.toLocaleString('en-US', {style:'currency', currency:'USD'})}.</p>)}
                            
                        </fieldset>

                        <fieldset>
                            <select name="payments" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[350px] rounded-xl h-10" onInput={handleInput} onFocus={handleSelectChange}>
                            <option value="">Select the number of payments please...</option>
                            {selectedLoanType.payments?.map(paymentOption => (<option className='font-semibold italic' value={paymentOption} key={paymentOption}>{paymentOption}</option>))}
                            </select>
                            {paymentEntered && (<p className='text-red-600 font-bold italic text-xs absolute pl-2'>Please select the number of payments.</p>)}
                            {paymentsExist && (<p className='text-red-600 font-bold italic text-xs absolute pl-2'>The selected number of payments does not exist.</p>)}
                        </fieldset>
                        <div>
                            <input type="submit" value="Request" className='bg-red-600 rounded-xl py-2 px-1 hover:bg-red-700 w-[350px] text-center font-bold text-white cursor-pointer'/>
                            {/* {loanSuccess && (<p className='text-green-600 font-bold italic absolute pl-[70px]'>Loan requested successfully.</p>)} */}
                            {loanSuccess && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <p className='text-green-600 font-bold text-lg'>Loan requested successfully!</p>
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

            {confirmLoan && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className='font-semibold'>Do you confirm the operation?</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button className="bg-green-700 text-white font-semibold px-4 py-2 rounded-md w-[90px]" onClick={handleSubmit}>Confirm</button>
                            <button className="bg-gray-400 font-semibold px-4 py-2 rounded-md w-[90px]" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            
        </main>
    )
}

export default Loans




    {/* <h1 className='font-bold text-center text-3xl p-2 md:p-6'>Your Loans:</h1> */}

    // ANTERIOR -----------------------------------------------------------------------------------------------------------------------------------------------------------
    // useEffect(() => {

    //     axios("http://localhost:8080/api/clients/current", {
    //         method: "GET",
    //         headers: {
    //             "Authorization": "Bearer " + JWT_TOKEN
    //         }
    //     })
    //         .then(response => {
    //             setLoans(response.data.loans)
    //             setAccount(response.data.accounts)
    //         })
    //         .catch(error => console.log(error))
    // }, [])



    // MÉTODO POST Y RESETEO DEL FORM
    // axios.post("http://localhost:8080/api/loans/", loanSelected)
    // .then(response => {
    //     alert ("Loan requested successfully.")
    // }).catch(error => console.log(error))
    // setLoanSelected({
    //     loan: "",
    //     account: "",
    //     amount: "",
    //     payment: ""
    // })


    // if(e.target.name === "amount" && e.target.value > selectedLoanType.maxAmount || e.target.value < 1){
    //     console.log(e.target.value);
    //     setAmountEntered(true)
    // } else{
    //     setAmountEntered(false)
    // }




    // const dispatch = useDispatch()

    // const {current, login} = authActions

    // // console.log(user);


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
    //         .catch(error => console.log(error))
    //     }
    // }, [])
