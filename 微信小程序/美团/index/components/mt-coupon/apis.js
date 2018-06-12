Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.assignList = exports.assignCoupon = void 0;

var t = require("./utils"), e = function(t) {
    var e = {
        prod: "https://c-zc.meituan.com/api/wxapp/coupon",
        st: "http://c.zc.st.meituan.com/api/wxapp/coupon",
        dev: "http://10.21.63.137:8080",
        test: "http://10.21.61.216:8080"
    };
    return e[t] || e.prod;
}("prod");

exports.assignCoupon = function(s) {
    return (0, t.request)({
        url: e + "/promotion/user/share/coupon/assign",
        method: "POST",
        data: Object.assign(s, {
            appId: t.appId
        })
    }).then(function(t) {
        return t.data;
    });
}, exports.assignList = function(s) {
    return (0, t.request)({
        url: e + "/promotion/user/share/assign/list",
        data: s
    }).then(function(t) {
        return t.data;
    });
};