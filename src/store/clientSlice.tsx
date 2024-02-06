import { createSlice } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";

const brokerURL = `${process.env.REACT_APP_WS}://${process.env.REACT_APP_HOST}/react-chat`;
const initialState = {
    client: {}
}
const clientSlice = createSlice({
    name: 'client',
    initialState: initialState,
    reducers: {
        initClient: (state:any) => {
            state.client = new Client({
                brokerURL: brokerURL,
                debug: (str) => {
                },
                connectHeaders: {
                    uiNum : localStorage.getItem('uiNum')||''
                }
            });
        },
        setSubscribe:(state:any,action)=>{
            state.client.onConnect = function(){
                this.subscribe(action.payload.url,action.payload.callback);
            }
            state.client.activate();
        }
    }
});