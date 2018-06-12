function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            function n(a, o) {
                try {
                    var i = t[a](o), s = i.value;
                } catch (e) {
                    return void r(e);
                }
                if (!i.done) return Promise.resolve(s).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(s);
            }
            return n("next");
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

function _applyDecoratedDescriptor(e, t, r, n, a) {
    var o = {};
    return Object.keys(n).forEach(function(e) {
        o[e] = n[e];
    }), o.enumerable = !!o.enumerable, o.configurable = !!o.configurable, ("value" in o || o.initializer) && (o.writable = !0), 
    o = r.slice().reverse().reduce(function(r, n) {
        return n(e, t, r) || r;
    }, o), a && void 0 !== o.initializer && (o.value = o.initializer ? o.initializer.call(a) : void 0, 
    o.initializer = void 0), void 0 === o.initializer && (Object.defineProperty(e, t, o), 
    o = null), o;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _createClass = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), _dec, _desc, _value, _class, _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _SectionHeader = require("./SectionHeader.js"), _SectionHeader2 = _interopRequireDefault(_SectionHeader), _decorators = require("./../../../lib/decorators.js"), _wxPromise = require("./../../../lib/wxPromise.js"), _default = (_dec = (0, 
_decorators.withErrToast)({
    defaultMsg: "获取推荐失败"
}), _class = function(e) {
    function t() {
        var e, r, n, a, o = this;
        _classCallCheck(this, t);
        for (var i = arguments.length, s = Array(i), c = 0; c < i; c++) s[c] = arguments[c];
        return r = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(s))), 
        n.props = {}, n.data = {
            header: {
                title: "为你推荐",
                meta: "换一批",
                metaIcon: {
                    src: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/category/icons/refresh.png",
                    style: "width: 24rpx; height: 20rpx; margin-left: 8rpx"
                }
            },
            allCates: [],
            pageOffset: 0,
            pageSize: 4
        }, n.computed = {
            pageCates: function() {
                return this.allCates.slice(this.pageOffset, this.pageOffset + this.pageSize);
            }
        }, n.methods = {
            onCate: function(e) {
                var t = this.pageCates[e], r = t.jumpUrl.match(/[?&]cateId=([^&$]*)/)[1];
                _wxPromise.wxPromise.navigateTo({
                    url: "/pages/list/list?cate=" + r
                }), this.$log("SUGGOODCLICK");
            }
        }, n.onHeaderMeta = _asyncToGenerator(regeneratorRuntime.mark(function e() {
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    n.pageOffset = (n.pageOffset + n.pageSize) % n.allCates.length, n.$apply(), n.$log("CHANGECLICK");

                  case 3:
                  case "end":
                    return e.stop();
                }
            }, e, o);
        })), n.$repeat = {}, n.$props = {
            SectionHeader: {
                "xmlns:v-bind": "",
                "v-bind:header.sync": "header",
                "v-bind:metaHandler.sync": "onHeaderMeta"
            }
        }, n.$events = {}, n.components = {
            SectionHeader: _SectionHeader2.default
        }, a = r, _possibleConstructorReturn(n, a);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "pullData",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getrecommendsecondcateicons"
                        });

                      case 2:
                        if (t = e.sent, 0 == t.respCode) {
                            e.next = 5;
                            break;
                        }
                        return e.abrupt("return");

                      case 5:
                        return this.header.title = t.respData.titleDesc, this.allCates = t.respData.cateList, 
                        this.pageOffset = 0, this.$apply(), e.abrupt("return", "ok");

                      case 10:
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
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        this.pullData();

                      case 1:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    } ]), t;
}(_wepy2.default.component), _applyDecoratedDescriptor(_class.prototype, "pullData", [ _dec ], Object.getOwnPropertyDescriptor(_class.prototype, "pullData"), _class.prototype), 
_class);

exports.default = _default;