import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import userListReducer from "./userListSlice"


const reducers = combineReducers({
    user: userReducer,
    userList: userListReducer
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getdefaultMiddleware) =>
        getdefaultMiddleware({ serializableCheck: false }),
});

export const useChatDispatch = () => useDispatch();
export const useChatSelector = useSelector;