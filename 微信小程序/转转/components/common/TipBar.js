function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _asyncToGenerator(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, n) {
            function o(r, i) {
                try {
                    var s = e[r](i), u = s.value;
                } catch (t) {
                    return void n(t);
                }
                if (!s.done) return Promise.resolve(u).then(function(t) {
                    o("next", t);
                }, function(t) {
                    o("throw", t);
                });
                t(u);
            }
            return o("next");
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

var _createClass = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n), o && t(e, o), e;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _operationKit = require("./../../lib/operationKit.js"), _default = function(t) {
    function e() {
        var t, n, o, r;
        _classCallCheck(this, e);
        for (var i = arguments.length, s = Array(i), u = 0; u < i; u++) s[u] = arguments[u];
        return n = o = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(s))), 
        o.props = {}, o.data = {
            defaultOpts: {
                content: "",
                icon: "fail",
                showClose: !1
            },
            options: {},
            showTip: !1
        }, o.computed = {
            iconSrc: function() {
                return this.options.icon && "none" != this.options.icon ? /^http/.test(this.options.icon) ? this.options.icon : "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/common/tipBar/" + this.options.icon + ".png" : "";
            }
        }, o.methods = {
            onClose: function() {
                this.close();
            }
        }, o.components = {}, r = n, _possibleConstructorReturn(o, r);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "open",
        value: function() {
            function t(t) {
                return e.apply(this, arguments);
            }
            var e = _asyncToGenerator(regeneratorRuntime.mark(function t(e) {
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        this.options = Object.assign({}, this.defaultOpts, e), this.showTip = !0, this.$apply();

                      case 3:
                      case "end":
                        return t.stop();
                    }
                }, t, this);
            }));
            return t;
        }()
    }, {
        key: "close",
        value: function() {
            this.showTip = !1, this.$apply();
        }
    } ]), e;
}(_wepy2.default.component);

exports.default = _default;