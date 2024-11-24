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
        return null; 
    }

    return children;
}

export default RouterAuth;