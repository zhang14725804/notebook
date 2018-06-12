!function(e) {
    function t(n) {
        if (o[n]) return o[n].exports;
        var a = global.installedModules[n] = o[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(a.exports, a, a.exports, t), a.l = !0, a.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e);
    var o = {};
    o = global.installedModules = global.installedModules || {}, t.m = e, t.c = o, t.d = function(e, o, n) {
        t.o(e, o) || Object.defineProperty(e, o, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var o = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(o, "a", o), o;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 235);
}({
    235: function(e, t, o) {
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var a = n(o(0)), r = n(o(3)), l = getApp();
        (0, a.default)({
            data: {
                shopName: ""
            },
            onLoad: function() {
                var e = l.globalData.shopInfo.shop_name;
                this.setData({
                    shopName: e
                });
            },
            callphone: function() {
                var e = this.data.CURRENT_GLOBAL_SHOP.service.service_mobile;
                e && wx.makePhoneCall({
                    phoneNumber: e
                });
            },
            navTo: function() {
                var e = l.globalData.isYouzanApp ? "/pages-youzan/usercenter/dashboard/index" : "/pages/usercenter/dashboard/index";
                r.default.switchTab({
                    url: e
                });
            },
            onShow: function() {
                console.log(l, "app", this), wx.setNavigationBarTitle({
                    title: this.data.shopName || " "
                });
            }
        });
    }
});