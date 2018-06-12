var a = getApp(), t = require("../../util/util.js"), e = (require("../../util/base64.js").Base64, 
require("../../util/tracker.js"));

Page({
    data: {
        visitorId: "",
        userId: "",
        avatar: "",
        name: "",
        fcodeShow: !1,
        promoteShow: !1,
        alert: !1,
        showqr: !1,
        qrimg: "",
        interval: null,
        qravatar: "",
        qrname: "",
        accountType: "",
        amount: 0,
        invitationCode: "",
        role: "",
        show: !1
    },
    onLoad: function(a) {
        var t = this;
        wx.onUserCaptureScreen && wx.onUserCaptureScreen(function(a) {
            t.data.showqr && t.setData({
                alert: !0
            });
        });
    },
    onShow: function() {
        e.push(), this.init();
    },
    onHide: function() {
        this.closeqr(), t.hideLoading();
    },
    onUnload: function() {
        var a = this;
        null != a.data.interval && clearInterval(a.data.interval);
    },
    init: function(t) {
        var e = this;
        a.doLogin().then(function(t) {
            var r = "";
            e.setData({
                avatar: a.storageData.userInfo ? a.storageData.userInfo.avatarUrl : "",
                name: a.storageData.userInfo ? a.storageData.userInfo.nickName : "",
                visitorId: a.storageData.vid || "",
                userId: a.storageData.userId || ""
            }), a.request("user/status", {}, function(a, t) {
                if (!t) {
                    var r = a.data || {}, o = r.rebate || {};
                    e.setData({
                        is_mvip: r.mvip,
                        promoteShow: r.promote,
                        groupshare: r.groupshare,
                        is_gift: r.gift,
                        amount: o.amount || 0,
                        invitationCode: o.invite_code || "",
                        role: o.role || "",
                        show: o.show || !1
                    });
                }
            }, !1, !0), a.storageData.userId ? r = "real" : a.storageData.vid && (r = "virtual"), 
            e.setData({
                accountType: r
            });
        });
    },
    openqr: function() {
        var a = this;
        a.setData({
            showqr: !0
        }), a.getqr();
        var t = setInterval(function() {
            a.getqr();
        }, 6e4);
        a.setData({
            interval: t
        });
    },
    closealert: function() {
        this.setData({
            alert: !1
        });
    },
    getqr: function() {
        var e = this;
        a.request("user/qrcode", {}, function(a, r) {
            r ? t.showError("服务异常请稍后再试,或下载小米商城APP") : e.setData({
                qrimg: a.data.img || "",
                qravatar: a.data.icon || "",
                qrname: a.data.nickname || ""
            });
        });
    },
    closeqr: function() {
        var a = this;
        null != a.data.interval && clearInterval(a.data.interval), a.setData({
            interval: null,
            showqr: !1,
            qrimg: ""
        });
    },
    tryToVisitProfile: function() {
        e.push({
            logCode: "wx#bid=3034393.1&page=my",
            analyse: "tap"
        });
    },
    bindExistingAccount: function() {
        var e = this;
        t.showLoading(), a.request("cart/count", {}, function(r, o) {
            var i = 0;
            if (o) a.ssoLogin(!0, function() {
                e.init(), wx.setStorageSync("checkout:address", ""), t.hideLoading();
            }); else {
                if ((i = parseInt(r.data.result)) > 0) return t.hideLoading(), void t.showError("切换账号时，购物车需为空");
                0 == i && a.ssoLogin(!0, function() {
                    e.init(), wx.setStorageSync("checkout:address", ""), t.hideLoading();
                });
            }
        });
    },
    changeToVirtualAccount: function() {
        var e = this;
        a.storageData.serviceToken, a.storageData.xm_open_id, a.storageData.userId;
        a.storageData.userId = "", a.storageData.xm_open_id = "", a.storageData.serviceToken = "", 
        t.showLoading(), a.visitorRegister(function() {
            wx.setStorageSync("checkout:address", ""), e.setData({
                avatar: a.storageData.userInfo ? a.storageData.userInfo.avatarUrl : "",
                name: a.storageData.userInfo ? a.storageData.userInfo.nickName : "",
                visitorId: a.storageData.vid || "",
                userId: a.storageData.userId || "",
                accountType: "virtual"
            }), a.request("user/status", {}, function(a, r) {
                t.hideLoading(), r || e.setData({
                    is_mvip: a.data.mvip,
                    promoteShow: a.data.promote,
                    groupshare: a.data.groupshare,
                    is_gift: a.data.gift
                });
            }, !1, !0);
        });
    }
});