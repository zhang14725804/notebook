import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Carousel} from 'antd-mobile';

import Header from 'components/header';
import Strings from 'constants/Strings';


import PointPage, {TYPE_POINT_IN, TYPE_POINT_OUT} from './PointPage';
import ListTab from 'components/listtab/ListTab';
import * as Actions from 'actions/Ac_Points';

import './Points.less';

class MemberPoints extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectIndex: 0
        };
        this.pointTitleArr = [
            {title: "收入", pointType: TYPE_POINT_IN},
            {title: "支出", pointType: TYPE_POINT_OUT}
        ];
    }

    handleWhatClick() {

    }

    handleTabChange(index) {
        this.setState({selectIndex: index});
    }

    componentDidMount() {
        const {netPoints} = this.props;
        netPoints.fetchPointsCount();
    }

    getPointsCount() {
        const {pointCount} = this.props;
        if (pointCount !== undefined || pointCount !== null) {
            if(pointCount === 0){
                return "0.00";
            }
            return pointCount;
        }

        return "--.--";
    }

    render() {
        const that = this;
        const {selectIndex} = this.state;

        let count = that.getPointsCount();
        let tabs = this.pointTitleArr.map(function (value, index) {
            return <ListTab key={index} title={value.title} index={index} selectIndex={selectIndex}
                            tabClick={that.handleTabChange.bind(that)} clzDef={'point-tab-def'}
                            clzSlt={'point-tab-slt'}/>
        })


        let pages = this.pointTitleArr.map(function (value, index) {
            return <PointPage key={index} type={value.pointType} index={index} selectIndex={selectIndex}/>
        })

        return <div className='points-bg'>
            <Header title={Strings.title_points} {...this.props} iconRight={'points-what-bg'}
                    rightClick={this.handleWhatClick.bind(this)}/>
            <div className='points-header-bg'>
                <img src='../my/points_tag.png' className='points-tag-img'/>
                <span className='points-count'>{count}</span>
                <span className='points-count-txt'>吃货币</span>
            </div>
            <div>
                {tabs}
            </div>
            <Carousel afterChange={that.handleTabChange.bind(that)} selectedIndex={selectIndex} dots={false}>
                {pages}
            </Carousel>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        pointCount: state.Rd_Points_Count.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        netPoints: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberPoints);
