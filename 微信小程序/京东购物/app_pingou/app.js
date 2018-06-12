function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var o = require("./api/Ptag/v.js"), n = e(require("./libs/emitter")), r = e(require("./common/http_json.js"));

wx.$ = require("./global.js"), wx.isXCX = !0, require("./common/report/report.js"), 
require("./common/polyfill.js");

var t = require("./common/checkForUpdate.js"), s = require("common/localStorage.js"), i = require("common/report/device.js"), u = require("./common/request/plugins/dispatcher"), c = require("./common/http_access").errorLog, a = require("./common/recovery/init.js"), l = require("./common/user_info.js"), p = require("./common/login/login.js"), d = require("./common/cookie-v2/cookie.js"), f = require("./common/utils.js");

wx.$request = require("./common/request/request.js"), App({
    systemInfo: {},
    networkType: "wifi",
    webpSupport: !1,
    firstOnShow: !0,
    userInfo: {},
    scene: "",
    wxacode: {},
    indexTips: {
        path: "",
        text: ""
    },
    version: "1.6.3",
    appId: "wxca1fe42a16552094",
    debug: require("common/debug.js"),
    onLaunch: function() {
        var e = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        console.log("App onLaunch"), f.handleQueryScene(n.query), d.setCookie({
            data: {
                wxapp_type: 2
            },
            defaultExpires: !0
        }), s.checkAndClearAllIfNeeded(), n.query && /^(http|ws|socket)$/.test(n.query.debugChannel) && u.setDebugChannel(n.query.debugChannel), 
        p.getLoginPromise().then(function() {
            e.userInfo = l.gUserData();
        }), l.initUserData(), (0, o.initAppReport)(), i(), wx.getNetworkType({
            success: function(o) {
                e.networkType = o.networkType;
            }
        }), wx.getSystemInfo({
            success: function(o) {
                var n = o.platform, r = o.SDKVersion;
                e.webpSupport = "android" == n || "devtools" == n, e.bRenderCb = r >= "1.5.0", e.systemInfo = o;
            }
        }), this.scene = n.scene || "";
    },
    onShow: function(e) {
        var o = this;
        if (console.log("============App onShow"), f.handleQueryScene(e.query), a(), 1036 == e.scene && (console.log("app分享参数:"), 
        console.log(e), "pages/item/detail/detail" === e.path && e.query.sku && (this.isAppShare = {
            status: !0,
            sku: e.query.sku
        })), this.referrerInfo = e.referrerInfo || {}, this.EA_PTAG = e.query ? e.query.EA_PTAG || e.query.ea_ptag || "" : "", 
        t(), this.firstOnShow) return setTimeout(function() {
            o.firstOnShow = !1;
        }, 2e3), !0;
        -1 != [ 1038, 1037 ].indexOf(e.scene) ? l.getUserInfo(function(e, o) {
            0 == e ? console.log("frontend update account success") : console.warn("frontend update account fail");
        }) : p.getLoginPromise().then(function() {
            console.log("frontend login success");
        }).catch(function() {
            console.warn("frontend login fail");
        }), l.initUserData(), console.log("App onShow");
    },
    onHide: function() {
        console.log("App onHide"), s.checkAndClearExpired();
    },
    onError: function(e) {
        console.log("app内错误信息上报", e.replace(/(\r\n|\r|\n)+/g, " "));
        for (var o = [ "getStorage:fail data not found", "getStorageSync:fail data not found", "Callback was already called" ], n = 0, t = o.length; n < t; n++) {
            var s = o[n];
            if (-1 != e.indexOf(s)) return;
        }
        r.default.get(c.url, c.getData({
            url: "APP",
            errCode: "-1",
            errMsg: e.replace(/(\r\n|\r|\n)+/g, " "),
            responseTime: "-1",
            page: "pages/pingou/index/index",
            env: getApp().version
        }), c.callback);
    },
    event: new n.default(void 0)
}), wx.JD = require("./common/JD.js");