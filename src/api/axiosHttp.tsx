import axios from "axios";
import { persistor } from "..";
import { globalRouter } from "./globalRouter";

const url = `${process.env.REACT_APP_HTTP}://${process.env.REACT_APP_HOST}`;
export const axiosHttp = axios.create({
    baseURL: url
});

export const axiosAuth = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});

axiosAuth.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem('token');
        if (!token) {
            if(globalRouter.navigate){
                globalRouter.navigate("/");
                return Promise.reject('login');
            }
        }
        config.headers.Authorization = token;
        return config;
    },
    (err: any) => {
        return Promise.reject(err);
    }
);

axiosAuth.interceptors.response.use(
    function (res) {
        return res;
    },
    function (error) {
        if (error.response && error.response.status) {
            switch (error.response.status) {
                case 401:
                case 402:
                case 403:
                    persistor.pause();
                    if(globalRouter.navigate){
                        globalRouter.navigate("/");
                    }
                    return;
                default:
                    return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    },
);