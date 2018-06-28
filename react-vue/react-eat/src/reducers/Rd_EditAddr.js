import {combineReducers} from 'redux'

import {
    REQ_ADDR_ADD_NEW_START, REQ_ADDR_ADD_NEW_SUCC, REQ_ADDR_ADD_NEW_FAIL,
    REQ_ADDR_DEl_START, REQ_ADDR_DEL_SUCC, REQ_ADDR_DEL_FAIL
}
    from './../actions/ActionTypes';

let initState = {
    loading: false,
    type: null,
    succ: null,
    status: null,
    errMsg: null
}

export default function handleEditAddr(state = initState, action) {
    switch (action.type) {
        case REQ_ADDR_ADD_NEW_START:
            return {loading: true, succ: null, type: "add"};
        case REQ_ADDR_ADD_NEW_SUCC:
            return {loading: false, succ: true, type: "add"};
        case REQ_ADDR_ADD_NEW_FAIL:
            return {loading: false, succ: null, type: "add"};
        case REQ_ADDR_DEl_START:
            return {loading: true, succ: null, type: "del"};
        case REQ_ADDR_DEL_SUCC:
            return {loading: true, succ: true, type: "del"};
        case REQ_ADDR_DEL_FAIL:
            return {loading: true, succ: null, type: "del"};
        default:
            return state;
    }
}

// export function handleDelAddr(state = initState, action) {
//     switch (action.type) {
//
//         default:
//             return state;
//     }
// }
//
// export default combineReducers({handleEditAddr, handleDelAddr});







