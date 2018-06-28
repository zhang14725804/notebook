import React from 'react';
import {Carousel} from 'antd-mobile';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Strings from 'constants/Strings';
import ImageMap from 'utils/ImgMap';
import Net from 'utils/Net';
import * as Actions from 'actions/Ac_ProductDetail';

import './ProductDetail.less';

class ProductDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.location.state.id
        }
    }

    componentDidMount() {
        const {netPro} = this.props;
        const id = this.state.id;
        netPro.fetchProductBaseinfo(id);
        netPro.fetchProductImages(id);
    }

    renderBanners() {
        const {baseinfo} = this.props;
        const {id} = this.state;
        let imgs = [];
        let w = window.document.documentElement.clientWidth + "px";
        if (baseinfo && baseinfo.imgNum && baseinfo.imgNum > 0) {
            for (let i = 1; i <= baseinfo.imgNum; i++) {
                let url = ImageMap.getImageUrlForProductBanner(id, i);
                let node = <div style={{width: '100%', height: w}}>
                    <img src={url} className='prdct-detail-img-bg' style={{minHeight: w, maxHeight: w}}/>
                </div>;
                imgs.push(node);
            }
            return imgs;
        }

        return <div style={{width: '100%', height: w}}>
            <img src='no_pic_def.png' className='prdct-detail-img-bg' style={{minHeight: w, maxHeight: w}}/>
        </div>
    }

    renderImages() {
        const {images} = this.props;
        const {id} = this.state;
        if (images && images.content) {
            return <ImageContent imgId={id} imgCount={images.content}/>;
        }
        return;
    }

    render() {
        let images = this.renderImages();
        return <div className='prdct-detail-bg'>
            <Header {...this.props}/>
            <Carousel>
                {this.renderBanners()}
            </Carousel>
            <BaseInfo/>
            {images}
            <BuyCart/>
        </div>
    }
}


class Header extends React.Component {

    handleBackClick() {
        const {history} = this.props;
        if (history) {
            history.goBack();
        }
    }

    render() {
        return <div className='p-header-bg'>
            <div className='p-header-back-bg' onClick={this.handleBackClick.bind(this)}/>
        </div>
    }
}


class BaseInfo extends React.Component {


    renderTag() {
        return <div className='p-tag'>250g／盒
        </div>
    }

    renderFix(desc, img) {
        return <div className='p-fix-item-bg'>
            <img src={img} className='p-fix-img'/>
            <span className='p-fix-text'>{desc}</span>
        </div>;
    }

    renderLine() {
        return <div className='p-line'/>
    }

    renderSaleAttributes() {
        let tag = this.renderTag();
        let nodes = [];
        nodes.push(tag);
        nodes.push(tag);
        nodes.push(tag);
        nodes.push(tag);
        return <div className='p-sale-bg'>
            <div>
                <span className='p-tag-left-text'>规则：</span>
                {nodes}
            </div>
            <div className='p-sale-top-bg'>
                <span className='p-tag-left-text'>颜色：</span>
                {nodes}
            </div>

        </div>
    }

    renderFixDesc() {
        const that = this;
        let count = 4;
        let nodes = [];
        for (let a = 0; a < count; a++) {
            let fix = that.renderFix(a + "找给你", "../pro/p_fix_" + a + ".png");
            nodes.push(fix);
        }
        return <div className='p-fix-bg'>
            {nodes}
        </div>
    }

    renderSpec() {
        let line = <div className='p-spec-line'/>;
        return <div className='p-spec-wrap-bg'>
            <div className='p-spec-bg'>
                <div className='p-spec-item-bg'>
                    <span className='p-spec-title-bg'>原料产地</span><span className='p-spec-content-bg'>湖北·盱眙县</span>
                </div>
                {line}
                <div className='p-spec-item-bg'>
                    <span className='p-spec-title-bg'>原料产地</span><span className='p-spec-content-bg'>湖北·盱眙县</span>
                </div>
                {line}
                <div className='p-spec-item-bg'>
                    <span className='p-spec-title-bg'>原料产地</span><span className='p-spec-content-bg'>湖北·盱眙县</span>
                </div>
                {line}
                <div className='p-spec-item-bg'>
                    <span className='p-spec-title-bg'>原料产地</span><span className='p-spec-content-bg'>湖北·盱眙县</span>
                </div>
            </div>
        </div>
    }

    render() {
        let line = this.renderLine();
        return <div className='p-baseinfo-bg'>
            <div className='p-baseinfo-title-bg'>奶香面包500g</div>
            <div className='p-baseinfo-subtitle-bg'>EAT大厨经典之作，复购最高。经典口味不容错过</div>
            <div className='p-baseinfo-price-bg'>￥23000.00</div>
            {line}
            {this.renderSaleAttributes()}
            {line}
            {this.renderFixDesc()}
            {this.renderSpec()}
        </div>
    }
}

class ImageContent extends React.Component {

    renderImg() {
        const {imgId, imgCount} = this.props;
        let nodes = [];
        for (let i = 1; i <= imgCount; i++) {
            let url = ImageMap.getImageUrlForProductContent(imgId, i);
            let node = <img src={url} className='p-img-bg'/>;
            nodes.push(node);
        }
        return nodes;
    }

    render() {
        let imgs = this.renderImg();
        return <div>
            {imgs};
        </div>
    }
}

class BuyCart extends React.Component {

    render() {
        return <div className='p-cart-bg'>
            <img className='p-cart-left-bg'/>
            <div className='p-cart-right-bg'>加入购物车</div>
        </div>
    }
}


function mapStateToProps(state) {
    return {
        baseinfo: state.Rd_PBaseinfo.data,
        images: state.Rd_PImageDetail.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        netPro: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);