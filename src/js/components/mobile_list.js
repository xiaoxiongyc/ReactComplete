import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router';

//导入fetch依赖包
require('babel-polyfill');
require('es6-promise').polyfill();
import 'whatwg-fetch';

export default class MobileList extends React.Component{

    constructor(){
        super();
        this.state = {
            //news 用来接收返回的json数据
            news:'',
        }
    };

    //组件加载之前运行
    componentWillMount(){
        var myFetchOptions = {
            method:'GET',
        };
        //this.props.type count 将取得的类型和参数 交给组件的调用者 这就利用了组件间通信
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
            + this.props.type + "&count=" + this.props.count, myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({news: json}));
    }
    render(){
        const { news } = this.state;
        const newslist = news.length
            ?
            news.map((newsItem,index) => (
                <section key={index} className="m_article list-item special_section clearfix">
                    {/*在 `` 中引用变量要加一个 $ 符号*/}
                    <Link to={`details/${newsItem.uniquekey}`}>
                        {/*图标*/}
                        <div className="m_article_img">
                            <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
                        </div>
                        {/*新闻标题*/}
                        <div className="m_article_info">
                            <div className="m_article_title">
                                <span>{newsItem.title}</span>
                            </div>
                            {/*描述信息 [类型][时间]*/}
                            <div className="m_article_desc clearfix">
                                <div className="m_article_desc_l">
                                    <span className="m_article_channel">{newsItem.realtype}</span>
                                    <span className="m_article_channel">{newsItem.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            ))
            :
            '没有加载到任何新闻';
        return(
            <div>
                <Row>
                    <Col span={24}>
                        {newslist}
                    </Col>
                </Row>

            </div>
        );
    };
}
