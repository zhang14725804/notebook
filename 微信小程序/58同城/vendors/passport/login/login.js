require("../util/fetch");

var t = [ 785, 786 ], e = require("../data/codetoTemplate"), a = (require("../util/password_check"), 
require("../util/store.js")), o = require("../util/passport_evHandle"), i = require("../data/codeData"), s = require("../util/common_param"), r = "", n = "", l = "", c = (getApp(), 
{}), d = !1, m = 60, p = "", h = {
    1: {
        val: "mobileVal",
        data: "pptmobile",
        templateJs: ""
    },
    2: {
        val: "userVal",
        data: "userName",
        templateJs: ""
    }
};

Page({
    data: {
        pageshow: !0,
        code: "init",
        typeBtnShow: !0,
        picverifyCodeShow: !1,
        userPicverifyCodeShow: !1,
        form: {
            logoShow: !1,
            passwordHide: !0,
            verifytext: "获取动态码",
            verifyColorFlag: !1
        },
        loginState: {},
        isGoBack: !0
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: i[r].NavigationBarTitle
        }), o.emit("passport-login-onReady");
    },
    onShow: function() {
        o.emit("passport-login-onShow");
    },
    onUnload: function() {
        this.data.isGoBack && o.emit("passport-login-onUnload", this.data.loginState);
    },
    onLoad: function(t) {
        switch (this.initSubmitParams(), this.setParams(t, !1), r = t.type, t.loginType) {
          case "1":
            r = t.type, l = !0, this.rendTemplateJs([ r ]);
            break;

          default:
            l = !1, this.rendTemplateJs([ "1", "2" ]);
        }
        n = e[r][0], this.setData({
            code: n,
            pageshow: !1,
            typeBtnShow: l
        }), t.path && (p = t.path), o.emit("passport-login-onLoad", t);
    },
    rendTemplateJs: function(t) {
        for (var o = this, i = void 0, s = 0; s < t.length; s++) {
            i = t[s];
            var r = h[i];
            r.templateJs = require("../util/" + e[i][1] + ".js"), r.templateJs = o.getJsObj(r.templateJs);
            var n = a.getSync(r.data), l = o.setObjectData(r.val, n);
            "1" == i && 11 == n.length && (l = o.setObjectData("verifyColorFlag", !0)), o.setData({
                form: l
            }), "1" == i && r.templateJs.getData(function(t) {
                m = t.totalTime || 60;
            });
        }
    },
    getJsObj: function(t) {
        if ("[object Object]" == Object.prototype.toString.call(t)) return t = t[Object.keys(t)[0]];
    },
    initSubmitParams: function() {
        d = !1, c = {
            mobile: "",
            password: "",
            vcodekey: "",
            mobilecode: "",
            validcode: "",
            warnkey: "",
            source: "",
            username: "",
            url: "",
            opentype: "",
            path: ""
        };
    },
    changeInit: function() {
        var t = {
            mobile: "",
            password: "",
            vcodekey: "",
            mobilecode: "",
            validcode: "",
            warnkey: "",
            username: ""
        };
        this.setParams(t, "init");
    },
    changeLoginType: function(t) {
        this.changeInit(), "1" == r ? r = "2" : "2" == r && (r = "1"), n = e[r][0], this.setData({
            code: n
        }), o.emit("passport-login-changetype", {
            type: r
        });
    },
    inputEvent: function(t) {
        var e = t.detail.value, a = t.currentTarget.dataset.type, o = this.setObjectData(a, e);
        "mobileVal" == a && (o = 11 == e.length ? this.setObjectData("verifyColorFlag", !0) : this.setObjectData("verifyColorFlag", !1)), 
        this.setData({
            form: o
        });
    },
    resetClick: function(t) {
        var e = t.currentTarget.dataset.type, a = this.setObjectData(e, "");
        "mobileVal" == e && (a = this.setObjectData("verifyColorFlag", !1)), this.setData({
            form: a
        });
    },
    eyetap: function(t) {
        var e = this.setObjectData("passwordHide", !this.data.form.passwordHide);
        this.setData({
            form: e
        }), o.emit("passport-eye-tap", {
            type: r,
            passwordHide: this.data.form.passwordHide
        });
    },
    verifyclick: function(t) {
        var e = this.data.form, a = e.mobileVal, i = e.validcodeVal;
        if (o.emit("passport-piccodesubmit-tap", {
            type: r
        }), 1 != this.data.picverifyCodeShow || i) {
            if (11 == this.data.form.mobileVal.length && 0 == d) {
                var s = this.delNullKey({
                    templateCode: r,
                    mobile: a,
                    validcode: i,
                    source: c.source,
                    callback: this.codecallback
                });
                h[1].templateJs.getCode(s);
            }
            o.emit("assport-getcode-tap", {
                type: r
            });
        } else this.toastComponent("请输入图片验证码");
    },
    codecallback: function(e) {
        if (t.indexOf(e.code) >= 0) {
            var a = h[1].templateJs.freshValidateCode(), i = this.setObjectData("validcodeUrl1", a);
            i = this.setObjectData("validcodeVal", ""), 786 == e.code && this.toastComponent(e.msg), 
            this.setData({
                picverifyCodeShow: !0,
                form: i
            }), o.emit("passport-picverifycode-show", {
                type: r,
                code: e.code
            });
        } else if (0 != e.code) this.toastComponent(e.msg); else if (0 == e.code) {
            var s = this.setObjectData("validcodeVal", "");
            this.setData({
                picverifyCodeShow: !1,
                form: s
            }), this.codeTimecount();
        }
    },
    codeTimecount: function() {
        var t = this;
        d = !0;
        var e = m, a = setInterval(function() {
            var o = t.setObjectData("verifytext", --e + "s后重发");
            if (o = t.setObjectData("verifyColorFlag", !1), t.setData({
                form: o
            }), 0 == e) {
                d = !1, i = t.setObjectData("verifyColorFlag", !0);
                var i = t.setObjectData("verifytext", "获取动态码");
                t.setData({
                    form: i
                }), clearInterval(a);
            }
        }, 1e3);
    },
    toastComponent: function() {
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
    getVcodeUrl: function(t) {
        t = t || "";
        var e = h[r].templateJs.freshValidateCode(t), a = this.setObjectData("validcodeUrl" + r, e);
        this.setData({
            form: a
        });
    },
    formSubmit: function(t) {
        var e = t.detail.value, a = t.currentTarget.dataset.type;
        1 == this.validate(e) && (this.setParams(e, !0), this.delNullKey(c), c.callback = this.logincallback, 
        c.templateCode = r, c.url && (c.url = decodeURIComponent(submitParams.url)), c.setIsGoBack = this.setIsGoBack, 
        "mobileVal" == a ? (c.pathUrl = "../", h[1].templateJs.formSubmit(c)) : (c.flag = !1, 
        c.pathUrl = "../", h[2].templateJs.formSubmit(c))), o.emit("passport-submit-tap", {
            type: r
        });
    },
    logincallback: function(e) {
        if (this.changeInit(), this.setData({
            loginState: e
        }), 0 == e.code) {
            this.toastComponent("登录成功");
            var a = {
                type: r,
                code: 0
            };
            if (s.commonParam.imCallback && (a.imCallback = s.commonParam.imCallback), o.emit("passport-submit-success", a), 
            s.commonParam.imCallback) return void s.commonParam.imCallback();
            if (!p) return;
            p = decodeURIComponent(p), "1" == c.opentype ? wx.navigateBack({
                delta: 1
            }) : wx.redirectTo({
                url: p
            });
        } else if (t.indexOf(e.code) >= 0) {
            var i = h[2].templateJs.freshValidateCode(), n = this.setObjectData("validcodeUrl2", i);
            n = this.setObjectData("userValidcodeVal", ""), 786 == e.code && this.toastComponent(e.msg), 
            this.setData({
                userPicverifyCodeShow: !0,
                form: n
            });
        } else this.toastComponent(e.msg);
    },
    validate: function(t) {
        if (void 0 !== t.mobile && !t.mobile) return this.toastComponent("请输入手机号！"), !1;
        if (t.mobile && t.mobile.length < 11) return this.toastComponent("手机号不能少于11位！"), 
        !1;
        if (void 0 !== t.password) {
            if (!t.password) return this.toastComponent("请输入密码！"), !1;
            if (t.password.length > 0 && t.password.length < 6) return this.toastComponent("密码太短，最少为6位。"), 
            !1;
            if (t.password.length > 16) return this.toastComponent("密码不应超过16个字符"), !1;
        }
        return void 0 === t.mobilecode || t.mobilecode ? !(void 0 !== t.validcode && !t.validcode) || (this.toastComponent("请输入图片验证码！"), 
        !1) : (this.toastComponent("请输入验证码！"), !1);
    },
    wraptap: function(t) {
        var e = t.target.dataset;
        if (e.name && "login_wrap" == e.name) {
            var a = this.setObjectData("logoShow", !1);
            this.setData({
                form: a
            });
        }
    },
    focus: function(t) {},
    setObjectData: function(t, e) {
        var a = this.data.form;
        return a[t] = e, a;
    },
    setParams: function(t, e) {
        for (var a = Object.keys(t), o = 0; o < a.length; o++) 1 == e ? void 0 !== c[a[o]] && (c[a[o]] = t[a[o]]) : "init" == e ? c[a[o]] = t[a[o]] : t[a[o]] && void 0 !== c[a[o]] && (c[a[o]] = t[a[o]]);
    },
    delNullKey: function(t) {
        for (var e = Object.keys(t), a = 0; a < e.length; a++) !t[e[a]] && delete t[e[a]];
        return t;
    },
    cancelValidateCode: function(t) {
        this.setData({
            picverifyCodeShow: !1
        }), o.emit("passport-picverifycode-cancel", {
            type: r
        });
    },
    setIsGoBack: function() {
        this.setData({
            isGoBack: !1
        });
    }
});