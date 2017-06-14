import React from 'react';
import { Row, Col, Tabs, Carousel } from 'antd';
const TabPane = Tabs.TabPane;
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';

export default class PCNewsContainer extends React.Component{

    render(){
        //轮播图的参数设置
        const settings = {
            dots:true,//是否显示面板指示点
            infinite:true,//文字环绕
            speed:500,//速度
            slidesToShow:1,//从哪张开始
            autoplay:true,//自动播放
        };
        return(
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
                        {/*图片列表*/}
                        <PCNewsImageBlock
                            count={3} type="top" width="400px" cardTitle="头条新闻"
                            imageWidth="112px"
                        />
                    </div>
                    {/*新闻列表*/}
                    <Tabs className="tabs_news">

                        <TabPane tab="头条新闻" key="1">
                            {/*调用PCNewsBlock 并传递参数 type(类型) count(数量)*/}
                            <PCNewsBlock count={20} type='guoji' width="100%" border="false"/>
                        </TabPane>

                        <TabPane tab="国际" key="2">
                            {/*调用PCNewsBlock 并传递参数 type(类型) count(数量)*/}
                            <PCNewsBlock count={20} type='guoji' width="100%" border="false"/>
                        </TabPane>

                        <TabPane tab="社会" key="3">
                            {/*调用PCNewsBlock 并传递参数 type(类型) count(数量)*/}
                            <PCNewsBlock count={20} type='shehui' width="100%" border="false"/>
                        </TabPane>

                        <TabPane tab="娱乐" key="4">
                            {/*调用PCNewsBlock 并传递参数 type(类型) count(数量)*/}
                            <PCNewsBlock count={20} type='yule' width="100%" border="false"/>
                        </TabPane>

                    </Tabs>

                    {/*<Tabs className="tabs_product">*/}
                        {/*<TabPane tab="ReactNews 产品" key="1">*/}
                            {/*<PCProduct/>*/}
                        {/*</TabPane>*/}
                    {/*</Tabs>*/}

                    <div>
                        <PCNewsImageBlock
                            count={6} type="guoji" width="100%" cardTitle="国际新闻"
                            imageWidth="132px"
                        />
                        <PCNewsImageBlock
                            count={6} type="guonei" width="100%" cardTitle="国内新闻"
                            imageWidth="132px"
                        />
                    </div>
                </Col>

                <Col span={2}></Col>
            </Row>
        );
    };
}