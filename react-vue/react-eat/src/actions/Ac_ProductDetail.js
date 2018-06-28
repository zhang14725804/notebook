import net from 'net';
import mapi from 'mapi';

import {
    REQ_PRODUCT_BASEINFO_START, REQ_PRODUCT_BASEINFO_SUCC, REQ_PRODUCT_BASEINFO_FAIL,
    REQ_PRODUCT_DETAIL_START, REQ_PRODUCT_DETAIL_SUCC, REQ_PRODUCT_DETAIL_FAIL
}
    from './ActionTypes';

export function fetchProductBaseinfo(pid) {
    return function (dispatch) {
        dispatch({type: REQ_PRODUCT_BASEINFO_START});
        let path = mapi.product.getProductBaseinfo.path.format(pid);
        net.requestMd5(path)
            .then(function (rep) {
                if (rep.code === 0 && rep.data !== null) {
                    dispatch({type: REQ_PRODUCT_BASEINFO_SUCC, data: rep.data});
                } else {
                    dispatch({type: REQ_PRODUCT_BASEINFO_FAIL});
                }
            })
    }
}

export function fetchProductImages(pid) {
    return function (dispatch) {
        dispatch({type: REQ_PRODUCT_DETAIL_START});
        let qr = `?productId=${pid}`;
        net.requestMd5(mapi.product.getProductDetail.path + qr)
            .then(function (rep) {
                if (rep.code === 0 && rep.data !== null) {
                    dispatch({type: REQ_PRODUCT_DETAIL_SUCC, data: rep.data});
                } else {
                    dispatch({type: REQ_PRODUCT_DETAIL_FAIL});
                }
            })
    }
}