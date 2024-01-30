import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/User.type";

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser: (state: User, action: any) => {
            state: action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice;