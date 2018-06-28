import {
    REQ_PRODUCTLIST_START, REQ_PRODUCTLIST_SUCC, REQ_PRODUCTLIST_FAIL
}
    from './../actions/ActionTypes';


let initState = {
    loading: false,
    list: null,
    status: null,
    errMsg: null
}

export default function handleProductList(state = initState, action) {
    switch (action.type) {
        case REQ_PRODUCTLIST_START:
            return {loading: true, list: null};
        case REQ_PRODUCTLIST_SUCC:
            return {loading: false, list: action.data.list};
        case REQ_PRODUCTLIST_FAIL:
            return {loading: false, list: null};
        default:
            return state;
    }
};










