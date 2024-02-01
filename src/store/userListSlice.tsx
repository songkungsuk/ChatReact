import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/User.type";


const userListSlice = createSlice({
    name: 'userList',
    initialState: { list: [] },
    reducers: {
        setUserList: (state: any, action: any) => {
            state.list = action.payload
        }
    }
})

export const { setUserList } = userListSlice.actions;
export default userListSlice.reducer;