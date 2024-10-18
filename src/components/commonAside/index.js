import React from 'react';
import { Layout, Menu } from 'antd';
import * as Icons from '@ant-design/icons';
import {  useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const getIcon = (iconName) => React.createElement(Icons[iconName])

const mockData = [
    {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'HomeOutlined',
        url: '/home/index'
    },
    {
        path: '/mall',
        name: 'mall',
        label: '商品管理',
        icon: 'ShopOutlined',
        url: '/mall/index'
    },
    {
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'UserOutlined',
        url: '/user/index'
    },
    {
        path: '/other',
        label: '其他',
        icon: 'SettingOutlined',
        children: [
            {
                path: '/other/pageOne',
                name: 'page1',
                label: '页面1',
                icon: 'SettingOutlined',
            },
            {
                path: '/other/pageTwo',
                name: 'page2',
                label: '页面2',
                icon: 'SettingOutlined',
            }
        ]
    }
]
const slideItems = mockData.map(item => {
    const child = {
        key: item.path,
        label: item.label,
        icon: getIcon(item.icon)
    }
    if (item.children) {
        child.children = item.children.map(e => {
            return {
                key: e.path,
                label: e.label,
            }
        })
    }
    return child
})

const CommonAside = () => {
    const collapsed=useSelector(state=>state.tab.isCollapsed)
    const navigate=useNavigate()
    const onclick=(e)=>{
        console.log(e);
        navigate(e.key)
        
    }
    

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <h3 className='app-name'>{collapsed?'通用':'通用后台管理系统'}</h3>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%' }}
                items={slideItems}
                onClick={onclick}
            />
        </Sider>
    )
}

export default CommonAside