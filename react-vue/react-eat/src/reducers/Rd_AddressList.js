import {
    REQ_ADDRESSLIST_START, REQ_ADDRESSLIST_SUCC, REQ_ADDRESSLIST_FAIL
}
    from './../actions/ActionTypes';

let initState = {
    loading: false,
    data: null,
    status: null,
    errMsg: null
}

export default function handleAddressList(state = initState, action) {
    switch (action.type) {
        case REQ_ADDRESSLIST_START:
            return {loading: true, data: null};
        case REQ_ADDRESSLIST_SUCC:
            return {loading: false, data: action.data};
        case REQ_ADDRESSLIST_FAIL:
            return {loading: false, data: null};
        default:
            return state;
    }
};










