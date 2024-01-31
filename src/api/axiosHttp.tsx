import axios from "axios";
import { config } from "process";

const url = `${process.env.REACT_APP_HTTP}://${process.env.REACT_APP_HOST}`

export const axiosHttp = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json;'
    }
})

const token = localStorage.getItem('token');
export const axiosAuth = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json;',
        'Authorization': token
    }
})

axiosAuth.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem('token');
        if (!token) {
            return Promise.reject('login');
        }
        config.headers.Authorization = token;
        return config;
    }
    ,
    (err: any) => {
        return Promise.reject(err);
    }

)