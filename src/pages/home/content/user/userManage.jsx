import React, { Component } from 'react';
import {
    Table,
    Form,
    Space,
    Breadcrumb,
    Layout,
    Tag,
    Input,
    Button,
    Card,
    Modal,
    Pagination,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import WrappedComponent from '../component/wrapComponent';
import $ajax from '../../../../utils/ajax';
import APIS from '../../../../constants/api';
const { Content } = Layout;
const { confirm } = Modal;

class app extends Component {
    constructor(props){
        super(props);
        this.state = {
            formData: {},
            modalFormDate: {},
            pageSize: 10,
            pageNum: 1,
            totalCount: 100,
            tableData: [],
        }
    }
    // 删除用户
    onDelUser = (id) => {
        confirm({
            title: '系统提示',
            icon: <ExclamationCircleOutlined />,
            content: `确定要删除用户${id}吗？`,
            style: { marginTop: 150 },
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              console.log('OK');
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    // 删除用户
    onDelUser = (id) => {
        confirm({
            title: '系统提示',
            icon: <ExclamationCircleOutlined />,
            content: `确定要删除用户${id}吗？`,
            style: { marginTop: 150 },
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              console.log('OK');
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    // 禁用或启用用户
    onDisableUser = (id, auth) => {
        confirm({
            title: '系统提示',
            icon: <ExclamationCircleOutlined />,
            content: `用户将不能再登录系统，确定要${auth ? '启用' : '禁用'}用户${id}吗？`,
            style: { marginTop: 150 },
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                // 确认之后，直接返回登录页
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
          });
    }
    getColumns = () => {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '身份类型',
                dataIndex: 'type',
                key: 'type',
                render: (text, record) => (
                    <Tag color={record.type ?'volcano': 'cyan'}>{record.type ? '管理员': '用户'}</Tag>
                )
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title: '最后一次登录时间',
                dataIndex: 'lastLogTime',
                key: 'lastLogTime',
            },
            {
                title: '操作',
                key: '',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={ () => { this.userManageModal('modify', record)}}>修改用户信息</a>
                        <a onClick={() => {this.onDelUser(record.id)}}>删除</a>
                        <a onClick={() => {this.onDisableUser(record.id, record.status)}}>
                            {
                                record.status ?
                                '禁用' :
                                '启用' 
                            }
                        </a>
                    </Space>
                ),
              },
          ];
    }

    componentDidMount(){
        this.handleGetUserList();
    }

    handleGetUserList = () => {
        const { pageSize, pageNum } = this.state;
        const params = {
            pageSize,
            currentPage: pageNum,
        };
        $ajax.common({
            method: 'get',
            api: APIS.getUserList,
            params,
            contentType: 'json',
        }).then(res => {
            if (res.code === 10000 && res.success === true) { 
                const { currentPage, totalCount, dataList, size } = res.data;
                this.setState({
                    pageSize: size,
                    pageNum: currentPage,
                    totalCount: totalCount,
                    tableData: dataList,
                })
            }
        }).catch(err => {
            console.log('err------',err);
        })
    }

    onChangePage = (page, pageSize) => {
        this.setState({
            currentPage: page,
            pageSize,
        }, this.handleGetUserList);
    }

    handleChangeItem = (filedName, value) => {
        console.log('filedName, value', filedName, value)
        const { formData } = this.state;
        const tempFormDate = Object.assign({}, formData, { [filedName]: value });
        this.setState({
            formData: tempFormDate,
        });
    }


    onSubmit = () => {
        console.log('submit提交表单',this.state.formData);
    }


    handleChangeModalItem = (filedName, value) => {
        console.log('filedName, value', filedName, value)
        const { modalFormDate } = this.state;
        const tempModalFormDate = Object.assign({}, modalFormDate, { [filedName]: value });
        this.setState({
            modalFormDate: tempModalFormDate,
        });
    }
    // 确认添加或修改
    onOkModify = (type, record) => {
        const { modalFormDate } = this.state;
        if(type === 'add') {
            console.log('新增数据', type,modalFormDate);
            // 请求返回之后，modalFormDate清空
        }
        if( type === 'modify'){
            const tempModalFormDate = Object.assign({}, record, modalFormDate,);
            console.log('修改数据',type,tempModalFormDate);
            // 请求返回之后，modalFormDate清空
        }
    }

    // 添加或修改弹窗
    userManageModal = (type, record) => {
        const { modalFormDate } = this.state;
        return (
            confirm({
                title: type === 'modify' ? '修改用户信息' : '增加用户',
                icon: <ExclamationCircleOutlined />,
                content: (
                    <Form
                        name="basic"
                        layout="Horizontal"
                        initialValues={record}
                    >
                        <Form.Item
                            label={type === 'add' ? "初始用户名": "修改用户名"}
                            name="username"
                        >
                            <Input
                                placeholder="请输入用户名"
                                value={modalFormDate.username}
                                onChange={ (e) => { this.handleChangeModalItem('username', e.target.value)}}
                            />
                        </Form.Item>
                        <Form.Item
                            label={type === 'add' ? "初始密码": "重置密码"}
                            name="password"
                        >
                            <Input
                                placeholder="请输入密码"
                                value={modalFormDate.password}
                                onChange={ (e) => { this.handleChangeModalItem('password', e.target.value)}}
                            />
                        </Form.Item>
                    </Form>
                ),
                style: { marginTop: 150 },
                okText: '保存',
                okType: 'danger',
                cancelText: '取消',
                onOk: () => {
                    this.onOkModify(type, record);
                },
                onCancel: () => {
                    console.log('不保存')
                },
            })      
        )
    }

    render() {
        const { modalFormDate, pageSize, pageNum, totalCount, tableData } = this.state;
        return (
            <div style={{ padding: 10 }}>
                <Card title={
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>自动组卷系统</Breadcrumb.Item>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>账号管理</Breadcrumb.Item>
                        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    </Breadcrumb>
                }>
                    <Content
                        className="site-layout-background"
                    >
                        <Form
                            name="basic"
                            layout="inline"
                        >
                            <Form.Item
                                label="用户名"
                                name="subject"
                            >
                                <Input
                                    placeholder="请输入用户名"
                                    value={modalFormDate.username}
                                    onChange={ (e) => { this.handleChangeModalItem('username', e)}}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={this.onSubmit}>
                                    查询
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={ () => { this.userManageModal('add', modalFormDate)}}
                                >
                                    添加用户
                                </Button>
                            </Form.Item>
                        </Form>
                    
                        <Table
                            style={{ marginTop: 20 }}
                            bordered
                            columns={this.getColumns()}
                            dataSource={tableData}
                            pagination={false}
                        />
                        <Pagination
                            style={{ float: 'right', marginTop: 20}}
                            showQuickJumper
                            current={pageNum}
                            total={totalCount}
                            pageSize={pageSize}
                            onChange={this.onChangePage}
                        />
                    </Content>
                </Card>
            </div>
        )
    }
}

export default WrappedComponent(app);