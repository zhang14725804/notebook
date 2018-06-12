function _interopRequireDefault(r) {
    return r && r.__esModule ? r : {
        default: r
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(r) {
    return typeof r;
} : function(r) {
    return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
}, _slicedToArray = function() {
    function r(r, t) {
        var e = [], n = !0, i = !1, o = void 0;
        try {
            for (var u, s = r[Symbol.iterator](); !(n = (u = s.next()).done) && (e.push(u.value), 
            !t || e.length !== t); n = !0) ;
        } catch (r) {
            i = !0, o = r;
        } finally {
            try {
                !n && s.return && s.return();
            } finally {
                if (i) throw o;
            }
        }
        return e;
    }
    return function(t, e) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return r(t, e);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _querystring = require("./../npm/querystring/index.js"), _querystring2 = _interopRequireDefault(_querystring), compatibleUrl = /^([^?#]+)(\?[^#]+)?(#.+)?$/, webUrl = /^(https?[^?#]+)(\?[^#]+)?(#.+)?$/;

exports.default = {
    getQuery: function(r, t) {
        var e = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], n = compatibleUrl.exec(r) || [], i = _slicedToArray(n, 4), o = (i[0], 
        i[1], i[2]);
        i[3];
        if (void 0 !== o) {
            var u = _querystring2.default.parse(o.substring(1)) || {}, s = void 0;
            if (e && u.url && (s = webUrl.exec(u.url)[2])) {
                var a = _querystring2.default.parse(s.substring(1)) || {};
                Object.assign(u, a);
            }
            return u[t];
        }
    },
    addQuery: function(r, t) {
        var e = compatibleUrl.exec(r) || [], n = _slicedToArray(e, 4), i = (n[0], n[1]), o = n[2], u = n[3], s = {};
        return o && Object.assign(s, _querystring2.default.parse(o.substring(1))), "string" == typeof t ? s = _querystring2.default.parse("?" === t[0] ? t.substring(1) : t) : Object.assign(s, t), 
        r = i, "{}" != JSON.stringify(s) && (r += "?" + _querystring2.default.stringify(s)), 
        u && (r += u), r;
    },
    removeQuery: function(r, t) {
        var e = compatibleUrl.exec(r) || [], n = _slicedToArray(e, 4), i = (n[0], n[1]), o = n[2], u = n[3], s = {};
        if (!o) return r;
        if (r = i, Object.assign(s, _querystring2.default.parse(o.substring(1))), _typeof(t.length)) for (var a = 0; a < t.length; a++) s[t[a]] = void 0; else s[t] = void 0;
        return "{}" != JSON.stringify(s) && (r += "?" + _querystring2.default.stringify(s)), 
        u && (r += u), r;
    },
    addTransparentParamsFromUrl: function(r, t) {
        var e = location.search.substring(1);
        if (t) {
            e = e.split("&").filter(function(r) {
                var e = r.split("=")[0];
                return t.indexOf(e) > -1;
            }).join("&");
        }
        return util.addQuery(r, e);
    },
    checkParam: function(r, t) {
        return t in r || (util._console.error(t + "为必填参数"), !1);
    },
    isWaPage: function(r) {
        return /^\/?pages\//.test(r) || /^\/?subPages\//.test(r);
    },
    extend: function() {
        var r, t, e, n, i, o, u = arguments[0] || {}, s = 1, a = arguments.length, l = !1;
        for ("boolean" == typeof u && (l = u, u = arguments[s] || {}, s++), "object" === (void 0 === u ? "undefined" : _typeof(u)) || util.isFunction(u) || (u = {}), 
        s === a && (u = this, s--); s < a; s++) if (null != (r = arguments[s])) for (t in r) e = u[t], 
        n = r[t], u !== n && (l && n && (util.isPlainObject(n) || (i = Array.isArray(n))) ? (i ? (i = !1, 
        o = e && Array.isArray(e) ? e : []) : o = e && util.isPlainObject(e) ? e : {}, u[t] = util.extend(l, o, n)) : void 0 !== n && (u[t] = n));
        return u;
    },
    isPlainObject: function(r) {
        var t, e, n = Object.getPrototypeOf, i = {}.hasOwnProperty, o = i.toString, u = o.call(Object);
        return !(!r || "[object Object]" !== toString.call(r)) && (!(t = n(r)) || "function" == typeof (e = i.call(t, "constructor") && t.constructor) && o.call(e) === u);
    },
    isFunction: function(r) {
        return "function" == typeof r && "number" != typeof r.nodeType;
    }
};