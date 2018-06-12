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
        for (var o = 0; o < t.length; o++) {
            var a = t[o];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, o, a) {
        return o && e(t.prototype, o), a && e(t, a), t;
    };
}(), _get = function e(t, o, a) {
    null === t && (t = Function.prototype);
    var r = Object.getOwnPropertyDescriptor(t, o);
    if (void 0 === r) {
        var i = Object.getPrototypeOf(t);
        return null === i ? void 0 : e(i, o, a);
    }
    if ("value" in r) return r.value;
    var n = r.get;
    if (void 0 !== n) return n.call(a);
}, _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _adjustPic = require("./../../lib/adjustPic.js"), _adjustPic2 = _interopRequireDefault(_adjustPic), _GoodsListC = require("./../../components/GoodsListC.js"), _GoodsListC2 = _interopRequireDefault(_GoodsListC), _LoadingMore = require("./../../components/LoadingMore.js"), _LoadingMore2 = _interopRequireDefault(_LoadingMore), _PageFrame = require("./../../components/common/PageFrame.js"), _PageFrame2 = _interopRequireDefault(_PageFrame), moreC = function(e) {
    function t() {
        var e, o, a, r;
        _classCallCheck(this, t);
        for (var i = arguments.length, n = Array(i), s = 0; s < i; s++) n[s] = arguments[s];
        return o = a = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(n))), 
        a.config = {
            navigationBarTitleText: "查看更多商品"
        }, a.$repeat = {}, a.$props = {
            GoodsListC: {
                "xmlns:v-bind": "",
                "v-bind:goodsList.sync": "goodsList",
                "v-bind:clickItemHandler.once": "clickHandler",
                "v-bind:redirect.once": "redirect"
            },
            LoadingMore: {
                "v-bind:loadStatus.sync": "loadStatus"
            }
        }, a.$events = {}, a.components = {
            PageFrame: _PageFrame2.default,
            GoodsListC: _GoodsListC2.default,
            LoadingMore: _LoadingMore2.default
        }, a.data = {
            showPage: !1,
            popMask: !1,
            redirect: !0,
            initCate: "",
            currentCate: "",
            keyword: "",
            goodsList: [],
            scrollTop: "",
            loadStatus: "idle",
            pageType: ""
        }, a.methods = {
            loadMore: function() {
                "loading" != this.loadStatus && "noMore" != this.loadStatus && ("search" === this.pageType ? this.loadGoods(this.pageNum + 1, !0) : this.loadGoods(this.pageNum + 1));
            },
            backTopHandler: function() {
                this.backTop();
            }
        }, r = o, _possibleConstructorReturn(a, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "reset",
        value: function() {
            this.initCate = "", this.keyword = "", this.goodsList = [], this.showPage = !1, 
            this.$apply();
        }
    }, {
        key: "onUnload",
        value: function() {
            this.reset(), _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "onUnload", this) && _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "onUnload", this).call(this);
        }
    }, {
        key: "clickHandler",
        value: function(e) {
            this.$log("goodcard" + e);
        }
    }, {
        key: "backTop",
        value: function() {
            this.setData({
                scrollTop: 0
            });
        }
    }, {
        key: "formatListData",
        value: function(e) {
            e.map(function(e) {
                e.pic = _adjustPic2.default.handleSingle(e.pic, 335, 335);
            });
        }
    }, {
        key: "loadGoods",
        value: function(e, t) {
            var o = this;
            this.$root.$parent.globalData;
            this.loadStatus = "loading";
            var a = {
                pageStart: e,
                pageSize: 20
            };
            this.$http({
                url: "https://app.zhuanzhuan.com/zz/transfer/recommendbyuser",
                data: a,
                method: "GET",
                header: {
                    cookie: "v=3.3;tk=wechatapp;"
                },
                success: function(t) {
                    if (0 != t.data.respCode) return o.$toast({
                        title: t.data.errMsg || "对不起，没有合适的数据~",
                        type: "fail",
                        duration: 2e3
                    }), o.loadStatus = "failed", void o.$apply();
                    var a = t.data.respData.infos;
                    a && a.length > 0 ? (o.formatListData(a), o.goodsList = 1 == e ? a : o.goodsList.concat(a), 
                    o.showPage = !0, o.$apply(), o.pageNum = e, 1 == e && o.setData({
                        scrollTop: 0
                    }), o.loadStatus = "idle", o.$apply()) : (o.loadStatus = "noMore", o.$apply());
                },
                fail: function() {
                    o.loadStatus = "failed", o.$apply();
                }
            });
        }
    }, {
        key: "pageShow",
        value: function() {
            console.log("pageShow");
        }
    }, {
        key: "onLoad",
        value: function(e) {
            this.reset(), e.cate && (this.initCate = e.cate, this.currentCate = e.cate), e.keyword ? (this.keyword = e.keyword, 
            this.pageType = "search") : this.pageType = "category", this.$log("VIEW"), this.goodsList = [], 
            this.loadGoods(1, !1);
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(moreC, "pages/list/moreC"));