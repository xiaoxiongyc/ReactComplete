//评论模块
import React from 'react';
import { Row,Col,Form,Input,Button,Card,notification} from 'antd';
const FormItem = Form.Item;

//导入fetch依赖包
require('babel-polyfill');
require('es6-promise').polyfill();
import 'whatwg-fetch';

class CommonComments extends React.Component{
    constructor(){
        super();
        this.state = {
            comments:''
        }
    };

    //提交评论的回调函数
    handleSubmit(e){
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        //将用户的评论存储到后端
        var formdata = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="
            + localStorage.userid
            + "&uniquekey=" + this.props.uniquekey
            + "&commnet=" + formdata.remark, myFetchOptions)
            .then(response => response.json())
            //添加评论之后，将所有评论重新加载
            .then(json => {
            this.componentDidMount();
        });
    };

    //从后端取得所有评论
    componentDidMount(){
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="
            + this.props.uniquekey, myFetchOptions)
            .then(response => response.json())
            .then(json => {
            this.setState({comments: json});
            });
    };

    //收藏Button回调函数
    addUserCollection(){
        var myFetchOptions = {
            method:'GET'
        };
        //收藏文章 传入 userid uniquekey
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="
            + localStorage.userid
            + "&uniquekey=" + this.props.uniquekey, myFetchOptions)
            .then(response => response.json())
            .then(json => {
            //收藏成功以后进行一下全局的提醒（notification组件）
            notification['success']({
                message: 'ReactNews提醒',
                description: '收藏此文章成功',
             });
            
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const { comments } = this.state;

        const commentList = comments.length
        ?
        comments.map((comment,index) => (
            <Card key={index} title={comment.UserName} extra={<a href="#">发表于{comment.datetime}</a>}>
                <p>{comment.Comments}</p>
            </Card>
        ))
        :
        '';
        return(
            <div className="comment">
                 <Row>
                     <Col span={24}>
                         {/*写下你的评论*/}
                         <Form onSubmit={this.handleSubmit.bind(this)}>
                             <hr/>
                             <FormItem label="您的评论">
                                 {getFieldDecorator('remark', {
                                     initialValue: '',
                                 })(
                                     <Input type="textarea" placeholder="随便写"/>
                                 )}
                             </FormItem>
                             <Button type="primary" htmlType="submit">提交评论</Button>
                             &nbsp; &nbsp;
                             {/*收藏功能*/}
                             <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
                             {/*历史评论*/}
                             {commentList}
                         </Form>
                     </Col>
                 </Row>
            </div>
        );
    };

}

export default CommonComments = Form.create()(CommonComments);