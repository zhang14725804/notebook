function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    var e = Object.assign({}, {
        agenttype: a.default.agenttype,
        ptid: a.default.ptid
    }, t);
    return e.qd_sc = o.default.getQiyiQtsc(e), i.commonGetRequest({
        url: "" + n.default.OUTERHOST.PASSPORT + l.SWITCHACCOUNT,
        reqParams: e
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}(require("../../common/serviceApi/serviceApi")), a = t(require("../../common/login/constant")), o = t(require("../../common/utils/RSA/rsaUtil")), u = t(require("../../common/user/user")), n = t(require("../../common/utils/util")), s = t(require("../../common/login/session")), r = (t(require("../../common/login/index")), 
t(require("../../common/pingback/click"))), c = t(require("../../components/subscribe/subscribeService")), l = {
    MULTIACCOUNT: "/apis/rec/multi_account.action",
    DISABLETIPS: "/apis/rec/disable_tips.action",
    SWITCHACCOUNT: "/apis/rec/switch_account.action",
    VERIFYLOGIN: "/apis/rec/verify_login.action"
};

exports.default = {
    isMultiAccount: function(t) {
        var e = Object.assign({}, {
            agenttype: a.default.agenttype,
            ptid: a.default.ptid
        }, t);
        return e.qd_sc = o.default.getQiyiQtsc(e), i.commonGetRequest({
            url: "" + n.default.OUTERHOST.PASSPORT + l.MULTIACCOUNT,
            reqParams: e
        }).then(function(t) {
            return t.list = n.default.isArray(t.list) ? t.list : [], t.list = t.list.filter(function(t) {
                return n.default.isArray(t.vipType) ? t.vipType = t.vipType.filter(function(t) {
                    return 3 != t;
                }) : t.vipType = [], n.default.isArray(t.vipType) && t.vipType.length > 0;
            }), t.list.length > 0 ? t : Promise.reject(t);
        }).catch(function(t) {
            return Promise.reject(t);
        });
    },
    disableTips: function(t) {
        var e = this.app.globalData.mutiAuthcookie, u = Object.assign({}, {
            agenttype: a.default.agenttype,
            ptid: a.default.ptid
        }, {
            authcookie: e
        });
        u.qd_sc = o.default.getQiyiQtsc(u), s.default.Session.set(s.default.SESSION_AUTH_KEY, e), 
        "qiyi" !== this.data.loginType && this.getUserInfo({});
        var g = this.data.curpage;
        return r.default.send({
            rpage: g,
            block: "wx_block_login_suggest",
            rseat: "wx_login_nosuggest"
        }), getApp().emitter.emit("afterToggleByWechat" + g), getApp().emitter.emit("hideMutiDialog"), 
        getApp().emitter.emit("afterLoginSuccess"), c.default.uploadAfterLogin(e), i.commonGetRequest({
            url: "" + n.default.OUTERHOST.PASSPORT + l.DISABLETIPS,
            reqParams: u
        });
    },
    switchAccount: e,
    verifyLogin: function(t) {
        var e = Object.assign({}, {
            agenttype: a.default.agenttype,
            ptid: a.default.ptid
        }, t);
        return e.qd_sc = o.default.getQiyiQtsc(e), i.commonPostRequest({
            url: "" + n.default.OUTERHOST.PASSPORT + l.VERIFYLOGIN,
            reqParams: e
        });
    },
    toggleAccountItem: function(t) {
        var i = this;
        getApp().emitter.emit("afterLoginSuccess");
        var a = this.data.mutiAccountList;
        if (!n.default.isArray(this.data.mutiAccountList)) return !1;
        if (0 == a.length) return !1;
        wx.showLoading && wx.showLoading({
            title: "加载中"
        });
        var o = t.currentTarget.dataset.listIndex, r = n.default.isObject(a[o]) ? a[o].token : "";
        e({
            authcookie: this.app.globalData.mutiAuthcookie,
            device_id: u.default.getAnonymousUid(),
            token: r
        }).then(function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (getApp().emitter.emit("hideMutiDialog"), wx.hideLoading && wx.hideLoading(), 
            i.setData({
                mutiDialogFlag: !1,
                mutiUserName: t.nickname
            }), s.default.Session.set(s.default.SESSION_AUTH_KEY, t.authcookie), c.default.uploadAfterLogin(t.authcookie), 
            i.showMutiAccountToast(), "qiyi" === i.data.loginType) setTimeout(function() {
                wx.navigateBack();
            }, 3e3); else {
                i.getUserInfo({});
                var e = "afterToggleByWechat" + i.data.curpage;
                getApp().emitter.emit(e);
            }
        }).catch(function(t) {
            if ("P00606" == t.code) {
                i.setData({
                    mutiDialogFlag: !1
                });
                var e = encodeURIComponent(r), a = i.data.curpage;
                s.default.Session.set(s.default.SESSION_AUTH_KEY, i.app.globalData.mutiAuthcookie), 
                "qiyi" == i.data.loginType ? wx.redirectTo({
                    url: "/subPackage/pages/setPhone/set?tokens=" + e + "&pagefrom=" + a + "&delta=4&phoneType=mutiAccount"
                }) : wx.navigateTo({
                    url: "/subPackage/pages/setPhone/set?tokens=" + e + "&pagefrom=" + a + "&delta=4&phoneType=mutiAccount"
                });
            } else wx.showToast({
                title: "切换失败，请重试",
                icon: "none",
                duration: 3e3
            });
        });
    },
    hideMutiAccountDialog: function(t) {
        var e = this.app.globalData.mutiAuthcookie;
        s.default.Session.set(s.default.SESSION_AUTH_KEY, e), "qiyi" !== this.data.loginType && this.getUserInfo({});
        var i = this.data.curpage;
        r.default.send({
            rpage: this.data.curpage,
            block: "wx_block_login_suggest",
            rseat: "wx_login_nosuggest2"
        }), getApp().emitter.emit("afterToggleByWechat" + i), getApp().emitter.emit("hideMutiDialog"), 
        getApp().emitter.emit("afterLoginSuccess"), c.default.uploadAfterLogin(e);
    },
    showMutiAccountToast: function() {
        var t = this;
        this.setData({
            mutiToastFlag: !0
        }), setTimeout(function() {
            t.setData({
                mutiToastFlag: !1
            });
        }, 3e3);
    }
};