import request from './request'

export const getUserInfo=(params)=>{
    return request({
        url:'',
        method:'get',
        params,//get请求用params，post用data
    })
}

export const getTableData=(data)=>{
    return request({
        url:'',
        method:'post',
        data,//get请求用params，post用data
    })
}