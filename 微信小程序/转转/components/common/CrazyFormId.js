function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            function n(o, u) {
                try {
                    var a = t[o](u), i = a.value;
                } catch (e) {
                    return void r(e);
                }
                if (!a.done) return Promise.resolve(i).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(i);
            }
            return n("next");
        });
    };
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _createClass = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _formIdHub = require("./../../store/formIdHub.js"), _formIdHub2 = _interopRequireDefault(_formIdHub), _operationKit = require("./../../lib/operationKit.js"), _default = function(e) {
    function t() {
        var e, r, n, o;
        _classCallCheck(this, t);
        for (var u = arguments.length, a = Array(u), i = 0; i < u; i++) a[i] = arguments[i];
        return r = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        n.props = {}, n.data = {}, n.computed = {}, n.methods = {
            saveFormId: function(e) {
                _formIdHub2.default.save(e.detail.formId);
            }
        }, n.components = {}, o = r, _possibleConstructorReturn(n, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "flush",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, _formIdHub2.default.flush({
                            aggressive: !0
                        });

                      case 2:
                        if (t = e.sent, -2 != t.code) {
                            e.next = 9;
                            break;
                        }
                        return e.next = 6, (0, _operationKit.delay)(100);

                      case 6:
                        return e.next = 8, _formIdHub2.default.flush({
                            aggressive: !0
                        });

                      case 8:
                        t = e.sent;

                      case 9:
                        return e.abrupt("return", t);

                      case 10:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    } ]), t;
}(_wepy2.default.component);

exports.default = _default;