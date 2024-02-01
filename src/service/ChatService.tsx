import { Client } from "@stomp/stompjs";
import { useChatDispatch } from "../store";
import { setUserList } from "../store/userListSlice";


const borkerURL = `${process.env.REACT_APP_WS}://${process.env.REACT_APP_HOST}/react-chat`;

const client = new Client({
    brokerURL: borkerURL,
    debug: (str) => {
        console.log(str);
    },


})

export const initClient = async (config: any) => {

    return new Promise((resolve, rejects) => {
        if (!localStorage.getItem('uiNum') || !localStorage.getItem('token')) {
            throw new Error('login');
        }
        client.connectHeaders = {
            uiNum: localStorage.getItem('uiNum') || '',
            token: localStorage.getItem('token') || '',
        }
        client.onConnect = () => {
            client.subscribe(config.url, config.callback);
            client.subscribe(`/topic/chat/${localStorage.getItem('uiNum')}`, (data: any) => {
                const msg = JSON.parse(data.body);
                console.log(msg);
            })
            resolve(client);
        }
        client.activate();
    })
}

export const disconnectClient = () => {
    if (client.connected) {
        client.deactivate();
    }
}
