import React from 'react';


import ImageMap from 'utils/ImgMap';
import './CategoryPage.less';

class CategoryPage extends React.Component {


    renderContent() {
        const that = this;
        const {cates} = this.props;
        let nodes = [];
        if (cates) {
            nodes = cates.map(function (value, index) {
                return <CategoryItem subTitle={value.name} value={value} {...that.props}/>
            })
        }

        return nodes;
    }

    render() {
        const {title} = this.props;
        return <div className='cate-page-bg'>
            <div className='cate-page-title'>{title}</div>
            <div className='cate-page-content-bg'>
                {this.renderContent()}
            </div>
        </div>
    }
}


class CategoryItem extends React.Component {

    handleItemClick() {
        const {subTitle, value, history} = this.props;
        history.push(
            "/productlist",
            {
                id: value.id,
                title: subTitle
            }
        )
    }

    render() {
        const {subTitle, value} = this.props;
        let url = ImageMap.getImageUrlForCategory(value.id);
        return <div className='cate-item-bg' onClick={this.handleItemClick.bind(this)}>
            <img src={url} className='cate-item-img-bg'/>
            <div className='cate-item-title-bg'>{subTitle}</div>
        </div>
    }
}

export default CategoryPage;