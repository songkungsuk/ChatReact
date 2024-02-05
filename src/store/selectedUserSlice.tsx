import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/User.type";
import { PURGE } from "redux-persist";

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
    authorities: []
}
const selectedUserSlice = createSlice({
    name: 'selectedUser',
    initialState: initialState,
    reducers: {
        setSelectedUser: (state: User, action: any) => {
            state.uiNum = action.payload.uiNum;
            state.uiId = action.payload.uiId;
            state.uiPwd = action.payload.uiPwd;
            state.uiName = action.payload.uiName;
            state.uiEmail = action.payload.uiEmail;
            state.uiPhone = action.payload.uiPhone;
            state.uiBirth = action.payload.uiBirth;
            state.uiGender = action.payload.uiGender;
            state.uiGrade = action.payload.uiGrade;
            state.uiCredat = action.payload.uiCredat;
            state.uiCretim = action.payload.uiCretim;
            state.uiLmodat = action.payload.uiLmodat;
            state.uiLmotim = action.payload.uiLmotim;
            state.loginDate = action.payload.loginDate;
            state.authorities = action.payload.authorities;
            localStorage.setItem('selectedUser',JSON.stringify(action.payload));
        },
        initSelectedUser: (state: User) => {
            state.uiNum = initialState.uiNum
            state.uiId = initialState.uiId
            state.uiPwd = initialState.uiPwd
            state.uiName = initialState.uiName
            state.uiEmail = initialState.uiEmail
            state.uiPhone = initialState.uiPhone
            state.uiBirth = initialState.uiBirth
            state.uiGender = initialState.uiGender
            state.uiGrade = initialState.uiGrade
            state.uiCredat = initialState.uiCredat
            state.uiCretim = initialState.uiCretim
            state.uiLmodat = initialState.uiLmodat
            state.loginDate = initialState.loginDate
            state.authorities = initialState.authorities
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }
})

export const { setSelectedUser, initSelectedUser } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;