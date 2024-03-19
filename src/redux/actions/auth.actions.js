import { createAction } from "@reduxjs/toolkit"


const current = createAction("CURRENT", (data) => {

    // const dataFiexd = {
    //     name: data.firstName + " " + data.lastName,
    //     email: data.email
    // }



    return {
        payload: {
            ...data,
            loggedIn: true,
        }
    }
})



const login = createAction("LOGIN", (token) => {
    localStorage.setItem("token", token)
    return {
        payload: {
            token,
            timestamps: Date.now()
        }
    }
})

const logout = createAction("LOGOUT", (token) => {
    localStorage.removeItem("token")
    return {
        payload: {
            token,
            timestamps: Date.now()
        }
    }
})

const update = createAction("UPDATE", (data) => {
    return {
        payload: {
            ...data,
            loggedIn: true
        }
    }
})



const actions = {
    current,
    login, 
    logout,
    update
}

export default actions