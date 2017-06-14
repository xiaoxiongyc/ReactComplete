//页头
import React from 'react';
import { Row,Col,Tabs,message,Form,Input,Button,CheckBox,Modal,Menu,Icon} from 'antd';
import { Link } from 'react-router';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

//导入fetch依赖包
require('babel-polyfill');
require('es6-promise').polyfill();
import 'whatwg-fetch';

class MobileHeader extends React.Component{

    constructor(){
        super();
        this.state = {
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
        }
    };

    //对话框的显示与隐藏
    setModalVisible(value){
        this.setState({modalVisible:value});
    };

    //表单提交函数
    handleSubmit(e){
        //  页面开始向 api 提交数据
        e.preventDefault();
        var myFetchOptions = {
            method : 'Get',
        };

    //获取表单的所有数据
        var formData = this.props.form.getFieldsValue();

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
            + "&username="+formData.userName+"&password="+formData.password
            +"&r_userName=" + formData.r_userName + "&r_password="
            + formData.r_password + "&r_confirmPassword="
            + formData.r_confirmPassword, myFetchOptions)
            .then(response => response.json())//json格式化 然后再使用json数据
            .then(json => {
                this.setState({userNickName: json.NickUserName, userid: json.UserId});
                localStorage.userid= json.UserId;
                localStorage.userNickName = json.NickUserName;
            });
        //登录 注册成功之后
        if(this.state.action == 'login'){
            //表明已经登录
            this.setState({hasLogined : true});
        }
        message.success("请求成功");
        this.setModalVisible(false);
    };

    //点击setting图标 显示注册对话框
    login(){
        this.setModalVisible(true);
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

    //退出 回调函数
    logout(){
        localStorage.userNickName = '';
        localStorage.userid = '';
        this.setState({hasLogined:false});
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        //登录之前和之后显示的样式
        var userShow = this.state.hasLogined
        //登录成功之后显示
        ?
        <Link to={`/usercenter`}>
            <Icon type="inbox" />
         </Link>
        : <Icon type="setting" onClick={this.login.bind(this)}/>
        return (
            <div id="mobileheader">
                <header>
                    <Link to={`/`}>
                    <img src="./src/images/logo.png" alt="logo"/>
                    <span>ReactNews</span>
                    </Link>
                    {userShow}
                </header>

                {/*一个隐藏的Modal框*/}
                <Modal
                    title="用户中心" wrapClassName="vertial-center-modal"
                    visible={this.state.modalVisible}
                    onCancel={()=>this.setModalVisible(false)}
                    onOk={()=>this.setModalVisible(false)}
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
            </div>

        );
    };
}

export  default MobileHeader = Form.create()(MobileHeader);