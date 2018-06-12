var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = require("./performanceUtil"), r = (t.debounce, t.throttle), n = {
    urlConcat: function(t, r) {
        function n(t) {
            switch (void 0 === t ? "undefined" : e(t)) {
              case "string":
                return t;

              case "boolean":
                return t ? "true" : "false";

              case "number":
                return isFinite(t) ? t : "";

              default:
                return "";
            }
        }
        r = r || {}, "object" === (void 0 === t ? "undefined" : e(t)) && (r = t, t = null);
        r = r || {};
        var o = Object.keys(r).map(function(e) {
            var t = encodeURIComponent(n(e)) + "=";
            return Array.isArray(r[e]) ? r[e].map(function(e) {
                return t + encodeURIComponent(n(e));
            }).join("&") : t + encodeURIComponent(n(r[e]));
        }).join("&"), a = "";
        return a = t ? t.indexOf("?") > 0 ? o ? t + "&" + o : "" + t : o ? t + "?" + o : t : o, 
        (a = "string" == typeof a ? a : "").replace(/&+/g, "&");
    },
    getUrlParams: function(e) {
        e = (e = e || "").replace(/^.*\?/, "");
        var t = /([^&=]+)=([\w\W]*?)(&|$)/g, r = /^([\w\W]+)$/.exec(e), n = {};
        if (r && r[1]) for (var o = r[1], a = void 0; null != (a = t.exec(o)); ) n[a[1]] = a[2].replace(/[\r\n]/g, "");
        return n;
    },
    getPageRoute: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = getCurrentPages().reverse(), r = void 0;
        return t.length > e && (r = t[e]), e < 0 && (r = t.reverse[Math.abs(e) - 1]), r ? r.route || r.__route__ || "" : "";
    },
    getPageRouteWithParams: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = getCurrentPages().reverse(), r = void 0;
        return t.length > e && (r = t[e]), e < 0 && (r = t.reverse[Math.abs(e) - 1]), r ? this.urlConcat(r.route || r.__route__ || "", r.options) : "";
    },
    isInPageRoute: function(e) {
        e = e || "";
        var t = getCurrentPages();
        t = t.slice(0, t.length - 1);
        var r = !0, n = !1, o = void 0;
        try {
            for (var a, i = t[Symbol.iterator](); !(r = (a = i.next()).done); r = !0) {
                var u = a.value;
                if (u = u.route || u.__route__ || "", u = "/" + u, e.indexOf(u) >= 0) return !0;
            }
        } catch (e) {
            n = !0, o = e;
        } finally {
            try {
                !r && i.return && i.return();
            } finally {
                if (n) throw o;
            }
        }
        return !1;
    },
    goto: r(1e3, function(e, t, r) {
        this.globalData.prePageUrl = this.getPageRoute(), this.globalData.gotoBeginTime = Date.now(), 
        Array.isArray(e) && e.length > 0 && (e = this.urlConcat(e[0], e.length > 1 ? e[1] : {})), 
        t ? wx.navigateTo({
            url: e,
            complete: r
        }) : this.isInPageRoute(e) ? wx.navigateBack() : wx.redirectTo({
            url: e,
            complete: r
        });
    }),
    goback: r(1e3, function(e) {
        wx.navigateBack({
            delta: e
        });
    })
};

module.exports = n;