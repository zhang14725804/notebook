Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    for (var e = arguments.length, r = Array(e), t = 0; t < e; t++) r[t] = arguments[t];
    if (0 === r.length) return function(e) {
        return e;
    };
    if (1 === r.length) return r[0];
    var n = r[r.length - 1], u = r.slice(0, -1);
    return function() {
        return u.reduceRight(function(e, r) {
            return r(e);
        }, n.apply(void 0, arguments));
    };
};