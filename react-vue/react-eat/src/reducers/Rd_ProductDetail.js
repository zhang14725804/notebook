import {
    REQ_PRODUCT_BASEINFO_START, REQ_PRODUCT_BASEINFO_SUCC, REQ_PRODUCT_BASEINFO_FAIL,
    REQ_PRODUCT_DETAIL_START, REQ_PRODUCT_DETAIL_SUCC, REQ_PRODUCT_DETAIL_FAIL
}
    from './../actions/ActionTypes';


let initState = {
    loading: false,
    data: null,
    status: null,
    errMsg: null
}

export function handleProductBaseinfo(state = initState, action) {
    switch (action.type) {
        case REQ_PRODUCT_BASEINFO_START:
            return {loading: true, data: null};
        case REQ_PRODUCT_BASEINFO_SUCC:
            return {loading: false, data: action.data};
        case REQ_PRODUCT_BASEINFO_FAIL:
            return {loading: false, data: null};
        default:
            return state;
    }
};


let imgState = {
    loading: false,
    data: null,
    status: null,
    errMsg: null
}


export function handleProductImageDetail(state = imgState, action) {
    switch (action.type) {
        case REQ_PRODUCT_DETAIL_START:
            return {loading: true, data: null};
        case REQ_PRODUCT_DETAIL_SUCC:
            return {loading: false, data: action.data};
        case REQ_PRODUCT_DETAIL_FAIL:
            return {loading: false, data: null};
        default:
            return state;
    }
}






