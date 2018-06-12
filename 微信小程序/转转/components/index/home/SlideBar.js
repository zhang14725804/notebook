function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function o(r, a) {
                try {
                    var i = t[r](a), s = i.value;
                } catch (e) {
                    return void n(e);
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
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _operationKit = require("./../../../lib/operationKit.js"), _default = function(e) {
    function t() {
        var e, n, o, r;
        _classCallCheck(this, t);
        for (var a = arguments.length, i = Array(a), s = 0; s < a; s++) i[s] = arguments[s];
        return n = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(i))), 
        o.props = {
            unreadMessage: {
                type: Number
            }
        }, o.data = {
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
            horizontalList: [],
            verticalList: [ {
                image: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/index/slidebar/message.png",
                name: "消息",
                caseId: "message",
                log: "MINEMESSAGECLK",
                goUrl: "/pages/messages/messages",
                size: "28rpx"
            }, {
                image: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/index/slidebar/mypost.png",
                name: "我发布的",
                caseId: "post",
                log: "MINEPOSTCLK",
                goUrl: "/pages/irelease/irelease",
                size: "32rpx"
            }, {
                image: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/index/slidebar/mysold.png",
                name: "我卖出的",
                caseId: "sold",
                log: "MINESOLDCLK",
                goUrl: "/pages/minesold/minesold"
            }, {
                image: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/index/slidebar/mybuy.png",
                name: "我买到的",
                caseId: "bought",
                log: "MINEBOUGHTCLK",
                goUrl: "/pages/minebought/minebought"
            }, {
                image: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/index/slidebar/more.png",
                name: "更多",
                caseId: "more",
                log: "MINEMORECLK",
                goUrl: "/pages/mine/mine"
            } ],
            userInfo: {},
            myEarnedMoney: 0,
            friendsAmount: 0,
            showSlideBar: !1
        }, o.computed = {
            showInfo: function() {
                return this.myEarnedMoney > 0 ? "有" + this.friendsAmount + "个好友在转转，赚到" + this.myEarnedMoney + "元" : "虽然没赚到钱，没事儿常来转转";
            }
        }, o.methods = {
            close: function() {
                this.showSlideBar = !1, this.$apply();
            },
            goPage: function(e, t, n, o) {
                this.$log(t), "redPackage" == n && (e += "&tabsProps=" + JSON.stringify(this.tabsProps));
                var r = "redPackage" != n && e.indexOf("http") > -1 ? "/pages/webview/webview?url=" + encodeURIComponent(e) : e;
                this.$wxPromise.navigateTo({
                    url: r
                }), "more" == n && (this.showSlideBar = !1, this.$apply());
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
                var t = this.getMaxScrollTop();
                console.log(t, e.detail.scrollTop), t <= 0 || (this.lastScrollTop = this.scrollTop, 
                this.scrollTop = e.detail.scrollTop, this.scrollTop - this.lastScrollTop < 0 && e.detail.scrollTop < t && (this.backgroundColor = "#ff5555"), 
                this.scrollTop - this.lastScrollTop > 0 && e.detail.scrollTop > 0 && (this.backgroundColor = "#ffffff"));
            }
        }, r = n, _possibleConstructorReturn(o, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "showSlide",
        value: function() {
            this.showSlideBar = !0, this.$apply(), this.$log("MINEFLOATVIEW");
        }
    }, {
        key: "getMaxScrollTop",
        value: function() {
            if (void 0 != this.maxScrollTop) return this.maxScrollTop;
            var e = this.$root.$parent.globalData.systemInfo;
            if (!e) return -1;
            var t = e.screenWidth / 375 * 820;
            return this.maxScrollTop = t - e.screenHeight, this.maxScrollTop;
        }
    }, {
        key: "getMineInfo",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, n, o, r;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return t = this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/query"
                        }), n = this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getMyRelevantCount"
                        }), e.next = 4, t;

                      case 4:
                        return o = e.sent, 0 == o.respCode ? (this.userInfo = o.respData, this.friendsAmount = this.userInfo.friendsAmount || 0) : this.$toast({
                            title: o.errMsg,
                            type: "fail"
                        }), e.next = 8, n;

                      case 8:
                        r = e.sent, 0 == r.respCode && (this.myEarnedMoney = r.respData.myEarnedMoney || 0), 
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
            this.getMineInfo();
        }
    }, {
        key: "onPullDownRefresh",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
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
    } ]), t;
}(_wepy2.default.component);

exports.default = _default;