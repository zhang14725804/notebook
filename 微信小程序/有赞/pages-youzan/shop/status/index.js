!function(e) {
    function t(a) {
        if (o[a]) return o[a].exports;
        var n = global.installedModules[a] = o[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(n.exports, n, n.exports, t), n.l = !0, n.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e);
    var o = {};
    o = global.installedModules = global.installedModules || {}, t.m = e, t.c = o, t.d = function(e, o, a) {
        t.o(e, o) || Object.defineProperty(e, o, {
            configurable: !1,
            enumerable: !0,
            get: a
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
    }, t.p = "", t(t.s = 316);
}({
    316: function(e, t, o) {
        var a, n = (a = o(0)) && a.__esModule ? a : {
            default: a
        }, l = o(1), s = o(4), i = o(64).checkPhoneAndDoNext, r = getApp(), u = {
            onShow: function() {
                return s.page.show(), r.globalData.isCreatedShop ? (r.globalData.isCreatedShop = !1, 
                this.setData({
                    title: "店铺创建成功",
                    showBtn: !1
                })) : (this.setData({
                    loading: !0
                }), r.globalData.hasToken ? this.checkPhone() : void r.once("app:token:success", this.checkPhone));
            },
            jumpToCreateShop: function() {
                if (s.track({
                    fm: "click",
                    ei: "create_shop",
                    en: "创建店铺"
                }), r.logger && r.logger.log({
                    fm: "click",
                    ei: "create_shop",
                    en: "创建店铺"
                }), !r.globalData.token.mobile) return wx.navigateTo({
                    url: "/pages-youzan/shop/create-user/step-1/index"
                });
                if (!r.globalData.token.hasPwd) {
                    var e = this.lastPhone === r.globalData.token.mobile ? 0 : 1;
                    return wx.navigateTo({
                        url: "/pages-youzan/shop/create-user/step-2/index?phone=" + r.globalData.token.mobile + "&isPhoneChange=" + e
                    });
                }
                wx.navigateTo({
                    url: "/pages-youzan/shop/new/index"
                });
            },
            checkPhone: function() {
                var e = this;
                if (r.globalData.token.mobile) return i(r.globalData.token.mobile, function() {
                    e.setData({
                        title: "你已经创建过店铺",
                        showBtn: !1,
                        loading: !1
                    });
                }, function(t) {
                    return 135000003 === t.code || 135000039 === t.code ? e.setData({
                        title: "快速拥有自己的店铺",
                        showBtn: !0,
                        loading: !1
                    }) : 135000040 === t.code ? (r.globalData.token.hasPwd = !0, void e.setData({
                        title: "快速拥有自己的店铺",
                        showBtn: !0,
                        loading: !1
                    })) : 135000024 === t.code ? r.login(function() {
                        return e.checkPhone();
                    }) : (e.setData({
                        loading: !1
                    }), e.showZanToast(t.msg || "网络错误"));
                });
                this.setData({
                    title: "快速拥有自己的店铺",
                    showBtn: !0,
                    loading: !1
                });
            }
        };
        (0, n.default)(u, l.Toast);
    }
});