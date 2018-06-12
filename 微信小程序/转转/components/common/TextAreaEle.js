function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _asyncToGenerator(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, n) {
            function r(i, o) {
                try {
                    var u = e[i](o), s = u.value;
                } catch (t) {
                    return void n(t);
                }
                if (!u.done) return Promise.resolve(s).then(function(t) {
                    r("next", t);
                }, function(t) {
                    r("throw", t);
                });
                t(s);
            }
            return r("next");
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
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _wxPromise = require("./../../lib/wxPromise.js"), _operationKit = require("./../../lib/operationKit.js"), _default = function(t) {
    function e() {
        var t, n, r, i;
        _classCallCheck(this, e);
        for (var o = arguments.length, u = Array(o), s = 0; s < o; s++) u[s] = arguments[s];
        return n = r = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(u))), 
        r.props = {
            class: {
                type: String
            },
            value: {
                type: String,
                twoWay: !0
            },
            placeholder: {
                type: String
            },
            placeholderStyle: {
                type: String
            },
            placeholderClass: {
                type: String
            },
            disabled: {},
            maxlength: {},
            autoHeight: {},
            fixed: {},
            cursorSpacing: {},
            showConfirmBar: {},
            bindblur: {
                type: Function
            },
            bindinput: {
                type: Function
            },
            bindfocus: {
                type: Function
            },
            bindlinechange: {
                type: Function
            },
            bindconfirm: {
                type: Function
            }
        }, r.data = {
            _focus: !1,
            _cursor: 0,
            editing: !1,
            focusing: !1,
            draftValue: r.value,
            platform: ""
        }, r.methods = {
            onTextInput: function(t) {
                return this.draftValue = t.detail.value, this.bindinput && this.bindinput(t);
            },
            onTextFocus: function(t) {
                return this.focusing = !0, this.bindfocus && this.bindfocus(t);
            },
            onTextBlur: function(t) {
                this.focusing && (this.editing = !1, this.focusing = !1, this.value = t.detail.value, 
                this._focus = !1, this.bindblur && this.bindblur(t), this.$apply());
            },
            onBlurModal: function(t) {
                this.value = this.draftValue, this._focus = !1, this.editing = !1, this.$apply();
            },
            onBeginEdit: function() {
                function t() {
                    return e.apply(this, arguments);
                }
                var e = _asyncToGenerator(regeneratorRuntime.mark(function t() {
                    return regeneratorRuntime.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return this.editing = !0, this.$apply(), t.next = 4, (0, _operationKit.delay)(150);

                          case 4:
                            this._focus = !0, this._cursor = this.value.length, this.$apply();

                          case 7:
                          case "end":
                            return t.stop();
                        }
                    }, t, this);
                }));
                return t;
            }(),
            onLineChange: function(t) {
                return this.bindlinechange && this.bindlinechange(t);
            },
            onConfirm: function(t) {
                return this.bindconfirm && this.bindconfirm(t);
            }
        }, r.components = {}, i = n, _possibleConstructorReturn(r, i);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "onLoad",
        value: function() {
            function t() {
                return e.apply(this, arguments);
            }
            var e = _asyncToGenerator(regeneratorRuntime.mark(function t() {
                var e;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.next = 2, _wxPromise.wxPromise.getSystemInfo();

                      case 2:
                        e = t.sent, this.platform = e.platform, this.$apply();

                      case 5:
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