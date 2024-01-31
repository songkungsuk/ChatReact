import axios from "axios";

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

