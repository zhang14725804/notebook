Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isReserved = function(e) {
    var r = (e + "").charCodeAt(0);
    return 36 === r || 95 === r;
}, exports.def = function(e, r, t, n) {
    Object.defineProperty(e, r, {
        value: t,
        enumerable: !!n,
        writable: !0,
        configurable: !0
    });
}, exports.parsePath = function(r) {
    if (!e.test(r)) {
        var t = r.split(".");
        return function(e) {
            for (var r = 0; r < t.length; r++) {
                if (!e) return;
                e = e[t[r]];
            }
            return e;
        };
    }
};

exports.emptyObject = Object.freeze({});

var e = /[^\w.$]/;