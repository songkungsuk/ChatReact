import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/User.type";

const initialState: User = {
    uiNum: 0,
    uiId: '',
    uiPwd: '',
    uiName: '',
    uiEmail: '',
    uiPhone: '',
    uiBirth: '',
    uiGender: '',
    uiGrade: '',
    uiCredat: '',
    uiCretim: '',
    uiLmodat: '',
    uiLmotim: '',
    token: '',
    login: false,
    loginDate: '',

}
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state: User, action: any) => {
            state.uiNum = action.payload.uiNum;
            state.uiId = action.payload.uiId;
            state.uiName = action.payload.uiName;
            state.token = action.payload.token;
        },
        initUser: (state:User) => {
            state = initialState
        }
    }
})

export const {setUser, initUser} = userSlice.actions;
export default userSlice.reducer;