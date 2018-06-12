function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = [ 785, 786 ], a = [ "3", "5", "7", "8" ], i = [ "5", "7" ], o = {
    mobile_bindType: "3",
    username_bindType: "9"
}, s = require("data/codetoTemplate"), r = require("data/codeData"), c = require("util/password_check"), n = require("./util/passport_evHandle"), l = require("./util/third_bind"), d = require("./util/common_param"), p = "", u = "", h = "", m = "", v = "", b = (getApp(), 
!1), f = {};

Page({
    data: {
        pageshow: !0,
        code: "init",
        typeBtnShow: !1,
        picverifyCodeShow: !1,
        mobileValFocusFlag: !1,
        mobilecodeValFocusFlag: !1,
        userPicverifyCodeShow: !1,
        passport: {
            animationData: {},
            logoShow: !1,
            passwordHide: !1,
            passwordVal: "",
            warn: !1,
            name: "",
            mobileVal: "",
            mobilecodeVal: "",
            validcodeVal: "",
            validcodeUrl: "",
            verifytext: "获取动态码",
            verifyColorFlag: !1,
            tellength: 11
        },
        loginState: {},
        isGoBack: !0
    },
    onLoad: function(t) {
        if (this.initSubmitParams(), this.setParams(t, !1), p = t.type, u = s[p][0], h = require("util/" + s[p][1] + ".js"), 
        "[object Object]" == Object.prototype.toString.call(h)) {
            var e = Object.keys(h);
            h = h[e[0]];
        }
        -1 != a.indexOf(p) && (-1 != i.indexOf(p) ? h.getData({
            warnkey: t.warnkey,
            source: t.source
        }) : h.getData());
        var o = !1;
        void 0 != t.bindType && "1" == t.bindType && (o = !0);
        var r = !1;
        -1 != [ "9" ].indexOf(p) && (r = !0);
        var c = this.setObjectData("passwordHide", r);
        this.setData({
            code: u,
            pageshow: !1,
            typeBtnShow: o,
            bindType: t.bindType,
            passport: c
        }), t.vcodekey && (m = t.validcode), t.vcodekey && this.getVcodeUrl(t.vcodekey), 
        t.mobile && this.initMobile(t.mobile), t.name && this.initName(t.name), t.path && (v = t.path), 
        n.emit("passport-login-onLoad", t);
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: r[p].NavigationBarTitle
        }), n.emit("passport-login-onReady");
    },
    onShow: function() {
        n.emit("passport-login-onShow");
    },
    onUnload: function() {
        this.data.isGoBack && n.emit("passport-login-onUnload", this.data.loginState);
    },
    initSubmitParams: function() {
        b = !1, f = {
            mobile: "",
            password: "",
            vcodekey: "",
            mobilecode: "",
            validcode: "",
            warnkey: "",
            source: "",
            url_bind: "",
            url: "",
            warnurl: "",
            opentype: "",
            username: "",
            isBind: ""
        };
    },
    changeInit: function() {
        var t = {
            mobile: "",
            password: "",
            mobilecode: "",
            validcode: "",
            username: ""
        };
        this.setParams(t, "init");
    },
    initMobile: function(t) {
        if (t) {
            var e = this.setObjectData("mobileVal", this.telNumHideDel(t));
            e = this.setObjectData("warn", !0), e = this.setObjectData("verifyColorFlag", !0), 
            this.setData({
                passport: e
            });
        }
    },
    initName: function(t) {
        if (t) {
            var e = this.setObjectData("name", t);
            this.setData({
                passport: e
            });
        }
    },
    focus: function(e) {
        wx.setNavigationBarTitle({
            title: "登录"
        });
        var a = e.target.dataset.type;
        this.setData(t({}, a + "FocusFlag", !0));
    },
    wraptap: function(t) {
        var e = t.target.dataset;
        if (e.name && "mobile_login_wrap" == e.name) {
            var a = this.setObjectData("logoShow", !1);
            this.setData({
                passport: a
            });
        }
    },
    changeBindType: function(t) {
        var e = t.target.dataset;
        if (e.name) {
            var a = o[e.name];
            wx.redirectTo({
                url: "./passport?type=" + a + "&bindType=" + this.data.bindType + "&url_bind=" + f.url_bind + "&source=" + f.source + "&path=" + v + "&closepage=" + f.closepage + "&opentype=" + f.opentype
            });
        }
    },
    eyetap: function(t) {
        var e = this.setObjectData("passwordHide", !this.data.passport.passwordHide);
        this.setData({
            passport: e
        }), n.emit("passport-eye-tap", {
            type: p,
            passwordHide: this.data.passport.passwordHide
        });
    },
    inputEvent: function(t) {
        var e = t.detail.value, a = t.currentTarget.dataset.type, i = this.setObjectData(a, e);
        "mobileVal" == a && (i = 11 == e.length ? this.setObjectData("verifyColorFlag", !0) : this.setObjectData("verifyColorFlag", !1)), 
        this.setData({
            passport: i
        });
    },
    resetClick: function(e) {
        var a, i = e.currentTarget.dataset.type, o = this.setObjectData(i, "");
        o = this.setObjectData("verifyColorFlag", !1), this.setData((a = {}, t(a, i + "FocusFlag", !0), 
        t(a, "passport", o), a));
    },
    verifyclick: function(t) {
        var e = this.data.passport, a = e.mobileVal, i = e.validcodeVal, o = e.warn;
        if (n.emit("passport-piccodesubmit-tap", {
            type: p
        }), 1 != this.data.picverifyCodeShow || i) {
            if (11 == this.data.passport.mobileVal.length && 0 == b) {
                var s = this.delNullKey({
                    templateCode: p,
                    mobile: a,
                    warnkey: f.warnkey,
                    flag: o,
                    validcode: i,
                    source: f.source,
                    callback: this.codecallback
                });
                h.getCode(s);
            }
        } else this.toast("请输入图片验证码");
    },
    cancelValidateCode: function(t) {
        this.setData({
            picverifyCodeShow: !1
        }), n.emit("passport-picverifycode-cancel", {
            type: p
        });
    },
    logincancel: function(t) {
        n.emit("passport-login-goback", this.data.loginState), wx.navigateBack({
            delta: 1
        });
    },
    getVcodeUrl: function(t, e) {
        var a = e || "validcodeUrl";
        t = t || f.vcodekey;
        var i = h.freshValidateCode(t), o = this.setObjectData(a, i);
        this.setData({
            passport: o
        });
    },
    validate: function(t) {
        var e = this;
        return void 0 === t.mobile || t.mobile ? void 0 === t.username || t.username ? t.mobile && t.mobile.length < 11 ? (this.toast("手机号不能少于11位！"), 
        !1) : void 0 === t.password || t.password ? void 0 === t.mobilecode || t.mobilecode ? void 0 === t.validcode || t.validcode ? !t.password || 5 != p || c.passport_pwdCheck.validate(t.password, function(t) {
            e.toast(t.msg);
        }) : (this.toast("请输入图片验证码！"), !1) : (this.toast("请输入验证码！"), !1) : (this.toast("请输入密码！"), 
        !1) : (this.toast("请输入用户名！"), !1) : (this.toast("请输入手机号！"), !1);
    },
    formSubmit: function(t) {
        var e = this.data.passport.warn, a = t.detail.value;
        1 == this.validate(a) && (this.setParams(a, !0), this.delNullKey(f), f.callback = this.logincallback, 
        f.templateCode = p, f.url && (f.url = decodeURIComponent(f.url)), f.warnurl && (f.warnurl = decodeURIComponent(f.warnurl)), 
        f.flag = e, f.setIsGoBack = this.setIsGoBack, h.formSubmit(f)), n.emit("passport-submit-tap", {
            type: p
        });
    },
    logincallback: function(t) {
        if (this.changeInit(), this.setData({
            loginState: t
        }), 0 == t.code) "3" == p || "9" == p || "true" == t.isBind ? l(decodeURIComponent(f.url_bind), this.bindCallback) : this.succCallbak(t); else {
            if (t.code && e.indexOf(t.code) >= 0) {
                var a = {
                    passport: "9" == p ? this.setObjectData("userValidcodeVal", "") : this.setObjectData("validcodeVal", "")
                };
                "9" == p && (a.userPicverifyCodeShow = !0), this.setData(a);
                var i = "9" == p ? "validcodeUrl2" : "";
                this.getVcodeUrl(f.vcodekey, i), n.emit("passport-picverifycode-show", {
                    type: p,
                    code: t.code
                });
            }
            this.toast(t.msg);
        }
    },
    bindCallback: function(t) {
        0 == t.code ? this.succCallbak(t) : this.toast(t.msg);
    },
    succCallbak: function(t) {
        this.toast(t.msg);
        var e = {
            type: p,
            code: 0
        };
        d.commonParam.imCallback && (e.imCallback = d.commonParam.imCallback), n.emit("passport-submit-success", e), 
        d.commonParam.imCallback ? d.commonParam.imCallback() : (v = decodeURIComponent(v), 
        "1" == f.opentype ? wx.navigateBack({
            delta: 1
        }) : wx.redirectTo({
            url: v
        }));
    },
    setObjectData: function(t, e) {
        var a = this.data.passport;
        return a[t] = e, a;
    },
    codecallback: function(t) {
        if (e.indexOf(t.code) >= 0) {
            var a = h.freshValidateCode(), i = this.setObjectData("validcodeUrl", a);
            i = this.setObjectData("validcodeVal", ""), 786 == t.code && this.toast(t.msg), 
            this.setData({
                picverifyCodeShow: !0,
                passport: i
            });
        } else if (0 != t.code) {
            if (this.toast(t.msg), 1548 != t.code) return;
            this.setData({
                picverifyCodeShow: !1
            });
        } else if (0 == t.code) {
            var o = this.setObjectData("validcodeVal", "");
            this.setData({
                picverifyCodeShow: !1,
                passport: o
            }), this.codeTimecount();
        }
    },
    codeTimecount: function() {
        var t = this;
        b = !0;
        var e = 60, a = setInterval(function() {
            var i = t.setObjectData("verifytext", --e + "s后重发");
            if (i = t.setObjectData("verifyColorFlag", !1), t.setData({
                passport: i
            }), 0 == e) {
                b = !1, o = t.setObjectData("verifyColorFlag", !0);
                var o = t.setObjectData("verifytext", "获取动态码");
                t.setData({
                    passport: o
                }), clearInterval(a);
            }
        }, 1e3);
    },
    telNumHideDel: function(t) {
        return t.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
    setParams: function(t, e) {
        for (var a = Object.keys(t), i = 0; i < a.length; i++) 1 == e ? void 0 !== f[a[i]] && (f[a[i]] = t[a[i]]) : "init" == e ? f[a[i]] = t[a[i]] : t[a[i]] && void 0 !== f[a[i]] && (f[a[i]] = t[a[i]]);
    },
    delNullKey: function(t) {
        for (var e = Object.keys(t), a = 0; a < e.length; a++) !t[e[a]] && delete t[e[a]];
        return t;
    },
    toast: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "提示", e = arguments[1];
        return !e && t && (e = t, t = "提示"), new Promise(function(a) {
            wx.showModal && wx.showModal({
                title: t,
                showCancel: !1,
                content: e,
                confirmColor: "#FF552E",
                success: function(t) {
                    a(t.confirm);
                }
            });
        });
    },
    setIsGoBack: function() {
        this.setData({
            isGoBack: !1
        });
    }
});