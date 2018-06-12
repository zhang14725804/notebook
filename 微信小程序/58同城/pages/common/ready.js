var a = Object.assign || function(a) {
    for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (a[n] = e[n]);
    }
    return a;
}, t = getApp(), e = require("../../utils/EventHandle").EventHandle, n = !1;

module.exports = function() {
    return {
        pageEvent: null,
        _pageData: {
            isRefreshOnLoginBack: !1,
            loading: !0
        },
        onReady: function() {
            this._onReady && this._onReady.apply(this, arguments);
        },
        onShow: function() {
            var e = this;
            if (t.globalData.currentPageUrl = t.getPageRoute(), console.log("this.globalData.prePageUrl", t.globalData.prePageUrl), 
            console.log("this.globalData.currentPageUrl", t.globalData.currentPageUrl), this.data.pageType && this.data.pageName) {
                var n = a({}, this.data.pageInfo);
                this.pageInfoKeys && this.pageInfoKeys.forEach(function(a) {
                    n[a] = e.data[a];
                });
                var o = setTimeout(function() {
                    t.doLogTrack(a({
                        pageParam: encodeURIComponent(t.urlConcat(e.urlParams)) || "",
                        pageType: e.data.pageType || "",
                        pageName: e.data.pageName || "",
                        cateCode: e.data.cateCode || "",
                        cate: e.data.cate || ""
                    }, n)), clearTimeout(o);
                }, 2e3);
            }
            this._onShow && this._onShow.apply(this, arguments), "pages/index/index" !== t.getPageRoute() && (t.storage.removeSync("login-back"), 
            t.storage.setSync("pagetype", "")), t.globalData.gotoEndTime = Date.now();
        },
        e_noop: function() {},
        autoLogin: function() {
            var a = this, e = t.storage.getSync(t.constData.STORAGE_USER_INFO_KEY), o = t.storage.getSync(t.constData.PPU_KEY);
            o && !n && (t.eventHandle.emit("user-complete"), n = !0), this.initData && this.initData(), 
            e && e.hasAuth && !o && !t._autoLogined && (t._autoLogined = !0, t.eventHandle.emit("passport-auto-login", function() {
                t.eventHandle.emit("user-complete");
            })), t.getLocation() || t.eventHandle.emit("gps-location", function(t) {
                t.error || a._gpsReady(t);
            }), this._getWXUserInfo();
        },
        onLoad: function(a) {
            var n = this;
            this.pageEvent = new e(), t.globalData.currentUrlParams = this.urlParams = a, this.data = this.pageData = Object.assign({}, this._pageData, this.data, this.urlParams);
            var o = this.initData;
            this.initData = t.debounce(50, function() {
                for (var a = arguments.length, t = Array(a), e = 0; e < a; e++) t[e] = arguments[e];
                n.setDataLazy({
                    list: [],
                    loading: !0,
                    showEmptyInfo: !1
                });
                var i = o && o.apply(n, t);
                i && i.then && i.then(function() {
                    n.setDataLazy({
                        loading: !1
                    });
                });
            }), this.data.isRefreshOnLoginBack && t.eventHandle.offOn([ "passport-login-success" ], this.initData), 
            this._onLoad && this._onLoad.apply(this, arguments), a.pagetype && t.getPageRoute(0).indexOf("index/index") >= 0 && "friend" !== a.pagetype || t.eventHandle.emit("login", function(e) {
                "friend" !== a.pagetype || e.error || !t.hasUnionId() ? n.autoLogin() : setTimeout(function() {
                    t.goto([ "/pages/friend/friend", a ], !0);
                }, 500);
            });
        },
        _getWXUserInfo: function() {
            return;
        },
        onUnload: function() {
            t.globalData.prePageUrl = t.getPageRoute(), this._onUnLoad && this._onUnLoad();
        },
        _gpsReady: function(a) {
            this.gpsReady && this.gpsReady(a);
        },
        lazyData: {},
        setDataLazy: function(a) {
            this.lazyData = this.lazyData || {}, a = a || {}, a = Object.assign.apply(null, [].concat(a)), 
            Object.assign(this.lazyData, a), this.__renderView();
        },
        __renderView: t.debounce(10, function() {
            this.setData(this.lazyData), this.lazyData = {};
        }, {
            firstRun: !0,
            lastRun: !0
        })
    };
};