import { Client } from "@stomp/stompjs";
import { Msg } from "../types/Msg.type";

const brokerURL = `${process.env.REACT_APP_WS}://${process.env.REACT_APP_HOST}/react-chat`;

const client = new Client({
    brokerURL: brokerURL,
    debug: (str) => {
    },
});

export const initClient = async (configs:any[]) => {
    return new Promise((resolve, reject) => {
        if (!localStorage.getItem('uiNum') || !localStorage.getItem('token')) {
            reject('login');
        }
        client.connectHeaders = {
            uiNum: localStorage.getItem('uiNum') || '',
            token: localStorage.getItem('token') || ''
        }
        client.onConnect = () => {
            for(const config of configs){
                client.subscribe(config.url, config.callback);
            }
            resolve(client);
        }
        client.activate();
    })
}
export const disconnectClient = ()=>{
    if(client.connected){
        client.deactivate();
    }
}

export const publishMsg = (destination:string, msg:Msg)=>{
    client.publish({
        destination:destination,
        body:JSON.stringify(msg)
    })
}