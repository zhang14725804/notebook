"function" != typeof Object.assign && (Object.assign = function(t, n) {
    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
    for (var e = Object(t), r = 1; r < arguments.length; r++) {
        var o = arguments[r];
        if (null != o) for (var c in o) Object.prototype.hasOwnProperty.call(o, c) && (e[c] = o[c]);
    }
    return e;
});

var t = Function.bind.call(Function.call, Array.prototype.reduce), n = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable), e = Function.bind.call(Function.call, Array.prototype.concat), r = Reflect.ownKeys;

Object.values || (Object.values = function(o) {
    return t(r(o), function(t, r) {
        return e(t, "string" == typeof r && n(o, r) ? [ o[r] ] : []);
    }, []);
}), Object.entries || (Object.entries = function(o) {
    return t(r(o), function(t, r) {
        return e(t, "string" == typeof r && n(o, r) ? [ [ r, o[r] ] ] : []);
    }, []);
}), Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
    value: function(t, n) {
        if (null == this) throw new TypeError('"this" is null or not defined');
        var e = Object(this), r = e.length >>> 0;
        if (0 === r) return !1;
        for (var o = 0 | n, c = Math.max(o >= 0 ? o : r - Math.abs(o), 0); c < r; ) {
            if (function(t, n) {
                return t === n || "number" == typeof t && "number" == typeof n && isNaN(t) && isNaN(n);
            }(e[c], t)) return !0;
            c++;
        }
        return !1;
    }
});