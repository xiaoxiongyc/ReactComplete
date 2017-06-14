import React from 'react';
import { Row,Col,Tabs,Button,Modal,Upload,Icon,Card} from 'antd';
const TabPane = Tabs.TabPane;

//导入fetch依赖包
require('babel-polyfill');
require('es6-promise').polyfill();
import 'whatwg-fetch';

import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';


export default class MobileUserCenter extends React.Component {

    constructor(){
        super();
        this.state = {
            //头像参数
            previewVisible:false,
            previewImage:'',
            //收藏参数
            usercollection:'',
            //评论参数
            usercomments:'',
        };
    };

    handleCancel(){
        this.setState({previewVisible:false})
    };

    componentDidMount(){
        var myFetchOptions = {
            method:'GET'
        };
        //从后台取到收藏列表 并加载
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="
            + localStorage.userid, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({usercollection:json});
            });
        //从后台请求评论列表
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid="
            +localStorage.userid, myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({usercomments:json});
            });
    };

    render(){

        const props = {
            action: 'http://newsapi.gugujiankong.com/handler.ashx',
            // headers: {
            //     "Access-Control-Allow-Origin": "*"
            // },
            listType: 'picture-card',
            //默认列表
            defaultFileList: [
                {
                    uid: -1,
                    name: 'xxx.png',
                    state: 'done',
                    url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                    thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
                }
            ],
            //点击文件链接或预览图标时的回调
            //file 当前操作的文件对象
            onPreview: (file) => {
                this.setState({
                    previewImage: file.url,
                    previewVisible: true
                });
            }
        };

        //生成收藏列表
        const { usercollection } = this.state;
        {/* extra 卡片右上角的操作区域*/}
        const userCollectionList = usercollection.length
            ? usercollection.map((uc,index) =>(
            <Card
                title={uc.uniquekey} key={index}
                extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>}>
                <p>{uc.Title}</p>
            </Card>
        ))
            :
            "您还没有收藏新闻，快去收藏一些新闻吧！";

        //生成评论列表
        const { usercomments } = this.state;
        const usercommentsList = usercomments.length
            ? usercomments.map((comment,index) => (
            <Card
                key={index}
                title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
                extra={<a href={`/#/details/${comment.uniquekey}`}></a>}
            >
                <p>{comment.Comments}</p>
            </Card>
        ))
            :"您还没有评论任何文章，快去评论吧！";

        return (
            <div>
                <MobileHeader/>
                <Row>
                    <Col span={24}>
                        <Tabs>
                            {/*AntDesign要求统一元素下 要有不同的key 所以即使后面用不到key 也要指定*/}
                            <TabPane tab="我的收藏列表" key="1">

                                    <Row>
                                        <Col span={24}>{userCollectionList}</Col>
                                    </Row>

                            </TabPane>

                            <TabPane tab="我的评论列表" key="2">
                                    <Row>
                                        <Col span={24}>{usercommentsList}</Col>
                                    </Row>
                            </TabPane>

                            <TabPane tab="头像设置" key="3">
                                <div className="clearfix">
                                    <Upload {...props}>
                                        <Icon type="plus"/>
                                        <div className="ant-upload-text">上传照片</div>
                                    </Upload>
                                    {/*点击预览之后显示*/}
                                    <Modal visible ={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                                        <img alt="预览" src={this.state.previewImage}/>
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <MobileFooter/>
            </div>
        );
    };
}