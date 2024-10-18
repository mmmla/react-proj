import Home from "../pages/home";
import Main from "../pages/mainView";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Mall from "../pages/mall";
import User from "../pages/user";
import PageOne from "../pages/other/pageOne";
import PageTwo from "../pages/other/pageTwo";


const routes=[
    {
        path:'/',
        Component:Main,
        children:[
            //重定向   用index:true没法用Navigate跳转回来
            {
                path:'/',
                element:<Navigate to='home' replace></Navigate>
            },
            {
                // index:true,
                path:'home',
                Component:Home,
            },{
                path:'mall',
                Component:Mall
            },{
                path:'user',
                Component:User
            },{
                path:'other',
                children:[
                    {
                        path:'pageOne',
                        Component:PageOne
                    },
                    {
                        path:'pageTwo',
                        Component:PageTwo
                    },
                ]
            }
        ],
    }
]

export default createBrowserRouter(routes)
