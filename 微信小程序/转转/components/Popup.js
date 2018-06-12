function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
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
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), Popup = function(t) {
    function e() {
        var t, n, i, o;
        _classCallCheck(this, e);
        for (var r = arguments.length, a = Array(r), s = 0; s < r; s++) a[s] = arguments[s];
        return n = i = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(a))), 
        i.props = {
            popType: {
                type: String,
                default: "confirm"
            },
            confirmConfig: {
                type: Object,
                default: {
                    title: "确认？",
                    confirmText: "确定",
                    cancelText: "取消",
                    agreeHandler: function() {
                        console.log("agree");
                    },
                    cancelHandler: function() {
                        console.log("cancel");
                    }
                }
            },
            tipConfig: {
                type: Object,
                default: {
                    text: "这里是提示文案这里是提示文案这里是提示文案这里是提示文案这里是提示文案这里是提示文案这里是提示文案这里是提示文案这里是提示文案这里是提示文案这里是提示文案",
                    duration: 1e3
                }
            },
            position: {
                type: String,
                default: "bottom"
            },
            animation: {
                type: String,
                default: "0.5s linear"
            },
            hasMask: {
                type: Boolean,
                default: !0
            },
            closeOnClickMask: {
                type: Boolean,
                default: !0
            }
        }, i.data = {
            isHidden: !0,
            hasAnimation: !1
        }, i.methods = {
            onHide: function() {
                this.isHidden = !0;
            },
            onAgree: function() {
                console.log("确认"), this.confirmConfig.agreeHandler();
            },
            onCancel: function() {
                this.confirmConfig.cancelHandler();
            }
        }, i.computed = {
            animationStyle: function(t) {
                if (console.log("computed", this.isHidden, this.position), this.isHidden) {
                    if ("top" === this.position) return (this.hasAnimation ? "transition: transform " + this.animation + ";" : "") + "transform: translateY(-100%);";
                    if ("bottom" === this.position) return (this.hasAnimation ? "transition: transform " + this.animation + ";" : "") + "transform: translateY(100%);";
                    this.$apply();
                } else if (!this.isHidden) return (this.hasAnimation ? "transition: transform " + this.animation + ";" : "") + "transform: translateY(0);";
            }
        }, i.events = {
            popupshow: function(t) {
                this.$apply(), this.show();
            },
            popuphide: function() {
                this.$apply(), this.hide();
            }
        }, o = n, _possibleConstructorReturn(i, o);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "show",
        value: function() {
            var t = this;
            this.hasAnimation = !0, this.isHidden = !1, "tip" === this.popType && setTimeout(function() {
                t.isHidden = !0, t.$apply();
            }, this.tipConfig.duration);
        }
    }, {
        key: "hide",
        value: function() {
            this.isHidden = !0;
        }
    } ]), e;
}(_wepy2.default.component);

exports.default = Popup;