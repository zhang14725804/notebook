import net from 'net';
import mapi from 'mapi';

export const AC_GET_USERINFO_START = 4;
export const AC_GET_USERINFO_SUCC = 5;
export const AC_GET_USERINFO_FAIL = 6;

export function fetchUserinfo() {
    return function (dispatch) {
        dispatch({type: AC_GET_USERINFO_START});
        net.request(mapi.my.baseinfo.path)
            .then(function (rep) {
                if (rep.code === 0 && rep.data !== null) {
                    dispatch({type: AC_GET_USERINFO_SUCC, userInfo: rep.data})
                } else {
                    dispatch({type: AC_GET_USERINFO_FAIL})
                }
            })
    }
}
