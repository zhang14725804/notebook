import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Empty from 'components/empty/Empty';
import * as Actions from 'actions/Ac_Points';

import './PointPage.less';

export const TYPE_POINT_IN = 1;
export const TYPE_POINT_OUT = 2;

class PointPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pointArr: null,
            pageList: null,
            curPage: 1,
            pageCount: 10,
            total: 0
        };
    }

    componentDidMount() {
        const {netPoints, type} = this.props;
        const {curPage, pageCount} = this.state;
        netPoints.fetchPointsDetail(curPage, pageCount, type);
    }

    componentWillReceiveProps(nextProps) {
        const {pageList} = this.state;
        if (nextProps !== this.props && nextProps !== null && nextProps.pageList !== null) {
            this.setState({pageList: nextProps.pageList});
        }
    }

    renderEmpty() {
        const {type} = this.props;
        let empty;
        if (type === TYPE_POINT_IN) {
            empty = <Empty imgSrc={'../my/no_pic_point.png'} imgTop={'1rem'} text={'去逛逛'} textTop={'1rem'}
                           subText={"还没有积分相关记录哦～"}/>;
        } else {
            empty = <Empty subText={"您暂无积分支出"} subTextTop={'1rem'}/>;
        }
        return empty;
    }

    render() {
        const {pointArr, pageList} = this.state;
        let node;
        if (pageList && pageList.length > 0) {
            node = pageList.map(function (value, index) {
                return <PointItem/>;
            })
        } else {
            node = this.renderEmpty();
        }
        return <div className='page-bg'>
            {node}
        </div>
    }
}

class PointItem extends React.Component {

    render() {
        return <div className='point-item-bg'>
            <span className='point-item-left-bg'>
                <div className='point-item-a'>
                    <span className='point-item-t'>新订单成交奖励</span>
                    <span className='point-item-b'>（订单：558877991ssss1111122）</span>
                    {/*sssssssssssssssssssssssssssssssssssssssbsssbssbsbsbsssssbb*/}
                </div>
                <div className='point-item-c'>
                    2017-10-10 20:00:00
                </div>
            </span>
            <span className='point-item-right-bg'>
                +4.44
            </span>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        pageList: state.Rd_Points_Detail.pageList,
        curPage: state.Rd_Points_Detail.curPage,
        pageCount: state.Rd_Points_Detail.pageCount,
        totalCount: state.Rd_Points_Detail.totalCount
    }
}

function mapDispatchToProps(dispatch) {
    return {
        netPoints: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PointPage);