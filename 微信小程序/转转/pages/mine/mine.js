function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var n = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function o(a, r) {
                try {
                    var i = n[a](r), s = i.value;
                } catch (e) {
                    return void t(e);
                }
                if (!i.done) return Promise.resolve(s).then(function(e) {
                    o("next", e);
                }, function(e) {
                    o("throw", e);
                });
                e(s);
            }
            return o("next");
        });
    };
}

function _classCallCheck(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, n) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !n || "object" != typeof n && "function" != typeof n ? e : n;
}

function _inherits(e, n) {
    if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + typeof n);
    e.prototype = Object.create(n && n.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var o = n[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(n, t, o) {
        return t && e(n.prototype, t), o && e(n, o), n;
    };
}(), _get = function e(n, t, o) {
    null === n && (n = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(n, t);
    if (void 0 === a) {
        var r = Object.getPrototypeOf(n);
        return null === r ? void 0 : e(r, t, o);
    }
    if ("value" in a) return a.value;
    var i = a.get;
    if (void 0 !== i) return i.call(o);
}, _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _operationKit = require("./../../lib/operationKit.js"), _PageFrame = require("./../../components/common/PageFrame.js"), _PageFrame2 = _interopRequireDefault(_PageFrame), _HomeMsgBubble = require("./../../components/HomeMsgBubble.js"), _HomeMsgBubble2 = _interopRequireDefault(_HomeMsgBubble), _default = function(e) {
    function n() {
        var e, t, o, a;
        _classCallCheck(this, n);
        for (var r = arguments.length, i = Array(r), s = 0; s < r; s++) i[s] = arguments[s];
        return t = o = _possibleConstructorReturn(this, (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(e, [ this ].concat(i))), 
        o.config = {
            navigationBarTitleText: "我的"
        }, o.$repeat = {}, o.$props = {
            HomeMsgBubble: {
                "xmlns:v-bind": "",
                "v-bind:unreadMessage.sync": "unreadMessage"
            }
        }, o.$events = {}, o.components = {
            PageFrame: _PageFrame2.default,
            HomeMsgBubble: _HomeMsgBubble2.default
        }, o.data = {
            unreadMessage: 0,
            backgroundColor: "#ff5555",
            scrollTop: 0,
            maxScrollTop: void 0,
            tabsProps: [ {
                infoKey: "unuer",
                text: "未使用",
                class: "able",
                selected: !0,
                info: []
            }, {
                infoKey: "used",
                text: "已使用",
                class: "disable",
                selected: !1,
                info: [],
                pic: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/red/used.png"
            }, {
                infoKey: "expired",
                text: "已过期",
                class: "disable",
                selected: !1,
                info: [],
                pic: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/red/Expired.png"
            } ],
            horizontalList: [ {
                image: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/mine/release.png",
                name: "我发布的",
                caseId: "post",
                log: "MYPOSTCLK",
                goUrl: "/pages/irelease/irelease"
            }, {
                image: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/mine/sold.png",
                name: "我卖出的",
                caseId: "sold",
                log: "MYSELLCLK",
                goUrl: "/pages/minesold/minesold"
            }, {
                image: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/mine/bought.png",
                name: "我买到的",
                caseId: "bought",
                log: "MYBUYCLK",
                goUrl: "/pages/minebought/minebought"
            }, {
                image: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/mine/iwant.png",
                name: "我想要的",
                caseId: "iwant",
                log: "MYWANTCLK",
                goUrl: "/pages/iwant/iwant"
            } ],
            verticalList: [ {
                image: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/mine/message.png",
                name: "我的消息",
                caseId: "message",
                log: "MESSAGECLK",
                goUrl: "/pages/messages/messages"
            }, {
                image: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/mine/signin.png",
                name: "签到领红包",
                caseId: "signin",
                log: "SIGNCLK",
                goUrl: "/subPages/signin/signin"
            }, {
                image: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/mine/clothes.png",
                name: "旧衣回收",
                caseId: "clothes",
                log: "MYOLDCLOTHESCLK",
                goUrl: "https://m.zhuanzhuan.58.com/Mzhuanzhuan/zzcycle/clothesRecycle/#/clothesRecycle"
            }, {
                image: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/mine/red-package.png",
                name: "我的红包",
                caseId: "redPackage",
                log: "MYREDPACKAGECLK",
                goUrl: "/pages/package/package?redFrom=mine&contentText=很抱歉，您暂无可用红包~常来转转，红包才有缘"
            }, {
                image: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/mine/group-shopping.png",
                name: "我的拼团",
                caseId: "groupShopping",
                log: "MYGROUPCLK",
                goUrl: "https://m.zhuanzhuan.com/Mzhuanzhuan/zzbuyergroup/#/orderList?relogin=1"
            }, {
                image: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/mine/group.png",
                name: "我的圈子",
                caseId: "group",
                log: "MYCIRCLECLK",
                goUrl: "/pages/minegroup/minegroup"
            }, {
                image: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/mine/customerService.png",
                name: "客服中心",
                caseId: "customerService",
                log: "myCustomerServiceClk",
                goUrl: "https://m.zhuanzhuan.com/Mzhuanzhuan/ZZOpenBusiness/index.html#/WAMain/help/index"
            } ],
            userInfo: {},
            myEarnedMoney: 0,
            friendsAmount: 0
        }, o.computed = {
            showInfo: function() {
                return this.myEarnedMoney > 0 ? "您有" + this.friendsAmount + "个好友在转转，您在转转赚到" + this.myEarnedMoney + "元，老板请继续转转赚" : "虽然没赚到钱，没事儿常来转转";
            }
        }, o.methods = {
            goPage: function(e, n, t, o) {
                this.$log(n), "redPackage" == t && (e += "&tabsProps=" + JSON.stringify(this.tabsProps));
                var a = "redPackage" != t && e.indexOf("http") > -1 ? "/pages/webview/webview?url=" + encodeURIComponent(e) : e;
                this.$wxPromise.navigateTo({
                    url: a
                });
            },
            goMyHome: function() {
                this.$wxPromise.navigateTo({
                    url: "/pages/homepage/homepage?uid=" + this.$cookie.get("uid")
                }), this.$log("MYPROFILECLK");
            },
            touchStartHandler: function(e) {
                console.log("touchStartHandler", Date.now(), e);
            },
            touchMoveHandler: function(e) {
                console.log("touchMoveHandler", Date.now(), e);
            },
            scrollHandler: function(e) {
                var n = this.getMaxScrollTop();
                console.log(n, e.detail.scrollTop), n <= 0 || (this.lastScrollTop = this.scrollTop, 
                this.scrollTop = e.detail.scrollTop, this.scrollTop - this.lastScrollTop < 0 && e.detail.scrollTop < n && (this.backgroundColor = "#ff5555"), 
                this.scrollTop - this.lastScrollTop > 0 && e.detail.scrollTop > 0 && (this.backgroundColor = "#ffffff"));
            }
        }, a = t, _possibleConstructorReturn(o, a);
    }
    return _inherits(n, e), _createClass(n, [ {
        key: "getMaxScrollTop",
        value: function() {
            if (void 0 != this.maxScrollTop) return this.maxScrollTop;
            var e = this.$root.$parent.globalData.systemInfo;
            if (!e) return -1;
            var n = e.screenWidth / 375 * 820;
            return this.maxScrollTop = n - e.screenHeight, this.maxScrollTop;
        }
    }, {
        key: "$log",
        value: function(e, t, o) {
            _get(n.prototype.__proto__ || Object.getPrototypeOf(n.prototype), "$log", this).call(this, e, "WAMINE", o);
        }
    }, {
        key: "getMineInfo",
        value: function() {
            function e() {
                return n.apply(this, arguments);
            }
            var n = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var n, t, o, a;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return n = this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/query"
                        }), t = this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getMyRelevantCount"
                        }), e.next = 4, n;

                      case 4:
                        return o = e.sent, 0 == o.respCode ? (this.userInfo = o.respData, this.friendsAmount = this.userInfo.friendsAmount || 0) : this.$toast({
                            title: o.errMsg,
                            type: "fail"
                        }), e.next = 8, t;

                      case 8:
                        a = e.sent, 0 == a.respCode && (this.myEarnedMoney = a.respData.myEarnedMoney || 0), 
                        this.$apply();

                      case 11:
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
            this.$log("MINEVIEW");
        }
    }, {
        key: "onShow",
        value: function() {
            this.getMineInfo(), this.$broadcast("pageShow");
        }
    }, {
        key: "onHide",
        value: function() {
            this.$broadcast("pageHide");
        }
    }, {
        key: "onPullDownRefresh",
        value: function() {
            function e() {
                return n.apply(this, arguments);
            }
            var n = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, Promise.all([ this.getMineInfo(), (0, _operationKit.delay)(500) ]);

                      case 2:
                        wx.stopPullDownRefresh();

                      case 3:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "onShareAppMessage",
        value: function() {
            var e = this;
            return {
                title: "我在转转上卖闲置，老铁快来看看吧~",
                path: "/subPages/profile/homepage/homepage?uid=" + this.$cookie.get("uid"),
                imageUrl: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/index/index_share.jpeg",
                success: function() {
                    e.$log("sharesuccess");
                },
                fail: function() {}
            };
        }
    } ]), n;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(_default, "pages/mine/mine"));