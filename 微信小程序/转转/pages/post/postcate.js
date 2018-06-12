function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            function n(o, a) {
                try {
                    var s = t[o](a), i = s.value;
                } catch (e) {
                    return void r(e);
                }
                if (!s.done) return Promise.resolve(i).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(i);
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

Object.defineProperty(exports, "__esModule", {
    value: !0
});

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
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _ChooseCategory = require("./../../components/ChooseCategory.js"), _ChooseCategory2 = _interopRequireDefault(_ChooseCategory), _PageFrame = require("./../../components/common/PageFrame.js"), _PageFrame2 = _interopRequireDefault(_PageFrame), postcate = function(e) {
    function t() {
        var e, r, n, o;
        _classCallCheck(this, t);
        for (var a = arguments.length, s = Array(a), i = 0; i < a; i++) s[i] = arguments[i];
        return r = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(s))), 
        n.config = {
            navigationBarTitleText: "宝贝分类"
        }, n.data = {
            cateList: [],
            showFirstCate: !1,
            actType: "back"
        }, n.$repeat = {}, n.$props = {
            chooseCategory: {
                "xmlns:v-bind": "",
                "v-bind:cateList.sync": "cateList",
                "v-bind:showFirstCate.sync": "showFirstCate",
                "v-bind:actType.sync": "actType"
            }
        }, n.$events = {}, n.components = {
            PageFrame: _PageFrame2.default,
            chooseCategory: _ChooseCategory2.default
        }, o = r, _possibleConstructorReturn(n, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {
            function e(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t) {
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return this.actType = t.actType || this.actType, e.next = 3, this.getCateInfo("0");

                      case 3:
                        t.cateId && this.$invoke("chooseCategory", "selectCate", {
                            cateId: t.cateId
                        });

                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "getCateInfo",
        value: function() {
            function e(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t) {
                var r, n, o;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.$http({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getChildCatesLogic?cateId=" + t
                        });

                      case 2:
                        r = e.sent, n = "-1", 0 == r.respCode && (o = r.respData, o.find(function(e, t) {
                            if (e && "游戏交易" == e.cateName) return n = t, void o.splice(n, 1);
                        }), this.cateList = o, this.showFirstCate = !0, this.$apply());

                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(postcate, "pages/post/postcate"));