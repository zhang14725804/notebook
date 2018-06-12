Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = Object.assign({}, e);
    t.$router = {
        navigateTo: function(t, e) {
            this._openInterceptor("navigateTo", t, e);
        },
        goTo: function(t, e) {
            var r = n.tabBarUrls, i = "";
            if ("string" == typeof t ? i = t : this._isObject(t) && (i = t.url), r && Array.isArray(r)) for (var a = 0; a < r.length; a++) if (new RegExp(r[a]).test(i)) return void this.switchTab(t, e);
            this.navigateTo(t, e);
        },
        redirectTo: function(t, e) {
            this._openInterceptor("redirectTo", t, e);
        },
        switchTab: function(t, e) {
            this._openInterceptor("switchTab", t, e);
        },
        reLaunch: function(t, e) {
            this._openInterceptor("reLaunch", t, e);
        },
        _openInterceptor: function(t, e, n) {
            var r = this;
            if (!this.IsPageNavigating) {
                var i = null, a = "", o = null;
                this.IsPageNavigating = !0, "string" == typeof e ? a = e : this._isObject(e) && (a = e.url), 
                a || console.error("[Warn]: argument url cannot be null or empty"), /^pages\//.test(a) && (a = "/" + a), 
                (i = this._unparam(a)) && e.params ? (a = a.replace(/\?.*/, ""), o = this._param(Object.assign({}, i, e.params))) : o = e.params ? this._param(e.params, n) : "", 
                "switchTab" === t && "" !== o && (o = ""), wx[t]({
                    url: a + o,
                    complete: function() {
                        r.IsPageNavigating = !1;
                    },
                    success: function(t) {
                        e.success && e.success();
                    },
                    fail: function(n) {
                        r.IsPageNavigating = !1, e.fail ? e.fail(n) : "navigateTo" === t && /count limit/.test(n.errMsg) ? r._openInterceptor("redirectTo", e) : wx.showModal({
                            title: "温馨提示",
                            content: "操作失败，请稍后再试",
                            showCancel: !1
                        });
                    }
                });
            }
        },
        _param: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1], n = [], r = !0, i = !1, a = void 0;
            try {
                for (var o, s = Object.keys(t)[Symbol.iterator](); !(r = (o = s.next()).done); r = !0) {
                    var c = o.value, u = t[c];
                    n.push(c + "=" + (e ? encodeURIComponent(u) : u));
                }
            } catch (t) {
                i = !0, a = t;
            } finally {
                try {
                    !r && s.return && s.return();
                } finally {
                    if (i) throw a;
                }
            }
            return n.length ? "?" + n.join("&") : "";
        },
        _unparam: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments[1], n = {}, r = t.split("?")[1];
            return r ? (r.split("&").forEach(function(t, r) {
                var i = t.split("="), a = i[0], o = i[1] || "";
                a && (n[a] = e ? o : decodeURIComponent(o));
            }), n) : null;
        },
        _isObject: function(t) {
            return -1 !== Object.prototype.toString.call(t).indexOf("Object");
        }
    };
};