import React, { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios'


function SingUp() {

    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const formRef = useRef(null)


    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })


    const [firstNameEntered, setFirstNameEntered] = useState(false)
    const [lastNameEntered, setLastNameEntered] = useState(false)
    const [emailEntered, setEmailEntered] = useState(false)
    const [emailCharacters, setEmailCharacters] = useState(false)
    const [emailExist, setEmailExist] = useState(false)
    const [passwordEntered, setPasswordEntered] = useState(false)
    const [passwordLength, setPasswordLength] = useState(false)
    const [registerSuccess, setRegisterSuccess] = useState(false)

    const [isChecked, setIsChecked] = useState(false)
    const [isNotChecked, setisNotChecked] = useState(false)

    const [termsAndConditions, setTermsAndConditions] = useState(false)


    function handleInput(e) {
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        let firstNameValid = true
        let lastNameValid = true
        let emailValid = true
        let passwordValid = true


        if (firstNameRef.current.value == "") {
            setFirstNameEntered(true)
            firstNameValid = false
        }

        if (lastNameRef.current.value == "") {
            setLastNameEntered(true)
            lastNameValid = false
        }

        if (emailRef.current.value == "") {
            setEmailEntered(true)
            emailValid = false
        }

        if (!emailRef.current.value.includes("@") && emailRef.current.value != "") {
            setEmailCharacters(true)
            emailValid = false
        }

        if (passwordRef.current.value == "") {
            setPasswordEntered(true)
            passwordValid = false
        }

        if (passwordRef.current.value.length < 8 && passwordRef.current.value != "") {
            setPasswordLength(true)
            passwordValid = false
        }

        if(!isChecked && firstNameValid && lastNameValid && emailValid && passwordValid) {
            setisNotChecked(true)
        }

        if (firstNameValid && lastNameValid && emailValid && passwordValid && isChecked) {
            const register = {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            }

            axios.post("/api/auth/register", register)
                .then(response => {
                    // console.log(response.data)
                    if (response.data == "Client created") {
                        setRegisterSuccess(true)
                        setRegister({
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                        })
                        formRef.current.reset()
                    }
                })
                .catch(error => {
                    // console.log(error.response.data)
                    if (error.response.data == "The email entered already exists in the database") {
                        setEmailExist(true)
                    }
                })
        }
    }


    function handleSelectChange(e) {

        if (e.target.name === "firstName") {
            setFirstNameEntered(false)
            setRegisterSuccess(false)
        }

        if(e.target.name === "lastName") {
            setLastNameEntered(false)
            setRegisterSuccess(false)
        }

        if(e.target.name === "email") {
            setEmailEntered(false)
            setEmailCharacters(false)
            setEmailExist(false)
            setRegisterSuccess(false)
        }

        if(e.target.name === "password") {
            setPasswordEntered(false)
            setPasswordLength(false)
            setRegisterSuccess(false)
        }
    }

    function handleSuccess() {
        navigate("/login")
    }

    function handleCheckboxChange() {
        setIsChecked(!isChecked)
        setisNotChecked(false)
    }


    function handleTermsAndConditions() {
        setTermsAndConditions(!termsAndConditions)
        if (!termsAndConditions) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
    }



    // console.log(register)
    // console.log(emailExist)





    return (
    <div className='flex flex-col w-full min-h-dvh'>
        <header className="flex flex-col flex-wrap justify-between items-center w-full py-6 px-2  bg-white gap-4 md:flex-row md:px-20">
            <div className='flex flex-col gap-3 lg:flex-row lg:gap-14'>
                <img className='w-26 h-10' src="/MindHub.png" alt="Logo Mind Hub Bank" />
                <nav className="flex flex-wrap gap-4 justify-center items-center">
                    <NavLink to={"/"} className={({ match }) => match 
                    ? " text-center font-bold text-red-600" 
                    : " text-center font-bold text-red-600"}>Home</NavLink>
                    <NavLink to={"/about"} className={({ isActive }) => isActive 
                    ? " text-center font-bold text-red-600" 
                    : " text-center font-bold text-red-600"}>About Us</NavLink>
                    <NavLink to={"/contact"} className={({ isActive }) => isActive 
                    ? " text-center font-bold text-red-600" 
                    : " text-center font-bold text-red-600"}>Contact</NavLink>
            </nav>
            </div>
            
            <div className="flex gap-4 justify-center items-center">
                <NavLink to={"/register"} className="flex items-center justify-center bg-white border-2 border-red-600 rounded-3xl h-10 w-32 text-center font-bold text-red-600  hover:bg-red-700  hover:text-white hover:border-0">Sign up</NavLink>
                <NavLink to={"/login"} className="flex items-center justify-center bg-red-600 rounded-3xl h-10 w-32 text-center font-bold text-white  hover:bg-red-700  hover:text-white hover:border-0">Sign in</NavLink>
            </div>
        </header>

        <main className='w-full flex flex-col flex-1'>
            <div className='flex flex-wrap justify-center items-center pt-14 gap-2'>
                <img className='w-[600px]' src="/Register.png" alt="" />

                <form ref={formRef} className='flex flex-col justify-center items-center gap-6 p-8' onSubmit={handleSubmit}>
                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/FirstName.png" alt="" />
                            <input type="text" name="firstName" ref={firstNameRef} className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[300px] rounded-xl h-10 px-4" placeholder='First Name' autoComplete='username' onFocus={handleSelectChange} onInput={handleInput}/>
                            {firstNameEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your first name</p>}
                        </fieldset>
                        
                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/LastName.png" alt="" />
                            <input type="text" name="lastName" ref={lastNameRef} className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[300px] rounded-xl h-10 px-4" placeholder='Last Name' autoComplete='username' onFocus={handleSelectChange} onInput={handleInput}/>
                            {lastNameEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your last name</p>}
                        </fieldset>

                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/UserMail.png" alt="" />
                            <input type="mail" name="email" ref={emailRef} className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[300px] rounded-xl h-10 px-4" placeholder='Email' autoComplete='username' onFocus={handleSelectChange} onInput={handleInput}/>
                            {emailEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your email</p>}
                            {emailCharacters && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Entered a valid email</p>}
                            {emailExist && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Invalid email entered</p>}
                        </fieldset>
                        
                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/Padlock.png" alt="" />
                            <input type="password" name="password" ref={passwordRef} className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[300px] rounded-xl h-10 px-4" placeholder='Password' autoComplete="current-password" onFocus={handleSelectChange} onInput={handleInput}/>
                            {passwordEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your password</p>}
                            {passwordLength && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Password must be at least 8 characters</p>}
                        </fieldset>

                        <div className='flex gap-4 items-center relative'>
                            <input type="checkbox" name="termsAndConditions" id="termsAndConditions" onChange={handleCheckboxChange}/>
                            <label htmlFor="termsAndConditions" className='font-semibold italic flex gap-2 items-center justify-center'>I accept the <span className='underline cursor-pointer' onClick={handleTermsAndConditions}>terms and conditions.</span></label>
                            {isNotChecked && (<p className='text-red-600 font-bold text-xs absolute top-5 pl-7'>You must accept terms and conditions.</p>)}
                        </div>
                        
                        <div className='relative'>
                            <input type="submit" value="Sign up" className='bg-red-600 rounded-xl py-2 px-1 hover:bg-red-700 w-[180px] text-center font-bold text-white cursor-pointer'/>
                            {/* {registerSuccess && <p className='text-green-600 font-bold italic text-xs absolute left-6'>Registered successfully</p>} */}
                            {registerSuccess && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <p className='text-green-600 font-bold text-lg'>Registered successfully!</p>
                                    <p className="pt-4">Thank you for trusting MindHub Bank.</p>
                                    <div className="flex justify-center gap-4 mt-6">
                                        <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-md w-[120px]" onClick={handleSuccess}>Continue</button>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>

                        {termsAndConditions && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 px-2" >
                                <div className="bg-white p-6 rounded-lg shadow-md text-left max-w-[700px] max-h-[80vh] overflow-y-auto">
                                    <h5 className='font-bold'>Terms and Conditions for Opening a Bank Account</h5>
                                    <h6>Welcome to MindHub Bank! Before you proceed to open an account with us, please take a moment to review the following terms and conditions:</h6>
                                    <ol>
                                        <li></li>
                                        <li></li>
                                    </ol>
                                    <ol className='list-decimal list-inside pl-4 text-left'>
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
                                    <p className='pt-4 text-justify'>By proceeding with the account opening process, you acknowledge and agree to these terms and conditions. MindHub Bank reserves the right to amend these terms
                                        with prior notice. If you have any questions, please contact our customer service. Thank you for choosing MindHub Bank!</p>
                                    <div className="flex justify-center gap-4 mt-6">
                                        <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-md w-[120px]" onClick={handleTermsAndConditions}>Continue</button>
                                    </div>
                                </div>
                            </div>
                        )}




                        <NavLink to={"/login"} className='text-red-600 font-semibold cursor-pointer text-xs underline'>Are you already registered? Sign in</NavLink>
                </form>
            </div>
            <h1 className='font-bold text-center pt-10 px-3'>Welcome to MindHub Online Banking</h1>
            <p className='text-xs px-3 md:px-36 text-justify pt-3'>Embark on a seamless financial journey with MindHub Online Banking, where we redefine the way you manage your finances. Designed with your
            needs in mind, our platform offers a comprehensive suite of services to empower your financial decisions. Explore a user-friendly interface that simplifies every aspect of your 
            banking experience. From viewing account balances to monitoring transactions and setting up automated payments, MindHub Online Banking puts you in control. Our intuitive design 
            ensures that whether you're a seasoned investor or managing your first savings account, navigating through our platform is a breeze. At MindHub, we prioritize the security of 
            your financial data. Our robust encryption measures ensure that your personal information is safeguarded, providing you with peace of mind as you conduct your online transactions.
            Dive into a world of possibilities with features like fund transfers, bill payments, and detailed account insights available at your fingertips. Monitor your financial health, 
            set savings goals, and receive personalized insights to help you make informed decisions. Looking towards the future? MindHub Online Banking is your ally in financial planning. 
            Explore investment opportunities, track your portfolio, and access a wealth of resources to guide you on your path to financial success. Whether you're accessing your accounts 
            from the comfort of your home or managing your finances on the go, MindHub Online Banking is your trusted companion. Welcome to a new era of banking where convenience, 
            security, and empowerment converge. Welcome to MindHub, where your financial aspirations take center stage.</p>
        </main>
        <footer>
            <Footer/>
        </footer>
    </div>
    )
}

export default SingUp