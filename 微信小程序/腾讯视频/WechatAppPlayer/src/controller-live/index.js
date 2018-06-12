function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function n(t, e) {
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

var o = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n), o && t(e, o), e;
    };
}(), r = function t(e, n, o) {
    null === e && (e = Function.prototype);
    var r = Object.getOwnPropertyDescriptor(e, n);
    if (void 0 === r) {
        var i = Object.getPrototypeOf(e);
        return null === i ? void 0 : t(i, n, o);
    }
    if ("value" in r) return r.value;
    var u = r.get;
    if (void 0 !== u) return u.call(o);
}, i = require("./flow-getinfo/index"), u = require("../classes/Controller"), a = require("../classes/Content"), c = function(c) {
    function l() {
        return t(this, l), e(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
    }
    return n(l, u), o(l, [ {
        key: "createFlow",
        value: function(t, e) {
            var n = this, o = t.sid, r = t.from, u = t.pid;
            t.defn, t.noad;
            "v4138" != r && "";
            var c = null, l = i(o, u, r).then(function(t) {
                c = new a({
                    url: t.data.playurl
                }), n.emit("contentchange", {
                    currentContent: c,
                    getinforaw: t
                });
            });
            return [ "End", "Play", "Pause", "Timeupdate", "Error", "Skip" ].forEach(function(t) {
                n.on("content" + t.toLowerCase(), function(e) {
                    for (var n = arguments.length, o = Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) o[r - 1] = arguments[r];
                    c && c["onContent" + t].apply(c, o);
                });
            }), this.switchDefn = function(t) {
                console.log("switchDefn", t), i(o, u, r, t).then(function(t) {
                    c = new a({
                        url: t.data.playurl
                    }), n.emit("contentchange", {
                        currentContent: c,
                        getinforaw: t
                    });
                });
            }, l;
        }
    }, {
        key: "stop",
        value: function() {
            r(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "stop", this).call(this), 
            this.playflow && this.playflow.stop();
        }
    } ]), l;
}();

module.exports = function(t, e) {
    return new c(t, e);
};