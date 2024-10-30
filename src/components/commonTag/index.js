import React, { useEffect } from "react";
import { Space, Tag } from "antd";
import './index.css'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { delTablist } from "../../store/reducers/tab";


const CommonTag = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const tabList = useSelector(state => state.tab.tabList)

    const handleClose = () => {
        dispatch(delTablist({ path: location.pathname }))
        console.log(tabList[tabList.length - 1].path);
    }
    const handleClick=(path)=>{
        navigate(path)
    }

    useEffect(() => {
        if (tabList.length == 0) {
            navigate('/home')
        } else {
            navigate(tabList[tabList.length - 1].path)
        }
    }, [tabList])

    return (
        <Space className="common-tag" size={[0, 8]} wrap>
            {tabList.map(e => {
                return (
                    e.path === location.pathname ?
                        <Tag key={e.name} color="#55acee" closeIcon onClose={handleClose}>{e.label}</Tag>
                        :
                        <Tag onClick={()=>handleClick(e.path)} key={e.name} >{e.label}</Tag>
                )
            })}
        </Space>
    )
}

export default CommonTag