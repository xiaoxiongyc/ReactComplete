//新闻详情
import React from 'react';
import { Row, Col, BackTop } from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import CommonComments from './common_coments';

//导入fetch依赖包
require('babel-polyfill');
require('es6-promise').polyfill();
import 'whatwg-fetch';

export default class MobileNewsDetails extends React.Component{
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
            <div id="mobileDetailContainer">
                {/*页头*/}
                <MobileHeader/>
                <div className="ucmobileList">
                <Row>
                    {/*新闻详情*/}
                    <Col span={24} className="container">
                        {/*将请求回来的新闻详情直接添加为  div后代html结构 */}
                        <div className="article-content" dangerouslySetInnerHTML={this.createMarkUp()}></div>
                        <CommonComments uniquekey={this.props.params.uniquekey}/>
                    </Col>
                </Row>
                {/*页脚*/}
                <MobileFooter/>
                {/*回到顶部*/}
                <BackTop />
                </div>
            </div>
        );
    };
}