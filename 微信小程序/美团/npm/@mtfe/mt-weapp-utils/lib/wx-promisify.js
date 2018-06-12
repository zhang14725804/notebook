Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.wxPromisify = function(e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : wx;
    return function() {
        for (var r = arguments.length, s = Array(r > 1 ? r - 1 : 0), t = 1; t < r; t++) s[t - 1] = arguments[t];
        var c = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return new Promise(function(r, t) {
            var i = Object.assign({}, c, {
                success: function(e) {
                    c.success && c.success(e), r(e);
                },
                fail: function(e) {
                    c.fail && c.fail(e), t(e);
                }
            });
            n[e].apply(n, [ i ].concat(s));
        });
    };
};