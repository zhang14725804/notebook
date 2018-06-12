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
});

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
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _CrazyFormId = require("./../../components/common/CrazyFormId.js"), _CrazyFormId2 = _interopRequireDefault(_CrazyFormId), _SearchBox = require("./components/SearchBox.js"), _SearchBox2 = _interopRequireDefault(_SearchBox), _Cates = require("./components/Cates.js"), _Cates2 = _interopRequireDefault(_Cates), _Recommends = require("./components/Recommends.js"), _Recommends2 = _interopRequireDefault(_Recommends), _MoreGoods = require("./components/MoreGoods.js"), _MoreGoods2 = _interopRequireDefault(_MoreGoods), _PageFrame = require("./../../components/common/PageFrame.js"), _PageFrame2 = _interopRequireDefault(_PageFrame), _default = function(e) {
    function t() {
        var e, n, o, r;
        _classCallCheck(this, t);
        for (var a = arguments.length, u = Array(a), s = 0; s < a; s++) u[s] = arguments[s];
        return n = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(u))), 
        o.config = {
            backgroundColor: "#fff",
            backgroundTextStyle: "light",
            navigationBarBackgroundColor: "#fff",
            navigationBarTitleText: "转转",
            navigationBarTextStyle: "black"
        }, o.components = {
            PageFrame: _PageFrame2.default,
            CrazyFormId: _CrazyFormId2.default,
            SearchBox: _SearchBox2.default,
            Cates: _Cates2.default,
            Recommends: _Recommends2.default,
            MoreGoods: _MoreGoods2.default
        }, o.data = {
            gameCardConfig: {
                segmentFormat: "category",
                segmentName: "游戏担保交易",
                segmentDesc: "查看全部游戏商品",
                segmentUri: "https://m.zhuanzhuan.com/Mzhuanzhuan/ZZOpenBusiness/index.html#/game-home/game-index",
                cards: [ {
                    pic: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/index/game1.png",
                    url: "https://m.zhuanzhuan.com/Mzhuanzhuan/ZZOpenBusiness/index.html#/game-home/game-index",
                    btnText: "买账号"
                }, {
                    pic: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/index/game2.png",
                    url: "https://m.zhuanzhuan.com/Mzhuanzhuan/ZZOpenBusiness/index.html#/game-home/game-index",
                    btnText: "租号玩"
                }, {
                    pic: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/index/game3.png",
                    url: "https://m.zhuanzhuan.com/Mzhuanzhuan/ZZOpenBusiness/index.html#/game-home/game-index",
                    btnText: "选皮肤"
                } ]
            }
        }, o.computed = {}, o.methods = {}, r = n, _possibleConstructorReturn(o, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {
            this.$log("VIEW");
        }
    }, {
        key: "onReachBottom",
        value: function() {
            this.$invoke("MoreGoods", "pullMoreGoods");
        }
    }, {
        key: "onShareAppMessage",
        value: function() {
            var e = this;
            return {
                title: "你想要的二手好物都在这里~",
                path: "/subPages/structure/category/category",
                success: function() {
                    e.$log("CATEGORYPAGESHARE");
                }
            };
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(_default, "pages/category/category"));