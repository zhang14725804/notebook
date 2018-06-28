import net from 'net';
import mapi from 'mapi';
import {
    REQ_POINTS_COUNT_START, REQ_POINTS_COUNT_SUCC, REQ_POINTS_COUNT_FAIL,
    REQ_POINTS_DETAIL_START, REQ_POINTS_DETAIL_SUCC, REQ_ADDRESSLIST_FAIL, REQ_POINTS_DETAIL_FAIL
}
    from './ActionTypes'

export function fetchPointsCount() {
    return function (dispatch) {
        dispatch({type: REQ_POINTS_COUNT_START});
        net.request(mapi.my.getPointCount.path)
            .then(function (rep) {
                if (rep.code === 0) {
                    dispatch({type: REQ_POINTS_COUNT_SUCC, data: rep.data});
                } else {
                    dispatch({type: REQ_POINTS_COUNT_FAIL, data: null});
                }
            })
    }
}

export function fetchPointsDetail(curPage, pageCount, pointType) {
    return function (dispatch) {
        dispatch({type: REQ_POINTS_DETAIL_START, pageList: null});
        let query = `currentPage=${curPage}&pageCount=${pageCount}&positive=${pointType}`;
        net.request(mapi.my.getPointDetail.path + "?" + query)
            .then(function (rep) {
                if (rep.code === 0) {
                    dispatch({
                        type: REQ_POINTS_DETAIL_SUCC,
                        pageList: rep.pageList,
                        basePagination: rep.basePagination
                    });
                } else {
                    dispatch({
                        type: REQ_POINTS_DETAIL_FAIL,
                        pageList: null,
                        basePagination: rep.basePagination
                    });
                }
            });
    }

}