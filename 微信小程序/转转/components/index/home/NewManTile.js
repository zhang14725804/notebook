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

var _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _Title = require("./Title.js"), _Title2 = _interopRequireDefault(_Title), _funcKit = require("./../../../lib/funcKit.js"), _util = require("./../../../lib/util.js"), _util2 = _interopRequireDefault(_util), _default = function(e) {
    function t() {
        var e, n, r, i;
        _classCallCheck(this, t);
        for (var o = arguments.length, l = Array(o), u = 0; u < o; u++) l[u] = arguments[u];
        return n = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(l))), 
        r.props = [ "dataObj" ], r.data = {}, r.$repeat = {}, r.$props = {
            Title: {
                "xmlns:v-bind": "",
                "v-bind:title.sync": "title"
            }
        }, r.$events = {}, r.components = {
            Title: _Title2.default
        }, r.computed = {
            title: function() {
                return this.dataObj && this.dataObj.title;
            }
        }, r.watch = {
            dataObj: function(e) {
                if (e && e.configList) for (var t = e.configList.length - 1; t >= 0; t--) this.$log("NEWERCARDSHOW", null, {
                    entryType: _util2.default.getQuery(e.configList[t].jumpUri || "", "channel")
                });
            }
        }, r.methods = {
            jumpTo: function(e) {
                console.log("跳转", e), e && (this.$log("NEWERCARDCLK", null, {
                    entryType: _util2.default.getQuery(e || "", "channel")
                }), (0, _funcKit.robustOpen)(e));
            }
        }, i = n, _possibleConstructorReturn(r, i);
    }
    return _inherits(t, e), t;
}(_wepy2.default.component);

exports.default = _default;