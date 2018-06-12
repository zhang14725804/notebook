function e(e, o) {
    if (p.use(o, o.comps, "Page[" + e + "]"), o.onNavigate) {
        var s = function(e, t) {
            o.onNavigate({
                url: e,
                query: t
            });
        };
        l.on("navigateTo:" + e, s), l.on("redirectTo:" + e, s), l.on("switchTab:" + e, s), 
        l.on("appLaunch:" + e, s);
    }
    o.onPreload && l.on("preload:" + e, function(e, t) {
        o.onPreload({
            url: e,
            query: t
        });
    }), o.$preLoad = r, o.$name = e, o.$route = n({
        type: "navigateTo"
    }), o.$redirect = n({
        type: "redirectTo"
    }), o.$switch = n({
        type: "switchTab"
    }), o.$home = function(e) {
        o.$switch(y + (e ? "?" + h.queryStringify(e) : ""));
    }, o.$back = t, o.$state = {
        firstOpen: !1,
        firstShareOpen: !1
    }, o.$put = function(e, t) {
        return v[e] = t, this;
    }, o.$take = function(e) {
        var t = v[e];
        return v[e] = null, t;
    }, o.$setData = function(e, t) {
        if ("string" == h.type(e)) {
            var n = {};
            return h.objEach(t, function(t, r) {
                n[e + "." + t] = r;
            }), this.setData(n);
        }
        if ("object" == h.type(e)) return this.setData(e);
    }, o.$curPage = function() {
        return getCurrentPages().slice(0).pop();
    }, o.$curPageName = function() {
        var e = getCurrentPages().slice(0).pop();
        return e ? i(e.route) : "";
    };
    var q = f({
        page_url: e
    });
    if (o.$core = {
        request: c,
        boss: q,
        post: c.post,
        get: c.get,
        vaccess: c.vaccess,
        stat: function(e) {
            if (e && e.currentTarget) {
                var t = e.currentTarget.dataset;
                t.stat && q.click(t.stat);
            }
        }
    }, o.onShareAppMessage) {
        var $ = o.onShareAppMessage;
        o.onShareAppMessage = function() {
            var e = $.apply(this, arguments);
            return e && !/\bptag=/.test(e.path) && (e.path = h.queryJoin(e.path, {
                ptag: "share"
            })), console.log("#[Share]", e), e;
        };
    }
    return o.onLoad = a(o.onLoad, function(t) {
        var n = this;
        this.$id = m++, o.onAwake && g.on("App:longSleep", function() {
            o.onAwake.call(n);
        });
        var r = t && t.ptag;
        if (r && (getApp().global.ptag = r + ":" + e), !d) {
            d = !0;
            var a = this.$state;
            a.firstOpen = !0, a.firstShareOpen = getCurrentPages().length <= 1;
        }
        setTimeout(function() {
            var n = "";
            try {
                n = Object.keys(t).map(function(e) {
                    return e + "=" + t[e];
                }).join("&");
            } finally {}
            q.pv(e, {
                page_query: n
            });
        }, 500);
    }), o.onReady = a(o.onReady, function() {
        u.emit("page:ready");
    }), Page(o), o;
}

function t() {
    getCurrentPages().length > 1 ? wx.navigateBack() : this.$switch(y);
}

function n(e) {
    var t = e.type;
    return function(e, n) {
        function r() {
            if (n.url = s[o] + (a ? "?" + a : ""), !n.url) throw new Error("Invalid pagename:", o);
            u[t](n);
        }
        var a = e.split(/\?/)[1], o = i(e), c = h.queryParse(a);
        if (n = n || {}, "kings" == o) {
            if (wx.navigateToMiniProgram) return void wx.navigateToMiniProgram({
                appId: "wxee48e83a9ce5cef8",
                path: "pages/hero/index?" + a,
                fail: function() {
                    o = "star", r();
                }
            });
            o = "star";
        }
        if ("search" == o) {
            var p = c.q;
            if (this.onSearchShow && this.setSearchInput && this.onSearch) return this.onSearchShow(null, !1), 
            this.setSearchInput(p), void this.onSearch(p);
            o = y, a = "?search=true&searchkey=" + decodeURIComponent(p);
        }
        r();
    };
}

function r(e) {
    var t = i(e);
    t && l.emit("preload:" + t, e, h.queryParse(e.split("?")[1]));
}

function a(e, t) {
    return function() {
        try {
            t && t.apply(this, arguments);
        } finally {
            return e && e.apply(this, arguments);
        }
    };
}

function i(e) {
    var t = e.split(/\?/)[0], n = t.match(/\/?pages\/(\w+)\/index$/);
    return n && (t = n[1]), t;
}

var o, u = require("./navigator/navigator"), s = require("../config/route.js"), c = require("./request/request.js"), p = require("./component.js"), h = require("./fns.js"), f = require("./boss.js"), g = require("./message"), l = new g(), v = {}, y = "index", d = 0, m = 1;

!function(e, t) {
    t.forEach(function(t) {
        e.on(t, function(e) {
            var n = i(e);
            n && l.emit(t + ":" + n, e, h.queryParse(e.split("?")[1]));
        });
    });
}(u, [ "navigateTo", "redirectTo", "switchTab" ]), l.on("app:launch", function(e) {
    if (e && e.path) {
        var t = e.path, n = e.query, r = i(t);
        r && l.emit("appLaunch:" + r, t, n);
    }
}), e.A = function(e) {
    function t(e) {
        o = e, setTimeout(function() {
            l.emit("app:launch", e);
        });
    }
    return e.onLaunch = e.onLaunch ? a(e.onLaunch, t) : t, App(e), e;
}, module.exports = e;