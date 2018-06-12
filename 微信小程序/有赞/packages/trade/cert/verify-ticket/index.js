!function(t) {
    function e(a) {
        if (o[a]) return o[a].exports;
        var r = global.installedModules[a] = o[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return t[a].call(r.exports, r, r.exports, e), r.l = !0, r.exports;
    }
    t = Object.assign(require("../../../../commons.js").modules, t);
    var o = {};
    o = global.installedModules = global.installedModules || {}, e.m = t, e.c = o, e.d = function(t, o, a) {
        e.o(t, o) || Object.defineProperty(t, o, {
            configurable: !1,
            enumerable: !0,
            get: a
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var o = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(o, "a", o), o;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 115);
}({
    115: function(t, e, o) {
        function a(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t) for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e.default = t, e;
        }
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var n = r(o(67)), i = r(o(0)), s = a(o(1)), c = a(o(7)), u = getApp();
        (0, i.default)(s.Toast, n.default, {
            data: {
                themeClass: u.themeClass
            },
            onLoad: function(t) {
                if (!t.order_no) return wx.showModal({
                    content: "缺少必要参数",
                    showCancel: !1,
                    confirmText: "返回"
                }, function() {
                    return wx.navigateBack();
                });
                this.fetchCardInfo(t.order_no);
            },
            onReady: function() {
                this.setData({
                    copyright: u.globalData.copyright,
                    is_big_shop: u.globalData.is_big_shop
                });
            },
            previewImage: function() {
                wx.previewImage({
                    current: this.data.qrcode,
                    urls: [ this.data.qrcode ]
                });
            },
            fetchCardInfo: function(t) {
                var e = this;
                wx.showToast({
                    title: "数据查询中",
                    icon: "loading",
                    duration: 1e4
                }), this.setData({
                    loading: !0
                });
                var o = this;
                u.carmen({
                    api: "youzan.trade.virtualticket.verify.user/3.0.0/get",
                    query: {
                        order_no: t,
                        with_qrcode: 1
                    },
                    success: function(t) {
                        var e = {
                            NOT_VERIFY: [],
                            VERIFIED: [],
                            DISABLED: [],
                            EXPIRED: []
                        };
                        t.tickets && Array.isArray(t.tickets) && t.tickets.forEach(function(t) {
                            var o = {
                                ticket_code: t.ticket_code
                            };
                            "VERIFIED" === t.ticket_state ? o.verify_time = c.moment(t.verify_time.replace(/-/g, "/"), "YYYY-MM-DD HH:mm:ss") : o = t.ticket_code, 
                            e[t.ticket_state].push(o);
                        }), t.tickets = e, o.setData(t), o.setData({
                            loading: !1
                        }), wx.hideToast();
                    },
                    fail: function(t) {
                        e.showZanToast(t.message || t.msg || "获取联系人列表失败"), wx.hideToast(), e.setData({
                            loading: !1
                        });
                    }
                });
            }
        });
    }
});