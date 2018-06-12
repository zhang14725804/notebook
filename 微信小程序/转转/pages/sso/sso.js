function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function r(o, a) {
                try {
                    var i = t[o](a), s = i.value;
                } catch (e) {
                    return void n(e);
                }
                if (!i.done) return Promise.resolve(s).then(function(e) {
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
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _wxPromise = require("./../../lib/wxPromise.js"), _cookie = require("./../../lib/cookie.js"), _cookie2 = _interopRequireDefault(_cookie), _PageFrame = require("./../../components/common/PageFrame.js"), _PageFrame2 = _interopRequireDefault(_PageFrame), Sso = function(e) {
    function t() {
        var e, n, r, o;
        _classCallCheck(this, t);
        for (var a = arguments.length, i = Array(a), s = 0; s < a; s++) i[s] = arguments[s];
        return n = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(i))), 
        r.components = {
            PageFrame: _PageFrame2.default
        }, r.data = {
            param: {},
            showPage: !1,
            scanSuccess: !1,
            loginSuccess: !1,
            actKey: "",
            title: "",
            url: "",
            notShowUrlBtn: !1,
            result: ""
        }, r.methods = {
            goIndex: function() {
                _wxPromise.wxPromise.navigateTo({
                    url: "/pages/webview/webview?url=" + encodeURIComponent(this.url)
                });
            },
            confirm: function() {
                function e() {
                    return t.apply(this, arguments);
                }
                var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                    var t;
                    return regeneratorRuntime.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            if (0 !== parseInt(this.result.respCode)) {
                                e.next = 7;
                                break;
                            }
                            return e.next = 3, this.confirmPCLogin();

                          case 3:
                            t = e.sent, 0 == t.respCode ? (this.scanSuccess = !1, this.loginSuccess = !0, this.$apply()) : this.tipFail(), 
                            e.next = 8;
                            break;

                          case 7:
                            this.tipFail();

                          case 8:
                          case "end":
                            return e.stop();
                        }
                    }, e, this);
                }));
                return e;
            }(),
            close: function() {
                _wxPromise.wxPromise.navigateBack({
                    delta: 1
                });
            }
        }, o = n, _possibleConstructorReturn(r, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "login",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.$login();

                      case 2:
                        t = e.sent, 0 == t.code && (this.showPage = !0, this.scanSuccess = !0, this.$apply()), 
                        -2 != t.code && -8 != t.code || this.login();

                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "clearLogin",
        value: function() {
            _cookie2.default.set("uid", ""), _cookie2.default.set("PPU", ""), wx.setStorage({
                key: "userInfo",
                data: ""
            }), wx.setStorage({
                key: "zzUserInfo",
                data: ""
            });
        }
    }, {
        key: "getActKey",
        value: function() {
            return this.$httpWithLogin({
                url: "https://app.zhuanzhuan.com/zzopen/wxcommon/getParamByCode",
                data: {
                    code: this.param.scene
                }
            });
        }
    }, {
        key: "confirmPCLogin",
        value: function() {
            return this.$httpWithLogin({
                url: "https://app.zhuanzhuan.com/zzopen/gameAccount/confirmPCLogin",
                data: {
                    actKey: this.actKey
                }
            });
        }
    }, {
        key: "tipFail",
        value: function() {
            this.$toast({
                title: "登录失败",
                type: "fail",
                duration: 2e3
            });
        }
    }, {
        key: "onLaunch",
        value: function(e) {
            e.scene && this.$log("from-" + e.scene);
        }
    }, {
        key: "onLoad",
        value: function() {
            function e(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t) {
                var n;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return this.param = t, this.param.scene && (this.param.scene = this.param.scene.split("_")[1]), 
                        e.next = 4, this.getActKey();

                      case 4:
                        this.result = e.sent, 0 === parseInt(this.result.respCode) && (n = this.result.respData.result || '""', 
                        n = JSON.parse(n), this.actKey = n.actKey, this.title = n.title || "转转游戏", this.url = n.url || "https://m.zhuanzhuan.com/Mzhuanzhuan/ZZOpenBusiness/index.html#/game-home/game-index", 
                        this.notShowUrlBtn = !!n.notShowUrlBtn), this.$apply(), this.login();

                      case 8:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Sso, "pages/sso/sso"));