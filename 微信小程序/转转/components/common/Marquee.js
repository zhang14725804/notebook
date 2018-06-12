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
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), Marquee = function(t) {
    function e() {
        var t, n, r, i;
        _classCallCheck(this, e);
        for (var o = arguments.length, a = Array(o), s = 0; s < o; s++) a[s] = arguments[s];
        return n = r = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(a))), 
        r.props = {
            partClassArray: {
                type: Array,
                default: []
            },
            list: {
                type: Array,
                default: []
            },
            interval: {
                type: Number,
                default: 3e3
            },
            duration: {
                type: Number,
                default: 2e3
            },
            customClass: {
                type: String,
                default: ""
            },
            clickHandler: {
                type: Function
            },
            auto: {
                type: Boolean,
                default: !0
            },
            mode: {
                type: Number,
                default: 0
            }
        }, r.data = {
            switching: !1,
            curMsg: "",
            nextMsg: "",
            currentIndex: 0,
            intervaler: "",
            timer: ""
        }, r.computed = {
            animationStyle: function() {
                return this.switching ? "transition:transform " + this.duration + "ms;transform:translate3d(0,-100%,0);" : "transition: transform 0s;transform: translate3d(0,0,0);";
            }
        }, r.method = {
            onClick: function(t) {
                this.clickHandler && this.clickHandler(this.currentIndex);
            }
        }, r.watch = {
            list: function(t, e) {
                console.log(t, "CHANGE"), this.init(t);
            }
        }, i = n, _possibleConstructorReturn(r, i);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "startSwitching",
        value: function() {
            var t = this, e = 1, n = this.list.length;
            this.intervaler = setInterval(function() {
                t.nextMsg = t.list[e % n], t.switching = !0, t.$apply(), t.timer = setTimeout(function() {
                    t.curMsg = t.nextMsg, t.currentIndex = e, t.switching = !1, t.$apply();
                }, t.duration), ++e;
            }, this.interval);
        }
    }, {
        key: "init",
        value: function(t) {
            var e = this;
            if (this.uninstall(), console.log(t, "list"), this.curMsg = t[0], this.currentIndex = 0, 
            this.switching = !1, this.nextMsg = t[1], this.$apply(), t.length > 1) {
                this.startSwitching();
                var n = this.$root.onUnload;
                this.$root.onHide;
                this.$root.onUnload = function() {
                    "function" == typeof n && n.call(e.$root), e.uninstall();
                };
            }
        }
    }, {
        key: "uninstall",
        value: function() {
            clearTimeout(this.timer), clearInterval(this.intervaler);
        }
    } ]), e;
}(_wepy2.default.component);

exports.default = Marquee;