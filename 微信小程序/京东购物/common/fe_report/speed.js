function n(n, t) {
    if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t() {
    s || wx.getSystemInfo({
        success: function(n) {
            s = n.platform;
        },
        fail: function(n) {
            s = "others";
        }
    }), c || wx.getNetworkType({
        success: function(n) {
            c = n.networkType;
        },
        fail: function(n) {
            c = "unknown";
        }
    });
}

function e() {
    if (void 0 === f) {
        (f = (o().isBetween(o("06/17", "MM/DD"), o("06/20", "MM/DD")) || o().isBetween(o("11/10", "MM/DD"), o("11/13", "MM/DD"))) && Math.random() >= .2) && console.warn("未命中采样，不执行测速上报！");
    }
    return f;
}

var i = function() {
    function n(n, t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(n, i.key, i);
        }
    }
    return function(t, e, i) {
        return e && n(t.prototype, e), i && n(t, i), t;
    };
}(), r = require("../request/request.js"), o = require("../../libs/moment.min.js"), u = require("../debug.js")("Speed 前端测速上报"), a = "https://fd.3.cn/cesu/r", s = "", c = "", f = void 0, h = function() {
    function o(e, i) {
        n(this, o), this.pid = e, this.initTime = i || new Date(), this.points = [], t();
    }
    return i(o, [ {
        key: "mark",
        value: function(n, t) {
            var e = +(t || new Date()) - this.initTime;
            return this.points[n - 1] = Math.max(e, 1), this;
        }
    }, {
        key: "report",
        value: function() {
            if (!e()) {
                var n = {};
                this.points.forEach(function(t, e) {
                    void 0 !== t && (n["s" + (e + 1)] = t);
                });
                var t = Object.assign({
                    pid: this.pid,
                    os: s,
                    apn: c
                }, n);
                u(t), r({
                    method: "GET",
                    url: a,
                    data: t,
                    priority: "REPORT"
                }).then(function(n) {
                    return n.body;
                }).catch(function(n) {
                    return n;
                });
            }
        }
    } ], [ {
        key: "reportAlone",
        value: function(n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (!e()) {
                var i = Object.assign({
                    pid: n,
                    os: s,
                    apn: c
                }, t);
                r({
                    method: "GET",
                    url: a,
                    data: i,
                    priority: "REPORT"
                }).then(function(n) {
                    return n.body;
                }).catch(function(n) {
                    return n;
                }), u(i);
            }
        }
    } ]), o;
}();

module.exports = h;