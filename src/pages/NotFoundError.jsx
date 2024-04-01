import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFoundError = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">404 - Page Not Found</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        The page you're looking for could not be found.
                    </p>
                </div>
                <div>
                    <NavLink to="/" className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Return to Home
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default NotFoundError