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

var _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _Title = require("./Title.js"), _Title2 = _interopRequireDefault(_Title), _funcKit = require("./../../../lib/funcKit.js"), _default = function(e) {
    function t() {
        var e, r, n, o;
        _classCallCheck(this, t);
        for (var i = arguments.length, u = Array(i), l = 0; l < i; l++) u[l] = arguments[l];
        return r = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(u))), 
        n.props = {
            title: {
                type: String,
                default: ""
            },
            entries: {
                type: Array,
                default: function() {
                    return [];
                }
            }
        }, n.data = {}, n.computed = {}, n.methods = {
            onEntry: function(e) {
                var t = this.entries[e];
                (0, _funcKit.robustOpen)(t.href), this.$log("GRIDCLK", null, {
                    grid: e + 1
                });
            }
        }, n.$repeat = {}, n.$props = {
            Title: {
                "xmlns:v-bind": "",
                "v-bind:title.sync": "title"
            }
        }, n.$events = {}, n.components = {
            Title: _Title2.default
        }, o = r, _possibleConstructorReturn(n, o);
    }
    return _inherits(t, e), t;
}(_wepy2.default.component);

exports.default = _default;