import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Header from 'components/header';
import Strings from 'constants/Strings';
import * as Actions from 'actions/Ac_ProductList';
import ImageMap from 'utils/ImgMap';


import './ProductList.less';
import './Product.less';

class ProductList extends React.Component {

    componentDidMount() {
        const {id} = this.props.location.state;
        const {netFetch} = this.props;
        netFetch.fetchProductList(id, 1, 20);
    }

    renderContent() {
        const that = this;
        const {list} = this.props;
        let nodes = [];
        if (list && list.length > 0) {
            nodes = list.map(function (value, index) {
                return <Product product={value} {...that.props}/>
            })
        }
        return nodes;
    }

    render() {
        const {title} = this.props.location.state;
        return <div className='prdct-list-bg'>
            <Header title={title} {...this.props}/>
            <div className='prdct-list-content-bg'>
                {this.renderContent()}
            </div>
        </div>
    }
}


class Product extends React.Component {


    handleToDetailClick(event) {
        event.stopPropagation();
        const {history, product} = this.props;
        history.push(
            "/productdetail",
            {
                id: product.productId
            }
        )
    }


    render() {
        const {product} = this.props;
        let url = ImageMap.getImageUrlForProductList(product.productId);
        return <div className='prdct-bg' onClick={this.handleToDetailClick.bind(this)}>
            <img className='prdct-img-bg' src={url} alt='no_pic_def.png'/>
            <div className='prdct-title-bg'>{product.productTitle}</div>
            <div className='prdct-subtitle-bg'>{product.productSubtitle}</div>
            <div className='prdct-price-bg'>{"￥" + product.price}</div>
            <div className='prdct-cart-bg'></div>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        list: state.Rd_ProductList.list
    }
}


function mapDispatchToProps(dispatch) {
    return {
        netFetch: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);