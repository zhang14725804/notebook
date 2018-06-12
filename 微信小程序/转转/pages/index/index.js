function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, o) {
            function n(r, a) {
                try {
                    var s = t[r](a), i = s.value;
                } catch (e) {
                    return void o(e);
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
        for (var o = 0; o < t.length; o++) {
            var n = t[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, o, n) {
        return o && e(t.prototype, o), n && e(t, n), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _PageFrame = require("./../../components/common/PageFrame.js"), _PageFrame2 = _interopRequireDefault(_PageFrame), _CrazyFormId = require("./../../components/common/CrazyFormId.js"), _CrazyFormId2 = _interopRequireDefault(_CrazyFormId), _SubPageHome = require("./../../components/index/SubPageHome.js"), _SubPageHome2 = _interopRequireDefault(_SubPageHome), _HomeMsgBubble = require("./../../components/HomeMsgBubble.js"), _HomeMsgBubble2 = _interopRequireDefault(_HomeMsgBubble), _PostEntry = require("./../../components/index/PostEntry.js"), _PostEntry2 = _interopRequireDefault(_PostEntry), _wxPromise = require("./../../lib/wxPromise.js"), scrollTopRecord = 0, touching = !0, _default = function(e) {
    function t() {
        var e, o, n, r;
        _classCallCheck(this, t);
        for (var a = arguments.length, s = Array(a), i = 0; i < a; i++) s[i] = arguments[i];
        return o = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(s))), 
        n.config = {
            backgroundColor: "#fff",
            backgroundTextStyle: "dark",
            navigationBarBackgroundColor: "#ff5555",
            navigationBarTitleText: "转转二手交易网",
            navigationBarTextStyle: "white",
            enablePullDownRefresh: !0
        }, n.$repeat = {}, n.$props = {
            SubPageHome: {
                "xmlns:v-bind": "",
                "v-bind:unreadMessage.sync": "unreadMessage"
            },
            HomeMsgBubble: {
                "v-bind:unreadMessage.sync": "unreadMessage"
            },
            PostEntry: {
                "xmlns:wx": "",
                "xmlns:v-on": ""
            }
        }, n.$events = {
            PostEntry: {
                "v-on:eventHidePostTip": "hidePostTip"
            }
        }, n.components = {
            PageFrame: _PageFrame2.default,
            CrazyFormId: _CrazyFormId2.default,
            SubPageHome: _SubPageHome2.default,
            HomeMsgBubble: _HomeMsgBubble2.default,
            PostEntry: _PostEntry2.default
        }, n.data = {
            unreadMessage: 0,
            pageTab: "",
            loadedPages: {},
            showEntry: !1,
            filterClass: "",
            pageLoading: !0,
            enablePageLoading: !0
        }, n.computed = {
            curPage: function() {
                return {
                    home: "SubPageHome"
                }[this.pageTab] || "";
            }
        }, n.watch = {
            curPage: function(e, t) {
                this.transmitPageHook("onPageTabActive", {
                    init: !this.loadedPages[e]
                }), this.loadedPages[e] = !0, wx.pageScrollTo && wx.pageScrollTo({
                    scrollTop: 0,
                    duration: 0
                });
            }
        }, n.methods = {
            showPostTip: function() {
                this.filterClass = "filter", this.showEntry = !0;
            },
            hidePostTip: function() {
                this.filterClass = "", this.showEntry = !1;
            },
            onTouchStart: function() {
                touching = !0;
            },
            onTouchEnd: function() {
                setTimeout(function() {
                    touching = !1;
                }, 1e3);
            }
        }, n.api = {
            showPageLoading: function() {
                wx.showLoading({
                    title: "加载中",
                    mask: !0
                }), n.pageLoading = !0, n.$apply();
            },
            hidePageLoading: function() {
                wx.hideLoading(), n.pageLoading = !1, n.$apply();
            }
        }, r = o, _possibleConstructorReturn(n, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "$logPageCommonBackup",
        value: function() {
            return this.$invoke(this.curPage, "$logPageCommonBackup");
        }
    }, {
        key: "sysInfoLog",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, o;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, _wxPromise.wxResolve.getSystemInfo();

                      case 2:
                        if (t = e.sent, t.succeeded) {
                            e.next = 5;
                            break;
                        }
                        return e.abrupt("return");

                      case 5:
                        o = {
                            wechatVersion: t.version || "",
                            deviceSys: t.system || "",
                            devicePlatform: t.platform || "",
                            waSdk: t.SDKVersion || ""
                        }, this.$log("sysinfo", "wa", o);

                      case 7:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "onLoad",
        value: function(e) {
            "dispatched" !== this.decodeQrCode(e) && (this.options = e, this.pageTab = e.pageTab || "home", 
            this.enablePageLoading = "home" === this.pageTab, this.$apply(), this.sysInfoLog());
        }
    }, {
        key: "onShow",
        value: function() {
            this.$broadcast("pageShow");
        }
    }, {
        key: "onHide",
        value: function() {
            this.$broadcast("pageHide");
        }
    }, {
        key: "onReachBottom",
        value: function(e) {
            return this.transmitPageHook("onReachBottom", e);
        }
    }, {
        key: "onPullDownRefresh",
        value: function(e) {
            return this.transmitPageHook("onPullDownRefresh", e);
        }
    }, {
        key: "onShareAppMessage",
        value: function(e) {
            return this.transmitPageHook("onShareAppMessage", e);
        }
    }, {
        key: "transmitPageHook",
        value: function(e, t) {
            try {
                return this.$invoke(this.curPage, e, t);
            } catch (e) {
                if (e.message && e.message.includes("Invalid method")) return;
                throw e;
            }
        }
    }, {
        key: "decodeQrCode",
        value: function(e) {
            if (!e.scene) return "none";
            var t = e.scene.split("_");
            switch (t[0]) {
              case "d":
              case "rd":
              case "e":
                return this.$wxPromise.redirectTo({
                    url: "/subPages/trade/detail/detail?scene=" + e.scene
                }), "dispatched";

              case "z":
                return this.$wxPromise.redirectTo({
                    url: "/subPages/message/chat/chat?scene=" + e.scene
                }), "dispatched";

              case "g":
                return this.$wxPromise.redirectTo({
                    url: "/subPages/other/group/group?groupId=" + t[1]
                }), "dispatched";

              default:
                return "unrecognized";
            }
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(_default, "pages/index/index"));