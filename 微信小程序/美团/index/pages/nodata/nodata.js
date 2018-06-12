var t, a, n = require("../../../utils/cat"), e = getApp(), o = require("../../../utils/lx.js"), i = require("../../../utils/util.js"), s = {
    locationData: {
        info: "获取定位失败，请打开定位权限",
        infoErr: "",
        btnTxt: "打开定位权限",
        eventName: "getLocation"
    },
    userInfoData: {
        info: "必须完成微信授权才能继续使用，请稍后重试"
    },
    networkData: {
        info: "无法连接网络，请检查网络环境",
        btnTxt: "点击重试",
        eventName: "getNetworkData"
    },
    sendData: {
        info: "正在尝试获取数据...",
        btnTxt: "正在获取数据"
    },
    cityInfoData: {
        info: "获取城市信息失败，请点击重试",
        btnTxt: "点击重试",
        eventName: "getCityInfo"
    }
};

(0, n.page)({
    data: {
        tempData: null,
        formalData: null,
        isSend: !0,
        backUrl: "/index/pages/mt/mt"
    },
    confirmSettinghandle: function(t) {
        var a = t.authSetting;
        (void 0 === a ? {} : a)["scope.userLocation"] && (getCurrentPages().length > 1 ? wx.navigateBack({
            delta: 1
        }) : setTimeout(function() {
            wx.reLaunch({
                url: "/index/pages/mt/mt"
            });
        }, 300));
    },
    getLocation: function() {
        if (o.moduleClick("b_6oqa2zxx"), wx.canIUse("openSetting")) wx.openSetting({
            complete: this.confirmSettinghandle
        }); else {
            var t = this, a = this.data.formalData;
            if (a && this.data.isSend) {
                this.data.isSend = !1, a.info = s.sendData.info, a.btnTxt = s.sendData.btnTxt, this.setData({
                    formalData: a
                });
                e.getLocation(function() {
                    setTimeout(function() {
                        wx.reLaunch({
                            url: "/index/pages/mt/mt"
                        });
                    }, 300);
                }, function(a) {
                    t.data.tempData = a ? s.networkData : s.locationData, setTimeout(function() {
                        t.setData({
                            formalData: t.data.tempData
                        }), t.data.tempData = null, t.data.isSend = !0;
                    }, 1e3);
                });
            }
        }
    },
    getNetworkData: function() {
        wx.getNetworkType({
            success: function(t) {
                "none" !== t.networkType ? setTimeout(function() {
                    wx.reLaunch({
                        url: "/index/pages/mt/mt"
                    });
                }, 300) : wx.showToast({
                    title: "请检查网络状态",
                    mask: !0,
                    icon: "loading",
                    duration: 2e3
                });
            },
            fail: function(t) {
                console.error("wx.getNetworkType fail"), wx.showToast({
                    title: "请检查网络状态",
                    mask: !0,
                    icon: "loading",
                    duration: 2e3
                });
            }
        });
    },
    getUserInfo: function() {
        e.login(function() {
            setTimeout(function() {
                wx.reLaunch({
                    url: "/index/pages/mt/mt"
                });
            }, 300);
        }, function() {});
    },
    getCityInfo: function() {
        var t = this.data.backUrl;
        wx.showLoading({
            title: "正在重试",
            mask: !0,
            success: function() {},
            fail: function() {}
        }), e.getCityInfo().then(function(a) {
            setTimeout(function() {
                wx.hideLoading(), setTimeout(function() {
                    wx.reLaunch({
                        url: t
                    });
                }, 300);
            }, 2e3);
        }).catch(function(t) {
            console.log(t), setTimeout(function() {
                wx.hideLoading();
            }, 2e3);
        });
    },
    onReady: function() {},
    onShow: function() {
        t = new Date() - 0, e.lxPvReport(i.getCid(), {
            cause: a
        });
    },
    onHide: function() {
        o.pageDisappear({
            duration: new Date() - t
        });
    },
    onLoad: function(t) {
        var n = t.type || "location", e = t.backUrl, o = void 0 === e ? "" : e, i = this;
        try {
            o = decodeURIComponent(o) || i.data.backUrl;
        } catch (t) {
            o = i.data.backUrl;
        }
        this.setData({
            errorType: n,
            backUrl: o
        }), "userInfo" == n ? (this.setData({
            formalData: s.userInfoData
        }), a = "userInfo") : "network" == n ? (this.setData({
            formalData: s.networkData
        }), a = "network") : "cityInfo" == n ? (this.setData({
            formalData: s.cityInfoData
        }), a = "cityInfo") : (this.setData({
            formalData: s.locationData
        }), a = "location");
    }
});