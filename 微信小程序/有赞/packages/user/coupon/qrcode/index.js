!function(e) {
    function t(i) {
        if (n[i]) return n[i].exports;
        var o = global.installedModules[i] = n[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
    }
    e = Object.assign(require("../../../../commons.js").modules, e);
    var n = {};
    n = global.installedModules = global.installedModules || {}, t.m = e, t.c = n, t.d = function(e, n, i) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: i
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(n, "a", n), n;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 110);
}({
    109: function(e, t, n) {
        var i = {
            handleVerifyCode: function(e) {
                if (e) return e.substr(0, 4) + "-" + e.substr(4, 4) + "-" + e.substr(8);
            },
            handleVerifyData: function(e) {
                var t = e, n = this.squash0(e.value + ""), i = e.discount, o = this.squash0(e.condition + "");
                return +n > 0 ? Object.assign(t, {
                    thisType: 0
                }) : +i > 0 ? Object.assign(t, {
                    thisType: 1
                }) : Object.assign(t, {
                    thisType: 0
                }), +o > 0 ? Object.assign(t, {
                    conditionString: "满" + o + "元可用",
                    value: n
                }) : Object.assign(t, {
                    conditionString: "无限制",
                    value: n
                }), t;
            },
            squash0: function(e) {
                var t = e.split(".");
                return t[0] + (2 == t.length ? 0 == +t[1] ? "" : "." + t[1] : "");
            }
        };
        e.exports = Object.assign({}, i);
    },
    110: function(e, t, n) {
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var o = i(n(109)), r = i(n(0)), s = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e, t;
        }(n(1)), u = getApp();
        (0, r.default)(s.Toast, {
            data: {
                winWidth: 0,
                winHeight: 0,
                curVisibility: !1,
                coupon: {}
            },
            onLoad: function(e) {
                var t = this;
                wx.getSystemInfo({
                    success: function(n) {
                        t.setData({
                            winWidth: n.windowWidth,
                            winHeight: n.windowHeight,
                            promoType: e.type,
                            verifyCode: o.default.handleVerifyCode(e.verifycode)
                        });
                    }
                }), u.carmen({
                    api: "youzan.ump.coupon.verifyinfo/1.0.0/get",
                    query: {
                        verify_code: e.verifycode,
                        kdt_id: u.getKdtId()
                    },
                    success: function(e) {
                        var n = o.default.handleVerifyData(e);
                        t.setData({
                            coupon: n,
                            curVisibility: !0
                        });
                    },
                    fail: function(e) {
                        t.showZanToast(e.msg || "获取信息失败");
                    }
                });
            }
        });
    }
});