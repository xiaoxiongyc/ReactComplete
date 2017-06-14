//页脚
import React from 'react';
//导入AD栅格布局
import { Row, Col } from 'antd';

export  default class MobileFooter extends React.Component{

    render(){
        return (
            <footer>
                <Row>
                    <Col span={2}></Col> {/*最左边空两个栅格*/}
                    <Col span={20} className='footer'>
                        &copy;&nbsp;2017 ReactNews. All Rights Reserved.
                    </Col>
                    <Col span={2}></Col>{/*最右边空两个栅格*/}
                </Row>
            </footer>
        );
    };
}