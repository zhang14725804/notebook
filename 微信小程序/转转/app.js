function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
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
        for (var a = 0; a < t.length; a++) {
            var o = t[a];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, a, o) {
        return a && e(t.prototype, a), o && e(t, o), t;
    };
}(), _wepy = require("./npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy);

require("./npm/wepy-async-function/index.js");

var _cookie = require("./lib/cookie.js"), _cookie2 = _interopRequireDefault(_cookie), _lego = require("./lib/lego.js"), _lego2 = _interopRequireDefault(_lego), _toast = require("./lib/toast.js"), _toast2 = _interopRequireDefault(_toast), _ZZLogin = require("./lib/ZZLogin.js"), _ZZLogin2 = _interopRequireDefault(_ZZLogin), _formIdSender = require("./logic/formIdSender.js"), _formIdSender2 = _interopRequireDefault(_formIdSender), _entryInfo = require("./store/entryInfo.js"), _entryInfo2 = _interopRequireDefault(_entryInfo), _Navigator = require("./lib/navigate/Navigator.js"), _Navigator2 = _interopRequireDefault(_Navigator), _ApiPlugin = require("./lib/ApiPlugin.js"), _ApiPlugin2 = _interopRequireDefault(_ApiPlugin), _formIdHub = require("./store/formIdHub.js"), _formIdHub2 = _interopRequireDefault(_formIdHub), _appConfig = require("./lib/appConfig.js"), _appConfig2 = _interopRequireDefault(_appConfig), _wxPromise = require("./lib/wxPromise.js"), _navigate = require("./logic/navigate.js"), _navigate2 = _interopRequireDefault(_navigate);

_wepy2.default.component.prototype.$toast = _toast2.default, _wepy2.default.component.prototype.$cookie = _cookie2.default, 
_wepy2.default.component.prototype.$wxPromise = _wxPromise.wxPromise, _wepy2.default.component.prototype.$updatePageFrame = function() {
    for (var e, t = arguments.length, a = Array(t), o = 0; o < t; o++) a[o] = arguments[o];
    return (e = this.$root).$invoke.apply(e, [ "PageFrame", "updateConfig" ].concat(a));
}, _wepy2.default.component.prototype.$getPageFrameLayout = function() {
    for (var e, t = arguments.length, a = Array(t), o = 0; o < t; o++) a[o] = arguments[o];
    return (e = this.$root).$invoke.apply(e, [ "PageFrame", "getCurLayout" ].concat(a));
}, _wepy2.default.component.prototype.$nav = _navigate2.default, _formIdSender2.default.init(_appConfig2.default.appId), 
_ZZLogin2.default.config({
    source: _appConfig2.default.appId,
    beforeRequest: function(e) {
        if (!/groupdetail|getgroupinfolist|getmygrouplist|getgroupsectionlist|quiz/.test(e.url)) {
            var t = wx.getStorageSync("scene");
            e.data || (e.data = {}), e.data.from = t;
        }
    }
}), _ZZLogin2.default.install(), _lego2.default.config({
    appid: _appConfig2.default.appId,
    pageTypePrefix: _appConfig2.default.pageTypePrefix
}), _lego2.default.install(), _Navigator2.default.install(), _ApiPlugin2.default.install({
    source: _appConfig2.default.appId
});

var _default = function(e) {
    function t() {
        _classCallCheck(this, t);
        var e = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return e.config = {
            pages: [ "pages/index/index", "pages/list/list", "pages/list/more", "pages/list/moreC", "pages/orderdetail/orderdetail", "pages/messages/messages", "pages/mine/mine", "pages/post/post", "pages/post/postcate", "pages/post/postparams", "pages/post/postsuccess", "pages/post/postGuide", "pages/post/threeDayoversell", "pages/curtain/curtain", "pages/webview/webview", "pages/webview/bridge", "pages/sso/sso", "pages/pay/pay", "pages/category/category", "pages/category/allCates", "pages/category/allCatesSub", "pages/detail/detail", "pages/bindphonenumber/bindphonenumber", "pages/chat/chat", "pages/buy/buy", "pages/buy/success", "pages/buy/city", "pages/minesold/minesold", "pages/minebought/minebought", "pages/deliver/deliver", "pages/deliver/deliverCallList", "pages/deliver/selectexpress", "pages/deliver/deliverDetail", "pages/paymenttip/paymenttip", "pages/paymenttip/paymentRefund", "pages/updateprice/updateprice", "pages/userrules/userrules", "pages/comments/comments", "pages/iwant/iwant", "pages/irelease/irelease", "pages/group/group", "pages/group/exam", "pages/youpinIntro/youpinIntro", "pages/themeMarket/themeMarket", "pages/minegroup/minegroup", "pages/package/package", "pages/package/redIntroduce", "pages/group/grouplist", "pages/homepage/homepage", "pages/homepage/Friends", "pages/homepage/TAComment", "pages/dealsharing/dealsharing", "pages/operateactivity/postguarantee", "pages/tools/customEntry", "pages/tools/qrCode", "pages/divideredpackage/divideredpackage", "pages/divideredpackage/newUserInit", "pages/inviteFriends/guide", "pages/inviteFriends/landing", "pages/DIYRedPack/construct", "pages/DIYRedPack/landing", "pages/postReward/guide", "pages/book/sellBookHome", "pages/buyergroup/share" ],
            window: {
                backgroundTextStyle: "light",
                navigationBarBackgroundColor: "#fff",
                navigationBarTitleText: "转转",
                navigationBarTextStyle: "black"
            },
            subPackages: [ {
                root: "subPages/book",
                pages: [ "sellBookHome" ]
            }, {
                root: "subPages/buyergroup",
                pages: [ "share" ]
            }, {
                root: "subPages/divideredpackage",
                pages: [ "divideredpackage", "newUserInit" ]
            }, {
                root: "subPages/DIYRedPack",
                pages: [ "construct", "landing" ]
            }, {
                root: "subPages/inviteFriends",
                pages: [ "guide", "landing" ]
            }, {
                root: "subPages/message",
                pages: [ "chat/chat", "comments/comments" ]
            }, {
                root: "subPages/mine",
                pages: [ "iwant/iwant", "irelease/irelease", "minesold/minesold", "minebought/minebought", "minegroup/minegroup" ]
            }, {
                root: "subPages/order",
                pages: [ "deliver/deliver", "deliver/deliverCallList", "deliver/selectexpress", "deliver/deliverDetail", "paymenttip/paymenttip", "paymenttip/paymentRefund", "updateprice/updateprice" ]
            }, {
                root: "subPages/postReward",
                pages: [ "guide" ]
            }, {
                root: "subPages/profile",
                pages: [ "homepage/homepage", "homepage/Friends", "homepage/TAComment" ]
            }, {
                root: "subPages/structure",
                pages: [ "category/allCates", "category/allCatesSub" ]
            }, {
                root: "subPages/tools",
                pages: [ "customEntry", "qrCode" ]
            }, {
                root: "subPages/trade",
                pages: [ "detail/detail", "bindphonenumber/bindphonenumber", "buy/success", "buy/city", "package/package", "package/redIntroduce", "buy/buy" ]
            }, {
                root: "subPages/tradesuccess",
                pages: [ "dealsharing/dealsharing", "operateactivity/postguarantee", "operateactivity/invitePost" ]
            }, {
                root: "subPages/other",
                pages: [ "userrules/userrules", "post/threeDayoversell", "group/group", "group/exam", "youpinIntro/youpinIntro", "themeMarket/themeMarket", "group/grouplist", "guide4GZH/guide4GZH" ]
            }, {
                root: "subPages/nearbylist",
                pages: [ "nearbymap", "nearbylist" ]
            }, {
                root: "subPages/recentSold",
                pages: [ "recentSold" ]
            }, {
                root: "subPages/hotCates",
                pages: [ "postGuide" ]
            }, {
                root: "subPages/signin",
                pages: [ "signin" ]
            }, {
                root: "subPages/phoneEval",
                pages: [ "index", "selectModel", "fillParams", "result" ]
            } ]
        }, e.globalData = {
            latitude: "",
            longitude: "",
            scene: "",
            path: "",
            Currentlenth: "",
            options: "",
            isIphoneX: !1,
            leavingState: {
                path: "",
                options: {},
                historyLen: -1
            },
            systemInfo: null
        }, e;
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "_getAppState",
        value: function(e) {
            var t = getCurrentPages(), a = t[t.length - 1] || {
                route: "",
                options: ""
            };
            return {
                path: e ? e.path : a.route,
                options: e ? e.query : a.options,
                historyLen: t.length
            };
        }
    }, {
        key: "_fulfillChannel",
        value: function(e) {
            if (!e.query || !e.query.scene) return "";
            var t = e.query.scene.split("_");
            if ("rd" === t[0] && "sharepyq" == t[2]) return "APPcontinuesharepyq";
            if ("z" === t[0]) return "pcscan";
            if ("as" == t[2]) return "SCANCOME_AS";
            if ("ap" == t[2]) return "SCANCOME_AP";
            if ("rs" == t[2]) return "SCANCOME_RS";
            if ("ms" == t[2]) return "SCANCOME_MS";
            if ("dealshare" == t[0]) return "SCANCOME_DEALSHARE";
            if ("d" === t[0]) {
                var a = t[2];
                return {
                    pc: "pcscan",
                    biz: "bizdetail"
                }[a] || a;
            }
            return "SCANCOME_NONE";
        }
    }, {
        key: "fulfillAsyncChannel",
        value: function(e) {
            if (e) return this._setChannel(e);
        }
    }, {
        key: "_setChannel",
        value: function(e) {
            this.globalData.channel = e, _cookie2.default.set("channelid", e), Object.assign(_entryInfo2.default, {
                channel: e
            });
        }
    }, {
        key: "_updateVersion",
        value: function() {
            if (wx.getUpdateManager) try {
                var e = wx.getUpdateManager();
                e.onCheckForUpdate(function(e) {
                    console.log("是否需要更新小程序版本:   ", e.hasUpdate);
                }), e.onUpdateReady(function() {
                    wx.showModal({
                        title: "更新提示",
                        content: "新版本已经准备好，是否重启应用？",
                        success: function(t) {
                            t.confirm && e.applyUpdate();
                        }
                    });
                }), e.onUpdateFailed(function() {
                    wx.showModal({
                        title: "更新失败",
                        content: '更新失败，请删除转转小程序后重新搜索"转转"',
                        success: function(t) {
                            t.confirm && e.applyUpdate();
                        }
                    });
                });
            } catch (e) {
                console.warn(e);
            }
        }
    }, {
        key: "onPageNotFound",
        value: function() {
            _wxPromise.wxPromise.redirectTo({
                path: "/pages/index/index"
            });
        }
    }, {
        key: "onShow",
        value: function() {}
    }, {
        key: "onLaunch",
        value: function(e) {
            var t = this;
            e = e || {}, console.log("app, onLaunch"), _wepy2.default.component.prototype.$asyncGloabalData = new Promise(function(e, a) {
                wx.getSystemInfo({
                    success: function(a) {
                        t.globalData.systemInfo = a, /iphone/i.test(a.model) && a.screenHeight >= 812 && (t.globalData.isIphoneX = !0), 
                        e(t.globalData);
                    },
                    fail: function() {
                        e({});
                    }
                });
            });
        }
    }, {
        key: "onShow",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            console.log("app onShow", e);
            var t = e.scene || "none", a = e.query && e.query.channel || this._fulfillChannel(e) || "none";
            1019 == e.scene && (a = "wxqb1019"), JSON.stringify(this._getAppState(e)) === JSON.stringify(this.globalData.leavingState) && (a = _entryInfo2.default.channel), 
            this._setChannel(a), this.globalData.scene = t, wx.setStorageSync("scene", t), Object.assign(_entryInfo2.default, {
                scene: t
            });
        }
    }, {
        key: "onHide",
        value: function(e) {
            this.globalData.leavingState = this._getAppState(), _formIdHub2.default.flush();
        }
    } ]), t;
}(_wepy2.default.app);

App(require("./npm/wepy/lib/wepy.js").default.$createApp(_default, {
    noPromiseAPI: [ "createSelectorQuery" ]
}));