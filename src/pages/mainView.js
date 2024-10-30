import React from 'react';
import CommonAside from '../components/commonAside';

import {  Layout, theme } from 'antd';
import CommonHeader from '../components/commonHeader';
import CommonTag from '../components/commonTag'
import { Outlet } from 'react-router-dom';
const { Content } = Layout;
// import { Outlet } from "react-router-dom"

const Main = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className='main-container'>
            <CommonAside></CommonAside>
            <Layout>
                <CommonHeader></CommonHeader>
                <CommonTag></CommonTag>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Main