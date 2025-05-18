import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./useSlice.js";
import feedReducer from "./feedSlice.js";




const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
    },
});

export default appStore;

