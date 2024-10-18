import axios from "axios";

const baseURL = '/api'

const service = axios.create({
    baseURL,
    timeout: 5000,
})

//请求拦截器配置
service.interceptors.request.use((config) => {
    const getToken = () => { }
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config
})

//响应拦截器配置
service.interceptors.response.use(() => {

})

export default service