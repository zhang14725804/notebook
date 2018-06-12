function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function r(e, r) {
    e.__proto__ = r;
}

function t(e, r, t) {
    for (var n = 0, a = t.length; n < a; n++) {
        var i = t[n];
        (0, u.def)(e, i, r[i]);
    }
}

function n(e, r, t) {
    if ((0, l.isObject)(e)) {
        var n = void 0;
        return (0, l.hasOwn)(e, "__ob__") && e.__ob__ instanceof p ? n = e.__ob__ : _.shouldConvert && (Array.isArray(e) || (0, 
        l.isPlainObject)(e)) && Object.isExtensible(e) && !e._isVue && (n = new p(e, r, t)), 
        n;
    }
}

function a(e, r, t, a, i) {
    var s = new o.default(a, r), u = Object.getOwnPropertyDescriptor(e, r);
    if (!u || !1 !== u.configurable) {
        var l = u && u.get, f = u && u.set, c = s.getKeyChain();
        n(t, c, i);
        Object.defineProperty(e, r, {
            enumerable: !0,
            configurable: !0,
            get: function() {
                var r = l ? l.call(e) : t;
                return o.default.target && s.depend(), r;
            },
            set: function(r) {
                var n = l ? l.call(e) : t;
                r === n || r !== r && n !== n || (f ? f.call(e, r) : t = r, s.notify(i, t));
            }
        });
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Observer = exports.observerState = exports.hasProto = void 0;

var i = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var n = r[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(r, t, n) {
        return t && e(r.prototype, t), n && e(r, n), r;
    };
}();

exports.observe = n, exports.defineReactive = a, exports.set = function(e, r, t, n) {
    if (Array.isArray(e)) return e.length = Math.max(e.length, r), e.splice(r, 1, t), 
    t;
    if ((0, l.hasOwn)(e, r)) e[r] = t; else {
        var i = e.__ob__;
        if (i) return a(i.value, r, t, i.keyChain, n), i.dep.key || (i.dep.key = r), i.dep.notify(n, t), 
        t;
        e[r] = t;
    }
}, exports.del = function(e, r) {
    if (Array.isArray(e)) e.splice(r, 1); else {
        var t = e.__ob__;
        (0, l.hasOwn)(e, r) && (delete e[r], t && t.dep.notify());
    }
};

var o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./dep")), s = require("./array"), u = require("../util/lang"), l = require("../util/util"), f = exports.hasProto = "__proto__" in {}, c = Object.getOwnPropertyNames(s.arrayMethods), _ = exports.observerState = {
    shouldConvert: !0,
    isSettingProps: !1
}, p = exports.Observer = function() {
    function l(n, a, i) {
        e(this, l), this.value = n, this.dep = new o.default(a), this.keyChain = a, this.pageObj = i, 
        (0, u.def)(n, "__ob__", this), Array.isArray(n) ? ((f ? r : t)(n, s.arrayMethods, c), 
        this.observeArray(n)) : this.walk(n);
    }
    return i(l, [ {
        key: "walk",
        value: function(e) {
            for (var r = Object.keys(e), t = 0; t < r.length; t++) a(e, r[t], e[r[t]], this.keyChain, this.pageObj);
        }
    }, {
        key: "observeArray",
        value: function(e) {
            for (var r = 0, t = e.length; r < t; r++) n(e[r], this.keyChain + "[" + r + "]", this.pageObj);
        }
    } ]), l;
}();