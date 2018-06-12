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
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n), o && t(e, o), e;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _Mask = require("./Mask.js"), _Mask2 = _interopRequireDefault(_Mask), Dialog = function(t) {
    function e() {
        var t, n, o, i;
        _classCallCheck(this, e);
        for (var s = arguments.length, r = Array(s), u = 0; u < s; u++) r[u] = arguments[u];
        return n = o = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(r))), 
        o.data = {
            isHidden: !0,
            title: "",
            content: "弹窗内容",
            buttonType: "block",
            buttons: [ {
                text: "操作A",
                callback: function() {
                    console.log("操作A");
                }
            }, {
                text: "操作B",
                callback: function() {
                    console.log("操作B");
                }
            } ]
        }, o.computed = {
            isShowTitle: function() {
                return !!this.title;
            },
            isFlexButton: function() {
                return "flex" === this.buttonType;
            }
        }, o.components = {
            Mask: _Mask2.default
        }, o.props = {}, o.methods = {
            closeHandle: function() {
                this.closeDialog();
            },
            buttonHandle: function(t) {
                var e = t.target.dataset.index;
                this.buttons[e].callback && this.buttons[e].callback();
            }
        }, i = n, _possibleConstructorReturn(o, i);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "onLoad",
        value: function() {}
    }, {
        key: "closeDialog",
        value: function() {
            this.isHidden = !0, this.$broadcast("closeMask"), this.$apply();
        }
    }, {
        key: "showDialog",
        value: function(t) {
            t.title && (this.title = t.title), t.content && (this.content = t.content), t.buttons && (this.buttons = t.buttons), 
            2 === this.buttons.length && (this.buttons[0].isLeftButton = !0, this.buttons[1].isRightButton = !0), 
            t.buttonType && (this.buttonType = t.buttonType), this.isHidden = !1, this.$broadcast("openMask"), 
            this.$apply();
        }
    } ]), e;
}(_wepy2.default.component);

exports.default = Dialog;