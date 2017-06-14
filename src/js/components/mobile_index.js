import React from 'react';
//Carousel 会自动适配移动端
import { Tabs, Carousel} from 'antd';
const TabPane = Tabs.TabPane;

import MobileList from './mobile_list';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';


export  default class MobileIndex extends React.Component {

    render() {
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
                <MobileHeader/>
                <Tabs>
                    <TabPane tab="头条" key="1">
                        {/*轮播图*/}
                        <div className="carousel">
                            <Carousel {...settings}>
                                <div><img src="./src/images/carousel_1.jpg" alt=""/></div>
                                <div><img src="./src/images/carousel_2.jpg" alt=""/></div>
                                <div><img src="./src/images/carousel_3.jpg" alt=""/></div>
                                <div><img src="./src/images/carousel_4.jpg" alt=""/></div>
                            </Carousel>
                        </div>
                        <MobileList count={10} type="top"/>
                    </TabPane>
                    <TabPane tab="社会" key="2">
                        <MobileList count={10} type="shehui"/>
                    </TabPane>
                    <TabPane tab="国内" key="3">
                        <MobileList count={10} type="guonei"/>
                    </TabPane>
                    <TabPane tab="国际" key="4">
                        <MobileList count={10} type="guoji"/>
                    </TabPane>
                    <TabPane tab="娱乐" key="5">
                        <MobileList count={10} type="yule"/>
                    </TabPane>
                </Tabs>
                <MobileFooter/>
            </div>
        );
    };
}