import { createSlice } from "@reduxjs/toolkit"
import { Client } from "@stomp/stompjs"

const borkerURL = `${process.env.REACT_APP_WS}://${process.env.REACT_APP_HOST}/react-chat`
const initialState = {
    client: {}
}

const clientSlice = createSlice({
    name: 'client',
    initialState: initialState,
    reducers: {
        initClient: (state: any) => {
            state.client = new Client({
                brokerURL: borkerURL,
                debug: (str) => {
                    console.log(str);
                },
                connectHeaders: {
                    uiNum: localStorage.getItem('uiNum') || '',
                },
            });
        },
        setSubScribe:(state:any, action)=>{
            state.client.onConnect = function(){
                this.subscribe(action.payload.url, action.payload.callback);
            }
            state.client.activate();
        }
    }
});

