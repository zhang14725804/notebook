function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var n = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function r(o, i) {
                try {
                    var a = n[o](i), s = a.value;
                } catch (e) {
                    return void t(e);
                }
                if (!a.done) return Promise.resolve(s).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(s);
            }
            return r("next");
        });
    };
}

function _classCallCheck(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _ZZLogin = require("./ZZLogin.js"), _ZZLogin2 = _interopRequireDefault(_ZZLogin), _wxPromise = require("./wxPromise.js"), _cookie = require("./cookie.js"), _cookie2 = _interopRequireDefault(_cookie), _appConfig = require("./appConfig.js"), _appConfig2 = _interopRequireDefault(_appConfig), MOBILE_KEY = "requireMobileCheckRes", BindMobile = function e(n) {
    var t = this;
    _classCallCheck(this, e), this.options = {
        checkLevel: "soft",
        fromLog: "",
        wepyInstance: null
    }, this.checkBind = _asyncToGenerator(regeneratorRuntime.mark(function e() {
        var n, r;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if ("soft" != t.options.checkLevel || "true" != _cookie2.default.get(MOBILE_KEY)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", !0);

              case 2:
                return e.next = 4, _ZZLogin2.default.requestWithLogin({
                    url: "https://app.zhuanzhuan.com/zzopen/mainminiapp/isuserbind"
                });

              case 4:
                return n = e.sent, r = 0 == n.respCode && n.respData.isBind, _cookie2.default.set(MOBILE_KEY, r), 
                e.abrupt("return", r);

              case 8:
              case "end":
                return e.stop();
            }
        }, e, t);
    })), this.doBind = _asyncToGenerator(regeneratorRuntime.mark(function e() {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return t.options.wepyInstance.$log("bundingtipview"), e.next = 3, t.options.wepyInstance.$invoke("DialogCommon", "asyncOpen", {
                    title: "绑定手机号",
                    content: "共建真实、安全二手交易环境\n转转承诺不会滥用您提供的信息",
                    onClose: function() {
                        return {
                            result: "fail"
                        };
                    },
                    buttons: [ {
                        text: "查看用户协议",
                        preventClose: !0,
                        clickHandler: function() {
                            _wxPromise.wxPromise.navigateTo({
                                url: "/pages/userrules/userrules"
                            });
                        }
                    }, {
                        text: "立即绑定",
                        openType: "getPhoneNumber",
                        clickHandler: function(e, n) {
                            return t.options.wepyInstance.$log("bundingbuttonclick"), t._bindMobileWX(n);
                        }
                    } ]
                });

              case 3:
                return n = e.sent, e.abrupt("return", n);

              case 5:
              case "end":
                return e.stop();
            }
        }, e, t);
    })), this._bindMobileWX = function() {
        var e = _asyncToGenerator(regeneratorRuntime.mark(function e(n) {
            var r;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (n && n.detail && n.detail.iv) {
                        e.next = 4;
                        break;
                    }
                    return e.next = 3, t.options.wepyInstance.$toast({
                        title: "手机号绑定失败，请重试~",
                        type: "fail"
                    });

                  case 3:
                    return e.abrupt("return", t._bindMobileDIY());

                  case 4:
                    return e.next = 6, _ZZLogin2.default.requestWithLogin({
                        url: "https://app.zhuanzhuan.com/zzopen/gameAccount/bindWXUserMobile",
                        data: {
                            encryptedData: n.detail.encryptedData,
                            iv: n.detail.iv,
                            source: _appConfig2.default.appId
                        }
                    });

                  case 6:
                    if ((r = e.sent) && 0 == r.respCode && 0 == r.respData) {
                        e.next = 11;
                        break;
                    }
                    return e.next = 10, t.options.wepyInstance.$toast({
                        title: "手机号绑定失败，请重试~",
                        type: "fail"
                    });

                  case 10:
                    return e.abrupt("return", t._bindMobileDIY());

                  case 11:
                    return e.next = 13, t.options.wepyInstance.$toast({
                        title: "绑定成功",
                        type: "success"
                    });

                  case 13:
                    return e.abrupt("return", {
                        result: "success"
                    });

                  case 14:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }));
        return function(n) {
            return e.apply(this, arguments);
        };
    }(), this._bindMobileDIY = _asyncToGenerator(regeneratorRuntime.mark(function e() {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return _wxPromise.wxPromise.navigateTo({
                    url: "/pages/bindphonenumber/bindphonenumber?from=" + t.options.fromLog
                }), e.abrupt("return", {
                    result: "unknown"
                });

              case 2:
              case "end":
                return e.stop();
            }
        }, e, t);
    })), n && void 0 !== n.wepyInstance || console.error("[BindMobile] options.wepyInstance must be provided"), 
    Object.assign(this.options, n);
};

exports.default = BindMobile;