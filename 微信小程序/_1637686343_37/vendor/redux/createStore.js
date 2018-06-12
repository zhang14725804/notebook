function e(r, i, u) {
    function c() {
        l === b && (l = b.slice());
    }
    function f() {
        return d;
    }
    function p(e) {
        if ("function" != typeof e) throw new Error("Expected listener to be a function.");
        var t = !0;
        return c(), l.push(e), function() {
            if (t) {
                t = !1, c();
                var n = l.indexOf(e);
                l.splice(n, 1);
            }
        };
    }
    function s(e) {
        if (void 0 === e.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
        if (v) throw new Error("Reducers may not dispatch actions.");
        try {
            v = !0, d = y(d, e);
        } finally {
            v = !1;
        }
        for (var t = b = l, n = 0; n < t.length; n++) t[n]();
        return e;
    }
    var a;
    if ("function" == typeof i && void 0 === u && (u = i, i = void 0), void 0 !== u) {
        if ("function" != typeof u) throw new Error("Expected the enhancer to be a function.");
        return u(e)(r, i);
    }
    if ("function" != typeof r) throw new Error("Expected the reducer to be a function.");
    var y = r, d = i, b = [], l = b, v = !1;
    return s({
        type: o.INIT
    }), a = {
        dispatch: s,
        subscribe: p,
        getState: f,
        replaceReducer: function(e) {
            if ("function" != typeof e) throw new Error("Expected the nextReducer to be a function.");
            y = e, s({
                type: o.INIT
            });
        }
    }, a[n.default] = function() {
        var e, o = p;
        return e = {
            subscribe: function(e) {
                function n() {
                    e.next && e.next(f());
                }
                if ("object" !== (void 0 === e ? "undefined" : t(e))) throw new TypeError("Expected the observer to be an object.");
                return n(), {
                    unsubscribe: o(n)
                };
            }
        }, e[n.default] = function() {
            return this;
        }, e;
    }, a;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ActionTypes = void 0;

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.default = e;

var n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("symbol-observable/index")), o = exports.ActionTypes = {
    INIT: "@@redux/INIT"
};