import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import chatListReducer from "./chatListSlice";
import userListReducer from "./userListSlice";
import enterUserReducer from "./enterUserSlice";
import selectedUserReducer from "./selectedUserSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { useDispatch, useSelector } from "react-redux";

const reducers = combineReducers({
    user: userReducer,
    userList : userListReducer,
    enterUser : enterUserReducer,
    selectedUser : selectedUserReducer,
    chatList : chatListReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist:['user','userList']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({serializableCheck:false}),
});
export const useChatDispatch = () => useDispatch();
export const useChatSelector = useSelector;