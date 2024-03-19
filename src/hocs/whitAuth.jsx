// import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import getTokenData from '../utils/Token'


export const withAuth = (Component) => {

    const Auth = (props) => {

        const navigate = useNavigate()
        // const user = useSelector(store => store.authReducer.user)

        function handleLogin() {
            navigate('/login')
        }

        const token = localStorage.getItem("token")
        if(!token) {
            return <Navigate to="/login"/>
        }

        const expiration = getTokenData(token)
        // console.log(expiration.getTime());
        // console.log(new Date().getTime());

        // if(new Date().getTime() > expiration.getTime()){
        //     return <Navigate to="/login"/>
        // }

        if(new Date().getTime() > expiration.getTime()){
            return (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <p className='text-red-600 font-bold'>Your token has expired. Please login again.</p>
                        
                        <div className="flex justify-center gap-4 mt-6">
                            <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-md w-[120px]" onClick={handleLogin}>Login</button>
                        </div>
                    </div>
                </div>
            )
        }



        // if(token && new Date().getTime() < expiration.getTime()){
        //     return <Navigate to="accounts"/>
        // }
        return <Component {...props} />
    }
    return Auth
}

