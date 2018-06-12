function deepClone(e) {
    if ("object" !== (void 0 === e ? "undefined" : _typeof(e))) return e;
    var r = Array.isArray(e) ? [] : {};
    for (var t in e) r[t] = deepClone(e[t]);
    return r;
}

function deepEqual(e, r) {
    if ("object" !== (void 0 === e ? "undefined" : _typeof(e)) || "object" !== (void 0 === r ? "undefined" : _typeof(r))) return e === r;
    for (var t in e) if (!deepEqual(e[t], r[t])) return !1;
    for (var n in r) if (!(n in e)) return !1;
    return !0;
}

function deepAssign(e) {
    for (var r = arguments.length, t = Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++) t[n - 1] = arguments[n];
    if ("object" !== (void 0 === e ? "undefined" : _typeof(e))) return console.error("[deepAssign] bad parameters, target should be an object, parameters:", arguments), 
    e;
    var o = !0, i = !1, a = void 0;
    try {
        for (var l, u = t[Symbol.iterator](); !(o = (l = u.next()).done); o = !0) {
            var f = l.value;
            if (null == f || "object" === (void 0 === f ? "undefined" : _typeof(f))) for (var p in f) "object" === _typeof(e[p]) && "object" === _typeof(f[p]) ? deepAssign(e[p], f[p]) : e[p] = f[p]; else console.warn("[deepAssign] bad parameters, source should all be object, parameters:", arguments);
        }
    } catch (e) {
        i = !0, a = e;
    } finally {
        try {
            !o && u.return && u.return();
        } finally {
            if (i) throw a;
        }
    }
    return e;
}

function delay(e) {
    return new Promise(function(r, t) {
        setTimeout(r, e);
    });
}

function appendUrlParam(e, r) {
    if (!r) return e;
    var t = e.split("?"), n = _slicedToArray(t, 2), o = n[0], i = n[1], a = void 0 === i ? "" : i, l = {};
    a.split("&").forEach(function(e) {
        var r = e.split("="), t = _slicedToArray(r, 2), n = t[0], o = t[1];
        n && void 0 !== o && (l[n] = o);
    });
    var u = Object.assign({}, l, r), f = [];
    for (var p in u) f.push(p + "=" + u[p]);
    return f.length > 0 ? o + "?" + f.join("&") : e;
}

function fulfillURL(e) {
    return e ? (/^\/\//.test(e) && (e = "https:" + e), /^http/.test(e) ? "/pages/webview/webview?url=" + encodeURIComponent(e) : "/" == e[0] ? e : "/" + e) : e;
}

function compareVersion(e, r) {
    for (var t = e.split(".").map(function(e) {
        return parseInt(e);
    }), n = r.split(".").map(function(e) {
        return parseInt(e);
    }), o = t.length, i = n.length, a = Math.min(o, i), l = 0; l < a; ++l) if (t[l] != n[l]) return t[l] < n[l] ? -1 : 1;
    return o == i ? 0 : o < i ? -1 : 1;
}

function parseInlineStyle(e) {
    if (!e) return {};
    var r = {}, t = e.split(";"), n = !0, o = !1, i = void 0;
    try {
        for (var a, l = t[Symbol.iterator](); !(n = (a = l.next()).done); n = !0) {
            var u = a.value, f = u.split(":").map(function(e) {
                return e.replace(/^\s*|\s*$/g, "");
            }), p = _slicedToArray(f, 2), s = p[0], c = p[1];
            r[s] = c;
        }
    } catch (e) {
        o = !0, i = e;
    } finally {
        try {
            !n && l.return && l.return();
        } finally {
            if (o) throw i;
        }
    }
    return r;
}

function toInlineStyle(e) {
    var r = [];
    for (var t in e) r.push(t + ":" + e[t]);
    return r.join("; ");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _slicedToArray = function() {
    function e(e, r) {
        var t = [], n = !0, o = !1, i = void 0;
        try {
            for (var a, l = e[Symbol.iterator](); !(n = (a = l.next()).done) && (t.push(a.value), 
            !r || t.length !== r); n = !0) ;
        } catch (e) {
            o = !0, i = e;
        } finally {
            try {
                !n && l.return && l.return();
            } finally {
                if (o) throw i;
            }
        }
        return t;
    }
    return function(r, t) {
        if (Array.isArray(r)) return r;
        if (Symbol.iterator in Object(r)) return e(r, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.deepClone = deepClone, exports.deepEqual = deepEqual, exports.deepAssign = deepAssign, 
exports.delay = delay, exports.appendUrlParam = appendUrlParam, exports.fulfillURL = fulfillURL, 
exports.compareVersion = compareVersion, exports.parseInlineStyle = parseInlineStyle, 
exports.toInlineStyle = toInlineStyle;