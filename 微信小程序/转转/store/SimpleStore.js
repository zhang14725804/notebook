function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _createClass = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t;
    };
}(), _operationKit = require("./../lib/operationKit.js"), Store = function() {
    function e(t) {
        if (_classCallCheck(this, e), this._state = {}, this._watchers = [], "object" !== (void 0 === t ? "undefined" : _typeof(t))) return void console.error("state shall be an Object");
        this._state = t;
    }
    return _createClass(e, [ {
        key: "getState",
        value: function() {
            return (0, _operationKit.deepClone)(this._state);
        }
    }, {
        key: "commitChange",
        value: function(e) {
            var t = (0, _operationKit.deepClone)(this._state);
            (0, _operationKit.deepAssign)(this._state, e), this._notifyWatchers((0, _operationKit.deepClone)(this._state), t);
        }
    }, {
        key: "addWatcher",
        value: function(e, t) {
            return e = Array.isArray(e) ? e : [ e ], e.every(function(e) {
                return "string" == typeof e;
            }) && "function" == typeof t ? !!this._watchers.some(function(r) {
                return r.exps.join() === e.join() && r.callback === t;
            }) || (this._watchers.push({
                exps: e,
                callback: t
            }), !0) : (console.warn("[addWatcher] bad parameters:", arguments), !1);
        }
    }, {
        key: "_notifyWatchers",
        value: function(e, t) {
            var r = !0, o = !1, n = void 0;
            try {
                for (var a, i = this._watchers[Symbol.iterator](); !(r = (a = i.next()).done); r = !0) {
                    var l = a.value, s = !1, c = !0, u = !1, f = void 0;
                    try {
                        for (var y, p = l.exps[Symbol.iterator](); !(c = (y = p.next()).done); c = !0) {
                            var h = y.value;
                            if (!(0, _operationKit.deepEqual)(e[h], t[h])) {
                                s = !0;
                                break;
                            }
                        }
                    } catch (e) {
                        u = !0, f = e;
                    } finally {
                        try {
                            !c && p.return && p.return();
                        } finally {
                            if (u) throw f;
                        }
                    }
                    s && l.callback((0, _operationKit.deepClone)(e), (0, _operationKit.deepClone)(t));
                }
            } catch (e) {
                o = !0, n = e;
            } finally {
                try {
                    !r && i.return && i.return();
                } finally {
                    if (o) throw n;
                }
            }
        }
    } ]), e;
}();

exports.default = Store;