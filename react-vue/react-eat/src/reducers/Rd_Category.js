import {
    REQ_CATEGORY_START, REQ_CATEGORY_SUCC, REQ_CATEGORY_FAIL
}
    from './../actions/ActionTypes';


let initState = {
    loading: false,
    category: null,
    status: null,
    errMsg: null
}

export default function handeGetUserInfo(state = initState, action) {
    switch (action.type) {
        case REQ_CATEGORY_START:
            return {loading: true, category: null};
        case REQ_CATEGORY_SUCC:
            return {
                loading: false, category: action.data
            }
            break;
        case REQ_CATEGORY_FAIL:
            return {loading: false, category: null};
        default:
            return state;
    }
};










