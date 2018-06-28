import net from 'net';
import mapi from 'mapi';

export const REQ_ORDERLIST_START = 1;
export const REQ_ORDERLIST_SUCC = 2;
export const REQ_ORDERLIST_FAIL = 3;

export function fetchOrderList(orderType, pageCount, currPage, selectIndex, isLoadMore) {
    return function (dispatch) {
        dispatch({type: REQ_ORDERLIST_START, fetchType: orderType});
        let qr = `type=${orderType}&pageCount=${pageCount}&currentPage=${currPage}`;
        net.request(mapi.my.getOrderList.path + "?" + qr)
            .then(function (rep) {
                if (rep.code === 0 && rep.data !== null) {
                    dispatch({
                        type: REQ_ORDERLIST_SUCC,
                        fetchType: orderType,
                        data: rep.data,
                        selectIndex: selectIndex
                    })
                } else {
                    dispatch({type: REQ_ORDERLIST_FAIL, fetchType: orderType, isLoadMore: isLoadMore})
                }
            })
    }
}

export function resetOrderList(orderType) {
    return function (dispatch) {
        dispatch({type: REQ_ORDERLIST_START, fetchType: orderType});
    }
}



