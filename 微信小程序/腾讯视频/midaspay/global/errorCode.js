function e(e, r, t) {
    return r in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}

var r, t = exports.code = {
    SUCCESS: 0,
    FAIL: -1,
    PARAMS_ERROR: 1e3
};

exports.msg = (r = {}, e(r, t.SUCCESS, "支付成功"), e(r, t.FAIL, "支付失败"), e(r, t.PARAMS_ERROR, "参数错误"), 
r);