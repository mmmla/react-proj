import React, { useState } from "react";
import './index.css'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from "react-router-dom";
import { post } from '../../utils/index'



const Login = () => {
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()

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

        

        const res = await post('login', form.getFieldValue())
        console.log(res);

        messageApi.info(res.message);
        if(res.message==='验证码错误'){
            resetCode()
        }

        if (res.status==='success') {
            navigate('/home')
        } else return
    }

    const [codeSrc,setCodeSrc]=useState('http://localhost:3001/login/code')
    const resetCode=()=>{
        setCodeSrc(codeSrc+"?"+Math.random())
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
                        offset: 10,
                        span: 16,
                    }}>
                    <Button type="primary" htmlType="sumbit">登录</Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default Login