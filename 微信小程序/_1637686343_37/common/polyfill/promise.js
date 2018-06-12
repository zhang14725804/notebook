function t(t) {
    return "[object Array]" === Object.prototype.toString.call(t);
}

function n() {
    for (var t = 0; t < P.length; t++) P[t][0](P[t][1]);
    P = [], p = !1;
}

function e(t, e) {
    P.push([ t, e ]), p || (p = !0, g(n, 0));
}

function o(t, n) {
    function e(t) {
        f(n, t);
    }
    try {
        t(function(t) {
            c(n, t);
        }, e);
    } catch (t) {
        e(t);
    }
}

function r(t) {
    var n = t.owner, e = n.state_, o = n.data_, r = t[e], u = t.then;
    if ("function" == typeof r) {
        e = w;
        try {
            o = r(o);
        } catch (t) {
            f(u, t);
        }
    }
    i(u, o) || (e === w && c(u, o), e === b && f(u, o));
}

function i(t, n) {
    var e;
    try {
        if (t === n) throw new TypeError("A promises callback cannot return that same promise.");
        if (n && ("function" == typeof n || "object" === (void 0 === n ? "undefined" : y(n)))) {
            var o = n.then;
            if ("function" == typeof o) return o.call(n, function(o) {
                e || (e = !0, n !== o ? c(t, o) : u(t, o));
            }, function(n) {
                e || (e = !0, f(t, n));
            }), !0;
        }
    } catch (n) {
        return e || f(t, n), !0;
    }
    return !1;
}

function c(t, n) {
    t !== n && i(t, n) || u(t, n);
}

function u(t, n) {
    t.state_ === v && (t.state_ = _, t.data_ = n, e(s, t));
}

function f(t, n) {
    t.state_ === v && (t.state_ = _, t.data_ = n, e(h, t));
}

function a(t) {
    var n = t.then_;
    t.then_ = void 0;
    for (var e = 0; e < n.length; e++) r(n[e]);
}

function s(t) {
    t.state_ = w, a(t);
}

function h(t) {
    t.state_ = b, a(t);
}

function l(t) {
    if ("function" != typeof t) throw new TypeError("Promise constructor takes a function argument");
    if (this instanceof l == !1) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    this.then_ = [], o(t, this);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var p, y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, d = l, m = d && "resolve" in d && "reject" in d && "all" in d && "race" in d && function() {
    var t;
    return new d(function(n) {
        t = n;
    }), "function" == typeof t;
}(), v = "pending", _ = "sealed", w = "fulfilled", b = "rejected", j = function() {}, g = "undefined" != typeof setImmediate ? setImmediate : setTimeout, P = [];

l.prototype = {
    constructor: l,
    state_: v,
    then_: null,
    data_: void 0,
    then: function(t, n) {
        var o = {
            owner: this,
            then: new this.constructor(j),
            fulfilled: t,
            rejected: n
        };
        return this.state_ === w || this.state_ === b ? e(r, o) : this.then_.push(o), o.then;
    },
    catch: function(t) {
        return this.then(null, t);
    }
}, l.all = function(n) {
    var e = this;
    if (!t(n)) throw new TypeError("You must pass an array to Promise.all().");
    return new e(function(t, e) {
        for (var o, r = [], i = 0, c = 0; c < n.length; c++) (o = n[c]) && "function" == typeof o.then ? o.then(function(n) {
            return i++, function(e) {
                r[n] = e, --i || t(r);
            };
        }(c), e) : r[c] = o;
        i || t(r);
    });
}, l.race = function(n) {
    var e = this;
    if (!t(n)) throw new TypeError("You must pass an array to Promise.race().");
    return new e(function(t, e) {
        for (var o, r = 0; r < n.length; r++) (o = n[r]) && "function" == typeof o.then ? o.then(t, e) : t(o);
    });
}, l.resolve = function(t) {
    var n = this;
    return t && "object" === (void 0 === t ? "undefined" : y(t)) && t.constructor === n ? t : new n(function(n) {
        n(t);
    });
}, l.reject = function(t) {
    return new this(function(n, e) {
        e(t);
    });
}, exports.default = m ? d : l;