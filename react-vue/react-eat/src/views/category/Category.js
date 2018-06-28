import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Header from 'components/header';
import ListTab from 'components/listtab/ListTab';
import Strings from 'constants/Strings';
import * as Actions from 'actions/Ac_Category';
import CategoryPage from './CategoryPage';

import './Category.less';

class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: null,
            selectIndex: 0
        };
    }

    handleItemClick(index) {
        this.setState({selectIndex: index});
    }

    componentDidMount() {
        const {netCategory} = this.props;
        netCategory.fetchCategory();
    }

    componentWillReceiveProps(nextProps) {
        const {category} = nextProps;
        if (this.props !== nextProps && category !== undefined && category !== null && category.length > 0) {
            this.setState({category});
        }
    }

    renderCategory() {
        const that = this;
        const {category} = this.props;
        const {selectIndex} = this.state;
        let nodes = [];
        if (category && category.length > 0) {
            let cate = category[selectIndex];
            let cates = cate.list;
            if (cates) {
                nodes = cates.map(function (value, index) {
                    return <CategoryPage title={value.name} cates={value.list} {...that.props}/>;
                })
            }
        }
        return nodes;
    }

    render() {
        const that = this;
        const {category, selectIndex} = this.state;
        let tabs;
        if (category && category.length > 0) {
            tabs = category.map(function (value, index) {
                return <ListTab index={index} selectIndex={selectIndex} clzDef={'cate-tab-def-bg'}
                                clzSlt={'cate-tab-slt-bg'} title={value.name}
                                tabClick={that.handleItemClick.bind(that)}/>
            })
        }

        return <div style={{height: '100%'}} className='cate-bg'>
            <Header title={Strings.title_category} visibleBack={'hidden'}/>
            <div className='cate-content-bg'>
                <div className='cate-left-bg'>
                    {tabs}
                </div>
                <div className='cate-right-bg'>
                    {that.renderCategory()}
                </div>
            </div>
        </div>
    }
}


function mapStateToProps(state) {
    return {
        category: state.Rd_Category.category
    }
}

function mapDispatchToProps(dispatch) {
    return {
        netCategory: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);