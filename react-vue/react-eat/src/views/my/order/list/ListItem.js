import React from 'react';

import './OrderList.css';
import './List.css';

import imgMap from 'utils/ImgMap';

export default class ListItem extends React.Component {

    handleItemClick(event) {
        const that = this;
        that.props.history.push('/orderdetail');
        event.stopPropagation();
    }

    handleStatusClick(opType, event) {
        const {history} = this.props;
        if (opType === 0) {
            history.push('/paycenter');
            event.stopPropagation();
        } else if (opType === 1) {

        }
    }

    getPriceStr(item) {
        const {type, needPay, payedAmount} = item;
        let prex = "已支付";
        let price = payedAmount;
        if (type === 0 || type === 4) {
            prex = "需支付";
            price = needPay;
        }
        return prex + "：¥" + price;
    }

    getBtnStatus(item) {
        const {payment, confirmReceipt} = item;
        let show = false;
        let text = "";
        let opType = -1;
        if (payment) {
            opType = 0;
            show = true;
            text = "去支付"
        } else if (confirmReceipt) {
            opType = 1;
            show = true;
            text = "确认收货"
        }
        return {show: show, text: text, opType: opType};
    }

    render() {
        const that = this;
        const item = this.props.item;
        const time = item.orderStatusTime;
        let date = new Date(time);
        let datestr = `${date.getHours()}:${date.getMinutes()} ${item.prompt}`;
        let priceStr = that.getPriceStr(item);
        let btn = that.getBtnStatus(item);
        let btnVisible = btn.show ? "visibilty" : "hidden";
        let imgs = [];
        imgs = item.products.map(function (value, index) {
            return <img key={index} className='list-item-img' src={imgMap.getImageUrlForOrder(value.productId)}/>
        })

        return <div className='list-item-bg' onClick={that.handleItemClick.bind(that)}>
            <div className='list-item-header-bg'>
                <span style={{
                    flex: 1,
                    alignSelf: 'flex-start',
                    textAlign: 'start',
                    paddingLeft: '0.2rem'
                }}>{datestr}</span>
                <span style={{
                    color: '#D4291D',
                    fontSize: '0.28rem',
                    alignSelf: 'flex-end',
                    paddingRight: '0.2rem'
                }}>{item.statusValue}</span>
            </div>
            <div className='list-item-body-bg'>
                {/*<img className='list-item-img' src='../list_item_no_pic.jpg'/>*/}
                {/*<img className='list-item-img' src='../list_item_no_pic.jpg'/>*/}
                {/*<img className='list-item-img' src='../list_item_no_pic.jpg'/>*/}
                {/*<img className='list-item-img' src='../list_item_no_pic.jpg'/>*/}
                {/*<img className='list-item-img' src='../list_item_no_pic.jpg'/>*/}
                {imgs}
            </div>
            <div className='list-item-footer-bg'>
                <span style={{
                    flex: 1,
                    alignSelf: 'flex-start',
                    textAlign: 'start',
                    paddingLeft: '0.2rem'
                }}>{priceStr}</span>

                <div style={{
                    alignSelf: 'flex-end',
                    paddingRight: '0.2rem',
                }}>
                     <span style={{
                         color: '#ffffff',
                         fontSize: '0.28rem',
                         paddingLeft: '0.5rem',
                         paddingRight: '0.5rem',
                         paddingTop: '0.08rem',
                         paddingBottom: '0.08rem',
                         backgroundColor: '#D42A1D',
                         borderColor: '#D42A1D',
                         borderWidth: '0.02rem',
                         borderStyle: 'solid',
                         borderRadius: '0.45rem',
                         visibility: btnVisible
                     }} onClick={that.handleStatusClick.bind(that, btn.opType)}>{btn.text}</span>
                </div>

            </div>
        </div>
    }
}