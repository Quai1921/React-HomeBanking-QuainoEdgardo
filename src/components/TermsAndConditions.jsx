import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import authActions from '../redux/actions/auth.actions.js'

function TermsAndConditions() {

    const [isChecked, setIsChecked] = useState(false)
    const [isNotChecked, setisNotChecked] = useState(false)

    const [accountsQuantity, setAccountsQuantity] = useState(false)
    const [accountSuccess, setAccountSuccess] = useState(false)

    const [confirmAccount, setConfirmAccount] = useState(false)

    const user = useSelector(store => store.authReducer.user)

    const dispatch = useDispatch()

    const { update } = authActions



// console.log(user?.accounts?.length);
// console.log(isChecked);
// console.log(isNotChecked);

function handleCheckboxChange() {
    setIsChecked(!isChecked)
    setisNotChecked(false)
    }

    function handleSubmit (e){
        e.preventDefault()

        const token = localStorage.getItem("token")

        setConfirmAccount(false)

        // if (!isChecked) {
        //     setisNotChecked(true)
        // } else {
        //     setisNotChecked(false)
        // }
        
        if(isChecked && user.accounts.length < 3){
            axios.post("/api/clients/current/accounts", {}, {   // O TAMBIEN null
                headers: {
                    Authorization: "Bearer " + token
                }
            })
                .then(response => {
                    console.log(response.data)
                    if (response.data == "Account created") {
                        setAccountSuccess(true)
                        setAccountsQuantity(false)
                    }
                })
                .catch(error => {
                    console.log(error.response.data)
                    if (error.response.data == "Dear client, you reached the maximum number of accounts allowed (3)") {
                        setAccountsQuantity(true)
                        setAccountSuccess(false)
                        
                    }
                })
        } else if(!isChecked){
            setisNotChecked(true)
            
        } else if (isChecked && user.accounts.length >= 3) {
            setAccountsQuantity(true)
        }
    }




    function handleConfirm(e) {
        e.preventDefault()
        if (!isChecked) {
            setisNotChecked(true)
            setConfirmAccount(false)
        } else if(isChecked && user.accounts?.length >= 3) {
            setAccountsQuantity(true)
            setConfirmAccount(false)
        } else {
            setisNotChecked(false)
            setConfirmAccount(true)
        }
        
    }

    function handleCancel() {
        setConfirmAccount(false)
    }

    function handleSuccess() {
        setAccountSuccess(false)

        const token = localStorage.getItem("token")

        axios.get('/api/clients/current', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                // dispatch(current(response.data))
                dispatch(update({...user,
                    accounts: response.data.accounts}))
            })
            .catch(error => console.log(error.response.data))
    }




    return (
        <div className='flex justify-center px-4 pt-10'>
            <div className='p-6 border-2 border-gray-400 rounded-xl max-w-[700px]'>
                <h5 className='font-bold'>Terms and Conditions for Opening a Bank Account</h5>
                <h6>Welcome to MindHub Bank! Before you proceed to open an account with us, please take a moment to review the following terms and conditions:</h6>
                <ol>
                    <li></li>
                    <li></li>
                </ol>
                <ol className='list-decimal list-inside pl-4'>
                    <li className='font-semibold'>Account Eligibility:</li>
                    <ul className='list-disc list-inside pl-4'>
                        <li>You must be at least 18 years old.</li>
                        <li>You agree to provide accurate and up-to-date personal information.</li>
                    </ul>

                    <li className='font-semibold'>Identification and Verification:</li>
                    <ul className='list-disc list-inside pl-4'>
                        <li>A valid government-issued photo ID is required.</li>
                        <li>Additional documents may be requested for identity verification.</li>
                    </ul>

                    <li className='font-semibold'>Account Usage:</li>
                    <ul className='list-disc list-inside pl-4'>
                        <li>Your account is for personal use only.</li>
                        <li>You agree not to engage in illegal or fraudulent activities.</li>
                    </ul>

                    <li className='font-semibold'>Fees and Charges:</li>
                    <ul className='list-disc list-inside pl-4'>
                        <li>Review our fee schedule for details on account-related charges.</li>
                        <li>We reserve the right to update fees with prior notice.</li>
                    </ul>

                    <li className='font-semibold'>Online Banking:</li>
                    <ul className='list-disc list-inside pl-4'>
                        <li>Access to online banking services is provided.</li>
                        <li>Safeguard your login credentials and report any unauthorized access.</li>
                    </ul>

                    <li className='font-semibold'>Account Closure:</li>
                    <ul className='list-disc list-inside pl-4'>
                        <li>Either party may close the account with reasonable notice.</li>
                        <li>Closing fees may apply; refer to our fee schedul e.</li>
                    </ul >

                    <li className='font-semibold'>Privacy and Security:</li>
                    <ul className='list-disc list-inside pl-4'>
                        <li>Your information is protected under our privacy policy.</li>
                        <li>Report any security concerns or unauthorized transactions immediately.</li>
                    </ul >

                </ol>
                <p className='pt-4'>By proceeding with the account opening process, you acknowledge and agree to these terms and conditions. MindHub Bank reserves the right to amend these terms
                    with prior notice. If you have any questions, please contact our customer service. Thank you for choosing MindHub Bank!</p>
                <form className='flex flex-col gap-2 justify-center items-center pt-4' onSubmit={handleConfirm}>
                    <div className='flex gap-4 items-center pb-3 relative'>
                        <input type="checkbox" name="termsAndConditions" id="termsAndConditions" onChange={handleCheckboxChange} />
                        <label htmlFor="termsAndConditions" className='font-semibold italic flex gap-2 items-center justify-center'>I accept the terms and conditions.</label>
                        {isNotChecked && (<p className='text-red-600 font-bold text-xs absolute top-5 pl-7'>You must accept terms and conditions.</p>)}
                    </div>
                    <div className='pb-4'>
                        <input type="submit" value="Request" className='bg-red-600 rounded-xl py-2 px-1 hover:bg-red-700 w-[280px] text-center font-bold text-white' />
                        {accountsQuantity && (<p className='text-red-600 font-bold italic text-xs absolute px-2 w-[280px] text-center'>Dear client, you reached the maximum number of accounts allowed (3).</p>)}
                        {accountSuccess && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <p className='text-green-600 font-bold text-lg'>Account created successfully!</p>
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

            {confirmAccount && (
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

        </div>
    )
}

export default TermsAndConditions


{/* <div className="bg-white p-6 rounded-lg shadow-md">
                                    <p className='text-green-600 font-bold italic'>Account created successfully.</p>
                                    <div className="flex justify-center gap-4 mt-4">
                                        <button className="bg-gray-400 font-semibold px-4 py-2 rounded-md w-[90px]" onClick={handleSuccess}>Ok</button>
                                    </div>
                                </div> */}



// import React, {useState, useEffect} from 'react'
// import axios from 'axios'
// import { useDispatch, useSelector } from 'react-redux'
// import authActions from '../redux/actions/auth.actions.js'
// // import { useNavigate } from 'react-router-dom'

// function TermsAndConditions() {

//     const [isChecked, setIsChecked] = useState(false)
//     const [isNotChecked, setisNotChecked] = useState(false)

//     const [accountsQuantity, setAccountsQuantity] = useState(false)
//     const [accountSuccess, setAccountSuccess] = useState(false)

//     // const [confirmAccount, setConfirmAccount] = useState(false)

//     const user = useSelector(store => store.authReducer.user)

//     const dispatch = useDispatch()

//     const {current, login} = authActions

//     // const navigate = useNavigate()


//     useEffect(() => {

//         const token = localStorage.getItem("token")

//         if(!user.loggedIn && !!token){
//             axios.get('/api/clients/current', {
//                 headers: {
//                     Authorization: "Bearer " + token
//                 }
//             })
//             .then(response => {
//                 dispatch(current(response.data))
//                 dispatch(login(token))
//             })
//         }
//     }, [])

// // console.log(user?.accounts?.length);
// // console.log(isChecked);
// // console.log(isNotChecked);

// function handleCheckboxChange() {
//     setIsChecked(!isChecked)
//     setisNotChecked(false)
//     }

//     function handleSubmit (e){
//         e.preventDefault()

//         const token = localStorage.getItem("token")

//         if (!isChecked) {
//             setisNotChecked(true)
//         } else {
//             setisNotChecked(false)
//         }
        
//         if(isChecked && user.accounts.length < 3){
//             axios.post("/api/clients/current/accounts", {}, {   // O TAMBIEN null
//                 headers: {
//                     Authorization: "Bearer " + token
//                 }
//             })
//                 .then(response => {
//                     console.log(response.data)
//                     if (response.data == "Account created") {
//                         setAccountSuccess(true)
//                         setAccountsQuantity(false)
//                     }
//                 })
//                 .catch(error => {
//                     console.log(error.response.data)
//                     if (error.response.data == "Dear client, you reached the maximum number of accounts allowed (3)") {
//                         setAccountsQuantity(true)
//                         setAccountSuccess(false)
                        
//                     }
//                 })
//         } else if(!isChecked){
//             setisNotChecked(true)
            
//         } else if (isChecked && user.accounts.length >= 3) {
//             setAccountsQuantity(true)
//         }
//     }




//     // const handleConfirm = (e) => {
//     //     e.preventDefault()
//     //     setConfirmAccount(true)
//     //     navigate('/accounts')
//     // }

//     // const handleCancel = () => {
//     //     setConfirmAccount(false)
//     // }



//     return (
//         <div className='flex justify-center px-4 pt-10'>
//         <div className='p-6 border-2 border-gray-400 rounded-xl max-w-[700px]'>
//             <h5 className='font-bold'>Terms and Conditions for Opening a Bank Account</h5>
//             <h6>Welcome to MindHub Bank! Before you proceed to open an account with us, please take a moment to review the following terms and conditions:</h6>
//             <ol>
//                 <li></li>
//                 <li></li>
//             </ol>
//             <ol className='list-decimal list-inside pl-4'>
//                 <li className='font-semibold'>Account Eligibility:</li>
//                     <ul className='list-disc list-inside pl-4'>
//                         <li>You must be at least 18 years old.</li>
//                         <li>You agree to provide accurate and up-to-date personal information.</li>
//                     </ul>
                
//                 <li className='font-semibold'>Identification and Verification:</li>
//                     <ul className='list-disc list-inside pl-4'>
//                         <li>A valid government-issued photo ID is required.</li>
//                         <li>Additional documents may be requested for identity verification.</li>
//                     </ul>
                
//                 <li className='font-semibold'>Account Usage:</li>
//                     <ul className='list-disc list-inside pl-4'>
//                         <li>Your account is for personal use only.</li>
//                         <li>You agree not to engage in illegal or fraudulent activities.</li>
//                     </ul>
                
//                 <li className='font-semibold'>Fees and Charges:</li>
//                     <ul className='list-disc list-inside pl-4'>
//                         <li>Review our fee schedule for details on account-related charges.</li>
//                         <li>We reserve the right to update fees with prior notice.</li>
//                     </ul>
                
//                 <li className='font-semibold'>Online Banking:</li>
//                     <ul className='list-disc list-inside pl-4'>
//                         <li>Access to online banking services is provided.</li>
//                         <li>Safeguard your login credentials and report any unauthorized access.</li>
//                     </ul>
                
//                 <li className='font-semibold'>Account Closure:</li>
//                     <ul className='list-disc list-inside pl-4'>
//                         <li>Either party may close the account with reasonable notice.</li>
//                         <li>Closing fees may apply; refer to our fee schedul e.</li>
//                     </ul >
                
//                 <li className='font-semibold'>Privacy and Security:</li>
//                     <ul className='list-disc list-inside pl-4'>
//                         <li>Your information is protected under our privacy policy.</li>
//                         <li>Report any security concerns or unauthorized transactions immediately.</li>
//                     </ul >
                
//             </ol>
//             <p className='pt-4'>By proceeding with the account opening process, you acknowledge and agree to these terms and conditions. MindHub Bank reserves the right to amend these terms 
//                 with prior notice. If you have any questions, please contact our customer service. Thank you for choosing MindHub Bank!</p>
//             <form className='flex flex-col gap-2 justify-center items-center pt-4' onSubmit={handleSubmit}>
//                 <div className='flex gap-4 items-center pb-3 relative'>
//                     <input type="checkbox" name="termsAndConditions" id="termsAndConditions" onChange={handleCheckboxChange}/>
//                     <label htmlFor="termsAndConditions" className='font-semibold italic flex gap-2 items-center justify-center'>I accept the terms and conditions.</label>
//                     {isNotChecked && (<p className='text-red-600 font-bold text-xs absolute top-5 pl-7'>You must accept terms and conditions.</p>)}
//                 </div>
//                 <div className='pb-4'>
//                     <input type="submit" value="Request" className='bg-red-600 rounded-xl py-2 px-1 hover:bg-red-700 w-[280px] text-center font-bold text-white'/>
//                     {accountsQuantity && (<p className='text-red-600 font-bold italic text-xs absolute px-2 w-[280px] text-center'>Dear client, you reached the maximum number of accounts allowed (3).</p>)}
//                     {accountSuccess && (<p className='text-green-600 font-bold italic text-sm absolute pt-1 px-2 w-[280px] text-center'>Account has been successfully created.</p>)}
//                 </div>
//             </form>
//         </div>

//         {/* {confirmAccount && (
//                 <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white p-6 rounded-lg shadow-md">
//                         <p className='font-semibold'>Do you really want to go out?</p>
//                         <div className="flex justify-center gap-4 mt-4">
//                             <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md w-[90px]" onClick={handleSubmit}>Confirm</button>
//                             <button className="bg-gray-400 font-semibold px-4 py-2 rounded-md w-[90px]" onClick={handleCancel}>Cancel</button>
//                         </div>
//                     </div>
//                 </div>
//             )} */}

//     </div>
//     )
// }

// export default TermsAndConditions


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