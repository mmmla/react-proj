import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyToken } from "../utils";
import EventBus from "../utils/eventBus";

const RouterAuth = ({ children }) => {
    const navigate = useNavigate();
    const location=useLocation()
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('bearerToken') || null);

    const handleRedirect=()=>{
        navigate('/login', { replace: true });
    }

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                if (token) {
                    const flag = await verifyToken(token); // 假设verifyToken现在接受token作为参数
                    if (flag) {
                        setIsAuthenticated(true);
                    } else {
                        console.log('token error');
                        localStorage.removeItem('bearerToken');
                        setToken(null); // 更新token状态为null
                        navigate('/login', { replace: true });
                    }
                } else {
                    // 没有token，直接重定向到登录页
                    navigate('/login', { replace: true });
                }
            } catch (error) {
                console.log('no token:' + error);
                localStorage.removeItem('bearerToken');
                setToken(null); // 更新token状态为null
                navigate('/login', { replace: true });
            }
            EventBus.on('redirect',handleRedirect)
        }
        checkAuthStatus();
        console.log(location.pathname);

        return ()=>{
            EventBus.off('redirect',handleRedirect)
        }
        
    }, [token,location.pathname]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // 在这个分支中，由于我们已经在useEffect中处理了重定向，
        // 所以这里实际上不会执行到。但是为了代码的完整性，还是保留这个分支。
        // 注意：在实际情况中，如果isAuthenticated为false，
        // 那么它应该已经在useEffect中被重定向了，所以这里不会渲染任何东西。
        return null; // 或者您可以返回一个更友好的加载/重定向提示
    }

    return children;
}

export default RouterAuth;