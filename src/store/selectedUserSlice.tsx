import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/User.type";
import { PURGE } from "redux-persist";

const initialState:User={
    uiNum:0,
	uiId:'',
	uiPwd:'',
	uiName:'',
	uiEmail:'',
	uiPhone:'',
	uiBirth:'',
	uiGender:'',
	uiGrade:'',
	uiCredat:'',
	uiCretim:'',
	uiLmodat:'',
	uiLmotim:'',
	uiImgPath:'',
	sessionId:'',
	loginDate:'',
	riNum:0,
	token:'',
	login:false,
    authorities:[],
};
const selectedUserSlice =createSlice({
    name:'selectedUser',
    initialState: initialState,
    reducers:{
        setSelectedUser:(state:User, action:any)=>{
            state.uiNum = action.payload.uiNum;
            state.uiId = action.payload.uiId;
            state.uiName =  action.payload.uiName;
            state.token =  action.payload.token;
            state.uiPwd =  action.payload.uiPwd;
            state.uiEmail =  action.payload.uiEmail;
            state.uiPhone =  action.payload.uiPhone;
            state.uiBirth =  action.payload.uiBirth;
            state.uiGender =  action.payload.uiGender;
            state.uiGrade =  action.payload.uiGrade;
            state.uiCredat =  action.payload.uiCredat;
            state.uiCretim =  action.payload.uiCretim;
            state.uiLmodat =  action.payload.uiLmodat;
            state.uiLmotim =  action.payload.uiLmotim;
            state.uiImgPath =  action.payload.uiImgPath;
            state.sessionId =  action.payload.sessionId;
            state.loginDate =  action.payload.loginDate;
            state.riNum =  action.payload.riNum;
            state.login =  action.payload.login;
            state.login =  action.payload.login;
            state.authorities =  action.payload.authorities;
            localStorage.setItem('selectedUser', JSON.stringify(action.payload));
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }
});
export const {setSelectedUser}=selectedUserSlice.actions;
export default selectedUserSlice.reducer;