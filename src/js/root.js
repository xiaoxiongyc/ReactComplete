import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
//导入AntDesign样式
import 'antd/dist/antd.css';

import PCIndex from './components/pc_index';
import PCNewsDetails from './components/pc_news_details';
import MobileIndex from './components/mobile_index';
import MobileNewsDetails from './components/mobile_news_details';
import PCUserCenter from './components/pc_usercenter';
import MobileUserCenter from './components/mobile_usercenter';
import PCBlock from './components/pc_block';

//导入MediaQuery  移动端适配
var MediaQuery = require('react-responsive');

export  default class Root extends React.Component{
    render(){
        return (
           <div>
               <MediaQuery query='(min-device-width:1224px)'>
                   {/*PC端*/}
                   <Router history={hashHistory}>
                       {/*默认的页面为 PCIndex */}
                       <Route path="/" component={PCIndex}></Route>
                       {/*详情页面*/}
                       {/*用Link调用时 传递uniquekey 到 PCNewsDetails 页面的url中 从而显示页面*/}
                       <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
                       {/*个人中心*/}
                       <Route path="/usercenter" component={PCUserCenter}></Route>

                       <Route path="/pcblock/:type" component={PCBlock}></Route>

                   </Router>
               </MediaQuery>
                <MediaQuery query='(max-device-width:1224px)'>
                  {/*Mobile端*/}
                    <Router history={hashHistory}>
                        <Route path="/" component={MobileIndex}></Route>
                        {/*详情页面*/}
                        {/*用Link调用时 传递uniquekey 到 PCNewsDetails 页面的url中 从而显示页面*/}
                        <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
                        {/*个人中心*/}
                        <Route path="/usercenter" component={MobileUserCenter}></Route>
                    </Router>
               </MediaQuery>


           </div>
        );
    };
}

ReactDOM.render(
    <Root/>,
    document.getElementById('mainContainer')
);
