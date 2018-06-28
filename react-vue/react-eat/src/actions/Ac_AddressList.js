import net from 'net';
import mapi from 'mapi';
import {
    REQ_ADDRESSLIST_START, REQ_ADDRESSLIST_SUCC, REQ_ADDRESSLIST_FAIL,
    REQ_ADDR_ADD_NEW_START, REQ_ADDR_ADD_NEW_SUCC, REQ_ADDR_ADD_NEW_FAIL,
    REQ_ADDR_DEl_START, REQ_ADDR_DEL_SUCC, REQ_ADDR_DEL_FAIL
}
    from './ActionTypes'

export function fetchAddressList() {
    return function (dispatch) {
        dispatch({type: REQ_ADDRESSLIST_START});
        net.request(mapi.my.getAddressList.path)
            .then(function (rep) {
                if (rep.code === 0 && rep.data !== null) {
                    dispatch({
                        type: REQ_ADDRESSLIST_SUCC,
                        data: rep.data,
                    });
                } else {
                    dispatch({type: REQ_ADDRESSLIST_FAIL});
                }
            })
    }
}

export function fetchAddnewAddr(addr) {
    return function (dispatch) {
        dispatch({type: REQ_ADDR_ADD_NEW_START});
        let init = {
            "method": "POST",
            "body": JSON.stringify(addr),
            "headers": {
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        }
        net.request(mapi.my.addNewAddr.path, init)
            .then(function (rep) {
                if (rep.code === 0) {
                    dispatch({type: REQ_ADDR_ADD_NEW_SUCC});
                } else {
                    dispatch({type: REQ_ADDR_ADD_NEW_FAIL});
                }
            })
    }
}

export function fetchDelAddr(id) {
    return function (dispatch) {
        dispatch({type: REQ_ADDR_DEl_START});
        let qr = `?id=${id}`;
        net.request(mapi.my.delAddr.path + qr)
            .then(function (rep) {
                if (rep.code === 0) {
                    dispatch({type: REQ_ADDR_DEL_SUCC});
                } else {
                    dispatch({type: REQ_ADDR_DEL_FAIL});
                }
            })
    }
}