import {
    REQ_POINTS_COUNT_START, REQ_POINTS_COUNT_SUCC, REQ_POINTS_COUNT_FAIL,
    REQ_POINTS_DETAIL_START, REQ_POINTS_DETAIL_SUCC, REQ_POINTS_DETAIL_FAIL
}
    from './../actions/ActionTypes';

let initState = {
    loading: false,
    data: null,
    status: null,
    errMsg: null
};

export function handlePointsCount(state = initState, action) {
    switch (action.type) {
        case REQ_POINTS_COUNT_START:
            return {loading: true, data: null};
        case REQ_POINTS_COUNT_SUCC:
            return {loading: false, data: action.data};
        case REQ_POINTS_COUNT_FAIL:
            return {loading: false, data: null};
        default:
            return state;
    }
};

let detailState = {
    loading: false,
    pageList: null,
    curPage: 0,
    pageCount: 10,
    totalCount: 0,
    status: null,
    errMsg: null
};

export function handlePointsDetail(state = detailState, action) {
    switch (action.type) {
        default:
            return state;
    }
}










