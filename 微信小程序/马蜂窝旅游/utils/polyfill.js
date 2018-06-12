"function" != typeof Object.assign && (Object.assign = function(t) {
    if (null != t) {
        t = Object(t);
        for (var n = 1; n < arguments.length; n++) {
            var r = arguments[n];
            if (null != r) for (var e in r) Object.prototype.hasOwnProperty.call(r, e) && (t[e] = r[e]);
        }
    }
    return t;
});