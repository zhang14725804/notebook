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

var _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _Tabs = require("./Tabs.js"), _Tabs2 = _interopRequireDefault(_Tabs), _wxPromise = require("./../../../lib/wxPromise.js"), _default = function(e) {
    function t() {
        var e, o, r, n;
        _classCallCheck(this, t);
        for (var i = arguments.length, a = Array(i), s = 0; s < i; s++) a[s] = arguments[s];
        return o = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        r.props = {
            cardData: {
                type: Array
            },
            imgWidth: {
                type: Number,
                default: 180
            },
            imgHeight: {
                type: Number,
                default: 180
            },
            panelLogAction: {
                type: String,
                default: ""
            },
            moreLogAction: {
                type: String,
                default: ""
            }
        }, r.computed = {
            descText: function() {
                if (this.cardData && this.cardData.descText) return this.cardData.descText.split("|").filter(function(e) {
                    return e.length;
                });
            }
        }, r.methods = {
            goToBookList: function(e) {
                var t = "https://wxzhuanzhuan.58.com/Mzhuanzhuan/ZZBook/?listId=" + e + "#/TopicPage";
                _wxPromise.wxPromise.navigateTo({
                    url: "/pages/webview/webview?url=" + encodeURIComponent(t)
                }), this.$log("BOOKLISTCLK");
            },
            onClickPanel: function() {
                this.$log(this.panelLogAction);
            },
            onGoodClick: function(e) {
                e.jumpUrl && (/^http/.test(e.jumpUrl) ? _wxPromise.wxPromise.navigateTo({
                    url: "/pages/webview/webview?url=" + encodeURIComponent(e.jumpUrl)
                }) : _wxPromise.wxPromise.navigateTo({
                    url: e.jumpUrl.replace(/^pages/, "/pages")
                }));
            },
            moreClick: function() {
                this.$log(this.moreLogAction);
                var e = this.cardData.btnUrl.replace(/^pages/, "/pages");
                _wxPromise.wxPromise.navigateTo({
                    url: e
                });
            }
        }, r.components = {
            Tabs: _Tabs2.default
        }, n = o, _possibleConstructorReturn(r, n);
    }
    return _inherits(t, e), t;
}(_wepy2.default.component);

exports.default = _default;