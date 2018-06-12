function t(t, e) {
    for (var n = Object.create(null), r = t.split(","), o = 0; o < r.length; o++) n[r[o]] = !0;
    return e ? function(t) {
        return n[t.toLowerCase()];
    } : function(t) {
        return n[t];
    };
}

function e(t, n, o) {
    for (var i in n) o && (r(n[i]) || Array.isArray(n[i])) ? (r(n[i]) && !r(t[i]) && (t[i] = {}), 
    Array.isArray(n[i]) && !Array.isArray(t[i]) && (t[i] = []), e(t[i], n[i], o)) : void 0 !== n[i] && (t[i] = n[i]);
    return t;
}

function n(t) {
    return null !== t && "object" === (void 0 === t ? "undefined" : u(t));
}

function r(t) {
    return c.call(t) === f;
}

function o(t, e) {
    var r = n(t), o = n(e);
    return r && o ? JSON.stringify(t) === JSON.stringify(e) : !r && !o && String(t) === String(e);
}

function i(t) {
    return "function" == typeof t && /native code/.test(t.toString());
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

exports._toString = function(t) {
    return null == t ? "" : "object" === (void 0 === t ? "undefined" : u(t)) ? JSON.stringify(t, null, 2) : String(t);
}, exports.toNumber = function(t) {
    var e = parseFloat(t);
    return isNaN(e) ? t : e;
}, exports.makeMap = t, exports.remove = function(t, e) {
    if (t.length) {
        var n = t.indexOf(e);
        if (n > -1) return t.splice(n, 1);
    }
}, exports.hasOwn = function(t, e) {
    return s.call(t, e);
}, exports.isPrimitive = function(t) {
    return "string" == typeof t || "number" == typeof t;
}, exports.bind = function(t, e) {
    function n(n) {
        var r = arguments.length;
        return r ? r > 1 ? t.apply(e, arguments) : t.call(e, n) : t.call(e);
    }
    return !!t && (n._length = t.length, n);
}, exports.toArray = function(t, e) {
    e = e || 0;
    for (var n = t.length - e, r = new Array(n); n--; ) r[n] = t[n + e];
    return r;
}, exports.extend = e, exports.isObject = n, exports.isNotEmptyObject = function(t) {
    return null !== t && "object" === (void 0 === t ? "undefined" : u(t)) && "{}" != JSON.stringify(t);
}, exports.isPlainObject = r, exports.toObject = function(t) {
    for (var n = {}, r = 0; r < t.length; r++) t[r] && e(n, t[r]);
    return n;
}, exports.noop = function() {}, exports.genStaticKeys = function(t) {
    return t.reduce(function(t, e) {
        return t.concat(e.staticKeys || []);
    }, []).join(",");
}, exports.looseEqual = o, exports.looseIndexOf = function(t, e) {
    for (var n = 0; n < t.length; n++) if (o(t[n], e)) return n;
    return -1;
}, exports.once = function(t) {
    var e = !1;
    return function() {
        e || (e = !0, t());
    };
}, exports.isNative = i, exports.proxy = function(t, e, n, r) {
    if (void 0 !== e[n]) throw new Error("实例对象中已经存在" + n + "属性，请确保methods、data、props、store.state、store.action、computed中没有同名key键，且key名不为'data'");
    Object.defineProperty(e, n, {
        configurable: !0,
        enumerable: !0,
        get: function() {
            return t[r][n];
        },
        set: function(e) {
            t[r][n] = e;
        }
    });
}, exports.throttle = function(t, e, n) {
    var r, o = new Date();
    return function() {
        for (var i = arguments.length, u = Array(i), s = 0; s < i; s++) u[s] = arguments[s];
        var c = this, f = new Date();
        clearTimeout(r), f - o >= n ? (t.apply(c, u), o = f) : r = setTimeout(function() {
            t.apply(c, u);
        }, e);
    };
}, exports.parseQueryString = function(t) {
    var e = /([^&=]+)=([\w\W]*?)(&|$|#)/g, n = /^[^\?]+\?([\w\W]+)$/.exec(t), r = {};
    if (n && n[1]) for (var o, i = n[1]; null != (o = e.exec(i)); ) r[o[1]] = o[2];
    return r;
};

exports.isBuiltInTag = t("slot,component", !0);

var s = Object.prototype.hasOwnProperty, c = Object.prototype.toString, f = "[object Object]";

exports.no = function() {
    return !1;
}, exports.identity = function(t) {
    return t;
}, exports.nextTick = function() {
    function t() {
        n = !1;
        var t = e.slice(0);
        e.length = 0;
        for (var r = 0; r < t.length; r++) t[r]();
    }
    var e = [], n = !1, r = void 0;
    if ("undefined" != typeof setImmediate && i(setImmediate)) r = function() {
        setImmediate(t);
    }; else if ("undefined" == typeof MessageChannel || !i(MessageChannel) && "[object MessageChannelConstructor]" !== MessageChannel.toString()) if ("undefined" != typeof Promise && i(Promise)) {
        var o = Promise.resolve();
        r = function() {
            o.then(t);
        };
    } else r = function() {
        setTimeout(t, 0);
    }; else {
        var u = new MessageChannel(), s = u.port2;
        u.port1.onmessage = t, r = function() {
            s.postMessage(1);
        };
    }
    return function(t, o) {
        var i = void 0;
        if (e.push(function() {
            if (t) try {
                t.call(o);
            } catch (t) {
                console.error(t, o, "nextTick");
            } else i && i(o);
        }), n || (n = !0, r()), !t && "undefined" != typeof Promise) return new Promise(function(t, e) {
            i = t;
        });
    };
}();