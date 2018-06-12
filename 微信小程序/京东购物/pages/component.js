function t(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function n(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function r(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

function a(t, e, n) {
    for (var r = (e = (e = e.replace(/\[(\w+)\]/g, ".$1")).replace(/^\./, "")).split("."), a = 0, i = r.length; a < i; ++a) {
        var o = r[a];
        if (!(o in t)) return t[o] = n, n;
        t = t[o];
    }
    return t;
}

var i = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
    };
}(), o = require("./base.js"), u = function(u) {
    function s(t, r) {
        e(this, s);
        var a = n(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, t));
        return a.target = t, a.path = r, a._events = {}, a.data.fn = {}, "function" == typeof t.setData && (a.page = t), 
        a._initComponents(), a._mergeLifeCircle(), a;
    }
    return r(s, o), i(s, [ {
        key: "defaultData",
        value: function() {
            return {};
        }
    }, {
        key: "components",
        value: function() {
            return {};
        }
    } ]), i(s, [ {
        key: "_mergeDefaultData",
        value: function() {
            var t = this.defaultData();
            for (var e in t) void 0 === this.data[e] && (this.data[e] = t[e]);
            this.page && this.setData(this.data);
        }
    }, {
        key: "_initComponents",
        value: function() {
            var t = this.components();
            this.components = {};
            for (var e in t) this.components[e] = new t[e](this.target, this.path + "." + e);
        }
    }, {
        key: "_replaceLoadFunc",
        value: function() {}
    }, {
        key: "_mergeLifeCircle",
        value: function() {
            var t = this, e = this, n = [ "onLoad", "onReady", "onShow", "onHide", "onUnload" ], r = !0, a = !1, i = void 0;
            try {
                for (var o, u = n[Symbol.iterator](); !(r = (o = u.next()).done); r = !0) {
                    (function() {
                        var n = o.value;
                        if (!t[n]) return "continue";
                        var r = t.target[n];
                        t.target[n] = function() {
                            "onLoad" === n && (e.page = this), r && r.apply(this, arguments), "onLoad" === n && e._mergeDefaultData(), 
                            e[n].apply(e, arguments);
                        };
                    })();
                }
            } catch (t) {
                a = !0, i = t;
            } finally {
                try {
                    !r && u.return && u.return();
                } finally {
                    if (a) throw i;
                }
            }
        }
    }, {
        key: "_getFuncName",
        value: function(t) {
            return t + "_" + this.cid;
        }
    }, {
        key: "setData",
        value: function(t) {
            var e;
            if (!this.page) throw Error("no page object~  @JD");
            var n = this.path, r = {};
            for (var a in t) r[n + "." + a] = t[a];
            for (var i = arguments.length, o = Array(i > 1 ? i - 1 : 0), u = 1; u < i; u++) o[u - 1] = arguments[u];
            (e = this.page).setData.apply(e, [ r ].concat(o));
        }
    }, {
        key: "onLoad",
        value: function() {}
    }, {
        key: "addFunc",
        value: function(e, n) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 500;
            if (this.data[e]) throw new Error("function name " + e + " is already exists~   @JD");
            var a = this._getFuncName(e);
            this.page ? this.setData(t({}, "" + e, a)) : this.data[e] = a, "number" == typeof r && (n = this.helper.throttle(n, r)), 
            this.target[a] = n.bind(this);
        }
    }, {
        key: "on",
        value: function(t, e) {
            this._events[t] || (this._events[t] = []), e = e.bind(this), this._events[t].push(e), 
            this.target.emitter.on(t, e);
        }
    }, {
        key: "emit",
        value: function() {
            var t;
            (t = this.target.emitter).emit.apply(t, arguments);
        }
    }, {
        key: "cid",
        get: function() {
            return this._cid || (this._cid = this.__getRandomID("Cx")), this._cid;
        }
    }, {
        key: "data",
        get: function() {
            return a((this.page || this.target).data, this.path, {});
        },
        set: function(t) {
            throw console.log("~~~~~~~~~ set: ", t), Error("cannot set data yet!  @JD");
        }
    }, {
        key: "route",
        get: function() {
            return this.page ? this.page.route : "";
        }
    } ]), s;
}();

module.exports = u;