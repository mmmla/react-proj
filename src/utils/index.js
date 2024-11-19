import request from './request'

export const getUserInfo=(url,params)=>{
    return request({
        url,
        method:'get',
        params,//get请求用params，post用data
    })
}

export const getTableData=(url,data)=>{
    return request({
        url,
        method:'post',
        data,//get请求用params，post用data
    })
}



export const post=(url,data)=>{
    return request({
        url,
        method:'post',
        data
    })
}


export const get=(url,params)=>{
    return request({
        url,
        method:'get',
        params,//get请求用params，post用data
    })
}


//登录signIn
export const getLogin=(data)=>request.post('login',data)

//注册signUp
export const addAdminUser=(data)=>request.post('login/addAdminUser',data)

//用户管理   userTable

//新增用户
export const addUser=(data)=>request.post('/user/addUser',data)

//查询用户
export const getList=(keyWord)=>request.get(`/user/findUser`,{params:{data:keyWord}})

//编辑用户
export const changeUser=(data)=>request.patch(`/user/${data.id}`,data)

//删除用户
export const delUser=(id)=>request.delete(`/user/${id}`)



