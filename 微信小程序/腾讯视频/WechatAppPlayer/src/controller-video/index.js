function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var r = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), o = function e(t, n, r) {
    null === t && (t = Function.prototype);
    var o = Object.getOwnPropertyDescriptor(t, n);
    if (void 0 === o) {
        var i = Object.getPrototypeOf(t);
        return null === i ? void 0 : e(i, n, r);
    }
    if ("value" in o) return o.value;
    var a = o.get;
    if (void 0 !== a) return a.call(r);
}, i = require("../../lib-inject").Promise, a = require("./flow-getinfo/index"), u = require("./flow-play/index"), c = require("./reporter"), f = require("../module/reporter/index"), l = require("../classes/Controller");

require("./flow-getinfo/data/ad").reporter.on("report", function(e) {
    f.any(e);
});

var p = function(f) {
    function p() {
        return e(this, p), t(this, (p.__proto__ || Object.getPrototypeOf(p)).apply(this, arguments));
    }
    return n(p, l), r(p, [ {
        key: "createFlow",
        value: function(e, t) {
            var n = this;
            e = e || {}, t = t || {}, "v4138" != e.from && (e.defn = "", e.noad = !1);
            var r = t.getReportParam, o = new i(function(e) {
                r ? r(function(t, n) {
                    e(n && n.hc_openid || "");
                }) : e("");
            }), f = c({
                cid: e.cid,
                vid: e.vid
            }, {
                getReportParam: r
            }), l = this.model;
            console.log("getOpenid start", Date.now());
            var p = o.then(function(n) {
                return e.openid = n, a(e, t);
            }).then(function(e) {
                l.state = "ready";
                var t = n.playflow = u(e, n, function(e) {
                    l.currentContent = e.currentContent, n.emit("contentchange", e);
                });
                return f.setPlayFlow(t), f.setVideoInfo(e.videoinfo), t.on("videotimeupdate", function() {
                    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                    n.emit.apply(n, [ "videotimeupdate" ].concat(t));
                }), t.on("videostart", function() {
                    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                    n.emit.apply(n, [ "videostart" ].concat(t));
                }), n.started.promise;
            }).then(function() {
                return l.state = "playing", n.playflow.start();
            }).then(function(e) {
                l.state = "ended";
            }).catch(function(e) {
                throw l.state = "error", n.playflow && n.playflow.stop(), f.error(e), e;
            });
            return this.switchDefn = function(r) {
                return o.then(function(n) {
                    return a({
                        vid: e.vid,
                        from: e.from,
                        cid: e.cid,
                        openid: n,
                        defn: r,
                        noad: !0
                    }, t);
                }).then(function(e) {
                    n.playflow.switchVideo(e);
                });
            }, p;
        }
    }, {
        key: "stop",
        value: function() {
            this.model.state = "ended", o(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "stop", this).call(this), 
            this.playflow && this.playflow.stop();
        }
    } ]), p;
}();

module.exports = function(e, t) {
    return new p(e, t);
};