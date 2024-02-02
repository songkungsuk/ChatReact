import { Client } from "@stomp/stompjs";
import { useChatDispatch } from "../store";
import { setUserList } from "../store/userListSlice";
import { Msg } from "../types/Msg.type";


const borkerURL = `${process.env.REACT_APP_WS}://${process.env.REACT_APP_HOST}/react-chat`;

const client = new Client({
    brokerURL: borkerURL,
    debug: (str) => {
        console.log(str);
    },


})

export const initClient = async (configs: any[]) => {

    return new Promise((resolve, rejects) => {
        if (!localStorage.getItem('uiNum') || !localStorage.getItem('token')) {
            rejects('login');
        }
        client.connectHeaders = {
            uiNum: localStorage.getItem('uiNum') || '',
            token: localStorage.getItem('token') || '',
        }
        client.onConnect = () => {
            for (const coonfig of configs) {
                client.subscribe(coonfig.url, coonfig.callback);
            }
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

export const publishMsg = (dstination: string, msg: Msg) => {
    client.publish({
        destination: dstination,
        body: JSON.stringify(msg),
    })
}