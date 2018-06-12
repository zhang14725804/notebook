function t(t) {
    if ((0, h.isNotEmptyObject)(t.wxs)) for (var e in t.wxs) if ("function" == typeof t.wxs[e]) {
        if (t.methods && t.methods[e]) throw new Error("wxs对象的键名和自定义methods有同名，请区分！");
        t.methods || (t.methods = {}), t.methods[e] = t.wxs[e];
    } else if (t.store) {
        if (t.store.state[e]) throw new Error("wxs对象的键名和自定义data有同名，请区分！");
        t.store.state[e] = Object.freeze(t.wxs[e]);
    }
}

function e(t, e, o, r) {
    Object.keys(t).forEach(function(t) {
        return (0, h.proxy)(e, o, t, r);
    });
}

function o(t) {
    var e = (0, h.extend)({}, t, !0), o = {
        created: [ "created", "created_vue" ],
        mounted: [ "mounted", "mounted_vue", "onShow", "onShow_vue" ],
        onShow: [ "onShow", "onShow_vue" ],
        destroyed: [ "destroyed", "destroyed_vue" ]
    };
    for (var r in o) {
        (function(r) {
            var n = [], s = !0, i = !1, a = void 0;
            try {
                for (var c, d = o[r][Symbol.iterator](); !(s = (c = d.next()).done); s = !0) {
                    var u = c.value;
                    t[u] && n.push(u);
                }
            } catch (t) {
                i = !0, a = t;
            } finally {
                try {
                    !s && d.return && d.return();
                } finally {
                    if (i) throw a;
                }
            }
            if (0 == n.length) return "continue";
            t[r] = function() {
                for (var t = this, o = arguments.length, s = Array(o), i = 0; i < o; i++) s[i] = arguments[i];
                "created" === r && (s[0] = (0, h.parseQueryString)(location.href), this.$query = s[0]), 
                n.forEach(function(o) {
                    e[o] && (0, h.bind)(e[o], t).apply(void 0, s);
                });
            };
        })(r);
    }
}

function r(t, e) {
    t.store && (t.beforeCreate = e ? function() {
        (0, h.bind)(s, this)(t), n(this);
        var e = this;
        t.onReachBottom && window.addEventListener("scroll", (0, h.throttle)(function() {
            (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight > (document.documentElement.scrollHeight || document.body.scrollHeight) - 100 && t.onReachBottom && (0, 
            h.bind)(t.onReachBottom, e)();
        }, 400, 800));
    } : function() {
        (0, h.bind)(s, this)(t), n(this);
    });
}

function n(t) {
    t.__proto__.selectComponent = function(e) {
        if (!e.startsWith("#")) throw new Error("请使用id选择器！");
        var o = e.substring(1, e.length);
        return t.$refs[o];
    };
}

function s(t) {
    this.store = t.store, this.store.$this = this, e(this.store.actions, this.store, this, "actions");
}

function i(t) {
    c(t), t.onShow && wx.JD.events.listen("pageshow", t.onShow), t.onShareAppMessage && a(t);
}

function a(t) {
    var e = t.onShareAppMessage();
    if (!e.path) throw new Error("转发信息缺少页面路径参数！");
    var o = {
        title: e.title || "",
        desc: e.desc || "",
        link: e.path,
        imgUrl: e.imageUrl || "",
        type: e.type || "",
        dataUrl: e.dataUrl || "",
        success: function() {
            e.success && (0, h.bind)(e.success, t).apply(void 0, arguments), e.complete && (0, 
            h.bind)(e.complete, t).apply(void 0, arguments);
        },
        cancel: function() {
            e.fail && (0, h.bind)(e.fail, t).apply(void 0, arguments), e.complete && (0, h.bind)(e.complete, t).apply(void 0, arguments);
        }
    };
    window.shareConfig = Object.assign(window.shareConfig || {}, o), f.isJDApp && window.jdShare && window.jdShare.setShare();
}

function c(t) {
    t.methods || (t.methods = {}), t.methods.speedMark = d, t.methods.speedReport = u;
}

function d(t) {
    return window._PFM_TIMING ? (window._PFM_TIMING[t] = new Date(), this) : (console.error("测速变量_PFM_TIMING为定义"), 
    this);
}

function u() {
    window.__SPD_RPT && window.__SPD_RPT.report && window.__SPD_RPT.report();
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.vparse = function(n) {
    if (!n || !n.el) throw new Error("store 参数不合法");
    var s = n.store();
    return n.data = s.state, n.store = s, t(n), e(s.state, s, s, "state"), i(n), o(n), 
    r(n, !0), n;
}, exports.vComponentParse = function(o) {
    return o.store ? o.store = o.store() : (0, h.isNotEmptyObject)(o.wxs) && (o.store = function() {
        return {
            state: {}
        };
    }, o.store = o.store()), t(o), o.data = function() {
        if (!o.store) return {};
        var t = o.store;
        return e(t.state, t, t, "state"), t.state;
    }, r(o, !1), o;
};

var h = require("../util/util.js"), f = require("../util/env");