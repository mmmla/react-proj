import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import EventBus from "./eventBus";

const baseURL = 'http://localhost:3001/'

const service = axios.create({
    baseURL,
    timeout: 5000,
    // headers:{
    //     "Content-Type":'application/json'
    // }
})
//默认携带cookie凭证
service.defaults.withCredentials=true

const getToken = () => {
    const token=localStorage.getItem('bearerToken')
    return token
}

//请求拦截器配置
service.interceptors.request.use((config) => {
    
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config
})

//响应拦截器配置
service.interceptors.response.use(config => {
return config.data.data
},error=>{
    const { response } = error;
    //token失效重定向
    if (response && response.status === 401) {
        EventBus.emit('redirect')
    }
    return Promise.reject(response)
})

export default service