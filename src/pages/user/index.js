import React, { useEffect, useState } from "react"
import { Button, Input, Table, Space, Modal, Form, InputNumber, DatePicker, Select } from "antd"
import './index.css'
import { addUser, getList, changeUser, delUser } from "../../utils"
import dayjs from "dayjs"
import { render } from "@testing-library/react"



const { Search } = Input

const data = [
    {
        name: '小兰',
        id: 1,
        age: 12,
        gender: 'man',
        date: '2019-9-18',
        address: '四川  成都',
    }
]





const User = () => {
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: '120px'
        },
        {
            title: '年龄',
            dataIndex: 'age',
            width: '120px'
        },
        {
            title: '性别',
            dataIndex: 'gender',
            width: '120px',
            render: (v) => <span>{v === 'man' ? '男' : '女'}</span>
        },
        {
            title: '出生日期',
            dataIndex: 'date',
            width: '160px',
            render: (v) => dayjs(v).format('YYYY-MM-DD')
        },
        {
            title: '地址',
            dataIndex: 'address',
            width: '480px'
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleChange(record)}>编辑</Button>
                    <Button type="primary" danger onClick={() => handleDel(record)} >删除</Button>
                </Space>
            ),
        },
    ]


    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form] = Form.useForm()
    const [tableData, setTableData] = useState(data)
    const [currentId, setCurrentId] = useState()

    const handleChange = (record) => {
        console.log(record.name);
        //编辑
        if (record.name) {
            setCurrentId(record.id)
            const item = tableData.find(v => v.name === record.name)
            form.setFieldsValue(
                {
                    ...item,
                    date: dayjs(item.date)
                }
            )
        }
        setIsModalOpen(true)
    }
    const handleDel = async (record) => {
        // const nextData = tableData.filter(v => v.id !== record.id)
        // setTableData(nextData)
        await delUser(record.id)
        initTable()
    }

    const handleCancel = () => {
        form.resetFields()
        setIsModalOpen(false)
    }


    const onFinish = async () => {
        try {
            const values = await form.validateFields();
            let res = ''
            if (currentId) {
                res = await changeUser({ id: currentId, ...values })
                console.log(res);
            } else {
                res = await addUser(values)
                // console.log(res);
            }
            //成功后关闭,此处应判断成功再关，如res.data.message='success'
            if (res?.data) {
                setIsModalOpen(false);
            }
            initTable()
        } catch (error) {
            // 校验失败时，这里的 error 会包含校验错误信息  
            // 通常不需要显式处理，因为 Ant Design 会自动显示错误信息  
            console.error('校验失败:', error);
            // 注意：这里不应该关闭模态框，因为用户还需要修正错误  
        }
    };



    const onDateChange = (v) => {
        const currentYearStart = dayjs().startOf('year');
        const formDateYearStart = dayjs(v).startOf('year');
        const differenceInYears = currentYearStart.diff(formDateYearStart, 'year');
        // console.log(differenceInYears);
        form.setFieldValue('age', differenceInYears)
        // form.setFieldValue('date',dayjs(v).format('YYYY-MM-DD'))
    }

    const onSearch = (v) => {
        initTable(v)
    }

    const initTable = async (search = '') => {
        const res = await getList(search)
        console.log(res);
        setTableData(res)
    }


    useEffect(() => {
        initTable()
    }, [])


    // useEffect(() => {
    //     const formDate = form.getFieldValue('date')
    //     console.log(formDate);

    //     if (formDate) {
    //         try {
    //             const currentYearStart = dayjs().startOf('year');  
    //             const formDateYearStart = dayjs(formDate).startOf('year');  
    //             const differenceInYears = currentYearStart.diff(formDateYearStart, 'year');

    //             form.setFieldValue('age', differenceInYears);
    //         } catch (error) {
    //             console.error('Error processing date:', error);
    //         }
    //     }


    // }, [form])


    return (
        <div className="main-container">
            <div className="header">
                <Button type="primary" onClick={handleChange}>+新增</Button>
                <Search style={{ width: '300px' }} placeholder="请输入用户名" enterButton="搜索"
                    size="middle" onSearch={onSearch} />
                <Modal title={true ? '新增用户' : '编辑用户'} open={isModalOpen} onOk={onFinish}
                    onCancel={handleCancel}
                    cancelText='取消' okText='确认'
                >
                    <Form form={form}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        labelAlign="left"
                    >
                        <Form.Item label={'姓名'} name='name' rules={[{
                            required: true,
                            message: '请输入姓名'
                        }]}><Input></Input></Form.Item>
                        <Form.Item label={'年龄'} name='age' rules={[{
                            required: true,
                            message: '请输入年龄'
                        }, {
                            type: 'number',
                            message: '年龄必须是数字'
                        }]}><InputNumber style={{ width: '100%' }} disabled></InputNumber></Form.Item>
                        <Form.Item label={'性别'} name='gender' rules={[{
                            required: true,
                            message: '请输入性别'
                        }]}><Select style={{ width: '100%' }} options={[
                            {
                                label: '男',
                                value: 'man'
                            }, {
                                label: '女',
                                value: 'woman'
                            }
                        ]}></Select></Form.Item>
                        <Form.Item label={'出生日期'} name='date' rules={[{
                            required: true,
                            message: '请输入日期'
                        }]}><DatePicker style={{ width: '100%' }} onChange={onDateChange}></DatePicker></Form.Item>
                        <Form.Item label={'地址'} name='address' rules={[{
                            required: true,
                            message: '请输入地址'
                        }]}><Input></Input></Form.Item>
                    </Form>
                </Modal>
            </div>
            <div className=" container">
                <Table rowKey={'name'} columns={columns} dataSource={tableData}></Table>
            </div>
        </div>
    )
}

export default User