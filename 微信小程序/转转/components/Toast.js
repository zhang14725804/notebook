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
            var i = t[o];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, o, i) {
        return o && e(t.prototype, o), i && e(t, i), t;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), Toast = function(e) {
    function t() {
        var e, o, i, n;
        _classCallCheck(this, t);
        for (var r = arguments.length, s = Array(r), a = 0; a < r; a++) s[a] = arguments[a];
        return o = i = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(s))), 
        i.data = {
            reveal: !1,
            img: "",
            animationData: "",
            imgClassName: "",
            imgMode: "scaleToFill",
            title: "载入中...",
            titleClassName: ""
        }, i.methods = {}, n = o, _possibleConstructorReturn(i, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {
            this.hasPromise = "undefined" != typeof Promise;
        }
    }, {
        key: "show",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.reveal = !0;
            for (var o in t) this[o] = t[o];
            if (this.$apply(), clearTimeout(this.__timeout), setTimeout(function() {
                var t = wx.createAnimation();
                t.opacity(1).step(), e.animationData = t.export(), e.reveal = !0, e.$apply();
            }, 30), 0 === t.duration) {
                if (this.hasPromise) return new Promise(function(e, o) {
                    setTimeout(function() {
                        e(t);
                    }, 430);
                });
                setTimeout(function() {
                    return "function" == typeof t.success ? t.success(t) : t;
                }, 430);
            } else {
                if (this.hasPromise) return new Promise(function(o, i) {
                    e.__timeout = setTimeout(function() {
                        e.hide(), o(t);
                    }, (t.duration || 1500) + 400);
                });
                this.__timeout = setTimeout(function() {
                    e.hide(), "function" == typeof t.success && t.success(t);
                }, (t.duration || 1500) + 400);
            }
        }
    }, {
        key: "toast",
        value: function(e) {
            var t = !1;
            try {
                e ? this.show(e) : this.hide();
            } catch (e) {
                t = e;
            }
            if (this.hasPromise) return new Promise(function(o, i) {
                t ? i(e) : o(e);
            });
            t ? "function" == typeof e.fail && e.fail(e) : "function" == typeof e.success && e.success(e);
        }
    }, {
        key: "hide",
        value: function() {
            clearTimeout(this.__timeout), this.reveal = !1;
            var e = wx.createAnimation();
            return e.opacity(0).step(), this.animationData = e.export(), this.$apply(), this.hasPromise ? new Promise(function(e, t) {
                e();
            }) : "function" == typeof data.success ? data.success(data) : void 0;
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = Toast;