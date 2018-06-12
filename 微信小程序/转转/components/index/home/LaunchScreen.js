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
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _funcKit = require("./../../../lib/funcKit.js"), _util = require("./../../../lib/util.js"), _util2 = _interopRequireDefault(_util), _default = function(e) {
    function t() {
        var e, n, o, r;
        _classCallCheck(this, t);
        for (var i = arguments.length, a = Array(i), u = 0; u < i; u++) a[u] = arguments[u];
        return n = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        o.props = {}, o.data = {
            show: !1,
            info: {
                pic: "",
                buttonPic: "",
                path: "",
                appId: "",
                activityId: ""
            }
        }, o.computed = {}, o.methods = {
            onTouchmove: function() {},
            onModal: function(e) {
                "modal" == e.target.dataset.ele && this.close();
            },
            onPic: function() {
                (0, _funcKit.robustOpen)(this.info.path, this.info.appId), this.$log("HOME-SCREEN-CLICK", null, {
                    entryType: _util2.default.getQuery(this.info.path, "channel")
                }), this.close();
            },
            onClose: function() {
                this.close();
            }
        }, r = n, _possibleConstructorReturn(o, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "open",
        value: function(e) {
            this.openByLocalStratege(e);
        }
    }, {
        key: "close",
        value: function() {
            this.show = !1, this.$apply();
        }
    }, {
        key: "openByLocalStratege",
        value: function(e) {
            var t = e.activityId, n = wx.getStorageSync("__launchScreenData") || {}, o = new Date(new Date().toLocaleDateString()).getTime(), r = !1, i = n[t];
            return i ? o - i.lastOpenTime >= 864e5 && i.openCount < 3 && (i.lastOpenTime = o, 
            i.openCount += 1, r = !0) : (n[t] = {
                lastOpenTime: o,
                openCount: 1
            }, r = !0), r && (wx.setStorage({
                key: "__launchScreenData",
                data: n
            }), e && (this.info = e), this.show = !0, this.$log("HOME-SCREEN-SHOW", null, {
                entryType: _util2.default.getQuery(e.path, "channel")
            }), this.$apply()), r;
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = _default;