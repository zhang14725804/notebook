Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    for (var r = arguments.length, n = Array(r), a = 0; a < r; a++) n[a] = arguments[a];
    return function(r) {
        return function(a, u, o) {
            var c = r(a, u, o), i = c.dispatch, f = [], p = {
                getState: c.getState,
                dispatch: function(t) {
                    return i(t);
                }
            };
            return f = n.map(function(t) {
                return t(p);
            }), i = t.default.apply(void 0, f)(c.dispatch), e({}, c, {
                dispatch: i
            });
        };
    };
};

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./compose")), e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
};