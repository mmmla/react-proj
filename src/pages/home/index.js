import { Col, Row, Card,Table } from "antd"
import * as Icon from '@ant-design/icons'
import React, { useEffect, useState } from "react"
import './index.css'
import { getTableData } from "../../utils"
import MyECharts from '../../components/ECharts'
import dayjs from "dayjs"

const columns=[
    {
        title:'姓名',
        dataIndex:'name'
    },
    {
        title:'今日购买',
        dataIndex:'todayBuy'
    },
    {
        title:'本月购买',
        dataIndex:'monthBuy'
    },
    {
        title:'总购买',
        dataIndex:'totalBuy'
    },
]
const mockTableData=[
    {
        name:'小明',
        todayBuy:'123',
        monthBuy:'456',
        totalBuy:'789',
    },
    {
        name:'小花',
        todayBuy:'12',
        monthBuy:'223',
        totalBuy:'445',
    },
    {
        name:'小月',
        todayBuy:'12',
        monthBuy:'52',
        totalBuy:'695',
    },
    {
        name:'小黑',
        todayBuy:'121',
        monthBuy:'333',
        totalBuy:'852',
    },
]

const mockListData=[
    {
        name:'本月支付订单',
        value:1221,
        icon:'CheckCircleOutlined',
        color:'#2ec7c9'
    },
    {
        name:'上月支付订单',
        value:2250,
        icon:'CheckCircleOutlined',
        color:'#2ec7c9'
    },
    {
        name:'本月未支付订单',
        value:882,
        icon:'CheckCircleOutlined',
        color:'#2ec7c9'
    },
    {
        name:'上月未支付订单',
        value:1102,
        icon:'CheckCircleOutlined',
        color:'#2ec7c9'
    },
    {
        name:'本日支付订单',
        value:154,
        icon:'CheckCircleOutlined',
        color:'#2ec7c9'
    },
    {
        name:'昨日支付订单',
        value:128,
        icon:'CheckCircleOutlined',
        color:'#2ec7c9'
    }
]

const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 410],
        type: 'line'
      }
    ]
  };

const Home = () => {
    const userImg = require('../../assets/images/user.png')
    const [tableData,setTableData]=useState([])
    useEffect(()=>{
        // getTableData().then((res)=>setTableData(res))
        setTableData(mockTableData)
    },[])

    const createIconElement=(v)=>React.createElement(Icon[v])

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
                        <p>上次登录地点：<span>四川</span></p>
                        <p>上次登录时间：<span>{dayjs(new Date()).format('YYYY-MM-DD')}</span></p>
                    </div>
                </Card>
                <Card hoverable className="table-container">
                    <Table rowKey={'name'} columns={columns} dataSource={tableData}></Table>
                </Card>
            </Col>
            <Col span={16}>
            <div className="list-container">
                {mockListData.map((item,index)=>{
                   return (
                    <Card key={index} className="list-card">
                        <div className="icon-box" style={{background:item.color}}>{createIconElement(item.icon)}</div>
                        <div className="detail">
                            <p className="num">${item.value}</p>
                            <p className="txt">{item.name}</p>
                        </div>
                    </Card>
                   )
                })}
            </div>
            <div>
                <MyECharts style={{height:'400px'}} option={option}></MyECharts>
            </div>
            </Col>
        </Row>
    )
}

export default Home