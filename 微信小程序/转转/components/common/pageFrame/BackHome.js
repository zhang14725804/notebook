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

var _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _default = function(t) {
    function e() {
        var t, o, s, n;
        _classCallCheck(this, e);
        for (var r = arguments.length, a = Array(r), i = 0; i < r; i++) a[i] = arguments[i];
        return o = s = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(a))), 
        s.props = {
            backHome: {
                type: Object
            },
            pageBodyReady: {
                type: Boolean
            }
        }, s.data = {
            eleOffset: {
                x: 0,
                y: 0
            },
            moveAct: {
                lastX: 0,
                lastY: 0,
                lastTimestamp: 0
            }
        }, s.computed = {}, s.methods = {
            onBackHome: function() {
                this.$wxPromise.reLaunch({
                    url: "/pages/index/index"
                });
            },
            onTouchstart: function(t) {
                var e = [ t.touches[0].clientX, t.touches[0].clientY ];
                this.moveAct.lastX = e[0], this.moveAct.lastY = e[1], this.moveAct.lastTimestamp = Date.now();
            },
            onTouchmove: function(t) {
                var e = Date.now();
                if (!(e - this.moveAct.lastTimestamp <= 20)) {
                    var o = [ t.touches[0].clientX, t.touches[0].clientY ], s = o[0], n = o[1];
                    this.eleOffset.x += s - this.moveAct.lastX, this.eleOffset.y += n - this.moveAct.lastY;
                    var r = [ s, n, e ];
                    this.moveAct.lastX = r[0], this.moveAct.lastY = r[1], this.moveAct.lastTimestamp = r[2];
                }
            }
        }, s.components = {}, n = o, _possibleConstructorReturn(s, n);
    }
    return _inherits(e, t), e;
}(_wepy2.default.component);

exports.default = _default;