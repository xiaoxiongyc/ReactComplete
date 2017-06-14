//新闻图片列表页面
import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router';

//导入fetch依赖包
require('babel-polyfill');
require('es6-promise').polyfill();
import 'whatwg-fetch';

export default class PCNewsImageBlock extends React.Component{
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
    };

    render(){
        //定义样式
        const styleImage = {
            display : 'bolck',
            width : this.props.imageWidth,
            height : '90px'
        };
        const styleH3 = {
            width:this.props.imageWidth,
            //超过长度显示 ....
            whiteSpace : 'nowrap',
            overflow : 'hidden',
            textOverflow : 'ellipsis'
        };

        const { news } = this.state;
        const newslist = news.length
            ?
            news.map((newsItem,index) =>(
                <div key={index} className="imageblock">
                    <Link to={`details/${newsItem.uniquekey}`} target='_blank'>
                        {/*图片*/}
                       <div className="custom-image">
                           <img style={styleImage} src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
                       </div>
                        {/*图片下方标题*/}
                        <div className="custom-card">
                            <h3 style={styleH3}>{newsItem.title}</h3>
                            <p style={styleH3}>{newsItem.author_name}</p>
                        </div>
                    </Link>
                </div>
            ))
            :
            '没有加载到任何新闻';
        return(
            <div className="topNewsList">
                <Card title={this.props.cardTitle} style={{width:this.props.width}} bordered={true}>
                    {newslist}
                </Card>
            </div>
        );
    };
}