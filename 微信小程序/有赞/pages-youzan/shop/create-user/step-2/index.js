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
    }, n.p = "", n(n.s = 319);
}({
    319: function(e, n, t) {
        var o, a = (o = t(0)) && o.__esModule ? o : {
            default: o
        }, i = t(1), s = t(27), u = t(4), r = getApp(), l = {
            onLoad: function(e) {
                if (this.query = e, !this.query.phone || 11 !== this.query.phone.length) return this.showZanToast("参数错误");
                +e.isPhoneChange && this.fetchCode(), this.setData({
                    isReFetchCode: !1,
                    countDown: 0,
                    query: e
                });
            },
            onShow: function() {
                u.page.show();
            },
            onUnLoad: function() {
                clearInterval(this.timer);
            },
            codeInputChange: function(e) {
                this.handleZanFieldChange({
                    componentId: "code",
                    detail: e.detail
                });
            },
            fetchCode: function() {
                var e = this;
                r.logger && r.logger.log({
                    fm: "click",
                    ei: "fetch_code",
                    en: "获取验证码",
                    mobile: this.query.phone
                }), s.fetchCode(this.query.phone, 1, function() {
                    e.reckonTime();
                }, function(n) {
                    "重复请求，请稍后重试" === n.msg && (n.msg = "已经发送过验证码，请稍后重试"), e.showZanToast(n.msg || "获取验证码失败");
                });
            },
            submitInputValue: function() {
                return /^\d{6}$/.test(this.code) ? this.loginUser() : this.showZanToast("请输入6位正确的验证码");
            },
            reckonTime: function() {
                var e = this;
                this.setData({
                    countDown: 60,
                    isReFetchCode: !0
                }), this.timer = setInterval(function() {
                    e.data.countDown - 1 == 0 && clearInterval(e.timer), e.setData({
                        countDown: e.data.countDown - 1
                    });
                }, 1e3);
            },
            loginUser: function() {
                var e = this, n = r.globalData.token.hasPwd, t = r.globalData.token.hasshop;
                s.codeLogin(this.query.phone, this.code, function() {
                    r.globalData.token.phone = e.query.phone, r.login(function() {
                        return t ? wx.switchTab({
                            url: "/pages-youzan/shop/status/index"
                        }) : n ? wx.navigateTo({
                            url: "/pages-youzan/shop/new/index"
                        }) : wx.navigateTo({
                            url: "/pages-youzan/shop/create-user/step-3/index?phone=" + e.query.phone
                        });
                    });
                }, function(n) {
                    e.showZanToast(n.msg || "登录失败");
                });
            },
            handleZanFieldChange: function(e) {
                var n = e.componentId, t = e.detail;
                this[n] = t.value;
            }
        };
        (0, a.default)(l, i.Toast);
    }
});