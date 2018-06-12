function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            function o(n, i) {
                try {
                    var a = t[n](i), s = a.value;
                } catch (e) {
                    return void r(e);
                }
                if (!a.done) return Promise.resolve(s).then(function(e) {
                    o("next", e);
                }, function(e) {
                    o("throw", e);
                });
                e(s);
            }
            return o("next");
        });
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

function _applyDecoratedDescriptor(e, t, r, o, n) {
    var i = {};
    return Object.keys(o).forEach(function(e) {
        i[e] = o[e];
    }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), 
    i = r.slice().reverse().reduce(function(r, o) {
        return o(e, t, r) || r;
    }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, 
    i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), 
    i = null), i;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _createClass = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t;
    };
}(), _desc, _value, _class, _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _SectionHeader = require("./SectionHeader.js"), _SectionHeader2 = _interopRequireDefault(_SectionHeader), _LoadingMore = require("./../../../components/LoadingMore.js"), _LoadingMore2 = _interopRequireDefault(_LoadingMore), _decorators = require("./../../../lib/decorators.js"), _handleImg = require("./../../../lib/handleImg.js"), _handleImg2 = _interopRequireDefault(_handleImg), _wxPromise = require("./../../../lib/wxPromise.js"), _funcKit = require("./../../../lib/funcKit.js"), _default = (_class = function(e) {
    function t() {
        var e, r, o, n;
        _classCallCheck(this, t);
        for (var i = arguments.length, a = Array(i), s = 0; s < i; s++) a[s] = arguments[s];
        return r = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        o.props = {}, o.data = {
            header: {
                title: "更多推荐"
            },
            goods: [],
            pageNum: 1,
            tabType: 5,
            requestmark: 0,
            loadStatus: "idle",
            labelHeight: 30
        }, o.computed = {}, o.methods = {
            onGood: function(e) {
                var t = this.goods[e];
                _wxPromise.wxPromise.navigateTo({
                    url: "/subPages/trade/detail/detail?infoId=" + t.infoId + "&metric=" + t.metric
                }), this.$log("GOODSCLICK");
            }
        }, o.$repeat = {}, o.$props = {
            SectionHeader: {
                "xmlns:v-bind": "",
                "v-bind:header.sync": "header"
            },
            LoadingMore: {
                "v-bind:loadStatus.sync": "loadStatus"
            }
        }, o.$events = {}, o.components = {
            SectionHeader: _SectionHeader2.default,
            LoadingMore: _LoadingMore2.default
        }, n = r, _possibleConstructorReturn(o, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "formatData",
        value: function(e) {
            var t = this, r = e.tabs[0], o = r.items[0].goods || [];
            return o = o.map(function(e) {
                return {
                    avatar: _handleImg2.default.handleSingle(e.avatar, 36, 36),
                    nickName: e.nickName,
                    area: e.area,
                    metric: e.metric,
                    infoId: e.infoId,
                    pic: _handleImg2.default.handleSingle(e.picUrl, 228, 228),
                    price: e.price,
                    title: e.title,
                    infoLabels: (0, _funcKit.fulfillInfoLabels)(e.labels.infoLabels).map(function(e) {
                        return e.width = parseInt(e.width) / parseInt(e.height) * t.labelHeight, e.height = t.labelHeight, 
                        e;
                    })
                };
            }), {
                goods: o,
                title: r.title
            };
        }
    }, {
        key: "pullMoreGoods",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, r, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = o.reset, i = void 0 !== n && n;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return (i || 1 == this.pageNum) && (this.pageNum = 1, this.requestmark = Date.now(), 
                        this.goods = []), this.loadStatus = "loading", this.$apply(), e.next = 5, this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getcustomizedguide",
                            data: {
                                pageNum: this.pageNum,
                                tabType: this.tabType,
                                requestmark: this.requestmark
                            }
                        });

                      case 5:
                        if (t = e.sent, 0 == t.respCode) {
                            e.next = 10;
                            break;
                        }
                        return this.loadStatus = "failed", this.$apply(), e.abrupt("return");

                      case 10:
                        if (r = this.formatData(t.respData), 0 != r.goods.length) {
                            e.next = 15;
                            break;
                        }
                        return this.loadStatus = "noMore", this.$apply(), e.abrupt("return");

                      case 15:
                        this.goods = this.goods.concat(r.goods), this.loadStatus = "idle", this.pageNum++, 
                        this.$apply();

                      case 19:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "onLoad",
        value: function() {
            this.pullMoreGoods({
                reset: !0
            });
        }
    } ]), t;
}(_wepy2.default.component), _applyDecoratedDescriptor(_class.prototype, "pullMoreGoods", [ _decorators.noConcurrent ], Object.getOwnPropertyDescriptor(_class.prototype, "pullMoreGoods"), _class.prototype), 
_class);

exports.default = _default;