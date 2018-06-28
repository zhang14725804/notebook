import {
    AC_GET_USERINFO_START, AC_GET_USERINFO_FAIL, AC_GET_USERINFO_SUCC
}
    from './../actions/Ac_UserInfo';

import CK from 'utils/CK';

let initState = {
    loading: false,
    userInfo: null,
    status: null,
    errMsg: null
}

export default function handeGetUserInfo(state = initState, action) {
    switch (action.type) {
        case AC_GET_USERINFO_START:
            return {loading: true};
        case AC_GET_USERINFO_SUCC:
            // return Object.assign(state,{"userInfo":action.userInfo});
            // state.set({"userInfo": action.userInfo})
            console.log("req_get_userinfo_succ");
            CK.set("userinfo_json", JSON.stringify(action.userInfo), "240h");
            return Object.assign({}, {"userInfo": action.userInfo});
            break;
        case AC_GET_USERINFO_FAIL:
            return {loading: false};
        default:
            return state;
    }
};










