function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function o(r, i) {
                try {
                    var a = t[r](i), s = a.value;
                } catch (e) {
                    return void n(e);
                }
                if (!a.done) return Promise.resolve(s).then(function(e) {
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
});

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
}(), _get = function e(t, n, o) {
    null === t && (t = Function.prototype);
    var r = Object.getOwnPropertyDescriptor(t, n);
    if (void 0 === r) {
        var i = Object.getPrototypeOf(t);
        return null === i ? void 0 : e(i, n, o);
    }
    if ("value" in r) return r.value;
    var a = r.get;
    if (void 0 !== a) return a.call(o);
}, _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _handleImg = require("./../../lib/handleImg.js"), _handleImg2 = _interopRequireDefault(_handleImg), _CreatePost = require("./../../components/CreatePost.js"), _CreatePost2 = _interopRequireDefault(_CreatePost), _cookie = require("./../../lib/cookie.js"), _cookie2 = _interopRequireDefault(_cookie), _DialogCommon = require("./../../components/DialogCommon.js"), _DialogCommon2 = _interopRequireDefault(_DialogCommon), _routeParams = require("./../../store/routeParams.js"), _routeParams2 = _interopRequireDefault(_routeParams), _wxPromise = require("./../../lib/wxPromise.js"), _PageFrame = require("./../../components/common/PageFrame.js"), _PageFrame2 = _interopRequireDefault(_PageFrame), _Guide4GZH = require("./../../components/common/Guide4GZH.js"), _Guide4GZH2 = _interopRequireDefault(_Guide4GZH), deviceInfo = {};

wx.getSystemInfo({
    success: function(e) {
        deviceInfo = e;
    }
});

var postsuccess = function(e) {
    function t() {
        var e, n, o, r;
        _classCallCheck(this, t);
        for (var i = arguments.length, a = Array(i), s = 0; s < i; s++) a[s] = arguments[s];
        return n = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        o.config = {
            navigationBarTitleText: "发布成功"
        }, o.$repeat = {}, o.$props = {
            CreatePost: {
                "xmlns:v-bind": "",
                "v-bind:info.sync": "info",
                "v-bind:infoId.sync": "infoId"
            }
        }, o.$events = {}, o.components = {
            PageFrame: _PageFrame2.default,
            CreatePost: _CreatePost2.default,
            DialogCommon: _DialogCommon2.default,
            Guide4GZH: _Guide4GZH2.default
        }, o.data = {
            info: {
                pics: ""
            },
            infoId: "",
            ready: !1,
            canIUse: wx.canIUse && wx.canIUse("button.open-type.share"),
            invitePostBanner: !1
        }, o.methods = {
            onShareBtn: function(e) {
                "wechat" == e.currentTarget.dataset.channelId ? this.shareToWechat() : this.shareToWxMoments();
            },
            onInviteBanner: function() {
                _wxPromise.wxPromise.navigateTo({
                    url: "/subPages/inviteFriends/guide?pageChannel=wapostsuccessbanner"
                }), this.$log("BANNERCLICK");
            },
            goToDetail: function() {
                this.$wxPromise.navigateTo({
                    url: "/subPages/trade/detail/detail?infoId=" + this.infoId
                });
            }
        }, o.computed = {
            headImg: function() {
                return _handleImg2.default.handleSingle(this.info.pics.split("|")[0], deviceInfo.screenWidth, deviceInfo.screenHeight);
            }
        }, r = n, _possibleConstructorReturn(o, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "shareToWechat",
        value: function() {
            return this.$log("SHARE_WX"), this.data.canIUse ? void 0 : void wx.showModal({
                title: "提示",
                content: "升级到最新版微信就能一键分享啦，点击微信右上角选择转发同样有效哦~",
                showCancel: !1,
                confirmText: "知道了"
            });
        }
    }, {
        key: "shareToWxMoments",
        value: function() {
            this.$log("SHARE_QUONE"), this.$invoke("CreatePost", "openPoster");
        }
    }, {
        key: "reset",
        value: function() {
            this.$apply();
        }
    }, {
        key: "onLoad",
        value: function() {
            function e(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t) {
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return this.$log("RELEASE_SUCCESSVIEW"), this.$root.$wxpage.options = t, t.infoId && (this.info.infoId = t.infoId, 
                        this.infoId = t.infoId, this.reset()), this.invitePostBanner = 1 == t.invitePostBanner, 
                        this.$apply(), t.errMsg && this.$invoke("DialogCommon", "open", {
                            title: "提示",
                            content: t.errMsg,
                            buttons: [ {
                                text: "知道了"
                            } ]
                        }), e.next = 8, Promise.all([ this.getGoodInfo(), this.query() ]);

                      case 8:
                        this.$invoke("CreatePost", "createPost"), this.$invoke("Guide4GZH", "requestGZHGuide", "A");

                      case 10:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "getGoodInfo",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, n, o, r, i, a, s, u, c, l, f;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.$http({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getInfoById",
                            data: {
                                infoId: this.info.infoId,
                                formId: this.$root.$wxpage.options.formId,
                                firstPaint: !0
                            }
                        });

                      case 2:
                        t = e.sent, 0 == t.respCode && (n = t.respData, o = n.portrait, r = n.nickName, 
                        i = n.title, a = n.infoId, s = n.pics, u = n.nowPrice, c = n.oriPrice, l = n.uid, 
                        f = this.userUid == l, Object.assign(this.info, {
                            portrait: o,
                            nickName: r,
                            uid: l,
                            title: i,
                            infoId: a,
                            pics: s,
                            nowPrice: u,
                            oriPrice: c,
                            isSelf: f
                        }), this.$apply()), this.ready = !0, this.$apply();

                      case 6:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "query",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/query"
                        });

                      case 2:
                        t = e.sent, Object.assign(this.info, {
                            userInfo: t.respData
                        }), this.$apply();

                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "onUnload",
        value: function() {
            2 == getCurrentPages().length && _routeParams2.default.setBackFromData({}, "pages/post/postsuccess"), 
            _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "onUnload", this) && _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "onUnload", this).call(this);
        }
    }, {
        key: "onShareAppMessage",
        value: function(e) {
            var t = this;
            if (this.info.userInfo && this.info.userInfo.nickname) {
                console.log("hahahah");
                var n = "转让" + (this.info.title && this.info.title.length > 10 ? this.info.title.substring(0, 10) + "…" : this.info.title) + "，物美价廉，群友的专属福利~", o = {
                    self: [ n, "我有个很不错的闲置想转给你，希望它能继续为你发挥余热~", "转个很棒的闲置给群友们，人品担保物美价" ],
                    other: [ n ]
                }, r = parseInt(2 * Math.random()), i = {
                    title: "",
                    path: "/subPages/trade/detail/detail?infoId=" + this.info.infoId + "&channel=LISTCOME_MS",
                    success: function(e) {
                        t.$log("SHARE_WX_SUCCESS"), t.$toast({
                            title: "转发成功",
                            type: "success"
                        }), t.$emit("translateWitch", 0);
                    },
                    fail: function(e) {
                        t.$toast({
                            title: "转发失败",
                            type: "fail"
                        });
                    }
                };
                return i.title = o.self[r], i.path = "/subPages/trade/detail/detail?infoId=" + this.info.infoId + "&from=rs&params=msg" + r + "&to=rd&channel=LISTCOME_MS", 
                i;
            }
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(postsuccess, "pages/post/postsuccess"));