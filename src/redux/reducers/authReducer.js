import { createReducer } from "@reduxjs/toolkit"
import authActions from "../actions/auth.actions.js"


const { login, current, logout, update } = authActions

const initialState = {
    user: {
        name: "",
        email: "",
        loggedIn: null,
        
    },
    token: null,
    timestamps: null
}

const authReducer = createReducer(initialState,(builder) => {
    builder
    .addCase(login, (state, action) => {
        return {
            ...state,
            token: action.payload.token,
            timestamps: action.payload.timestamps
        }
    })
    .addCase(current, (state, action) => {
        return {
            ...state,
            user: action.payload
            
        }
    })
    .addCase(logout, (state, action) => {
        return {
            ...state,
            token: null
        }
    })
    .addCase(update, (state, action) => {
        return {
            ...state,
            user: action.payload
        }
        
    })
})

export default authReducer




// return {
//     ...useState,
//     user:{
//         name: action.payload.name,
//         email: action.payload.email,
//         loggedIn: action.payload.loggedIn,
//         timestamps: action.payload.timestamps
//     }
// }


// return {
//     ...useState,
//     user:{
//         ...action.payload
//     }
// }


