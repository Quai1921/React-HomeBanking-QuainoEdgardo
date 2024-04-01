import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer.js";

const store = configureStore({
    reducer: {
        authReducer
    },
})

export default store