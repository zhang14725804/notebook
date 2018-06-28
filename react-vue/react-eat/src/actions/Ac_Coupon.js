import net from 'net';
import mapi from 'mapi';

//action types
const REQ_COUPON_START = 'REQ_COUPON_START'
const REQ_COUPON_SUCC = 'REQ_COUPON_SUCC'
const REQ_COUPON_FAIL = 'REQ_COUPON_FAIL'
//action creator
export function fetchCoupons(couponType) {
  return function (dispatch) {
    dispatch({ type: REQ_COUPON_START, fetchType: couponType });
    let status = "status" + couponType
    net.request(mapi.my.coupon.path + "?" + status).then((res) => {
      console.log(res)
      if (res.code === 0 && res.data !== null) {
        dispatch({
          type: REQ_COUPON_SUCC,
          fetchType: couponType,
          data: res.data,
        })
      } else {
        dispatch({
          type: REQ_COUPON_FAIL,
          fetchType: couponType
        })
      }
    })
  }
}


export function resetCoupon(couponType) {
  return function (dispatch) {
    dispatch({ type: REQ_COUPON_START, fetchType: couponType });
  }
}