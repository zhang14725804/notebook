import net from 'net';
import mapi from 'mapi';

import {REQ_CATEGORY_START, REQ_CATEGORY_SUCC, REQ_CATEGORY_FAIL} from './ActionTypes';

export function fetchCategory() {
    return function (dispatch) {
        dispatch({type: REQ_CATEGORY_START});
        let query = "parentId=0&depth=4";
        net.request(mapi.product.getCategory.path + "?" + query)
            .then(function (rep) {
                if (rep.code === 0 && rep.data !== null) {
                    dispatch({type: REQ_CATEGORY_SUCC, data: rep.data});
                } else {
                    dispatch({type: REQ_CATEGORY_FAIL});
                }
            })
    }
}
