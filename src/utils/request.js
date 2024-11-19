import axios from "axios";

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
service.interceptors.response.use((config) => {
return config.data.data
})

export default service