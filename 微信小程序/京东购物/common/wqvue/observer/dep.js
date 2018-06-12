function e(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function n() {
    if (0 != u.length) {
        var e = !0, t = !1, n = void 0;
        try {
            for (var r, a = u[Symbol.iterator](); !(e = (r = a.next()).done); e = !0) !function() {
                var e = r.value, t = e.page;
                console.log("setdata", e.val, new Date().getTime()), t.setData(e.val, function() {
                    if (t.$nextTickFn) {
                        var e = t.$nextTickFn;
                        t.$nextTickFn = null, e.promise ? e() : e.call(t);
                    }
                });
            }();
        } catch (e) {
            t = !0, n = e;
        } finally {
            try {
                !e && a.return && a.return();
            } finally {
                if (t) throw n;
            }
        }
        u = [];
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}();

exports.pushTarget = function(e) {
    o.target && l.push(o.target), o.target = e;
}, exports.popTarget = function() {
    o.target = l.pop();
};

var a = require("../util/util"), i = 0, u = [], o = function() {
    function o(e, n) {
        t(this, o), this.keyChain = e, this.key = n, this.id = i++, this.subs = [];
    }
    return r(o, [ {
        key: "addSub",
        value: function(e) {
            this.subs.push(e);
        }
    }, {
        key: "removeSub",
        value: function(e) {
            (0, a.remove)(this.subs, e);
        }
    }, {
        key: "depend",
        value: function() {
            o.target && o.target.addDep(this);
        }
    }, {
        key: "notify",
        value: function(t, r) {
            for (var i = this.subs.slice(), o = 0, l = i.length; o < l; o++) i[o].update();
            var s = u.filter(function(e) {
                return e.page.__wxExparserNodeId__ == t.__wxExparserNodeId__;
            });
            if (s.length) s[0] && (s[0].val[this.getKeyChain()] = r); else {
                var f = {
                    page: t,
                    val: e({}, this.getKeyChain(), r)
                };
                u.push(f);
            }
            (0, a.throttle)(n, 20, 50)();
        }
    }, {
        key: "getKeyChain",
        value: function() {
            var e = this.keyChain + "." + this.key;
            return this.keyChain ? this.key ? e : this.keyChain : this.key;
        }
    } ]), o;
}();

exports.default = o, o.target = null;

var l = [];