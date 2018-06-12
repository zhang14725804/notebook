var t = require("../../../utils/cat"), a = getApp(), e = require("../../../config.js"), o = require("../../../utils/util.js"), i = require("../../../utils/lx.js"), n = "https://p1.meituan.net/wxapp/cb6a54c48c3503cd2e5381e969cb760515054.png";

(0, t.page)({
    data: {
        imgUrl: "",
        defaultUrl: n,
        username: "",
        availableVouchersNum: 0,
        myPrizeItem: {}
    },
    imgErr: function(t) {
        this.setData({
            imgUrl: n
        });
    },
    onShow: function() {
        a.lxPvReport(o.getCid());
        var t = a.globalData.token, e = void 0 === t ? "" : t;
        e && this.getUserInfo(e);
    },
    onHide: function() {
        var t = a.loginSdk.authState.session, e = a.loginSdk.SessionState;
        t && t.state === e.AUTH && a.loginSdk.destroySession();
    },
    onLoad: function(t) {
        var e = a.globalData, o = e.redirectUrl;
        e.suppressLogin ? a.globalData.suppressLogin = !1 : this.login(o), this.loadPortmConfig();
    },
    handleLogin: function() {
        this.login();
    },
    gotoOrder: function() {
        a.login(function() {
            i.moduleClick("b_ehegv9lq"), wx.switchTab({
                url: "/index/pages/order/order-list"
            });
        });
    },
    gotoVoucher: function(t) {
        var e = t.detail.formId, n = t.currentTarget.dataset.source;
        a.login(function() {
            i.moduleClick("b_1sv3ypt1"), o.postFormId(e, n), wx.navigateTo({
                url: "/mt/pages/vouchers/vouchers"
            });
        });
    },
    login: function(t) {
        var e = this;
        a.login(function() {
            var o = a.globalData.token;
            e.getUserInfo(o), t && (wx.navigateTo({
                url: t
            }), a.globalData.redirectUrl = "");
        });
    },
    loadPortmConfig: function() {
        var t = this;
        o.request("https://portal-portm.meituan.com/weapp/group/page/mine").then(function(a) {
            if (a) {
                var e = a.data;
                if (e) {
                    var o = e.list;
                    t.setData({
                        myPrizeItem: o.data[0]
                    });
                }
            }
        });
    },
    goPrize: function() {
        var t = this;
        a.login(function() {
            var a = t.data.myPrizeItem;
            a && (i.moduleClick("b_5w589ks7", {
                activity_id: a.activityId,
                title: a.name
            }), wx.navigateTo({
                url: a.url
            }));
        });
    },
    goCollect: function() {
        a.login(function() {
            wx.navigateTo({
                url: "/mt/pages/collections/collections"
            });
        });
    },
    makeCall: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: a,
            success: function(t) {
                console.log(t);
            }
        });
    },
    getUserInfo: function(t) {
        var i = this;
        a.globalData.userInfo = a.globalData.userInfo || {};
        var n = a.globalData.userInfo, r = n.mtAvatar, l = n.mtNickName;
        r && l ? this.setData({
            imgUrl: r,
            username: l
        }) : o.request(e.userInfoApi, {
            query: {
                token: t
            }
        }).then(function(t) {
            200 == t.statusCode && (Object.assign(a.globalData.userInfo, {
                mtAvatar: t.data.avatarUrl,
                mtNickName: t.data.nickName
            }), i.setData({
                imgUrl: t.data.avatarUrl,
                username: t.data.nickName
            }));
        });
    },
    getVouchers: function() {
        var t = this;
        return o.request("" + e.vouchersApi + a.globalData.userId + "/vouchers", {
            query: {
                token: a.globalData.token,
                limit: 50
            }
        }).then(function(a) {
            if (a && a.data && a.data.data) {
                var e = a.data.data.availableList;
                e && e.length > 0 && t.setData({
                    availableVouchersNum: e.length
                });
            }
        });
    }
});