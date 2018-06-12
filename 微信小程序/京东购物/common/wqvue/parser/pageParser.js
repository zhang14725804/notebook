function t(o, r) {
    if (o.mixins && o.mixins.length) {
        r.behaviors = [];
        var n = !0, a = !1, s = void 0;
        try {
            for (var u, f = o.mixins[Symbol.iterator](); !(n = (u = f.next()).done); n = !0) {
                var d = u.value, h = {};
                t(d, h), c(d, h), i(d, h), e(d, h, !1), r.behaviors.push(Behavior(h));
            }
        } catch (t) {
            a = !0, s = t;
        } finally {
            try {
                !n && f.return && f.return();
            } finally {
                if (a) throw s;
            }
        }
    }
}

function e(t, e, o, r) {
    var i = r ? {
        onLoad: [ "created", "created_xcx" ],
        onReady: [ "mounted", "mounted_xcx" ],
        onShow: [ "onShow", "onShow_xcx" ],
        onHide: [ "onHide" ],
        onUnload: [ "destroyed", "destroyed_xcx" ],
        onReachBottom: [ "onReachBottom" ]
    } : {
        attached: [ "created" ],
        ready: [ "mounted" ],
        detached: [ "destroyed" ]
    }, a = !1;
    if (n(i, t)) {
        f(r, t, e, function() {
            t.created && (0, v.bind)(t.created, this).apply(void 0, arguments), t.created_xcx && (0, 
            v.bind)(t.created_xcx, this).apply(void 0, arguments);
        }), a = !0;
        for (var c in i) {
            (function(o) {
                var n = [];
                if (!r && a && "created" == o) return "continue";
                if (r && a && "onLoad" == o) return "continue";
                var c = !0, s = !1, u = void 0;
                try {
                    for (var f, d = i[o][Symbol.iterator](); !(c = (f = d.next()).done); c = !0) {
                        var h = f.value;
                        t[h] && n.push(h);
                    }
                } catch (t) {
                    s = !0, u = t;
                } finally {
                    try {
                        !c && d.return && d.return();
                    } finally {
                        if (s) throw u;
                    }
                }
                if (0 == n.length) return "continue";
                e[o] = function() {
                    for (var e = this, o = arguments.length, r = Array(o), i = 0; i < o; i++) r[i] = arguments[i];
                    n.forEach(function(o) {
                        t[o] && (0, v.bind)(t[o], e).apply(void 0, r);
                    });
                };
            })(c);
        }
    } else f(r, t, e);
}

function o() {
    this.__proto__.$nextTick = function(t) {
        var e = this;
        if (void 0 === t) {
            if ("undefined" == typeof Promise) throw new Error("当前环境不支持Promise！");
            return new Promise(function(t, o) {
                e.$nextTickFn = function() {
                    t();
                }, e.$nextTickFn.promise = !0;
            });
        }
        this.$nextTickFn = t;
    };
}

function r(t, e) {
    t.onShareAppMessage && (e.onShareAppMessage = t.onShareAppMessage);
}

function n(t, e) {
    var o = [], r = !1;
    for (var n in t) o = o.concat(t[n]);
    return o.forEach(function(t) {
        if (e.hasOwnProperty(t)) return r = !0, !1;
    }), r;
}

function i(t, e, o) {
    var r = null;
    o ? r = e : (e.methods = {}, r = e.methods);
    for (var n in t.methods) !function(e) {
        r[e] = function() {
            e && (0, v.bind)(t.methods[e], this).apply(void 0, arguments);
        };
    }(n);
}

function a(t, e) {
    if (t.onPageScroll) {
        e.onPageScroll = (0, v.throttle)(function() {
            t.onPageScroll && (0, v.bind)(t.onPageScroll, this).apply(void 0, arguments);
        }, 400, 800);
    }
}

function c(t, e) {
    var o = t.props;
    if (o) {
        for (var r in o) !function(e) {
            var r = o[e].default;
            if (o[e].value = "function" == typeof r ? r() : r, delete o[e].default, t.watch && t.watch[e]) {
                if ("function" != typeof t.watch[e]) throw new Error("watch属性中键值应为function！");
                o[e].observer = function(o, r) {
                    t.watch[e] && (0, v.bind)(t.watch[e], this)(o, r);
                };
            }
        }(r);
        e.properties = (0, v.extend)({}, o, !0);
    }
}

function s(t, e, o) {
    if (t.store) {
        var r = t.store();
        Object.keys(r.state).forEach(function(e) {
            (0, v.proxy)(r, r, e, "state"), t.computed && t.computed[e] || (0, v.proxy)(r, o, e, "state");
        }), Object.keys(r.actions).forEach(function(t) {
            (0, v.proxy)(r, o, t, "actions");
        }), e.store = r;
    }
    t.data && (0, v.isNotEmptyObject)(t.data) && Object.keys(t.data).forEach(function(t) {
        return (0, v.proxy)(o, o, t, "data");
    }), t.props && (0, v.isNotEmptyObject)(t.props) && Object.keys(o.properties).forEach(function(e) {
        t.props[e] && (0, v.proxy)(o, o, e, "properties");
    });
}

function u(t) {
    t.__proto__.$emit = t.triggerEvent;
}

function f(t, e, r, n) {
    e.store && (r.data = Object.assign({}, e.store().state, e.data), r[t ? "onLoad" : "created"] = function() {
        var i = this;
        (0, v.bind)(o, this)(), s(e, r, this), this.store = r.store, h(this, e, t), this.__proto__.$set = function(t, e, o) {
            Object.is(t, i.store.state) && (0, v.proxy)(i.store, i.store, e, "state"), (0, l.set)(t, e, o, i);
        }, this.store.$this = this, t && (this.$query = arguments.length <= 0 ? void 0 : arguments[0]), 
        !t && (this.$root = d()), !t && u(this), t && n && (0, v.bind)(n, this).apply(void 0, arguments);
    });
}

function d() {
    var t = getCurrentPages();
    return t[t.length - 1];
}

function h(t, e, o) {
    o && t.speedMark(11), (0, l.observe)(t.store.state, void 0, t), o && t.speedMark(12), 
    t._watchers = [], !!e.computed && (0, x.initComputed)(t, e.computed), !!e.watch && (0, 
    y.initWatch)(t, p(e));
}

function p(t) {
    var e = {};
    return Object.keys(t.watch).forEach(function(o) {
        var r = o.split(".")[0];
        t.props && t.props[r] || (e[o] = t.watch[o]);
    }), e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.parse = function(t) {
    if (!t) throw new Error("page option 参数不合法");
    var o = {};
    return i(t, o, !0), e(t, o, t.store, !0), a(t, o), r(t, o), o;
}, exports.componentParse = function(o) {
    if (!o) throw new Error("component option 参数不合法");
    var r = {};
    return t(o, r), c(o, r), i(o, r, !1), e(o, r), r;
};

var v = require("../util/util.js"), l = require("../observer/index"), y = require("../observer/watcher"), x = require("../observer/computed");