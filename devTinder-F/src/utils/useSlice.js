import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removrUser: (state, action) => {
            return null;
        }
    }
});

export const { addUser, removrUser } = userSlice.actions;
export default userSlice.reducer;