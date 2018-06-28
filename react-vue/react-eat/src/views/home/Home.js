import React from 'react';
import {Carousel} from 'antd-mobile';


import net from 'utils/Net';

import './Home.less';

class Home extends React.Component {

    componentDidMount() {
        net.requestMd5("/mapi/cms/getPageInfo?pageType=1&templateId=1").then(function (rep) {
            console.log(rep);
        })
    }

    renderBanner() {
        let d = <div><img src={'https://m.ueater.com/mIndex/img/banner_01Alcohol.jpg'}/></div>;
        let d1 = <div><img src={'https://m.ueater.com/mIndex/img/banner_01year.jpg'}/></div>;
        let nodes = [];
        nodes.push(d);
        nodes.push(d1);
        return nodes;
    }

    renderTips() {
    }

    render() {
        return <div className='home-bg'>
            <Header/>
            <Carousel>
                {this.renderBanner()}
            </Carousel>

        </div>
    }
}


class Header extends React.Component {

    render() {
        return <div className='hm-hd-bg'>
            <div className='hm-hd-loc-img-bg'/>
            <span className='hm-hd-loc-text-bg'>定位失败</span>
            <div className='hm-hd-logo-bg'/>
            <div className='hm-bd-sh-bg'/>
            <div className='hm-bd-msg-bg'/>
        </div>
    }
}

export default Home;