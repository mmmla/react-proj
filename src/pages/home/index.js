import { Col, Row, Card } from "antd"
import React from "react"
import './index.css'

const Home = () => {
    const userImg = require('../../assets/images/user.png')
    return (
        <Row className="home">
            <Col span={8}>
                <Card hoverable>
                    <div className="user">
                        <img src={userImg}></img>
                        <div className="userInfo">
                            <p className="name">Admin</p>
                            <p className="access">超级管理员</p>
                        </div>
                    </div>
                    <div className="login-info">
                        <p>上次登录地点：<span>2023-9-8</span></p>
                        <p>上次登录时间：<span>四川</span></p>
                    </div>
                </Card>
            </Col>
            <Col span={16}></Col>
        </Row>
    )
}

export default Home