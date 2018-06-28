import React from 'react';

import Header from 'components/header';
import Strings from 'constants/Strings';

import './Customer.less';

export default class Customer extends React.Component {

    constructor(props) {
        super(props);
        this.tipArr = [
            {title: Strings.cstm_tip_title_0, content: Strings.cstm_tip_content_0},
            {title: Strings.cstm_tip_title_1, content: Strings.cstm_tip_content_1},
            {title: Strings.cstm_tip_title_2, content: Strings.cstm_tip_content_2},
            {title: Strings.cstm_tip_title_3, content: Strings.cstm_tip_content_3}
        ];
    }

    render() {

        let tips = this.tipArr.map(function (value, index) {
            return <TipItem key={index} title={value.title} content={value.content}/>
        })

        return <div className='customer-bg'>
            <Header title={Strings.title_customer} {...this.props}/>
            <div className='tips-top'>
                {tips}
            </div>
            <div className='cstm-call-bg'>
                <a href="tel:021-60737577" style={{color: '#ffffff'}}>客服电话 021-60737577</a>
            </div>
            <p className='cstm-time-range'>客服服务时间为每天10：00-22：00</p>
        </div>
    }
}


class TipItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleArrowClick() {
        const {open} = this.state;
        this.setState({open: !open});
    }

    render() {
        const {open} = this.state;
        const {title, content} = this.props;
        return <div>
            <div className='tip-title-bg'>
                <span>{title}</span>
                <i className={open ? 'tip-title-arrow-up' : 'tip-title-arrow-down'}
                   onClick={this.handleArrowClick.bind(this)}></i>
            </div>
            <p className='tip-content' style={{display: open ? 'block' : 'none'}}>
                {content}
            </p>
        </div>
    }
}