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
                    var s = e[r](i), a = s.value;
                } catch (t) {
                    return void n(t);
                }
                if (!s.done) return Promise.resolve(a).then(function(t) {
                    o("next", t);
                }, function(t) {
                    o("throw", t);
                });
                t(a);
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
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _operationKit = require("./../lib/operationKit.js"), _default = function(t) {
    function e() {
        var t, n, o, r;
        _classCallCheck(this, e);
        for (var i = arguments.length, s = Array(i), a = 0; a < i; a++) s[a] = arguments[a];
        return n = o = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(s))), 
        o.data = {
            show: !1,
            options: {},
            defaultOptions: {
                title: "提示",
                content: "",
                contentScrollable: "auto",
                contentExtraStyle: "",
                containerExtraStyle: "",
                hideCloseIcon: !1,
                onClose: null,
                btnLayout: "horizontal",
                btnStyle: "highlight",
                buttons: [ {
                    text: "确定",
                    openType: "",
                    shareData: "",
                    clickHandler: null,
                    preventClose: !1
                } ]
            }
        }, o.methods = {
            onClose: function() {
                this.close(), "function" == typeof this.options.onClose && this.options.onClose.call(this.$parent);
            },
            onButton: function(t, e) {
                var n = this.options.buttons[t];
                if ("getPhoneNumber" == n.openType) return void (n.preventClose || this.close());
                this.handleBtn(n, e);
            },
            onGetPhoneNumber: function(t, e) {
                var n = this.options.buttons[t];
                this.handleBtn(n, e);
            },
            onScroll: function() {}
        }, r = n, _possibleConstructorReturn(o, r);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "handleBtn",
        value: function(t, e) {
            "function" == typeof t.clickHandler && t.clickHandler(Object.assign({}, t), e), 
            this.show = !!t.preventClose, this.$apply();
        }
    }, {
        key: "close",
        value: function() {
            this.show = !1;
        }
    }, {
        key: "open",
        value: function(t) {
            var e = this, n = Object.assign({}, this.defaultOptions, t);
            n.buttons = n.buttons.map(function(t, o, r) {
                return Object.assign({}, e.defaultOptions.buttons[o] || e.defaultOptions.buttons[0], "string" == typeof t ? {
                    text: t
                } : t, {
                    main: "horizontal" === n.btnLayout && 2 === r.length ? 1 === o : 0 === o
                });
            }), "auto" == n.contentScrollable && (n.contentScrollable = n.content.split("\n").length >= 7 || n.content.length >= 126), 
            this.options = n, this.show = !0, this.$apply();
        }
    }, {
        key: "asyncOpen",
        value: function(t) {
            var e = this;
            return new Promise(function(n, o) {
                var r = (0, _operationKit.deepClone)(t);
                r.onClose = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                    for (var o = arguments.length, r = Array(o), i = 0; i < o; i++) r[i] = arguments[i];
                    var s;
                    return regeneratorRuntime.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            s = t.onClose ? t.onClose.apply(this, r) : {}, n(s);

                          case 2:
                          case "end":
                            return e.stop();
                        }
                    }, e, this);
                })), r.buttons.forEach(function(e, o) {
                    e.clickHandler = _asyncToGenerator(regeneratorRuntime.mark(function r() {
                        for (var i = arguments.length, s = Array(i), a = 0; a < i; a++) s[a] = arguments[a];
                        var l;
                        return regeneratorRuntime.wrap(function(r) {
                            for (;;) switch (r.prev = r.next) {
                              case 0:
                                l = t.buttons[o].clickHandler ? t.buttons[o].clickHandler.apply(this, s) : {}, e.preventClose || n(l);

                              case 2:
                              case "end":
                                return r.stop();
                            }
                        }, r, this);
                    }));
                }), e.open(r);
            });
        }
    } ]), e;
}(_wepy2.default.component);

exports.default = _default;