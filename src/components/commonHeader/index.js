import React from "react";
import { Avatar, Button, Dropdown, Layout } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import './index.css'
import { useDispatch, useSelector } from "react-redux";
import { changeCollapsed } from "../../store/reducers/tab";
const { Header } = Layout;
//登出
const logout=()=>{
console.log('你点击了退出');

}
//个人中心
const PersonalCenter=()=>{
    console.log('你点击了个人中心');
}

const items = [
    {
        key: '1',
        label: (
            <a target="_blank" onClick={PersonalCenter}>
                个人中心
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" onClick={logout}>
                退出
            </a>
        ),
        // disabled: true,
    }
];

const CommonHeader = () => {
    const collapsed=useSelector(state=>state.tab.isCollapsed)
    const dispatch=useDispatch()

    return (
        <Header className="header-container">
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                style={{
                    fontSize: '16px',
                    width: 46,
                    height: 32,
                    backgroundColor: '#fff'
                }}
                onClick={()=>dispatch(changeCollapsed())}
            />
            <Dropdown menu={{ items }}>
                <Avatar size={36} src={<img src={require('../../assets/images/user.png')}></img>}></Avatar>
            </Dropdown>

        </Header>
    )
}

export default CommonHeader