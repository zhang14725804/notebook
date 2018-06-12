function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            function a(n, s) {
                try {
                    var i = t[n](s), o = i.value;
                } catch (e) {
                    return void r(e);
                }
                if (!i.done) return Promise.resolve(o).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(o);
            }
            return a("next");
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
        for (var r = 0; r < t.length; r++) {
            var a = t[r];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, r, a) {
        return r && e(t.prototype, r), a && e(t, a), t;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _routeParams = require("./../store/routeParams.js"), _routeParams2 = _interopRequireDefault(_routeParams), _wxPromise = require("./../lib/wxPromise.js"), ChooseCategory = function(e) {
    function t() {
        var e, r, a, n;
        _classCallCheck(this, t);
        for (var s = arguments.length, i = Array(s), o = 0; o < s; o++) i[o] = arguments[o];
        return r = a = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(i))), 
        a.props = [ "cateList", "showFirstCate", "actType" ], a.data = {
            firstCateScrollInto: "",
            secondCateScrollInto: "",
            subCateList: [],
            thirdCateList: [],
            showSecond: !1,
            showThird: !1,
            thirdSeclectedCate: "",
            selectedId: "",
            subSelectedId: "",
            activeFirstCate: null,
            activeSubCate: null,
            activeThirdCate: null
        }, a.methods = {
            maskTouchMove: function(e) {
                return !1;
            },
            selectSubCate: function(e) {
                this.getSubCate({
                    cateId: e.currentTarget.dataset.id,
                    cateName: e.currentTarget.dataset.catename
                });
            },
            selectThirdCate: function(e) {
                this.getThirdCate({
                    cateId: e.currentTarget.dataset.id,
                    cateName: e.currentTarget.dataset.catename
                });
            },
            selectTargetCate: function(e) {
                this.getTargetCate({
                    cateId: e.currentTarget.dataset.id,
                    cateName: e.currentTarget.dataset.catename
                });
            }
        }, n = r, _possibleConstructorReturn(a, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "getSubCate",
        value: function() {
            function e(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t) {
                var r, a = t.cateId, n = t.cateName;
                t.suggestOnly;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (a && !n && (n = this.cateList.find(function(e) {
                            return e.cateId == a;
                        }).cateName), this.subSelectedId = null, this.thirdSeclectedCate = null, this.thirdCateList = [], 
                        a != this.selectedId) {
                            e.next = 6;
                            break;
                        }
                        return e.abrupt("return");

                      case 6:
                        return this.selectedId = a, this.activeFirstCate = n, e.next = 10, this.$http({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getChildCatesLogic?cateId=" + a
                        });

                      case 10:
                        r = e.sent, 0 == r.respCode && (this.subCateList = r.respData, this.showSecond = !0, 
                        this.$apply());

                      case 12:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "getThirdCate",
        value: function() {
            function e(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t) {
                var r, a, n = t.cateId, s = t.cateName, i = t.suggestOnly, o = void 0 !== i && i;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return n && !s && (s = this.subCateList.find(function(e) {
                            return e.cateId == n;
                        }).cateName), this.thirdCateList = [], this.thirdSeclectedCate = null, this.subSelectedId = n, 
                        this.activeSubCate = s, e.next = 7, this.$http({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getChildCatesLogic?cateId=" + n
                        });

                      case 7:
                        r = e.sent, 0 == r.respCode ? r.respData.length > 0 ? (this.thirdCateList = r.respData, 
                        this.showThird = !0, this.$apply()) : o || (a = this.activeSubCate, this.finishSelect({
                            postCateName: a,
                            cateId: n
                        })) : console.debug(r.errMsg, 4444444);

                      case 9:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "getTargetCate",
        value: function(e) {
            var t = e.cateId, r = e.cateName, a = e.suggestOnly, n = void 0 !== a && a;
            t && !r && (r = this.thirdCateList.find(function(e) {
                return e.cateId == t;
            }).cateName), this.thirdSeclectedCate = "", this.thirdSeclectedCate = t, this.activeThirdCate = r;
            var s = this.activeSubCate + " " + this.activeThirdCate;
            n || this.finishSelect({
                postCateName: s,
                cateId: t
            }), this.$apply();
        }
    }, {
        key: "finishSelect",
        value: function(e) {
            "back" == this.actType && (_routeParams2.default.setBackFromData(e, this.$wxpage.__route__), 
            _wxPromise.wxPromise.navigateBack()), "redirectToPost" == this.actType && (_routeParams2.default.setOpenFromData(e, this.$wxpage.__route__), 
            _wxPromise.wxPromise.redirectTo({
                url: "/pages/post/post?dataFlow=forward"
            }));
        }
    }, {
        key: "selectCate",
        value: function() {
            function e(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t) {
                var r = t.cateId;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (r = String(r), !(r.length > 1)) {
                            e.next = 4;
                            break;
                        }
                        return e.next = 4, this.getSubCate({
                            cateId: r.length <= 3 ? r : r.substring(1, 4),
                            suggestOnly: !0
                        });

                      case 4:
                        if (!(r.length > 3)) {
                            e.next = 7;
                            break;
                        }
                        return e.next = 7, this.getThirdCate({
                            cateId: r.substring(0, 7),
                            suggestOnly: !0
                        });

                      case 7:
                        if (!(r.length > 7)) {
                            e.next = 10;
                            break;
                        }
                        return e.next = 10, this.getTargetCate({
                            cateId: r,
                            suggestOnly: !0
                        });

                      case 10:
                        this.firstCateScrollInto = "cate" + this.selectedId, this.secondCateScrollInto = "subCate" + this.subSelectedId, 
                        this.$apply();

                      case 13:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    } ]), t;
}(_wepy2.default.component);

exports.default = ChooseCategory;