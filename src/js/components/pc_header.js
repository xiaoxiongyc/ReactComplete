//首先通过Tabs的 callback函数(key=1 or 2)确定 login or register 并通过setState改变 action的值
//handleSubmit函数通过action的值判断是登录还是注册 如果是登录 通过setState改变 hasLogined的值
//setState导致重新render 这时通过this.state.hasLogined 判断应该显示用户名 还是 注册/登录
//退出功能的实现：绑定click事件 清空localStorage 并将 hasLogined 改为 false

import React from 'react';
import { Row,Col,Tabs,message,Form,Input,Button,CheckBox,Modal,Menu, Icon} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


import { Link } from 'react-router';

//导入fetch依赖包
require('babel-polyfill');
require('es6-promise').polyfill();
import 'whatwg-fetch';

class PCHeader extends React.Component{
    constructor(){
        super();
        this.state={
            current:'top', //绑定当前选定的导航栏
            modalVisible:false, //是否显示modal框
            action:'login', //登录或注册
            hasLogined:false, //是否登录
            userNickName:'', //用户昵称
            userid:0 //userid
        }
    };

    //登录状态下, 刷新之后仍保持登录状态; 组件将要加载之前
    componentWillMount(){
        if(localStorage.userid != ''){
            this.setState({hasLogined:true});
            //对第一次登录时，在回调函数submit中，通过setState设置userNickName和userid
            //重新刷新之后，不会再次调用submit函数，所以要重新setState
            this.setState({
                userNickName:localStorage.userNickName,
                userid:localStorage.userid
            });
        }
    };

    //对话框的显示与隐藏
    setModalVisible(value){
        this.setState({modalVisible:value});
    };

    //导航栏的click事件
    handleClick(e){
        //点击'注册'时
        if(e.key == 'register'){
            this.setState({current:'register'});
            //显示注册对话框
            this.setModalVisible(true);
        }
        // else{
        //     //让点击的高亮
        //     this.setState({current:e.key});
        // }
    };

    //表单提交函数
    handleSubmit(e){
    //  页面开始向 api 提交数据
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };

