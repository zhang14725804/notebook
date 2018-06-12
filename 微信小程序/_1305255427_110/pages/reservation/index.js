var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/api.js")), t = require("../../utils/util.js"), a = require("../../libs/moment.min.js"), i = getApp();

Page({
    data: {
        hasLogin: !1,
        selectShopIndex: 0,
        selectTimeIndex: 0,
        shopList: [],
        timeArray: [],
        mobile: "",
        showInput: !1
    },
    onLoad: function(e) {
        this.setData({
            shopList: i.globalData.nowCityStore
        }), i.saveOpenId(), this.initTimeArray();
    },
    onShow: function() {
        var t = this;
        i.fetch(e.default.fetchUser, {}, function(e, a, n) {
            if (a.data) {
                var o = a.data, r = o.mobileLoginToken, s = o.mobile;
                i.saveCache("userLoginInfo", {
                    token: r,
                    mobile: s
                }), t.setData({
                    hasLogin: !0,
                    mobile: s
                });
            } else console.log("未登录");
        });
    },
    initTimeArray: function() {
        var e = [], t = new Date();
        if (t.getHours() > 21 || t.getHours() > 20 && t.getMinutes() > 30) for (var a = 1; a < 4; a++) 0 != a && t.setDate(t.getDate() + 1), 
        e.push(this.formateTime(t, a)); else for (var i = 0; i < 3; i++) 0 != i && t.setDate(t.getDate() + 1), 
        e.push(this.formateTime(t, i));
        this.setData({
            timeArray: e
        });
    },
    formateTime: function(e, t) {
        var i = {
            0: "周日",
            1: "周一",
            2: "周二",
            3: "周三",
            4: "周四",
            5: "周五",
            6: "周六"
        }, n = Number(e.getMonth()) + 1, o = e.getDate();
        e.getHours();
        return {
            string: n + "月" + o + "日(" + (0 == t ? "今天" : 1 == t ? "明天" : i[e.getDay()]) + ") 10:00-21:30",
            startTime: a(e.getFullYear() + "-" + this.formatNumber(n) + "-" + this.formatNumber(o) + "T10:00:00").format(),
            endTime: a(e.getFullYear() + "-" + this.formatNumber(n) + "-" + this.formatNumber(o) + "T21:30:00").format()
        };
    },
    formatNumber: function(e) {
        return (e = e.toString())[1] ? e : "0" + e;
    },
    handleClickShop: function(e) {
        var t = this.data.selectShopIndex, a = e.currentTarget.dataset.index;
        t != a && this.setData({
            selectShopIndex: a,
            selectTimeIndex: 0
        });
    },
    handleClickTime: function(e) {
        var t = e.currentTarget.dataset.index;
        this.setData({
            selectTimeIndex: t
        });
    },
    handleClickPhone: function(e) {
        this._piwik("miniapp/storeappointPage", "contactstore");
        var t = e.currentTarget.dataset.mobile;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    handleClickMap: function(e) {
        this._piwik("miniapp/storeappointPage", "viewmap");
        var a = e.currentTarget.dataset.shop, i = (0, t.bd09togcj02)(a.latitude, a.longitude);
        wx.openLocation({
            latitude: i[0],
            longitude: i[1],
            name: a.name,
            address: a.address
        });
    },
    handleSumbit: function() {
        var e = this.data, t = e.selectShopIndex, a = e.selectTimeIndex, n = e.timeArray, o = e.mobile;
        this._piwik("miniapp/storeappointPage", "storeappoint"), i.globalData.reservationInfo = {
            selectShopIndex: t,
            mobile: o,
            time: n[a]
        }, wx.navigateTo({
            url: "./confirm"
        });
    },
    getPhoneNumber: function(t) {
        var a = this;
        i.getPhoneNumber(t, function(t) {
            var n = t.detail.encryptedData, o = t.detail.iv;
            i.post(e.default.getWeixinBindPhone, {
                encryptedData: n,
                iv: o
            }, function(e, t, n) {
                0 == t.code ? (i.saveCache("user-phone-info", {
                    phone: t.data.purePhoneNumber
                }), a.setData({
                    mobile: t.data.purePhoneNumber
                }), a.handleSumbit()) : wx.navigateTo({
                    url: "../usercenter/login?url=" + encodeURIComponent("/pages/reservation/index")
                });
            });
        }, function() {
            wx.navigateTo({
                url: "../usercenter/login?url=" + encodeURIComponent("/pages/reservation/index")
            });
        });
    }
});