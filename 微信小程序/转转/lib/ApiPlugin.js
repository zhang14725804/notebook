function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var n = e.apply(this, arguments);
        return new Promise(function(e, r) {
            function t(o, i) {
                try {
                    var u = n[o](i), a = u.value;
                } catch (e) {
                    return void r(e);
                }
                if (!u.done) return Promise.resolve(a).then(function(e) {
                    t("next", e);
                }, function(e) {
                    t("throw", e);
                });
                e(a);
            }
            return t("next");
        });
    };
}

function _classCallCheck(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _createClass = function() {
    function e(e, n) {
        for (var r = 0; r < n.length; r++) {
            var t = n[r];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(n, r, t) {
        return r && e(n.prototype, r), t && e(n, t), n;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _ZZLogin = require("./ZZLogin.js"), _ZZLogin2 = _interopRequireDefault(_ZZLogin), ApiPlugin = function() {
    function e() {
        _classCallCheck(this, e);
    }
    return _createClass(e, null, [ {
        key: "config",
        value: function(n) {
            Object.assign(e._config, n);
        }
    }, {
        key: "install",
        value: function(n) {
            if (n && e.config(n), !e._config.source) return void console.error('[ApiPlugin install failed] "source" must be provided, shall call ApiPlugin.config first');
            for (var r in e._config.installProps) _wepy2.default.component.prototype[r] = e[e._config.installProps[r]];
        }
    }, {
        key: "saveFormId",
        value: function() {
            function n(e) {
                return r.apply(this, arguments);
            }
            var r = _asyncToGenerator(regeneratorRuntime.mark(function n(r) {
                var t, o = r.formId;
                return regeneratorRuntime.wrap(function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        return n.next = 2, _ZZLogin2.default.checkLogin();

                      case 2:
                        if (n.sent) {
                            n.next = 4;
                            break;
                        }
                        return n.abrupt("return");

                      case 4:
                        return n.next = 6, _ZZLogin2.default.requestWithLogin({
                            url: "https://app.zhuanzhuan.com/zzopen/zzwxpush/addFormId",
                            data: {
                                uid: _ZZLogin2.default.zzUserInfo.uid,
                                formId: o,
                                source: e._config.source,
                                addTime: Date.now()
                            }
                        });

                      case 6:
                        t = n.sent, "object" === (void 0 === t ? "undefined" : _typeof(t)) && 0 != t.respCode && console.warn("[保存formId失败] 接口返回失败结果：", t, "formId:", o);

                      case 8:
                      case "end":
                        return n.stop();
                    }
                }, n, this);
            }));
            return n;
        }()
    } ]), e;
}();

ApiPlugin._config = {
    source: "",
    installProps: {
        $saveFormId: "saveFormId"
    }
}, exports.default = ApiPlugin;