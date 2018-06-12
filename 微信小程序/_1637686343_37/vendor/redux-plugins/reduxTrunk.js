function t(t) {
    return function(e) {
        var r = e.dispatch, n = e.getState;
        return function(e) {
            return function(u) {
                return "function" == typeof u ? u(r, n, t) : e(u);
            };
        };
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t();

e.withExtraArgument = t, exports.default = e;