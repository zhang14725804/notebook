//action types
const REQ_COUPON_START = 'REQ_COUPON_START'
const REQ_COUPON_SUCC = 'REQ_COUPON_SUCC'
const REQ_COUPON_FAIL = 'REQ_COUPON_FAIL'

let initState = {
  loading: false,
  coupons: null,
  fetchType: 1,
  status: null,
  errMsg: null
}
//reducer
export default function handleCoupon(state=initState, action){
  switch(action.type){
    case REQ_COUPON_START:
      return { loading: true, fetchType: action.fetchType, coupons: null };
    case REQ_COUPON_START:
      let data=action.data
      return { loading: true, fetchType: action.fetchType, coupons: data.coupons };
    default:
      return state
  }
}

