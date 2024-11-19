import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const RouterAuth = ({ children }) => {

    const token = localStorage.getItem('bearerToken')
    if (!token) {
        // navigate('/login')   不建议用navitate跳转，因为会出现先返回children再跳转回login页面的情况
        return <Navigate replace to='login'></Navigate>
    }

    return (
        children
    )

}

export default RouterAuth