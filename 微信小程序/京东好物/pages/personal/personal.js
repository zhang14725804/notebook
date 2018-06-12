var e = require("../../utils/util.js"), o = require("../../utils/keplerReport.js").init(), t = getApp(), a = {};

t.globalConfig && t.globalConfig.havePointsFloor && (a = require("./operatorPoints/operatorPoints.js").operatorPoints), 
Page(Object.assign({}, a, {
    data: {
        homedir: "/kwxhome",
        defaultHeaderPng: "http://commonst.360buyimg.com/common/wx-images/personal/default.png",
        returnpage: "/pages/personal/personal",
        fromPageType: wx.getStorageSync("activityUrl") ? "" : "switchTab",
        fromPageLevel: wx.getStorageSync("activityUrl") ? 0 : 1,
        haveAboutFloor: !1,
        havePointsFloor: !1
    },
    onLoad: function(e) {
        o.set({
            urlParam: e,
            title: "个人中心",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        }), t.globalConfig && t.globalConfig.havePointsFloor && this.setData({
            havePointsFloor: t.globalConfig.havePointsFloor
        }), t.globalConfig && t.globalConfig.haveAboutFloor && this.setData({
            haveAboutFloor: t.globalConfig.haveAboutFloor
        });
    },
    injectData: function(e) {
        e && ("999" == e.code ? this.setData({
            isLogined: !1
        }) : e.user && this.setData({
            user: e.user,
            isLogined: !0
        }));
    },
    logout: function(o) {
        this.pingClick("WPersonal_Logout", "", "", "../login/login", o), this.isLogout = !0, 
        e.globallogout(this);
    },
    toLogin: function(o) {
        this.pingClick("WPersonal_LoginRegister", "", "", "../login/login", o), e.globalLoginShow(this);
    },
    onReady: function() {},
    onShow: function() {
        try {
            var a = this;
            wx.showToast({
                title: "加载中...",
                icon: "loading",
                mask: !0
            }), e.request({
                url: t.globalRequestUrl + a.data.homedir + "/myJd/home.json?tt=" + new Date().getTime(),
                success: a.injectData.bind(a),
                complete: function() {
                    wx.hideToast();
                },
                fail: function(o) {
                    e.reportErr(encodeURIComponent("个人中心onShow数据请求request失败，具体信息：") + o.errMsg);
                }
            });
        } catch (o) {
            e.reportErr(encodeURIComponent("个人中心onShow异常，具体信息：") + o.message);
        }
        o.pv();
    },
    jumpNav: function(e) {
        var o = "", t = "";
        switch (e.target.dataset.navtype) {
          case "n-order":
            o = "/pages/order/order", t = "myorder";
            break;

          case "n-coupon":
            o = "/pages/coupon/allCoupon", t = "mycoupon";
            break;

          case "n-service":
            o = "/pages/service/service?isLogined=" + this.data.isLogined, t = "service";
            break;

          case "n-aftersale":
            o = "";
            break;

          case "n-feedback":
            o = "/pages/myFeedback/myFeedback", t = "feedback";
            break;

          case "n-abouts":
            o = "/pages/my/abouts";
        }
        o && (t && this.pingClick("WPersonal_PersonalEntrance", "", t, o, e), wx.navigateTo({
            url: o
        }));
    },
    pingClick: function(e, t, a, n, i) {
        o.click({
            eid: e,
            elevel: t,
            eparam: a,
            pname: "",
            pparam: "",
            target: n,
            event: i
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
}));