var e = require("./api/Ptag/v.js"), o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./libs/emitter"));

wx.$ = require("./global.js"), wx.isXCX = !0, require("./common/report/report.js"), 
require("./common/polyfill.js");

var r = require("./common/checkForUpdate.js"), n = require("common/localStorage.js"), t = require("common/report/device.js"), s = require("./common/http_access").errorLog, i = require("./common/recovery/init.js"), u = require("./common/cookie-v2/cookie.js"), c = require("./common/user_info.js"), a = require("./common/login/login.js"), l = require("./common/request/plugins/dispatcher"), p = require("./common/utils.js"), d = require("./common/buildVersion").VERSION_BUILD_TIME;

wx.$request = require("./common/request/request.js"), App({
    systemInfo: {},
    networkType: "wifi",
    webpSupport: !1,
    firstOnShow: !0,
    userInfo: {},
    scene: "",
    referrerInfo: {},
    wxacode: {},
    indexTips: {
        path: "",
        text: ""
    },
    version: "5.7.12",
    appId: "wx91d27dbf599dff74",
    debug: require("common/debug.js"),
    onLaunch: function() {
        var o = this, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        console.log("App onLaunch"), p.handleQueryScene(r.query), u.setCookie({
            data: {
                buildtime: d,
                wxapp_type: 1
            },
            defaultExpires: !0
        }), n.checkAndClearAllIfNeeded(), r.query && /^(http|ws|socket)$/.test(r.query.debugChannel) && l.setDebugChannel(r.query.debugChannel), 
        a.getLoginPromise().then(function() {
            o.userInfo = c.gUserData();
        }), c.initUserData(), (0, e.initAppReport)(), t(), wx.getNetworkType({
            success: function(e) {
                o.networkType = e.networkType;
            }
        }), wx.getSystemInfo({
            success: function(e) {
                var r = e.platform, n = e.SDKVersion;
                o.webpSupport = "android" == r || "devtools" == r, o.bRenderCb = n >= "1.5.0", o.systemInfo = e;
            }
        }), this.scene = r.scene || "";
    },
    onShow: function() {
        var e = this, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (console.log("============App onShow"), p.handleQueryScene(o.query), i(), 1036 == o.scene ? (console.log("app分享参数:"), 
        console.log(o), "pages/item/detail/detail" === o.path && o.query.sku && (this.isAppShare = {
            status: !0,
            sku: o.query.sku
        })) : (console.log("===============非app分享场景"), this.isAppShare = {
            status: !1
        }), this.referrerInfo = o.referrerInfo || {}, this.scene = o.scene || this.scene || "", 
        this.EA_PTAG = o.query ? o.query.EA_PTAG || o.query.ea_ptag || "" : "", r(), this.firstOnShow) return setTimeout(function() {
            e.firstOnShow = !1;
        }, 2e3), !0;
        -1 != [ 1038, 1037 ].indexOf(o.scene) ? c.getUserInfo(function(e, o) {
            0 == e ? console.log("frontend update account success") : console.warn("frontend update account fail");
        }) : a.getLoginPromise().then(function() {
            console.log("frontend login success");
        }).catch(function() {
            console.warn("frontend login fail");
        }), c.initUserData();
    },
    onHide: function() {
        console.log("App onHide"), n.checkAndClearExpired();
    },
    onError: function(e) {
        console.log("app内错误信息上报", e.replace(/(\r\n|\r|\n)+/g, " "));
        for (var o = [ "getStorage:fail", "getStorageSync:fail", "Callback was already called" ], r = 0, n = o.length; r < n; r++) {
            var t = o[r];
            if (-1 != e.indexOf(t)) return;
        }
        wx.$request({
            url: s.url,
            method: "POST",
            data: s.getData({
                url: "APP",
                errCode: "-1",
                errMsg: e.replace(/(\r\n|\r|\n)+/g, " "),
                responseTime: "-1",
                page: "pages/index/index",
                env: getApp().version
            }),
            priority: "REPORT"
        });
    },
    event: new o.default(void 0)
}), wx.JD = require("./common/JD.js");