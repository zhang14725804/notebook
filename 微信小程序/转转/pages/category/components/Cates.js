function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var n = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function c(r, a) {
                try {
                    var u = n[r](a), o = u.value;
                } catch (e) {
                    return void t(e);
                }
                if (!u.done) return Promise.resolve(o).then(function(e) {
                    c("next", e);
                }, function(e) {
                    c("throw", e);
                });
                e(o);
            }
            return c("next");
        });
    };
}

function _classCallCheck(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, n) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !n || "object" != typeof n && "function" != typeof n ? e : n;
}

function _inherits(e, n) {
    if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + typeof n);
    e.prototype = Object.create(n && n.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
}

function _applyDecoratedDescriptor(e, n, t, c, r) {
    var a = {};
    return Object.keys(c).forEach(function(e) {
        a[e] = c[e];
    }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), 
    a = t.slice().reverse().reduce(function(t, c) {
        return c(e, n, t) || t;
    }, a), r && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(r) : void 0, 
    a.initializer = void 0), void 0 === a.initializer && (Object.defineProperty(e, n, a), 
    a = null), a;
}

function filterCate(e) {
    var n = function() {
        for (var n = [ {
            backgroundUrl: "http://img.58cdn.com.cn/zhuanzhuan/bannericon/46284352883754575602@3x.png",
            picUrl: "http://pic1.58cdn.com.cn/zhuanzh/n_v2cf53d7ce2c324a7b962fc7ff90f94dd8.png",
            cateId: "101",
            jumpUrl: "zhuanzhuan://jump/core/searchResult/jump?searchType=1&cateId=101&searchFrom=210",
            desc: "手机"
        }, {
            backgroundUrl: "http://img.58cdn.com.cn/zhuanzhuan/bannericon/46197095640974115781@3x.png",
            picUrl: "http://pic1.58cdn.com.cn/zhuanzh/n_v2218f97c0e61d441385417b5592749db8.png",
            cateId: "109",
            jumpUrl: "zhuanzhuan://jump/core/searchResult/jump?searchType=1&cateId=109&searchFrom=210",
            desc: "母婴用品"
        }, {
            backgroundUrl: "http://img.58cdn.com.cn/zhuanzhuan/bannericon/46284352883754575602@3x.png",
            picUrl: "http://pic1.58cdn.com.cn/zhuanzh/n_v21e7e9d8d9a8f4aca87de9f67aca12267.png",
            cateId: "100",
            jumpUrl: "zhuanzhuan://jump/core/searchResult/jump?searchType=1&cateId=100&searchFrom=210",
            desc: "其他分类"
        }, {
            backgroundUrl: "http://img.58cdn.com.cn/zhuanzhuan/bannericon/46335018379562587283@3x.png",
            picUrl: "http://pic1.58cdn.com.cn/zhuanzh/n_v238f37addba944a78917419c40652404b.png",
            cateId: "111",
            jumpUrl: "zhuanzhuan://jump/core/searchResult/jump?searchType=1&cateId=111&searchFrom=210",
            desc: "服装鞋帽"
        }, {
            backgroundUrl: "http://img.58cdn.com.cn/zhuanzhuan/bannericon/46565827860465744354@3x.png",
            picUrl: "http://pic1.58cdn.com.cn/zhuanzh/n_v2d94fccfea3a648ea96f451777e75beb7.png",
            cateId: "102",
            jumpUrl: "zhuanzhuan://jump/core/searchResult/jump?searchType=1&cateId=102&searchFrom=210",
            desc: "数码"
        }, {
            backgroundUrl: "http://img.58cdn.com.cn/zhuanzhuan/bannericon/46616493356273755745@3x.png",
            picUrl: "http://pic1.58cdn.com.cn/zhuanzh/n_v235747f64d9cd429ebf9fe4b0e9f31ddf.png",
            cateId: "114",
            jumpUrl: "zhuanzhuan://jump/core/searchResult/jump?searchType=1&cateId=114&searchFrom=210",
            desc: "珠宝配饰"
        }, {
            backgroundUrl: "http://img.58cdn.com.cn/zhuanzhuan/bannericon/46565827860465744354@3x.png",
            picUrl: "http://pic1.58cdn.com.cn/zhuanzh/n_v289846f1c6df14c1a9cf71c9b9866add4.png",
            cateId: "108",
            jumpUrl: "zhuanzhuan://jump/core/searchResult/jump?searchType=1&cateId=108&searchFrom=210",
            desc: "家居家具"
        }, {
            backgroundUrl: "http://img.58cdn.com.cn/zhuanzhuan/bannericon/46616493356273755745@3x.png",
            picUrl: "http://pic1.58cdn.com.cn/zhuanzh/n_v2e68daa2cf25d41318d2fb14f4a2eb761.png",
            cateId: "104",
            jumpUrl: "zhuanzhuan://jump/core/searchResult/jump?searchType=1&cateId=104&searchFrom=210",
            desc: "办公用品"
        }, {
            backgroundUrl: "http://img.58cdn.com.cn/zhuanzhuan/bannericon/46197095640974115781@3x.png",
            picUrl: "http://pic1.58cdn.com.cn/zhuanzh/n_v25a1cdf3555aa4701a5b49a640a8d03da.png",
            cateId: "103",
            jumpUrl: "zhuanzhuan://jump/core/searchResult/jump?searchType=1&cateId=103&searchFrom=210",
            desc: "电脑"
        }, {
            backgroundUrl: "http://img.58cdn.com.cn/zhuanzhuan/bannericon/46284352883754575602@3x.png",
            picUrl: "http://pic1.58cdn.com.cn/zhuanzh/n_v26f21cdd51b0f4e1cb5a68522945b364b.png",
            cateId: "113",
            jumpUrl: "zhuanzhuan://jump/core/searchResult/jump?searchType=1&cateId=113&searchFrom=210",
            desc: "图书音像"
        } ], t = e.map(function(e) {
            return e.cateId;
        }), c = 0; c < n.length; c++) if (-1 === t.indexOf(n[c].cateId)) return n[c];
    };
    return e.map(function(e) {
        return "123" == e.cateId ? n() : e;
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _createClass = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var c = n[t];
            c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), 
            Object.defineProperty(e, c.key, c);
        }
    }
    return function(n, t, c) {
        return t && e(n.prototype, t), c && e(n, c), n;
    };
}(), _dec, _desc, _value, _class, _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _decorators = require("./../../../lib/decorators.js"), _funcKit = require("./../../../lib/funcKit.js"), _default = (_dec = (0, 
_decorators.withErrToast)({
    defaultMsg: "分类获取失败"
}), _class = function(e) {
    function n() {
        var e, t, c, r;
        _classCallCheck(this, n);
        for (var a = arguments.length, u = Array(a), o = 0; o < a; o++) u[o] = arguments[o];
        return t = c = _possibleConstructorReturn(this, (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(e, [ this ].concat(u))), 
        c.props = {}, c.data = {
            cates: []
        }, c.computed = {}, c.methods = {
            onCate: function(e) {
                var n = this.cates[e], t = {
                    0: "/pages/category/allCates",
                    123: "https://m.zhuanzhuan.com/Mzhuanzhuan/ZZOpenBusiness/index.html#/game-home/game-index"
                }, c = t[n.cateId] || "/pages/list/list?cate=" + n.cateId;
                (0, _funcKit.robustOpen)(c), this.$log("CATEGORYCLICK", null, {
                    cateid: n.cateId
                });
            }
        }, c.components = {}, r = t, _possibleConstructorReturn(c, r);
    }
    return _inherits(n, e), _createClass(n, [ {
        key: "pullData",
        value: function() {
            function e() {
                return n.apply(this, arguments);
            }
            var n = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var n;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.$http({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getcatelist",
                            data: {
                                type: 1
                            }
                        });

                      case 2:
                        if (n = e.sent, 0 == n.respCode) {
                            e.next = 5;
                            break;
                        }
                        return e.abrupt("return", n.errMsg || n.respMsg);

                      case 5:
                        return this.cates = filterCate(n.respData.iconList), this.$apply(), e.abrupt("return", "ok");

                      case 8:
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
            this.pullData();
        }
    } ]), n;
}(_wepy2.default.component), _applyDecoratedDescriptor(_class.prototype, "pullData", [ _dec ], Object.getOwnPropertyDescriptor(_class.prototype, "pullData"), _class.prototype), 
_class);

exports.default = _default;