function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
    }
    return Array.from(e);
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), r = require("../libs/promise.min.js"), l = require("./cookie-v2/cookie.js"), i = require("./request/request.js"), a = {}, u = {}, c = [], s = 0, f = !1, p = function() {
    function e() {
        t(this, e);
    }
    return o(e, null, [ {
        key: "between",
        value: function(e, t, n) {
            return t <= e && e <= n;
        }
    }, {
        key: "buildParams",
        value: function(e) {
            return Object.keys(e).map(function(t) {
                var n = null == e[t] ? "" : e[t];
                return n instanceof Array ? n.map(function(e) {
                    return encodeURIComponent(t) + "=" + encodeURIComponent(e);
                }).join("&") : encodeURIComponent(t) + "=" + encodeURIComponent(n);
            }).join("&");
        }
    } ]), e;
}(), d = function() {
    function e() {
        t(this, e);
    }
    return o(e, null, [ {
        key: "init",
        value: function(t) {
            e.getConfig().then(function(n) {
                f = !0;
                var o = l.getCookie("jdpin"), r = [];
                if (n) {
                    if (Object.keys(u).length > 0) for (var i in u) if (Object.keys(u[i]).length > 0) for (var a in u[i]) e.isCanReport(o, i, v.levels[a]) && (r = r.concat(u[i][a]));
                    r.length > 0 && (e.report(r.concat([])), r = []), e.start(t);
                }
                u = {}, s = 0;
            });
        }
    }, {
        key: "start",
        value: function(t) {
            if (!e.intervalId) {
                t && isNaN(t);
                e.intervalId = setInterval(function() {
                    c.length > 0 && (e.report(c.concat([])), c = []);
                }, t);
            }
        }
    }, {
        key: "stop",
        value: function() {
            e.intervalId && (clearInterval(e.intervalId), e.intervalId = null);
        }
    }, {
        key: "report",
        value: function(e) {
            return new r(function(t, n) {
                i.get({
                    url: "https://wq.jd.com/visit/addlog",
                    data: {
                        id: new Date().getTime(),
                        log: e
                    },
                    header: {
                        "Content-Type": "text/plain;charset=UTF-8"
                    }
                }).then(function(e) {
                    var o = e.body;
                    e.header;
                    0 == o.retcode ? t(!0, o.msg) : n(!1, o.msg);
                }, function(e) {
                    var t = e.code, o = e.message;
                    n(!1, "上报失败: code:" + t + " msg: " + o);
                });
            });
        }
    }, {
        key: "getConfig",
        value: function() {
            return new r(function(e, t) {
                i.get({
                    url: "https://wqs.jd.com/sinclude/update/wx/2017/8/logConfig.html"
                }).then(function(t) {
                    var n = t.body;
                    t.header;
                    if (n.length > 0) {
                        a.enable = "true" == n[0].enable;
                        for (var o = 0; o < n[0].list.length; o++) {
                            var r = n[0].list[o];
                            a[r.jdpin] = {
                                enable: "true" == r.enable
                            }, a[r.jdpin].noModuleCfg = 0 == r.modulesConfig.length;
                            for (var l = 0; l < r.modulesConfig.length; l++) {
                                var i = r.modulesConfig[l];
                                a[r.jdpin][i.moduleName] = {
                                    level: i.level,
                                    startTime: i.startTime,
                                    endTime: i.endTime
                                };
                            }
                        }
                        e(!0);
                    } else e(!1);
                }, function(t) {
                    t.code, t.message;
                    e(!1);
                });
            });
        }
    }, {
        key: "isCanReport",
        value: function(e, t, n) {
            if (!a.enable || !e || !t || n == v.levels.OFF) return !1;
            if (a[e] && a[e].enable) {
                if (a[e].noModuleCfg) return !0;
                var o = a[e][t] ? a[e][t] : null;
                if (o) {
                    var r = o.startTime ? new Date(o.startTime) : null, l = o.endTime ? new Date(o.endTime) : null, i = Date.now();
                    if ((!r && l > i || !l && r < i || r && l && p.between(i, r, l)) && o.level <= n) return !0;
                }
            }
            return !1;
        }
    } ]), e;
}(), v = function() {
    function r(e) {
        t(this, r), this.moduleName = e || "_default";
    }
    return o(r, [ {
        key: "_formatPre",
        value: function(e, t) {
            var n = new Date(), o = n.toLocaleDateString() + " " + n.toTimeString().split(" ")[0] + " " + n.getMilliseconds();
            return "[" + (this.moduleName || "") + "]<" + o + ">(" + e + ")(" + t + ") ";
        }
    }, {
        key: "_printAndReport",
        value: function(t) {
            var o = arguments;
            try {
                for (var i = __wxConfig || {}, a = t.toUpperCase(), p = new Error().stack.split("\n")[3], v = p.substring(p.indexOf("http")).replace(")", ""), y = this._formatPre(a, v), m = "", g = 0; g < arguments.length; g++) arguments[g] != t && ("object" == n(arguments[g]) ? function() {
                    var e = [];
                    m += JSON.stringify(o[g], function(t, o) {
                        if ("object" === (void 0 === o ? "undefined" : n(o)) && null !== o) {
                            if (-1 !== e.indexOf(o)) return;
                            e.push(o);
                        }
                        return o;
                    }), e = null;
                }() : m += arguments[g]);
                if (m = y + m, i.debug && r.globalLogLevel <= r.levels[a]) {
                    var h;
                    console[t](">>>>>" + y), (h = console)[t].apply(h, e(Array.prototype.slice.call(arguments, 1)));
                }
                f ? d.isCanReport(l.getCookie("jdpin"), this.moduleName, r.levels[a]) && (c.join("").length + m.length > 1048576 && (d.report(c.concat([])), 
                c = []), c.push(m)) : (s + m.length > 1048576 ? (u = {}, s = 0) : s += m.length, 
                u[this.moduleName] || (u[this.moduleName] = {}), u[this.moduleName][a] || (u[this.moduleName][a] = []), 
                u[this.moduleName][a].push(m));
            } catch (e) {
                console.error("logger.js _printAndReport method error: " + e);
            }
        }
    }, {
        key: "debug",
        value: function() {
            this._printAndReport.apply(this, [ "debug" ].concat(Array.prototype.slice.call(arguments)));
        }
    }, {
        key: "log",
        value: function() {
            this._printAndReport.apply(this, [ "log" ].concat(Array.prototype.slice.call(arguments)));
        }
    }, {
        key: "info",
        value: function() {
            this._printAndReport.apply(this, [ "info" ].concat(Array.prototype.slice.call(arguments)));
        }
    }, {
        key: "warn",
        value: function() {
            this._printAndReport.apply(this, [ "warn" ].concat(Array.prototype.slice.call(arguments)));
        }
    }, {
        key: "error",
        value: function() {
            this._printAndReport.apply(this, [ "error" ].concat(Array.prototype.slice.call(arguments)));
        }
    } ], [ {
        key: "setGlobalLogLevel",
        value: function(e) {
            e && e >= r.levels.ALL && e <= r.levels.OFF && (r.globalLogLevel = e);
        }
    }, {
        key: "startReport",
        value: function(e) {
            d.start(e);
        }
    }, {
        key: "stopReport",
        value: function() {
            d.stop();
        }
    } ]), r;
}();

v.levels = {
    ALL: 0,
    DEBUG: 1,
    LOG: 2,
    INFO: 3,
    WARN: 4,
    ERROR: 5,
    OFF: 6
}, v.globalLogLevel = v.levels.ALL, d.init(3e3), module.exports = v;