        //获取表单的所有数据
        var formData = this.props.form.getFieldsValue();

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
            + "&username="+formData.userName+"&password="+formData.password
            +"&r_userName=" +formData.r_userName+"&r_password="
            + formData.r_password + "&r_confirmPassword="
            + formData.r_confirmPassword, myFetchOptions)
            .then(response => response.json())//json格式化 然后再使用json数据
            .then(json => {
                this.setState({userNickName: json.NickUserName, userid: json.UserId});
                localStorage.userid = json.UserId;
                localStorage.userNickName = json.NickUserName;
            });

        //登录 注册成功之后
        if(this.state.action == 'login'){
            //表明已经登录
            this.setState({hasLogined : true});
        }
        message.success("请求成功");
        this.setModalVisible(false);
        console.log(this.state.action);

    };

    //Tabs切换时的回调函数 通过 TabPane 中 key 的切换实现不同的功能
    callback(key){
        if(key == 1){
            this.setState({action:'login'});
        }
        else if(key == 2){
            this.setState({action:'register'})
        }
    };

    //退出 Button 的回调函数
    logout(){
        localStorage.userid = '';
        localStorage.UserNickName = '';
        //退出之后 改变状态 显示 "登录/注册"
        this.setState({hasLogined:false});
    };

    render(){
        let {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined
        ?
            <Menu.Item key="logout" className="register">
            {/*登录成功之后 Button上直接显示用户昵称*/}
            <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
            &nbsp; &nbsp;
            {/*导航到个人中心*/}
            <span>
            <Link to={`/usercenter`}  target="_blank" >
                <Button type="dashed" htmlType="button">个人中心</Button>
            </Link>
            </span>
            &nbsp; &nbsp;
            {/*退出登录*/}
            <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出登录</Button>
          </Menu.Item>
        :
            <Menu.Item key="register" className="register">
                <Icon type="appstore"/>注册/登录
            </Menu.Item>

        return (
            <header>
                <Row>
                    <Col span={2}></Col> {/*最左边空两个栅格*/}
                    <Col span={4}>{/*logo*/}
                        <a href="/" className="logo">
                            <img src="./src/images/logo.png" alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={16}>{/*导航*/}
                    <Menu
                        mode="horizontal"
                        defaultSelectedKeys={['top']}
                        selectedKeys={[this.state.current]}
                        onClick={this.handleClick.bind(this)}
                    >
                        <Menu.Item key="top">
                            <Link to={`/pcblock/top`} target='_blank'>
                            <Icon type="mail" />头条
                            </Link>
                        </Menu.Item>

                         <Menu.Item key="shehui">
                             <Link to={'/pcblock/shehui'} target='_blank'>
                             <Icon type="appstore" />社会
                             </Link>
                        </Menu.Item>

                         <Menu.Item key="guonei">
                             <Link to={`/pcblock/guonei`} target='_blank'>
                            <Icon type="appstore" />国内
                           </Link>
                        </Menu.Item>

                         <Menu.Item key="guoji">
                             <Link to={`/pcblock/guoji`} target='_blank'>
                            <Icon type="appstore" />国际
                             </Link>
                        </Menu.Item>

                        <Menu.Item key="yule">
                            <Link to={`/pcblock/yule`} target='_blank'>
                            <Icon type="appstore" />娱乐
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="tiyu">
                            <Link to={`/pcblock/tiyu`} target='_blank'>
                            <Icon type="appstore" />体育
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="keji">
                            <Link to={`/pcblock/keji`} target='_blank'>
                            <Icon type="appstore" />科技
                            </Link>
                        </Menu.Item>
                        {userShow}
                    </Menu>

                    {/*一个隐藏的Modal框*/}
                    <Modal
                        title="用户中心" wrapClassName="vertial-center-modal"
                        visible={this.state.modalVisible}
                        onCancel={() => this.setModalVisible(false)}
                        onOk={() => this.setModalVisible(false)}
                        okText="关闭">

                        <Tabs type="card" onChange={this.callback.bind(this)}>

                            <TabPane tab="登录" key="1">
                                <Form onSubmit={this.handleSubmit.bind(this)}>
                                    <FormItem label="账户">
                                        {getFieldDecorator('userName', {
                                            rules: [{ required: true, message: '请输入您的账号!' }],
                                        })(
                                            <Input type="text" placeholder="请输入您的账号" />
                                        )}
                                    </FormItem>
                                    <FormItem label="密码">
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: '请输入您的密码!' }],
                                        })(
                                            <Input type="password" placeholder="请输入您的账号" />
                                        )}
                                    </FormItem>
                                    <Button type="primary" htmlType="submit">登录</Button>
                                </Form>
                            </TabPane>

                            <TabPane tab="注册" key="2">
                                <Form onSubmit={this.handleSubmit.bind(this)}>
                                    <FormItem label="账户">
                                        {getFieldDecorator('r_userName', {
                                            rules: [{ required: true, message: '请输入您的账号!' }],
                                        })(
                                            <Input type="text" placeholder="请输入您的账号" />
                                        )}
                                    </FormItem>
                                    <FormItem label="密码">
                                        {getFieldDecorator('r_password', {
                                            rules: [{ required: true, message: '请输入您的密码!' }],
                                        })(
                                            <Input type="password" placeholder="请输入您的账号" />
                                        )}
                                    </FormItem>
                                    <FormItem label="确认密码">
                                        {getFieldDecorator('r_confirmPassword', {
                                            rules: [{ required: true, message: '请再次输入您的密码!' }],
                                        })(
                                            <Input type="password" placeholder="请输入您的账号" />
                                        )}
                                    </FormItem>
                                    <Button type="primary" htmlType="submit">注册</Button>
                                </Form>
                            </TabPane>

                        </Tabs>
                    </Modal>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
        ;
    };
}

export default PCHeader = Form.create()(PCHeader);