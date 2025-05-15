import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./useSlice.js";




const appStore = configureStore({
    reducer: {
        user: userReducer
    },
});

export default appStore;

