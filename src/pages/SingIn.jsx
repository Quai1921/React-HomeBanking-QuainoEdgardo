import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions.js'



function SingIn() {

    const [userData, setUserData] = useState({email: "", password: ""})
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [invalidEntrance, setinvalidEntrance] = useState("")

    const dispatch = useDispatch()

    const {login, current} = authActions

    const navigate = useNavigate()



        
    // function handleSingIn(e) {
    //     e.preventDefault()
    //     axios.post("/api/auth/login", userData)
    //     .then(response => {
    //         console.log(response.data)
    //         dispatch(login(response.data))
    //         navigate("/accounts")
    //     })
    //     .catch(error => { console.log(error.response.data)
    //         setinvalidEntrance(error.response.data)
    //     })
        
    // }


    function handleSingIn(e) {
        e.preventDefault()

        let emailValid = true
        let passwordValid = true

        if (userData.email == "") {
            setEmailError(true)
            emailValid = false
        }

        if (userData.password == "") {
            setPasswordError(true)
            passwordValid = false
        }

        if (emailValid && passwordValid) {
            axios.post("/api/auth/login", userData)
                .then(response => {
                    // console.log(response.data)
                    let token = response.data
                    dispatch(login(response.data))
                    if (token) {
                        axios.get('/api/clients/current', {
                            headers: {
                                Authorization: "Bearer " + token
                            }
                        })
                            .then(response => {
                                dispatch(current(response.data))
                                // console.log(response.data)
                                navigate("/accounts")
                                // localStorage.setItem("lastLogin", new Date().toISOString())
                            })
                            .catch(error => {
                                // console.log(error.response.data)
                            })
                    }
                })
                .catch(error => {
                    // console.log(error.response.data)
                    setinvalidEntrance(error.response.data)
                })
        }
    }



    function handleInput(e){
        
        return setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }


    function handleChange(e){
        if(e.target.name == "email"){
            setEmailError(false)
        }
        if(e.target.name == "password"){
            setPasswordError(false)
        }
    }
    
    // console.log(userData)
    // console.log(invalidEntrance)


    return (
    <div className='flex flex-col w-full min-h-dvh'>
        <header className="flex flex-col flex-wrap justify-between items-center w-full py-6 px-2  bg-white gap-4 md:flex-row md:px-20">
            <div className='flex flex-col gap-3 lg:flex-row lg:gap-14'>
                <img className='w-26 h-10' src="/MindHub.png" alt="Logo Mind Hub Bank" />
                <nav className="flex flex-wrap gap-4 justify-center items-center">
                    <NavLink to={"/"} className={({ isActive }) => isActive 
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
            <div className='flex flex-wrap justify-center items-center pt-14 gap-4'>
                <img className='w-[650px]' src="/Login.png" alt="Image of a young man using a notebook" />
                <form className='flex flex-col justify-center items-center gap-5 p-8' onSubmit={handleSingIn}>
                        <fieldset className='flex justify-center items-center gap-3 relative' onFocus={handleChange}>
                            <img className='w-8' src="/User.png" alt="" />
                            <input type="email" name="email" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[300px] rounded-xl h-10 px-4" placeholder='Email' autoComplete='username' onInput={handleInput}/>
                            {emailError && <p className='absolute left-[60px] top-[40px] text-red-600 font-bold italic text-xs'>Please enter your email</p>}
                        </fieldset>

                        <fieldset className='flex justify-center items-center gap-3 relative' onFocus={handleChange}>
                            <img className='w-8' src="/Padlock.png" alt="" />
                            <input type="password" name="password" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[300px] rounded-xl h-10 px-4" placeholder='Password' autoComplete="current-password" onInput={handleInput}/>
                            {passwordError && <p className='absolute left-[60px] top-[40px] text-red-600 font-bold italic text-xs'>Please enter your password</p>}
                            <p className='text-red-600 font-bold italic text-xs absolute bottom-[-15px]'>{invalidEntrance}</p>
                        </fieldset>

                        <input type="submit" value="Sign in" className='bg-red-600 rounded-xl py-2 px-1 hover:bg-red-700 w-[180px] text-center font-bold text-white cursor-pointer'/>
                        <p className='text-red-600 font-semibold cursor-pointer text-xs underline'>Have you forgotten your password?</p>
                        <NavLink to={"/register"} className='text-red-600 font-semibold cursor-pointer text-xs underline'>Are you not registered yet? SIGN UP</NavLink>
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

export default SingIn