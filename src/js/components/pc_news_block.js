//新闻列表页面
import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router';

//导入fecth依赖包
require('babel-polyfill');
require('es6-promise').polyfill();
import 'whatwg-fetch';

export default class PCNewsBlock extends React.Component{
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
        // this.props.type count 将取得的类型和参数 交给组件的调用者 这就利用了组件间通信
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
            + this.props.type + "&count=" + this.props.count, myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({news: json}));

    }
    render(){
        const { news } = this.state;
        const newslist = news.length
        ?
            news.map((newsItem,index) =>(
                <li key={index}>
                    <Link to={`details/${newsItem.uniquekey}`} target='_blank'>
                        {newsItem.title}
                    </Link>
                </li>
            ))
        :
        '没有加载到任何新闻';
        return(
            <div className="topNewsList">
                <Card>
                    <ul>
                        {newslist}
                    </ul>
                </Card>
            </div>
        );
    };
}