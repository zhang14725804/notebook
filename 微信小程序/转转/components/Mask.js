function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
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
        for (var o = 0; o < t.length; o++) {
            var n = t[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, o, n) {
        return o && e(t.prototype, o), n && e(t, n), t;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), Mask = function(e) {
    function t() {
        for (var e, o, n, r, a = arguments.length, u = Array(a), i = 0; i < a; i++) u[i] = arguments[i];
        return _classCallCheck(this, t), o = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(u))), 
        n.props = {
            color: {
                type: String,
                default: "#000000"
            },
            opacity: {
                type: Number,
                default: .7
            },
            zIndex: {
                type: Number,
                default: 99
            },
            tapClose: {
                type: Boolean,
                default: !1
            },
            onTap: {
                type: Function,
                default: function() {}
            }
        }, n.data = {
            show: !1
        }, n.methods = {
            handleTap: function() {
                this.onTap && this.onTap();
            }
        }, n.events = {
            openMask: function() {
                n.show = !0;
            },
            closeMask: function() {
                n.show = !1;
            }
        }, r = o, _possibleConstructorReturn(n, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {}
    } ]), t;
}(_wepy2.default.component);

exports.default = Mask;