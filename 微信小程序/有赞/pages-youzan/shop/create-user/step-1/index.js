!function(e) {
    function n(o) {
        if (t[o]) return t[o].exports;
        var a = global.installedModules[o] = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(a.exports, a, a.exports, n), a.l = !0, a.exports;
    }
    e = Object.assign(require("../../../../commons.js").modules, e);
    var t = {};
    t = global.installedModules = global.installedModules || {}, n.m = e, n.c = t, n.d = function(e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, n.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return n.d(t, "a", t), t;
    }, n.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
    }, n.p = "", n(n.s = 320);
}({
    320: function(e, n, t) {
        var o, a = (o = t(0)) && o.__esModule ? o : {
            default: o
        }, s = t(1), r = t(64).checkPhoneAndDoNext, u = t(4), i = getApp(), l = {
            onShow: function() {
                u.page.show();
            },
            submitInputValue: function(e) {
                var n = this;
                if (!this.phone || !/^\d{11}$/.test(this.phone) || 11 !== this.phone.length) return this.showZanToast("请输入11位正确手机号");
                var t = this.phone === this.lastPhone ? 0 : 1;
                return this.lastPhone = this.phone, r(this.phone, function() {
                    return i.globalData.token.hasPwd = !0, i.globalData.token.hasshop = !0, wx.navigateTo({
                        url: "/pages-youzan/shop/create-user/step-2/index?phone=" + n.phone + "&isPhoneChange=" + t
                    });
                }, function(e) {
                    return -1 === [ 135000003, 135000039, 135000040 ].indexOf(e.code) ? n.showZanToast(e.msg || "验证手机号失败") : (135000040 === e.code && (i.globalData.token.hasPwd = !0), 
                    wx.navigateTo({
                        url: "/pages-youzan/shop/create-user/step-2/index?phone=" + n.phone + "&isPhoneChange=" + t
                    }));
                });
            },
            handleZanFieldChange: function(e) {
                var n = e.componentId, t = e.detail;
                this[n] = t.value;
            }
        };
        (0, a.default)(l, s.Field, s.Toast);
    }
});