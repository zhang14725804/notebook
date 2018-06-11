Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = {
    WECHAT_PAY_SUCCESS_MSG: "requestPayment:ok",
    WECHAT_PAY_CANCEL_MSG: "requestPayment:cancel",
    ANDROID_WECHAT_PAY_CANCEL_MSG: "requestPayment:fail cancel",
    isCancelPay: function(e) {
        return "requestPayment:cancel" == e || "requestPayment:fail cancel" == e;
    }
};