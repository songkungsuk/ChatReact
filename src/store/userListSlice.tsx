import { createSlice } from "@reduxjs/toolkit";

const userListSlice =createSlice({
    name:'userList',
    initialState: {list:[]},
    reducers:{
        setUserList:(state:any, action:any)=>{
            localStorage.setItem('userList', JSON.stringify(action.payload));
            state.list = action.payload;
        },
        initUserList:(state:any)=>{
            state.list = [];
        }
    }
});
export const {setUserList,initUserList}=userListSlice.actions;
export default userListSlice.reducer;