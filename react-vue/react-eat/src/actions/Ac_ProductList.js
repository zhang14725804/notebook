import net from 'net';
import mapi from 'mapi';

import {REQ_PRODUCTLIST_START, REQ_PRODUCTLIST_SUCC, REQ_PRODUCTLIST_FAIL} from './ActionTypes';

export function fetchProductList(pid, curPage, pageCount, fetchType) {
    return function (dispatch) {
        dispatch({type: REQ_PRODUCTLIST_START});
        let query = `state=2&pageCount=${pageCount}&currentPage=${curPage}&categoryId=${pid}`;
        let path = mapi.product.getProductList.path.format(pid);
        net.request(path + "?" + query)
            .then(function (rep) {
                if (rep.code === 0 && rep.data !== null) {
                    dispatch({type: REQ_PRODUCTLIST_SUCC, data: rep.data});
                } else {
                    dispatch({type: REQ_PRODUCTLIST_FAIL});
                }
            })
    }
}
