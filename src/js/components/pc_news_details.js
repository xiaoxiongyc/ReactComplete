//新闻详情
import React from 'react';
import { Row, Col, BackTop } from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_coments';

//导入fetch依赖包
require('babel-polyfill');
require('es6-promise').polyfill();
import 'whatwg-fetch';

export default class PCNewsDetails extends React.Component{
    constructor(){
        super();
        this.state={
            newsItem:''
        }
    };

    //页面加载完成之后 再将内容一次性附赋进去
    componentDidMount(){
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="
            + this.props.params.uniquekey, myFetchOptions)
            .then(response => response.json())
            .then(json => {
            this.setState({newsItem: json});
            //页面标题
            document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
        });
    };

    createMarkUp(){
        //返回新闻内容
        return {__html:this.state.newsItem.pagecontent};
    };


    render(){
        return (
            <div>
                {/*页头*/}
                <PCHeader/>
                <Row>
                    <Col span={2}></Col>
                    {/*新闻详情*/}
                    <Col span={14} className="container">
                        {/*将请求回来的新闻详情直接添加为  div后代html结构 */}
                        <div className="article-content" dangerouslySetInnerHTML={this.createMarkUp()}></div>
                        {/*评论模块*/}
                        <CommonComments uniquekey={this.props.params.uniquekey} />
                    </Col>
                    <Col span={6}>
                        <PCNewsImageBlock
                            count={40} type="top" width="100%" cardTitle="相关新闻"
                            imageWidth="150px"
                        />
                    </Col>
                    <Col span={2}></Col>
                </Row>
                {/*页脚*/}
            <PCFooter/>
                {/*回到顶部*/}
                <BackTop />
            </div>
        );
    };
}