(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
        return typeof a;
    } : function(a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
    }, c = require("./utils/ppdog"), d = a(c), e = require("./utils/regenerator-runtime"), f = a(e), g = require("./utils/RequestApi"), h = require("./utils/Event");
    require("./libs/wx-component");
    var i = require("./libs/ann-log/index"), j = a(i), k = require("./module/base/config"), l = require("./module/base/login"), m = require("./module/service/userinfo"), n = require("./module/base/util"), o = require("./module/service/preload"), p = require("./module/base/amount"), q = require("./module/base/mta_analysis.js"), r = require("./module/service/wxComm"), s = require("./module/base/message"), t = k.DEALER, u = new h.Event();
    App({
        CGI_PREFIX: "/cgi-bin/",
        settings: {},
        userAction: {},
        config: {
            qq: "",
            ZSSymbols: [ "sh000001", "r_hkHSI", "usDJI" ]
        },
        curTab: null,
        Event: u,
        RequestApi: g.Request,
        onLaunch: function(a) {
            var b = this;
            j.default.log("App luanch!"), this.config.scene = a.scene, this.config.platform = a.query.platform, 
            this.config.ads = a.query.ads;
            try {
                var c = wx.getStorageSync("settings.colorType");
                b.settings.colorType = c || "hzld", j.default.log("User Settings", b.settings);
            } catch (a) {
                b.settings.colorType = "hzld", j.default.log("User Settings", b.settings);
            }
            d.default.wx.getStorage({
                key: "timeStamp"
            }).then(function() {
                d.default.wx.getStorage({
                    key: "user_action"
                }).then(function(a) {
                    a.data && (b.userAction = a.data);
                }), d.default.wx.getStorage({
                    key: "cachedList"
                }).then(function(a) {
                    b.cachedList = a.data;
                }).catch(function() {
                    b.cachedList = [];
                });
            }).catch(function() {
                console.log("version time out!"), j.default.log("Version Timed Out. Clear Storage."), 
                d.default.wx.clearStorage().then(function() {
                    d.default.wx.setStorage({
                        key: "timeStamp",
                        data: "1528445888190"
                    }), d.default.wx.setStorage({
                        key: "settings.colorType",
                        data: b.settings.colorType
                    });
                });
            }), this.getNotice(), u.on("addStockBySymbol", this, this.addStockBySymbol), u.on("delStockBySymbol", this, this.delStockBySymbol), 
            u.on("addCachedList", this, this.addCachedList), u.on("resetCachedList", this, this.resetCachedList);
        },
        onShow: function() {
            var a = this;
            console.log("app show"), j.default.log("App Show"), u.on("tapTab", this, this.onChangeTab), 
            d.default.wx.getSystemInfo().then(function(b) {
                a.SystemInfo = b;
            });
        },
        onHide: function() {
            j.default.log("App Hide"), u.emit("resetCachedList"), u.remove("tapTab", this, this.onChangeTab);
        },
        onChangeTab: function(a) {
            if (this.config.scene) g.Request.reportData({
                sop: "Zxg_active",
                scene: this.config.scene,
                platform: this.config.platform,
                ads: this.config.ads
            }), this.config.scene = null; else if (this.curTab && this.curTab != a) {
                g.Request.reportData({
                    sop: {
                        index: "zixuan_tab_click",
                        hq: "market_tab_click",
                        settings: "set_tab_click",
                        news: "xcx_newstab_click"
                    }[a]
                });
            }
            this.curTab = a;
        },
        onError: function(a) {
            j.default.error("App Error", a), console.log(a);
        },
        addStockBySymbol: function(a) {
            g.Request.operationSeq({
                code: a,
                act: "sa"
            }).then(function() {
                u.emit("addStockResult", a);
            });
        },
        delStockBySymbol: function(a) {
            var b = this;
            g.Request.operationSeq({
                code: a,
                act: "sd"
            }).then(function(c) {
                u.emit("delStockResult", {
                    symbol: a,
                    listData: c
                }), b.delStockResultAction(a, c.toJS());
            });
        },
        delStockResultAction: function(a) {
            d.default.wx.getStorage({
                key: "remindList"
            }).then(function(b) {
                var c = b.data, e = c.list, f = c.dList, h = e.indexOf(a);
                0 <= h && (g.Request.removeRemind(a).then(function() {
                    console.log("removed!!!");
                }), e.splice(h, 1), d.default.wx.setStorage({
                    key: "remindList",
                    data: {
                        list: e,
                        dList: f
                    }
                }));
            }), d.default.wx.getStorage({
                key: "searchHistory"
            }).then(function(b) {
                var c = b.data, e = c.map(function(a) {
                    return a.market + a.code;
                }), f = e.indexOf(a);
                -1 != f && (c[f].added = 0, d.default.wx.setStorage({
                    key: "searchHistory",
                    data: c
                }));
            });
        },
        addCachedList: function(a) {
            var b = this.cachedList;
            b && -1 === b.indexOf(a) && (b.push(a), d.default.wx.setStorage({
                key: "cachedList",
                data: b
            }));
        },
        resetCachedList: function() {
            var a = this, c = this.cachedList, e = function(a) {
                "object" === ("undefined" == typeof a ? "undefined" : b(a)) ? clearList.forEach(function(a) {
                    d.default.wx.removeStorage({
                        key: a
                    });
                }) : d.default.wx.removeStorage({
                    key: a
                }), console.log("[clearCache]:" + a);
            };
            d.default.wx.getStorage({
                key: "stockListStorage"
            }).then(function(a) {
                var b = a.data;
                c.forEach(function(a, d) {
                    var f = a.split("#")[0], g = b && b.find(function(a) {
                        return a.Symbol === f;
                    });
                    g || (c.splice(d, 1), e(a));
                }), d.default.wx.setStorage({
                    key: "cachedList",
                    data: c
                });
            }).catch(function() {
                d.default.wx.removeStorage({
                    key: "cachedList"
                }), e(a.cachedList);
            });
        },
        navigateTo: function() {
            var a = Date.now();
            return function(b) {
                1e3 > Date.now() - a || (a = Date.now(), wx.navigateTo(b));
            };
        }(),
        getNotice: function() {
            var a = this;
            a.noticeData = [ {
                title: "金句活动发奖了 来看你有奖吗",
                content: "pages/activity/hotpostReward/main",
                type: "2",
                inner: 1
            }, {
                title: "是金句总会发光 来看股民金句哪句打动你",
                content: "pages/activity/hotpost/main",
                type: "2",
                inner: 1
            } ];
            var b = new Date("2018/6/4 12:00:00");
            Date.now() >= Date.parse(b) && (a.noticeData = []);
        },
        rpxToPx: function(a) {
            var b = wx.getSystemInfoSync(), c = b.windowWidth / 375;
            return a *= c, Math.floor(a / 2);
        },
        device: wx.getSystemInfoSync(),
        util: n,
        wx: r,
        amount: p,
        mta: q
    });
})();