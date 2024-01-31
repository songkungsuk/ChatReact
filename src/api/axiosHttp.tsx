import axios from "axios";

export const axiosHttp = axios.create({
    baseURL: `${process.env.REACT_APP_HTTP}://${process.env.REACT_APP_HOST}`,
    headers: {
        'Content-Type': 'application/json;'
    }
})