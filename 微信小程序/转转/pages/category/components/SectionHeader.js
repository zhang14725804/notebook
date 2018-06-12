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

var _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _default = function(e) {
    function t() {
        var e, r, o, n;
        _classCallCheck(this, t);
        for (var a = arguments.length, u = Array(a), i = 0; i < a; i++) u[i] = arguments[i];
        return r = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(u))), 
        o.props = {
            header: {
                type: Object,
                default: function() {
                    return {
                        title: "",
                        meta: "",
                        metaIcon: {
                            src: "",
                            style: ""
                        }
                    };
                }
            },
            metaHandler: {
                type: Function
            }
        }, o.data = {}, o.computed = {}, o.methods = {
            onMeta: function() {
                this.metaHandler && this.metaHandler();
            }
        }, o.components = {}, n = r, _possibleConstructorReturn(o, n);
    }
    return _inherits(t, e), t;
}(_wepy2.default.component);

exports.default = _default;