import {
    REQ_ORDERLIST_START, REQ_ORDERLIST_SUCC, REQ_ORDERLIST_FAIL
}
    from './../actions/Ac_OrderList';

let initState = {
    loading: false,
    orders: null,
    fetchType: 0,
    currentPage: 1,
    pageCount: 5,
    totalCount: 0,
    status: null,
    errMsg: null
}

export default function handeOrderList(state = initState, action) {
    switch (action.type) {
        case REQ_ORDERLIST_START:
            return {loading: true, fetchType: action.fetchType, orders: null};
        case REQ_ORDERLIST_SUCC:
            let data = action.data;
            let basePagination = data.basePagination;
            // let raw = Object.assign(state, {
            //     loading: false,
            //     orders: data.orders,
            //     fetchType: action.fetchType
            // });
            //
            // return raw;
            return {loading: false, orders: data.orders, fetchType: action.fetchType};
        case REQ_ORDERLIST_FAIL:
            return {loading: false, fetchType: action.fetchType, orders: null};
        default:
            return state;
    }
};










