function e(e) {
    return Array.isArray(e) ? e : Array.from(e);
}

var t = function() {
    function e(e, t) {
        var n = [], o = !0, a = !1, i = void 0;
        try {
            for (var r, s = e[Symbol.iterator](); !(o = (r = s.next()).done) && (n.push(r.value), 
            !t || n.length !== t); o = !0) ;
        } catch (e) {
            a = !0, i = e;
        } finally {
            try {
                !o && s.return && s.return();
            } finally {
                if (a) throw i;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), n = require("../../bases/page.js"), o = require("../../common/localStorage.js"), a = require("./utils.js"), i = require("../../common/utils");

new n({
    data: {
        onLoad: null,
        onShow: null,
        onRefresh: null,
        onReachBottom: null,
        onPageScroll: null
    },
    onLoad: function(e) {
        var t = e.scene, n = e.showIndex, a = getApp() || {}, i = a.scene, r = a.navigateToIndexByCode;
        1034 != i || r || wx.reLaunch({
            url: "/pages/events/nhhb/index/index?cubeId=12379"
        }), t && (t = decodeURIComponent(t), this.handleScene(t));
        var s = 2, l = "138067.16.1";
        if ("1019" == i || 1 == n) s = 1, l = "138043.1.1"; else {
            var c = o.getSync("index_mall_greyScale");
            c || (c = Math.floor(100 * Math.random()), o.setSync("index_mall_greyScale", c, "30d")), 
            c >= 100 && (s = 1, l = "138043.1.1");
        }
        this.setData({
            onLoad: {
                timestamp: Date.now()
            },
            showIndex: s,
            ptag: l
        });
    },
    onUnload: function() {},
    onShow: function() {
        this.setData({
            onShow: {
                timestamp: Date.now()
            }
        }), wx.hideNavigationBarLoading(), delete getApp().navigateToIndexByCode;
    },
    onHide: function() {
        this.setData({
            onHide: {
                timestamp: Date.now()
            }
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            onRefresh: {
                timestamp: Date.now()
            }
        });
    },
    onShareAppMessage: function() {
        var e = this.shareConfig || {}, t = {
            title: e.title || "京东购物，多·快·好·省",
            path: e.path || this.route
        };
        return e.image && (t.imageUrl = a.fixUrl(e.image)), t;
    },
    onReachBottom: function() {
        getApp().event.emit("recommend:" + i.getPageUrl().route), this.setData({
            onReachBottom: {
                timestamp: Date.now()
            }
        });
    },
    onPageScroll: function(e) {
        this.setData({
            onPageScroll: {
                timestamp: Date.now(),
                scrollTop: e.scrollTop
            }
        });
    },
    initShareConfig: function() {
        var e = this;
        this.biz.getPPMS(34242).then(function(t) {
            t && t[0] && t[0].shareConfig && t[0].shareConfig[0] && (e.shareConfig = t[0].shareConfig[0]);
        }).catch(function(e) {
            return console.log(e);
        });
    },
    handleScene: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        e = this.parseScene(e), getApp().wxacode = e;
        var n = "", a = null, i = t(e.path, 1)[0];
        switch (e.type) {
          case "shop":
            n = "/pages/offlineStore/index", a = {
                shopId: i
            }, o.set("3c_shop", {
                id: i,
                time: Date.now()
            });
        }
        n && this.$goto(n, Object.assign({}, e.query, a));
    },
    parseScene: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        if (!n) return {};
        var o = n.split("?"), a = t(o, 2), i = a[0], r = a[1], s = void 0 === r ? "" : r, l = e(i.split("/")), c = l[0], h = l.slice(1), u = {};
        return s.split("&").forEach(function(e) {
            var n = e.split("="), o = t(n, 2), a = o[0], i = o[1];
            u[a] = i;
        }), {
            type: c,
            path: h,
            query: u,
            querystring: s
        };
    },
    firstScreenLoaded: function(e) {
        e.detail && this.speedMark(e.detail).speedReport(), this.initShareConfig();
    }
});