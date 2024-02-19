import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DetailLoans from '../components/DetailLoans'
import Carrousel from '../components/Carrousel'
import OptionLoans from '../components/OptionLoans'
import OptionAccounts from '../components/OptionAccouns'



function Loans() {
    const [loans, setLoans] = useState([])
    const [accounts, setAccount] = useState([])
    useEffect(() => {
        axios("http://localhost:8080/api/clients/1")
            .then(response => {
                setLoans(response.data.loans)
                setAccount(response.data.accounts)
            })
            .catch(error => console.log(error))
    }, [])
    // console.log(loans)
    // console.log(accounts)

    const loansQuantity = loans.length


    const [activeLoans, setactiveLoans] = useState([])
    useEffect(() => {
        axios("http://localhost:8080/api/loans/")
            .then(response => {
                setactiveLoans(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    // console.log(activeLoans)



// FUNCIÓN PARA HACER DINÁMICA LA CANTIDAD DE CUOTAS DE CADA TIPO DE PRÉSTAMO. --------------------------------------------------------------------------
    const [selectedLoanType, setSelectedLoanType] = useState({})
    const handleLoanSelect = (e) => {
        // console.log(e.target.value)
        const selectedLoan = activeLoans.find(loan => loan.name === e.target.value)
        // console.log(selectedLoan)
        if (selectedLoan) {
            setSelectedLoanType(selectedLoan)
            console.log(selectedLoan)
            // setAmount(selectedLoan.maxAmount)
            // console.log(selectedLoan.maxAmount);
            // console.log(selectedLoan.payments)
            
        }
        }




// PARA ARMAR EL OBJETO A ENVIAR AL BACK ----------------------------------------------------------------------------------------------------------------
    const [loanSelected, setLoanSelected] = useState({
        loan: "",
        account: "",
        amount: "",
        payment: ""
    })

    function handleInput(e){
        return setLoanSelected({
            ...loanSelected,
            [e.target.name]: e.target.value
        })


    }




// SUBMIT CON LAS VALIDACIONES DE ENTRADA ---------------------------------------------------------------------------------------------------------------
    const [loanEntered, setLoanEntered] = useState(false)
    const [accountEntered, setAccountEntered] = useState(false)
    const [amountEntered, setAmountEntered] = useState(false)
    const [paymentEntered, setPaymentEntered] = useState(false)
    function handleSubmit (e){
        e.preventDefault()

        if (loanSelected.amount > selectedLoanType.maxAmount || loanSelected.amount < 1 ){
            setAmountEntered(true)
        } else {
            setAmountEntered(false)
        }

        // if(e.target.name === "amount" && e.target.value > selectedLoanType.maxAmount || e.target.value < 1){
        //     console.log(e.target.value);
        //     setAmountEntered(true)
        // } else{
        //     setAmountEntered(false)
        // }

        if(loanSelected.loan == ""){
            setLoanEntered(true)
        } else {
            setLoanEntered(false)
        }
        if (loanSelected.account == ""){
            setAccountEntered(true)
        } else {
            setAccountEntered(false)
        }
        if (loanSelected.payment == ""){
            setPaymentEntered(true)
        } else {
            setPaymentEntered(false)
        }
    }
    // console.log(amountEntered)
    // console.log(selectedLoanType)

    // PARA BORRAR LAS ALERTAS CUANDO SE ELIGE UNA OPCIÓN
    function handleSelectChange(e) {
        if (e.target.name === "loan") {
            setLoanEntered(false)
        }
        if (e.target.name === "account") {
            setAccountEntered(false)
        }
        if(e.target.name === "payment") {
            setPaymentEntered(false)
        }
    }


    console.log(loanSelected)




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


    return (
        <main className='w-full flex flex-col flex-1'>
            <div className='w-full flex flex-wrap justify-center items-center px-14 gap-2 md:gap-20'>
                <h1 className='font-bold text-center text-3xl p-2 md:p-6'>Your Loans:</h1>
                <p className='font-semibold text-center text-gray-400'>Last entry: {new Date().toLocaleDateString('en-US', {style:'currency', currency:'USD'})}</p>
            </div>

            <Carrousel/>

            {loansQuantity > 0 ?(<p className='font-bold text-center text-3xl pt-4'>You have {loansQuantity} active loans:</p>) : (<p className='font-bold text-center text-3xl pt-4'>You don't have any active loans.</p>)}
            
            <div className='flex flex-wrap gap-6 justify-center pb-14 pt-6 lg:gap-40'>
            {loans.map(loan => <DetailLoans key={loan.id} name={loan.name} amount={loan.amount} payments={loan.payments} id={loan.id}/>)}
            </div>
            
            <div className='flex flex-wrap justify-center items-center'> 
                <div className='max-w-[600px] flex flex-wrap justify-center p-6'>
                    <img className='object-cover rounded-bl-[80px] rounded-tr-[80px]' src="/ApplyLoan.png" alt="Image of man requesting credit" />
                </div>
                <div>
                    <form action="" className='flex flex-col justify-center items-center gap-5 p-6' onSubmit={handleSubmit} noValidate>
                        <fieldset>
                            <select name="loan" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[350px] rounded-xl h-10" onInput={handleInput} onChange={handleLoanSelect} onFocus={handleSelectChange}>
                            <option value="">Select a loan please...</option>
                            {activeLoans.map(activeLoan => <OptionLoans key={activeLoan.id} name={activeLoan.name} value={loanSelected.loan} maxAmount={activeLoan.maxAmount}/>)}
                            </select>
                            {loanEntered && (<p className='text-red-600 font-bold italic text-xs absolute pl-2'>Please select a loan type.</p>)}
                        </fieldset>
                        <fieldset>
                            <select name="account" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[350px] rounded-xl h-10" onInput={handleInput} onFocus={handleSelectChange}>
                            {/* onChange={handleSubmit} */}
                            <option value="">Select an account please...</option>
                            {accounts.map(account => <OptionAccounts key={account.id} number={account.number} value={loanSelected.account}/>)}
                            </select>
                            {accountEntered && (<p className='text-red-600 font-bold italic text-xs absolute pl-2'>Please select an account.</p>)}

                        </fieldset>
                        <fieldset className='relative'>
                            <input name="amount" type="number" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[350px] rounded-xl h-10 pl-1 [appearance:textfield] 
                            [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Enter the amount to request:" 
                            onInput={handleInput} max={selectedLoanType.maxAmount} min={0} value={loanSelected.amount} />
                            {/* onChange={handleSubmit} */}
                            {amountEntered && (<p className='text-red-600 font-bold italic text-xs absolute pl-2'>Invalid amount. Enter a value less than or equal to {selectedLoanType.maxAmount}.</p>)}
                            
                        </fieldset>
                        <fieldset>
                            <select name="payment" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[350px] rounded-xl h-10" onInput={handleInput} onFocus={handleSelectChange}>
                            {/* onChange={handleSubmit} */}
                            <option value="">Select the number of payments please...</option>
                            {selectedLoanType.payments?.map(paymentOption => (<option className='font-semibold italic' value={paymentOption} key={paymentOption}>{paymentOption}</option>))}
                            </select>
                            {paymentEntered && (<p className='text-red-600 font-bold italic text-xs absolute pl-2'>Please select the number of payments.</p>)}
                        </fieldset>
                        <input type="submit" value="Request" className='bg-red-600 rounded-xl py-2 px-1 hover:bg-red-700 w-[350px] text-center font-bold text-white'/>
                    </form>
                </div>
            </div>
            
        </main>
    )
}

export default Loans

