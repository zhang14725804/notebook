var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
}, t = require("../index"), n = require("../types"), r = function(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}({}, n.AUTH_TYPE.userInfo, {
    type: n.AUTH_TYPE.userInfo,
    text: "授权微信用户信息",
    openType: "getUserInfo"
});

Page({
    data: e({
        AUTH_TYPE: n.AUTH_TYPE,
        btn: {}
    }, t.config.pageConfig),
    onLoad: function(e) {
        this.setData({
            btn: r[e.type]
        });
    },
    getuserinfoClick: function(e) {
        var n = e.detail;
        n && n.iv && t.state.resolve(n);
    }
});