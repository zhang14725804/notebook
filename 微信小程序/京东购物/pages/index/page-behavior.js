function e(e) {
    return Array.isArray(e) ? e : Array.from(e);
}

var t = function() {
    function e(e, t) {
        var o = [], r = !0, n = !1, i = void 0;
        try {
            for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (o.push(a.value), 
            !t || o.length !== t); r = !0) ;
        } catch (e) {
            n = !0, i = e;
        } finally {
            try {
                !r && c.return && c.return();
            } finally {
                if (n) throw i;
            }
        }
        return o;
    }
    return function(t, o) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, o);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), o = require("../../common/localStorage.js");

module.exports = Behavior({
    properties: {
        onLoad: {
            type: Object,
            observer: function(e) {
                getApp().scene;
                var t = e.scene;
                t && (t = decodeURIComponent(t), this.handleScene(t)), this.onLoad(e);
            }
        },
        onShow: {
            type: Object,
            observer: function(e) {
                this.onShow(e);
            }
        },
        onHide: {
            type: Object,
            observer: function(e) {
                this.onHide(e);
            }
        },
        onRefresh: {
            type: Object,
            observer: function(e) {
                this.refresh(e);
            }
        },
        onReachBottom: {
            type: Object,
            observer: function(e) {
                this.onReachBottom(e);
            }
        },
        onPageScroll: {
            type: Object,
            observer: function(e) {
                this.onPageScroll(e);
            }
        }
    },
    methods: {
        onShow: function() {
            this.setData({
                showTime: +new Date()
            });
        },
        onReachBottom: function() {
            this.setData({
                reachBottom: +new Date()
            });
        },
        onPageScroll: function(e) {
            this.setData({
                scrollTop: e.scrollTop
            });
        },
        back2top: function() {
            wx.pageScrollTo({
                scrollTop: 0
            });
        },
        handleScene: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            e = this.parseScene(e), getApp().wxacode = e;
            var r = "", n = null, i = t(e.path, 1)[0];
            switch (e.type) {
              case "shop":
                r = "/pages/offlineStore/index", n = {
                    shopId: i
                }, o.set("3c_shop", {
                    id: i,
                    time: Date.now()
                });
            }
            r && this.$goto(r, Object.assign({}, e.query, n));
        },
        parseScene: function() {
            var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            if (!o) return {};
            var r = o.split("?"), n = t(r, 2), i = n[0], a = n[1], c = void 0 === a ? "" : a, s = e(i.split("/")), h = s[0], l = s.slice(1), u = {};
            return c.split("&").forEach(function(e) {
                var o = e.split("="), r = t(o, 2), n = r[0], i = r[1];
                u[n] = i;
            }), {
                type: h,
                path: l,
                query: u,
                querystring: c
            };
        }
    }
});