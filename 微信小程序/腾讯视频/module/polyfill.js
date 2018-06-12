Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
    value: function(r) {
        if (null == this) throw new TypeError("Array.prototype.find called on null or undefined");
        if ("function" != typeof r) throw new TypeError("predicate must be a function");
        for (var e, t = Object(this), n = t.length >>> 0, o = arguments[1], i = 0; i < n; i++) if (e = t[i], 
        r.call(o, e, i, t)) return e;
    }
});