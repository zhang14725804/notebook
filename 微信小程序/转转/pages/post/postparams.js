function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            function a(n, o) {
                try {
                    var s = t[n](o), i = s.value;
                } catch (e) {
                    return void r(e);
                }
                if (!s.done) return Promise.resolve(i).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(i);
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

function _applyDecoratedDescriptor(e, t, r, a, n) {
    var o = {};
    return Object.keys(a).forEach(function(e) {
        o[e] = a[e];
    }), o.enumerable = !!o.enumerable, o.configurable = !!o.configurable, ("value" in o || o.initializer) && (o.writable = !0), 
    o = r.slice().reverse().reduce(function(r, a) {
        return a(e, t, r) || r;
    }, o), n && void 0 !== o.initializer && (o.value = o.initializer ? o.initializer.call(n) : void 0, 
    o.initializer = void 0), void 0 === o.initializer && (Object.defineProperty(e, t, o), 
    o = null), o;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

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
}(), _dec, _dec2, _dec3, _dec4, _desc, _value, _class, _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _decorators = require("./../../lib/decorators.js"), _postParams = require("./../../store/postParams.js"), _postParams2 = _interopRequireDefault(_postParams), _wxPromise = require("./../../lib/wxPromise.js"), _PageFrame = require("./../../components/common/PageFrame.js"), _PageFrame2 = _interopRequireDefault(_PageFrame), _default = (_dec = (0, 
_decorators.typeCheck)("array"), _dec2 = (0, _decorators.withErrToast)({
    defaultMsg: "获取数据失败"
}), _dec3 = (0, _decorators.typeCheck)("array", "object"), _dec4 = (0, _decorators.typeCheck)("array", "object", "string|number"), 
_class = function(e) {
    function t() {
        var e, r, a, n, o;
        _classCallCheck(this, t);
        for (var s = arguments.length, i = Array(s), c = 0; c < s; c++) i[c] = arguments[c];
        return a = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(i))), 
        n.config = {
            navigationBarTitleText: "基本参数",
            backgroundColor: "#F2F3F6"
        }, n.components = {
            PageFrame: _PageFrame2.default
        }, n.data = {
            options: {
                cateId: ""
            },
            paramsCorrect: [ {
                groupName: "必填项",
                list: [],
                tipText: ""
            }, {
                groupName: "选填项",
                list: [],
                tipText: "填写越详细，卖的越快哦"
            } ],
            ableClick: !1
        }, n.methods = (r = {
            selectedValue: function() {
                function e(e, r, a) {
                    return t.apply(this, arguments);
                }
                var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t, r, a) {
                    var n, o, s, i = this;
                    return regeneratorRuntime.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return n = function(e) {
                                switch (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "paramValue") {
                                  case "paramValue":
                                    return i.paramsCorrect[e].list[t].paramValues[r];

                                  case "paramValues":
                                    return i.paramsCorrect[e].list[t].paramValues;

                                  default:
                                    return;
                                }
                            }, o = function(e) {
                                a.paramSelectMaxNum <= 1 ? i._single(n(e, "paramValues"), n(e)) : i._multiple(n(e, "paramValues"), n(e), a.paramSelectMaxNum);
                            }, o(a.necessary ? 0 : 1), e.next = 5, this._checkParams();

                          case 5:
                            s = e.sent, this.ableClick = "ok" === s, this.$apply();

                          case 8:
                          case "end":
                            return e.stop();
                        }
                    }, e, this);
                }));
                return e;
            }(),
            selectedTap: function() {
                function e() {
                    return t.apply(this, arguments);
                }
                var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                    var t, r;
                    return regeneratorRuntime.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return e.next = 2, this._checkParams();

                          case 2:
                            if ("ok" === (t = e.sent)) {
                                e.next = 6;
                                break;
                            }
                            return this.$toast({
                                title: t,
                                type: "fail"
                            }), e.abrupt("return");

                          case 6:
                            r = this._sortParameters(), _postParams2.default.params = r, _wxPromise.wxPromise.navigateBack();

                          case 10:
                          case "end":
                            return e.stop();
                        }
                    }, e, this);
                }));
                return e;
            }()
        }, _applyDecoratedDescriptor(r, "selectedTap", [ _decorators.noConcurrent ], Object.getOwnPropertyDescriptor(r, "selectedTap"), r), 
        r), o = a, _possibleConstructorReturn(n, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "filterParamsList",
        value: function() {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = e.length; t--; ) e[t].necessary ? this.paramsCorrect[0].list.push(e[t]) : this.paramsCorrect[1].list.push(e[t]);
            this.$apply();
        }
    }, {
        key: "getCateParams",
        value: function(e) {
            return this.$http({
                url: "https://app.zhuanzhuan.com/zzopen/miniapp/cateParams",
                data: {
                    cateId: e
                }
            });
        }
    }, {
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
                        return e.next = 2, this.getCateParams(this.options.cateId);

                      case 2:
                        if (t = e.sent, 0 == t.respCode) {
                            e.next = 5;
                            break;
                        }
                        return e.abrupt("return", t.respMsg);

                      case 5:
                        return this.filterParamsList(t.respData.params), _postParams2.default.cateId = this.options.cateId, 
                        e.abrupt("return", "ok");

                      case 8:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "_toggle",
        value: function(e) {
            e.selected = !e.selected, this.$apply();
        }
    }, {
        key: "_single",
        value: function(e, t) {
            for (var r = e.length; r--; ) t.valueId !== e[r].valueId && (e[r].selected = !1);
            this._toggle(t);
        }
    }, {
        key: "_multiple",
        value: function(e, t, r) {
            var a = e.length, n = 0, o = parseInt(r);
            for (this._toggle(t); a--; ) e[a].selected && n++, n > o && this._toggle(t);
        }
    }, {
        key: "_checkParams",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, r, a, n, o;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        o = function(e) {
                            for (var t = 0; t < e.length; t++) if (e[t].selected) return !0;
                            return !1;
                        }, t = this.paramsCorrect[0].list, r = t.length, a = 0;

                      case 4:
                        if (!(a < r)) {
                            e.next = 11;
                            break;
                        }
                        if (n = t[a].paramValues, o(n)) {
                            e.next = 8;
                            break;
                        }
                        return e.abrupt("return", "请填写" + t[a].paramText);

                      case 8:
                        a++, e.next = 4;
                        break;

                      case 11:
                        return e.abrupt("return", "ok");

                      case 12:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "_sortParameters",
        value: function() {
            return this.paramsCorrect.map(function(e) {
                return e.list.map(function(e) {
                    return {
                        paramId: e.paramId,
                        valueId: e.paramValues.filter(function(e) {
                            return e.selected;
                        }).map(function(e) {
                            return e.valueId;
                        }).join("|"),
                        valueName: e.paramValues.filter(function(e) {
                            return e.selected;
                        }).map(function(e) {
                            return e.valueText;
                        }).join(".")
                    };
                });
            });
        }
    }, {
        key: "onLoad",
        value: function(e) {
            this.options = e, this.cateId = e.cateId, this.pullData(), this.$apply();
        }
    } ]), t;
}(_wepy2.default.page), _applyDecoratedDescriptor(_class.prototype, "filterParamsList", [ _dec ], Object.getOwnPropertyDescriptor(_class.prototype, "filterParamsList"), _class.prototype), 
_applyDecoratedDescriptor(_class.prototype, "pullData", [ _dec2 ], Object.getOwnPropertyDescriptor(_class.prototype, "pullData"), _class.prototype), 
_applyDecoratedDescriptor(_class.prototype, "_single", [ _dec3 ], Object.getOwnPropertyDescriptor(_class.prototype, "_single"), _class.prototype), 
_applyDecoratedDescriptor(_class.prototype, "_multiple", [ _dec4 ], Object.getOwnPropertyDescriptor(_class.prototype, "_multiple"), _class.prototype), 
_class);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(_default, "pages/post/postparams"));