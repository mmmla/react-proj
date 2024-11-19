import React, { useState } from "react";
import './index.css'
import { Button, Form, Input, message } from 'antd'
import { Navigate, useNavigate } from "react-router-dom";
import { addAdminUser, getLogin, post } from '../../utils/index'



const Login = () => {

    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()


    //登录
    const onFinish = async () => {
        const { account, password, checkCode } = form.getFieldValue()

        if (!account || !password) {
            messageApi.warning('请输入账号密码')
            return
        }
        if (!checkCode) {
            messageApi.warning('请输入验证码')
            return
        }

        // fetch('http://localhost:3001/login', {
        //     method: 'post',
        //     body: JSON.stringify(form.getFieldValue()),
        //     headers: {
        //         "Content-Type": 'application/json'
        //     }
        // }).then(v => v.json()).then(v => {
        //     console.log(v);
        // })



        const res = await getLogin(form.getFieldValue())
        console.log(res);
        const token = res?.access_token
        if (token) {
            localStorage.setItem('bearerToken', token)
            messageApi.info('登录成功');
            navigate('/home')
        }
        //登录失败
        if (res.message) {
            messageApi.info(res.message);
            resetCode()
        }
    }

    const [codeSrc, setCodeSrc] = useState('http://localhost:3001/login/code')
    const resetCode = () => {
        setCodeSrc(codeSrc + "?" + Math.random())
    }



    //注册
    const signUp =async () => {
        const { account, password, checkCode } = form.getFieldValue()

        if (!account || !password) {
            messageApi.warning('请输入账号密码')
            return
        }
        if (!checkCode) {
            messageApi.warning('请输入验证码')
            return
        }

        const res=await addAdminUser({ account, password, checkCode })
        console.log(res);
        if(res.status==='error'){
            messageApi.info(res.message);
        }
        if(res.status==='success'){
            messageApi.success(res.message);
        }
        
    }



    const token = localStorage.getItem('bearerToken')
    if (token) {
        return <Navigate replace to='/home'></Navigate>
    }

    //登录输入验证码
    const checkCodeItem = () => {
        return <Form.Item name='checkCode' label='验证码'
            wrapperCol={{ span: 19, offset: 1 }}
        >
            <div style={{ display: 'flex' }}>
                <Input ></Input>
                <img onClick={resetCode} src={codeSrc}></img>
            </div>

        </Form.Item>
    }

    //注册确认密码
    const confirmItem = () => {
        return <Form.Item name='confirm' label='验证码'
            wrapperCol={{ span: 19, offset: 1 }}
        >
            <div style={{ display: 'flex' }}>
                <Input ></Input>
                <img onClick={resetCode} src={codeSrc}></img>
            </div>

        </Form.Item>
    }

    return (
        <div className="login-container">
            <div className="login-title"><span>系统登录</span></div>
            {contextHolder}
            <Form form={form} onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20, offset: 1 }}
            >
                <Form.Item name='account' label='账号'>
                    <Input></Input>
                </Form.Item>
                <Form.Item name='password' label='密码'>
                    <Input.Password></Input.Password>
                </Form.Item>
                {/* {isSignUp?checkCodeItem():checkCodeItem()} */}
                <Form.Item name='checkCode' label='验证码'
                    wrapperCol={{ span: 19, offset: 1 }}
                >
                    <div style={{ display: 'flex' }}>
                        <Input ></Input>
                        <img onClick={resetCode} src={codeSrc}></img>
                    </div>

                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}>
                    <Button type="primary" htmlType="submit">登录</Button>
                    <Button type="primary" style={{ marginLeft: '24px' }} onClick={signUp}>注册</Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default Login