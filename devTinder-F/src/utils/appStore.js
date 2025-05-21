import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./useSlice.js";
import feedReducer from "./feedSlice.js";
import connectionReducer from "./connectionSlice.js";
import requestReducer from "./resquestsSlice.js";



const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests: requestReducer
    },
});

export default appStore;

