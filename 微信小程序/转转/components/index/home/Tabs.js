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

var _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), deviceInfo = {}, tabsPosition = {};

wx.getSystemInfo({
    success: function(t) {
        deviceInfo = t;
    }
});

var _default = function(t) {
    function e() {
        var t, o, n, r;
        _classCallCheck(this, e);
        for (var i = arguments.length, s = Array(i), a = 0; a < i; a++) s[a] = arguments[a];
        return o = n = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(s))), 
        n.props = {
            tabs: {
                type: Array
            },
            tabClick: {
                type: Function
            }
        }, n.watch = {
            tabs: function(t) {
                t && t.length && t.forEach(function(t) {
                    wx.createSelectorQuery().select("#tabs-" + t.tabCatId).boundingClientRect(function(e) {
                        setTimeout(function() {
                            e && e.hasOwnProperty("left") && (tabsPosition[t.tabCatId] = e.left);
                        }, 100);
                    }).exec();
                });
            }
        }, n.data = {
            sectionId: 1,
            scrollLeft: 0
        }, n.methods = {
            selectCate: function(t) {
                this.sectionId = t.target.dataset && t.target.dataset.id, this.$apply(), this.tabClick && this.tabClick.call(this.$parent, this.sectionId);
            }
        }, n.events = {
            setTab: function(t) {
                this.sectionId = t, tabsPosition[t] && (this.scrollLeft = tabsPosition[t] - deviceInfo.screenWidth / 2), 
                this.$apply();
            }
        }, r = o, _possibleConstructorReturn(n, r);
    }
    return _inherits(e, t), e;
}(_wepy2.default.component);

exports.default = _default;