import React from 'react';
import Header from 'components/header';

export default class OrderDetail extends React.Component {

    render() {
        return <div style={{height: 'inherit', width: '100%', display: 'flex', flexDirection: 'column'}}>
            <Header title={'订单详情'} {...this.props}/>
            <div style={{flex: 1, width: '100%', color: '#f4f4f4'}}>
            </div>
        </div>
    }
}

