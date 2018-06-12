!function(e) {
    function t(s) {
        if (o[s]) return o[s].exports;
        var n = global.installedModules[s] = o[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return e[s].call(n.exports, n, n.exports, t), n.l = !0, n.exports;
    }
    e = Object.assign(require("../../../../commons.js").modules, e), e = Object.assign(require("../../../../vendors.js").modules, e);
    var o = {};
    o = global.installedModules = global.installedModules || {}, t.m = e, t.c = o, t.d = function(e, o, s) {
        t.o(e, o) || Object.defineProperty(e, o, {
            configurable: !1,
            enumerable: !0,
            get: s
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
    }, t.p = "", t(t.s = 318);
}({
    318: function(e, t, o) {
        var s, n = (s = o(0)) && s.__esModule ? s : {
            default: s
        }, a = o(63), r = o(1), i = o(27), l = o(4), u = getApp(), d = {
            onShow: function() {
                l.page.show();
            },
            submitInputValue: function() {
                return !this.password || this.password.length < 8 || this.password.length > 20 ? this.showZanToast("请输入8-20位密码") : /[a-zA-Z]/.test(this.password) && /[0-9]/.test(this.password) ? this.setPassword() : this.showZanToast("密码必须为数字和字母的组合");
            },
            setPassword: function() {
                var e = this;
                l.track({
                    fm: "click",
                    ei: "update_password",
                    en: "创建密码",
                    mobile: u.globalData.token.mobile
                }), u.logger && u.logger.log({
                    fm: "click",
                    ei: "update_password",
                    en: "创建密码",
                    mobile: u.globalData.token.mobile
                }), i.setPassword(a.encrypt(this.password), function() {
                    u.login(function() {
                        return wx.navigateTo({
                            url: "/pages-youzan/shop/new/index"
                        });
                    });
                }, function(t) {
                    e.showZanToast(t.msg || "密码设置失败");
                });
            },
            handleZanFieldChange: function(e) {
                var t = e.componentId, o = e.detail;
                this[t] = o.value;
            }
        };
        (0, n.default)(d, r.Field, r.Toast);
    }
});