//新闻详情
import React from 'react';
import { Row, Col, BackTop ,Card,Tabs, Carousel} from 'antd';
const TabPane = Tabs.TabPane;
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import PCNewsBlock from './pc_news_block';

//导入fetch依赖包
require('babel-polyfill');
require('es6-promise').polyfill();
import 'whatwg-fetch';

export default class PCBlock extends React.Component{

    render(){
        //轮播图的参数设置
        const settings = {
            dots:true,//是否显示面板指示点
            infinite:true,//文字环绕
            speed:500,//速度
            slidesToShow:1,//从哪张开始
            autoplay:true,//自动播放
        };
        return (
            <div>
                <PCHeader/>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className='container'>
                        <div className="leftContainer">
                            {/*轮播图*/}
                            <div className="carousel">
                                <Carousel {...settings}>
                                    <div><img src="./src/images/carousel_1.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_2.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_3.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_4.jpg" alt=""/></div>
                                </Carousel>
                            </div>

                <PCNewsImageBlock
                    count={6} type={this.props.params.type} width="100%" cardTitle="相关新闻"
                    imageWidth="112px"
                />
                </div>
                 {/*新闻列表*/}
                    <div>
                        <Tabs className="tabs_news">
                            <TabPane tab="最新消息" key="1">
                                <PCNewsBlock count={20} type={this.props.params.type} width="100%" border="false"/>
                            </TabPane>
                        </Tabs>
                    </div>
                    </Col>
                <Col span={2}></Col>
                </Row>
                <PCFooter/>
            </div>
        )
    }
}