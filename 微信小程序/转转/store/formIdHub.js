function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var r = 0, t = Array(e.length); r < e.length; r++) t[r] = e[r];
        return t;
    }
    return Array.from(e);
}

function _asyncToGenerator(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function n(i, o) {
                try {
                    var s = r[i](o), a = s.value;
                } catch (e) {
                    return void t(e);
                }
                if (!s.done) return Promise.resolve(a).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(a);
            }
            return n("next");
        });
    };
}

function _classCallCheck(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function _applyDecoratedDescriptor(e, r, t, n, i) {
    var o = {};
    return Object.keys(n).forEach(function(e) {
        o[e] = n[e];
    }), o.enumerable = !!o.enumerable, o.configurable = !!o.configurable, ("value" in o || o.initializer) && (o.writable = !0), 
    o = t.slice().reverse().reduce(function(t, n) {
        return n(e, r, t) || t;
    }, o), i && void 0 !== o.initializer && (o.value = o.initializer ? o.initializer.call(i) : void 0, 
    o.initializer = void 0), void 0 === o.initializer && (Object.defineProperty(e, r, o), 
    o = null), o;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var n = r[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(r, t, n) {
        return t && e(r.prototype, t), n && e(r, n), r;
    };
}(), _desc, _value, _class, _decorators = require("./../lib/decorators.js"), _ZZLogin = require("./../lib/ZZLogin.js"), _ZZLogin2 = _interopRequireDefault(_ZZLogin), FormIdHub = (_class = function() {
    function e(r) {
        _classCallCheck(this, e), this._formIds = [], this._flushingIds = [], this._config = {
            source: 103,
            flushThresh: 30
        }, Object.assign(this._config, r);
    }
    return _createClass(e, [ {
        key: "save",
        value: function(e) {
            this._formIds.push({
                formId: e,
                addTime: Date.now()
            }), this._config.flushThresh > 0 && this._formIds.length >= this._config.flushThresh && this.flush();
        }
    }, {
        key: "flush",
        value: function() {
            function e() {
                return r.apply(this, arguments);
            }
            var r = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var r, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = t.aggressive, i = void 0 !== n && n;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, _ZZLogin2.default.checkLogin();

                      case 2:
                        if (e.sent) {
                            e.next = 9;
                            break;
                        }
                        if (i) {
                            e.next = 7;
                            break;
                        }
                        return e.abrupt("return", {
                            code: -1,
                            errMsg: "not login"
                        });

                      case 7:
                        return e.next = 9, _ZZLogin2.default.login();

                      case 9:
                        if (0 != this._formIds.length) {
                            e.next = 11;
                            break;
                        }
                        return e.abrupt("return", {
                            code: -2,
                            errMsg: "no formId left"
                        });

                      case 11:
                        return this._flushingIds = this._formIds, this._formIds = [], e.next = 15, _ZZLogin2.default.requestWithLogin({
                            url: "https://app.zhuanzhuan.com/zzopen/zzwxpush/addFormIds",
                            method: "POST",
                            data: {
                                uid: _ZZLogin2.default.zzUserInfo.uid,
                                source: this._config.source,
                                formIds: this._flushingIds
                            }
                        });

                      case 15:
                        if (r = e.sent, 0 == r.respCode) {
                            e.next = 21;
                            break;
                        }
                        return console.error("[上报formId失败] 接口返回失败结果：", r, "formIds", this._flushingIds), 
                        this._formIds = [].concat(_toConsumableArray(this._flushingIds), _toConsumableArray(this._formIds)), 
                        this._flushingIds = [], e.abrupt("return", {
                            code: -3,
                            errMsg: "api failed"
                        });

                      case 21:
                        return this._flushingIds = [], e.abrupt("return", {
                            code: 0,
                            errMsg: "ok"
                        });

                      case 23:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    } ]), e;
}(), _applyDecoratedDescriptor(_class.prototype, "flush", [ _decorators.noConcurrent ], Object.getOwnPropertyDescriptor(_class.prototype, "flush"), _class.prototype), 
_class);

exports.default = new FormIdHub();