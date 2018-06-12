var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

require("utils/polyfill.js");

var e = require("utils/mfw_stat.js");

App({
    onLaunch: function() {
        e.launch("mafengwo", "1.4", !0);
    },
    onShow: function(t) {
        var o = t.scene;
        1036 === o ? wx.setStorageSync("__from_app", !0) : 1089 !== o && 1090 !== o && wx.setStorageSync("__from_app", !1), 
        e.show();
    },
    onHide: function() {
        e.hide();
    },
    host: "https://wx-app.mafengwo.cn",
    debug: !1,
    log: function() {
        var t;
        this.debug && (t = console).log.apply(t, arguments);
    },
    request: function(o) {
        if ("object" == (void 0 === o ? "undefined" : t(o)) && o.url) {
            var n = this, a = Object.assign({}, o), r = a.success, i = a.fail;
            a.header = Object.assign({
                "Content-Type": "application/json"
            }, a.header), a.fail = function() {
                "function" == typeof i && i(), e.track("reqFail", {
                    path: n.getCurrentRoute(),
                    link: o.url.split("?")[0]
                });
            }, a.success = function(e) {
                200 == e.statusCode && "object" == t(e.data) && 0 == e.data.errno ? "function" == typeof r && r(e.data.data) : (n.log("success to fail"), 
                a.fail());
            }, 0 !== a.url.indexOf("http") && (a.url = n.host + a.url), wx.request(a);
        }
    },
    getCurrentRoute: function() {
        var t = getCurrentPages();
        return t[t.length - 1].__route__;
    },
    backhomeScroll: function(t, e) {
        var o;
        (0 == e.detail.scrollTop || e.detail.deltaY >= 50 || e.detail.deltaY < 0) && (o = wx.createAnimation({
            duration: 300
        }), e.detail.scrollTop > 0 && e.detail.deltaY < 0 ? o.top("-128rpx").opacity(0).step() : o.top(0).opacity(1).step(), 
        t.setData({
            backhomeIconAnimation: o.export()
        }));
    },
    backhome: function(t, o) {
        var n = getCurrentPages(), a = 0, r = "pages/gonglve/index";
        if (e.track("click", {
            path: t.__route__,
            mod: "shortcut",
            link: r
        }), n.pop() && 0 == n.length) wx.redirectTo({
            url: "/" + r
        }); else {
            for (;n.length; ) if (a++, n.pop().__route__ == r) return void wx.navigateBack({
                delta: a
            });
            wx.navigateTo({
                url: r
            });
        }
    },
    getPageParameter: function(t, e) {
        var o, n, a;
        try {
            void 0 == (o = t[e]) && t.q && (n = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"), (a = decodeURIComponent(t.q).split("?")[1].match(n)) && (o = decodeURIComponent(a[2])));
        } catch (t) {}
        return o;
    }
});