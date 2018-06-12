require("./vendors/passport/config/config").set({
    URL_PATH: "/vendors"
});

var e = require("./data/index"), n = require("./services/index"), t = require("./utils/index"), o = require("./utils/initTasks/index"), i = wx.getUpdateManager(), s = {
    DOMAIN: "https://wxapp.58.com",
    eventHandle: new t.EventHandle(),
    onLaunch: function(e) {
        var t = this;
        i.onCheckForUpdate(function(e) {
            t.doLogClick.call(t, {
                pageType: "58wxforce",
                pageName: "58wxforce",
                clickType: "forcecheck",
                clickName: "e_forcecheck",
                needupdate: "" + e.hasUpdate
            });
        }), i.onUpdateReady(function() {
            t.doLogClick.call(t, {
                pageType: "58wxforce",
                pageName: "58wxforce",
                clickType: "forceupdate",
                clickName: "e_forceupdate",
                isupdatesuccess: "true"
            }), wx.showModal({
                title: "更新提示",
                content: "有新版本更新，正在加载~",
                showCancel: !1,
                success: function(e) {
                    e.confirm && (t.doLogClick.call(t, {
                        pageType: "58wxforce",
                        pageName: "58wxforce",
                        clickType: "forceclick",
                        clickName: "e_forceclick"
                    }), i.applyUpdate());
                }
            });
        }), i.onUpdateFailed(function() {
            t.doLogClick.call(t, {
                pageType: "58wxforce",
                pageName: "58wxforce",
                clickType: "forceupdate",
                clickName: "e_forceupdate",
                isupdatesuccess: "false"
            });
        }), this.eventHandle.clear(), n.login.init(this), e = e || {}, o.start(this), this.globalData.scene = e.scene || 1001, 
        this.globalData.refAppId = e.referrerInfo ? e.referrerInfo.appId : "";
        var s = this.hasUnionId();
        console.log("login:hasUnionId-" + (s ? "是" : "否")), this.eventHandle.on("login", function(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            console.log("isClick", n), "friend" === t.storage.getSync("friendPage") || n ? setTimeout(function() {
                t.storage.removeSync("friendPage"), console.log("监听登录事件：");
                var o = t.hasUnionId();
                console.log("login:hasUnionId-" + (o ? "是" : "否")), t.login.getSetting().then(function(i) {
                    if (console.log(i), o || i["scope.userInfo"]) e({}); else {
                        if (!1 === i["scope.userInfo"]) return void (t.settingTimer = setTimeout(function() {
                            t.goto("/pages/authorize/authorize?getUserLogin=yes", !0), clearTimeout(t.settingTimer);
                        }, 500));
                        n && void 0 === i["scope.userInfo"] || !o ? t.goto("/pages/authorize/authorize?getUserLogin=yes", !0) : t.login.userLogin.bind(t)().then(function(n) {
                            e(n);
                        });
                    }
                });
            }, 800) : t.login.userLogin.bind(t)().then(function(n) {
                e(n);
            });
        }), this.eventHandle.on("login-success", function(e) {
            console.log("login-success"), t.setGlobalData(e);
        }), this.eventHandle.on("check-login", function(e) {
            return console.log("check-login: hasThirdKey-" + (t.getUserThirdKey() ? "是" : "否")), 
            (t.getUserThirdKey() ? Promise.resolve({}) : t.login.userLogin.bind(t)()).then(function() {
                var n = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).error;
                return n || (e && e(), t.eventHandle.emit("login-success")), {
                    error: n
                };
            });
        }), this.eventHandle.on("check-status-code", function(e, n) {
            t.login.checkStatusCode.bind(t)(e).then(function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                e.error && e.msg && t.toastError(e.msg), !e.error && n && n(e);
            }).catch(function(e) {
                console.error("check-status-code error", e);
            });
        }), this.eventHandle.on("logout", function(e) {
            console.log("on logout"), t.login.logout.bind(t)(function(n) {
                t.storage.setSync("userLogout", "1"), e && e(n);
            });
        }), this.eventHandle.on("passport-login", function(e, n) {
            console.log("passport-login"), t.login.passportLogin.bind(t)(n).then(e);
        }), this.eventHandle.on("passport-auto-login", function(e) {
            console.log("passport-auto-login"), t.login.passportAutoLogin.bind(t)().then(function(n) {
                !n.error && e && e(), console.log("自动登录成功>>>>", t.getUID()), t.eventHandle.emit("init-session-tabbar");
            });
        }), this.eventHandle.on("request-error", function(e) {
            console.log("request-error");
        }), this.eventHandle.on("user-login-error", function() {
            console.log("user-login-error");
        }), this.eventHandle.on("user-login-success", function() {
            t.storage.removeSync("userLogout");
        }), this.eventHandle.on("check-setting", function(e, n) {
            var o = t.hasUnionId();
            console.log("check-setting:hasUnionId-" + (o ? "是" : "否")), (o ? Promise.resolve({}) : t.login.openSetting.bind(t)()).then(function(t) {
                !t.error && e && e(n);
            });
        }), this.eventHandle.on("check-ppu", function(e) {
            var n = t.getPPU();
            console.log("check-hasPPU:hasPPU-" + (n ? "是" : "否")), (n ? Promise.resolve({}) : t.login.passportUrlRequest.bind(t)()).then(function(n) {
                !n.error && e && e();
            });
        }), this.eventHandle.on("gps-location", function(e) {
            t.gpsLocation.bind(t)().then(e);
        }), this.eventHandle.once("city-switch", function(e, n) {
            t.citySwitch.bind(t)(e, n);
        }), this.eventHandle.on("call-phone", function(e, n) {
            t.tel400.getPhone.bind(t)(n).then(e);
        }), this.eventHandle.on("show-wx-user-info", function(e) {
            t.login.getWxUserInfo.bind(t)().then(function(n) {
                e && e(n);
            });
        }), this.eventHandle.emit("init-session-tabbar");
    },
    getPPU: function() {
        return this.storage.getSync(this.constData.PPU_KEY) || "";
    },
    getUID: function() {
        return this.getUrlParams(this.getPPU())[this.constData.UID_KEY] || "";
    },
    getLocation: function() {
        return this.storage.getSync(this.constData.STORAGE_GPS_LOCATION_KEY) || "";
    },
    hasUnionId: function() {
        var e = this.getUserThirdKey();
        return !(!e || !e.hasAuth);
    },
    getThirdKey: function() {
        if (this.globalData.thirdKey) return this.globalData.thirdKey;
        var e = this.storage.getSync(this.constData.STORAGE_USER_INFO_KEY) || "";
        return e && e.thirdKey || "";
    },
    getUserThirdKey: function() {
        var e = this.storage.getSync(this.constData.STORAGE_USER_INFO_KEY) || "";
        return e && this.setGlobalData(e), e;
    },
    setGlobalData: function(e) {
        e = e || this.getUserThirdKey();
        var n = this.storage.getSync(this.constData.STORAGE_CITY_KEY);
        this.globalData.cityId = n && n.cityId || e.cityId, this.globalData.dispCityId = n && n.dispCityId || e.dispCityId, 
        this.globalData.gpsCityId = e.area || this.globalData.cityId, this.globalData.openId = e.openId || this.globalData.openId, 
        this.globalData.unionId = e.unionId || this.globalData.unionId;
    },
    onShow: function() {
        var e = this, n = setTimeout(function() {
            e.doLogClick.call(e, {
                pageType: "58wx_enter",
                pageName: "58wx_enter",
                clickType: "58wx_enter",
                clickName: "58wx_enter"
            }), clearTimeout(n);
        }, 2e3);
    },
    onHide: function() {
        this.doLogClick.call(this, {
            pageType: "58wx_exit",
            pageName: "58wx_exit",
            clickType: "58wx_exit",
            clickName: "58wx_exit"
        });
    },
    globalData: {
        imInited: null,
        userInfo: null,
        code: null,
        encryptedData: null,
        iv: null,
        cityId: null,
        dispCityId: null,
        gpsCityId: null,
        jump: "",
        profile: null,
        prePageUrl: "",
        currentPageUrl: "",
        gotoBeginTime: null,
        gotoEndTime: null,
        currentUrlParams: null,
        isNavigateBackOnLoginBack: null
    }
};

Object.assign(s, t, n, e), App(s);