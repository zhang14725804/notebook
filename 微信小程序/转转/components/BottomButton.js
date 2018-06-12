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
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), BottomButton = function(t) {
    function e() {
        var t, n, o, r;
        _classCallCheck(this, e);
        for (var a = arguments.length, i = Array(a), u = 0; u < a; u++) i[u] = arguments[u];
        return n = o = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(i))), 
        o.data = {
            disabled: !1,
            reportSubmit: !0
        }, o.props = {
            button: {
                type: Array,
                default: [ {
                    name: "取消"
                }, {
                    name: "确定"
                } ]
            }
        }, o.methods = {
            handleTap: function(t) {
                console.log(this.button, "button");
                var e = t.target.dataset.index;
                this.$invoke(this.$parent, "buttonIndexCallBack", e), this.disableButton();
                var n = t.detail.formId, o = this.button[e].callback(e);
                o && o(n);
            }
        }, r = n, _possibleConstructorReturn(o, r);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "enableButton",
        value: function() {
            this.disabled = !1, this.$apply();
        }
    }, {
        key: "disableButton",
        value: function() {
            this.disabled = !0, this.$apply();
        }
    } ]), e;
}(_wepy2.default.component);

exports.default = BottomButton;