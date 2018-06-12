function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, n) {
    "function" == typeof n ? (s.get = o(t), s.set = r.noop) : (s.get = n.get ? !1 !== n.cache ? o(t) : n.get : r.noop, 
    s.set = n.set ? n.set : r.noop), s.set === r.noop && (s.set = function() {
        console.error('Computed property "' + t + '" was assigned to but it has no setter.', this);
    }), Object.defineProperty(e, t, s);
}

function o(e) {
    return function() {
        var t = this._computedWatchers && this._computedWatchers[e];
        if (t) return t.dirty && t.evaluate(), u.default.target && t.depend(), t.value;
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.initComputed = function(e, o) {
    var u = e._computedWatchers = Object.create(null);
    for (var s in o) !function(s) {
        var a = o[s];
        u[s] = new n.default(e, function() {
            var e = "function" == typeof a ? a : a.get, t = e.call(this);
            return void 0 !== this.store[s] && (this.store[s] = t), t;
        } || r.noop, r.noop, i), s in e || t(e, s, a);
    }(s);
}, exports.defineComputed = t;

var n = e(require("./watcher")), r = require("../util/index"), u = e(require("./dep")), i = {
    lazy: !1
}, s = {
    enumerable: !0,
    configurable: !0,
    get: r.noop,
    set: r.noop
};