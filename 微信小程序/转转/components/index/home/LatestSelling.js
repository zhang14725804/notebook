function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function r(o, i) {
                try {
                    var a = t[o](i), u = a.value;
                } catch (e) {
                    return void n(e);
                }
                if (!a.done) return Promise.resolve(u).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(u);
            }
            return r("next");
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

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _adjustPic = require("./../../../lib/adjustPic.js"), _adjustPic2 = _interopRequireDefault(_adjustPic), _routeParams = require("./../../../store/routeParams.js"), _routeParams2 = _interopRequireDefault(_routeParams), _Title = require("./Title.js"), _Title2 = _interopRequireDefault(_Title), _Marquee = require("./../../common/Marquee.js"), _Marquee2 = _interopRequireDefault(_Marquee), isArray = function(e) {
    return "object" === (void 0 === e ? "undefined" : _typeof(e)) && "[object Array]" === Object.prototype.toString.call(e);
}, _default = function(e) {
    function t() {
        var e, n, r, o;
        _classCallCheck(this, t);
        for (var i = arguments.length, a = Array(i), u = 0; u < i; u++) a[u] = arguments[u];
        return n = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        r.props = [ "dataObj" ], r.data = {
            list: [ 1, 2, 3 ]
        }, r.methods = {
            onClick: function() {
                this.$wxPromise.navigateTo({
                    url: "/subPages/recentSold/recentSold"
                });
            },
            goDetail: function(e) {
                this.$log("NOWSOLDGOODSLISTCLK"), this.$wxPromise.navigateTo({
                    url: "/subPages/trade/detail/detail?infoId=" + e.infoId + "&metric=" + e.metric
                });
            }
        }, r.computed = {
            title: function() {
                return this.dataObj && this.dataObj.title;
            }
        }, r.$repeat = {}, r.$props = {
            Marquee: {
                "xmlns:v-bind": "",
                "v-bind:list.sync": "list"
            }
        }, r.$events = {}, r.components = {
            Marquee: _Marquee2.default
        }, r.watch = {
            dataObj: function(e) {
                e && e.showInfo ? (this.list = this.formattedGoods(e.showInfo), this.$apply()) : this.getDealData();
            }
        }, r.events = {
            pageShow: function() {}
        }, o = n, _possibleConstructorReturn(r, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {}
    }, {
        key: "getLocationInfo",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.isLocationOpen();

                      case 2:
                        if (t = e.sent) {
                            e.next = 5;
                            break;
                        }
                        return e.abrupt("return", Promise.resolve(void 0));

                      case 5:
                        return e.abrupt("return", this.getLocation());

                      case 6:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "isLocationOpen",
        value: function() {
            return new Promise(function(e, t) {
                wx.getSetting || e(!1), wx.getSetting({
                    success: function(t) {
                        e(t.authSetting["scope.userLocation"]);
                    },
                    fail: function() {
                        e(!1);
                    }
                });
            });
        }
    }, {
        key: "getLocation",
        value: function() {
            return new Promise(function(e, t) {
                wx.getLocation({
                    type: "gcj02",
                    success: function(t) {
                        e(t.longitude + "|" + t.latitude);
                    },
                    fail: function() {
                        e(void 0);
                    }
                });
            });
        }
    }, {
        key: "getDealData",
        value: function() {
            var e = this;
            this.$http({
                url: "https://app.zhuanzhuan.com/zz/transfer/homepagesellidle",
                success: function(t) {
                    if (0 != t.data.respCode) return void e.$toast({
                        title: t.data.errMsg || "对不起，没有合适的数据~",
                        type: "fail",
                        duration: 2e3
                    });
                    var n = t.data.respData.guide.showInfo;
                    e.list = e.formattedGoods(n), e.$apply();
                },
                fail: function(t) {
                    e.$toast({
                        title: "网络异常，请稍后重试~",
                        type: "fail",
                        duration: 2e3
                    });
                },
                complete: function() {
                    e.isLoading = !1, wx.hideLoading(), e.$apply();
                }
            });
        }
    }, {
        key: "formattedGoods",
        value: function(e) {
            return e.map(function(e, t) {
                var n = e.desc.split(" ");
                return e.userName = n[1], e.pic = _adjustPic2.default.handleSingle(e.userHead, 228, 228), 
                e.title = n[2], e.dealPrice = "赚到￥" + e.price, e;
            });
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = _default;