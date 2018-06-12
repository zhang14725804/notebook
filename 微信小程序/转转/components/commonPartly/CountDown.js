function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _asyncToGenerator(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, r) {
            function n(i, o) {
                try {
                    var a = e[i](o), u = a.value;
                } catch (t) {
                    return void r(t);
                }
                if (!a.done) return Promise.resolve(u).then(function(t) {
                    n("next", t);
                }, function(t) {
                    n("throw", t);
                });
                t(u);
            }
            return n("next");
        });
    };
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _slicedToArray = function() {
    function t(t, e) {
        var r = [], n = !0, i = !1, o = void 0;
        try {
            for (var a, u = t[Symbol.iterator](); !(n = (a = u.next()).done) && (r.push(a.value), 
            !e || r.length !== e); n = !0) ;
        } catch (t) {
            i = !0, o = t;
        } finally {
            try {
                !n && u.return && u.return();
            } finally {
                if (i) throw o;
            }
        }
        return r;
    }
    return function(e, r) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _createClass = function() {
    function t(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, r, n) {
        return r && t(e.prototype, r), n && t(e, n), e;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), SECOND = 1e3, MINUTE = 60 * SECOND, HOUR = 60 * MINUTE, DAY = 24 * HOUR, _default = function(t) {
    function e() {
        var t, r, n, i;
        _classCallCheck(this, e);
        for (var o = arguments.length, a = Array(o), u = 0; u < o; u++) a[u] = arguments[u];
        return r = n = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(a))), 
        n.props = {}, n.data = {
            title: "距活动结束还剩：",
            countFromInMs: 0,
            onTimeout: null,
            active: !1,
            interval: 100,
            deadline: 0,
            remainMs: -1,
            timer: null
        }, n.computed = {
            digits: function() {
                var t = [ this.remainMs / DAY, this.remainMs % DAY / HOUR, this.remainMs % HOUR / MINUTE, this.remainMs % MINUTE / SECOND, this.remainMs % SECOND / this.interval ].map(Math.floor).map(function(t, e, r) {
                    return e == r.length - 1 ? String(t) : String(t).padStart(2, 0);
                }), e = _slicedToArray(t, 5);
                e[0];
                return e[1] + ":" + e[2] + ":" + e[3] + ":" + e[4];
            },
            digitState: function() {
                return this.remainMs > 0 ? "enabled" : 0 == this.remainMs ? "disabled" : "unready";
            }
        }, n.methods = {}, n.components = {}, i = r, _possibleConstructorReturn(n, i);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "resetCounter",
        value: function(t) {
            var e = t.title, r = t.countFromInMs, n = t.onTimeout;
            void 0 !== e && (this.title = e), void 0 !== n && (this.onTimeout = n), void 0 !== r && (this.remainMs = this.countFromInMs = r, 
            this.deadline = Date.now() + r, clearTimeout(this.timer), this.ticktock()), this.$apply();
        }
    }, {
        key: "ticktock",
        value: function() {
            function t() {
                return e.apply(this, arguments);
            }
            var e = _asyncToGenerator(regeneratorRuntime.mark(function t() {
                var e = this;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (!(this.remainMs <= 0)) {
                            t.next = 3;
                            break;
                        }
                        return this.countFromInMs > 0 && this.onTimeout && this.onTimeout(), t.abrupt("return");

                      case 3:
                        return t.next = 5, new Promise(function(t, r) {
                            e.timer = setTimeout(t, e.interval);
                        });

                      case 5:
                        this.remainMs = Math.max(0, this.deadline - Date.now()), this.$apply(), this.ticktock();

                      case 8:
                      case "end":
                        return t.stop();
                    }
                }, t, this);
            }));
            return t;
        }()
    } ]), e;
}(_wepy2.default.component);

exports.default = _default;