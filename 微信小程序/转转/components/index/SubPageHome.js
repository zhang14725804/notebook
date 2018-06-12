function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function r(o, n) {
                try {
                    var s = t[o](n), i = s.value;
                } catch (e) {
                    return void a(e);
                }
                if (!s.done) return Promise.resolve(i).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(i);
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

function _applyDecoratedDescriptor(e, t, a, r, o) {
    var n = {};
    return Object.keys(r).forEach(function(e) {
        n[e] = r[e];
    }), n.enumerable = !!n.enumerable, n.configurable = !!n.configurable, ("value" in n || n.initializer) && (n.writable = !0), 
    n = a.slice().reverse().reduce(function(a, r) {
        return r(e, t, a) || a;
    }, n), o && void 0 !== n.initializer && (n.value = n.initializer ? n.initializer.call(o) : void 0, 
    n.initializer = void 0), void 0 === n.initializer && (Object.defineProperty(e, t, n), 
    n = null), n;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _createClass = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var r = t[a];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, a, r) {
        return a && e(t.prototype, a), r && e(t, r), t;
    };
}(), _dec, _desc, _value, _class, _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _querystring = require("./../../npm/querystring/index.js"), _querystring2 = _interopRequireDefault(_querystring), _LaunchScreen = require("./home/LaunchScreen.js"), _LaunchScreen2 = _interopRequireDefault(_LaunchScreen), _TopTabs = require("./home/TopTabs.js"), _TopTabs2 = _interopRequireDefault(_TopTabs), _Tiles = require("./home/Tiles.js"), _Tiles2 = _interopRequireDefault(_Tiles), _NewManTile = require("./home/NewManTile.js"), _NewManTile2 = _interopRequireDefault(_NewManTile), _LatestSelling = require("./home/LatestSelling.js"), _LatestSelling2 = _interopRequireDefault(_LatestSelling), _CategoryGoods = require("./home/CategoryGoods.js"), _CategoryGoods2 = _interopRequireDefault(_CategoryGoods), _HotCates = require("./home/HotCates.js"), _HotCates2 = _interopRequireDefault(_HotCates), _Nearby = require("./home/Nearby.js"), _Nearby2 = _interopRequireDefault(_Nearby), _PhoneRecovery = require("./home/PhoneRecovery.js"), _PhoneRecovery2 = _interopRequireDefault(_PhoneRecovery), _SearchBox = require("./home/SearchBox.js"), _SearchBox2 = _interopRequireDefault(_SearchBox), _SelfBusinesses = require("./home/SelfBusinesses.js"), _SelfBusinesses2 = _interopRequireDefault(_SelfBusinesses), _TabsPhone = require("./home/TabsPhone.js"), _TabsPhone2 = _interopRequireDefault(_TabsPhone), _CommonCardA = require("./home/CommonCardA.js"), _CommonCardA2 = _interopRequireDefault(_CommonCardA), _CommonCardB = require("./home/CommonCardB.js"), _CommonCardB2 = _interopRequireDefault(_CommonCardB), _Banners = require("./../Banners.js"), _Banners2 = _interopRequireDefault(_Banners), _decorators = require("./../../lib/decorators.js"), _operationKit = require("./../../lib/operationKit.js"), _handleImg = require("./../../lib/handleImg.js"), _handleImg2 = _interopRequireDefault(_handleImg), _SlideBar = require("./home/SlideBar.js"), _SlideBar2 = _interopRequireDefault(_SlideBar), _wxPromise = require("./../../lib/wxPromise.js"), _entryInfo = require("./../../store/entryInfo.js"), _entryInfo2 = _interopRequireDefault(_entryInfo), timestamp = 0, _default = (_dec = (0, 
_decorators.withErrToast)({
    defaultMsg: "获取数据失败"
}), _class = function(e) {
    function t() {
        var e, a, r, o, n;
        _classCallCheck(this, t);
        for (var s = arguments.length, i = Array(s), c = 0; c < s; c++) i[c] = arguments[c];
        return r = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(i))), 
        o.props = {
            unreadMessage: {
                type: Number
            }
        }, o.data = {
            topTabs: [ {
                title: "卖二手",
                id: "sell",
                showLog: "SELLVIEW",
                clickLog: "SELLTABCLK"
            }, {
                title: "淘好货",
                id: "buy",
                showLog: "GOODSBUYVIEW",
                clickLog: "GOODSBUYTABCLK"
            } ],
            activeTopTabId: "",
            tiles: [],
            hotCatesTitle: "这些二手最好卖",
            hotCates: [],
            nearbyData: {},
            oldPhoneRecycle: {},
            phoneModel: "",
            searchBox: {
                placeholder: ""
            },
            selfBusinesses: [],
            phoneCardData: [],
            headSetCardData: [],
            headSetCardPanelLogAction: "95NEWPADCARDCLK",
            headSetCardMoreLogAction: "95NEWPADALLCLK",
            booksBanners: [],
            usedBookCardData: [],
            bookImgWidth: 210,
            bookImgHeight: 290,
            usedBookCardPanelLogAction: "REALSECONDBOOKCARDCLK",
            usedBookCardMoreLogAction: "REALSECONDBOOKALLCLK",
            banners: [],
            bannerLogs: {
                bannerShow: "",
                bannerClick: "NEWBANNERCLK",
                getBackup: function(e, t) {
                    return {
                        rank: t + 1
                    };
                }
            },
            categorys: [],
            dataUrl: "",
            correctLinkHandler: function(e) {
                var t = o.$invoke("./PhoneRecovery", "getModel");
                return e = e.replace("${xinghao}", t), e = e.replace("%24%7Bxinghao%7D", encodeURIComponent(t));
            },
            newManData: {},
            sellingData: {},
            isIphoneX: !1,
            logInfo: {
                defaultTab: ""
            }
        }, o.methods = {
            onPostBtn: function() {
                _wxPromise.wxPromise.navigateTo({
                    url: "/pages/post/post?pageChannel=homeTab"
                }), this.$log("POSTBUTTONCLK");
            },
            onTouchEnd: function(e) {
                this.$broadcast("onTouchEnd", e);
            }
        }, o.watch = (a = {
            activeTopTabId: function(e, t) {
                "" !== t && "buy" === e && this.$invoke("CategoryGoods", "initPage");
            }
        }, _applyDecoratedDescriptor(a, "activeTopTabId", [ _decorators.errSafe ], Object.getOwnPropertyDescriptor(a, "activeTopTabId"), a), 
        a), o.$repeat = {}, o.$props = {
            TopTabs: {
                "xmlns:v-bind": "",
                "v-bind:tabs.sync": "topTabs",
                "v-bind:activeTabId.sync": "activeTopTabId",
                "v-bind:unreadMessage.sync": "unreadMessage"
            },
            Tiles: {
                "v-bind:tiles.sync": "tiles",
                "v-bind:correctLinkHandler.sync": "correctLinkHandler"
            },
            NewManTile: {
                "v-bind:dataObj.sync": "newManData"
            },
            Nearby: {
                "v-bind:nearbyData.sync": "nearbyData"
            },
            LatestSelling: {
                "v-bind:dataObj.sync": "sellingData"
            },
            HotCates: {
                "v-bind:title.sync": "hotCatesTitle",
                "v-bind:entries.sync": "hotCates"
            },
            PhoneRecovery: {
                "v-bind:phoneRecoveryData.sync": "oldPhoneRecycle",
                "v-bind:correctLinkHandler.sync": "correctLinkHandler"
            },
            SearchBox: {
                "v-bind:searchBox.sync": "searchBox"
            },
            SelfBusinesses: {
                "v-bind:cards.sync": "selfBusinesses"
            },
            Banners: {
                "v-bind:banners.sync": "banners",
                "v-bind:logs.once": "bannerLogs",
                class: "indexBanners"
            },
            CategoryGoods: {
                "v-bind:tabs.sync": "categorys",
                "v-bind:bookData.sync": "usedBookCardData"
            },
            TabsPhone: {
                "v-bind:phoneCardData.sync": "phoneCardData"
            },
            HeadSet: {
                "xmlns:wx": "",
                "v-bind:cardData.sync": "headSetCardData",
                "v-bind:moreLogAction.once": "headSetCardMoreLogAction",
                "v-bind:panelLogAction.once": "headSetCardPanelLogAction"
            },
            UsedBook: {
                "v-bind:cardData.sync": "usedBookCardData",
                "v-bind:imgWidth.once": "bookImgWidth",
                "v-bind:imgHeight.once": "bookImgHeight",
                "v-bind:moreLogAction.once": "usedBookCardMoreLogAction",
                "v-bind:panelLogAction.once": "usedBookCardPanelLogAction"
            },
            SlideBar: {
                "v-bind:unreadMessage.sync": "unreadMessage"
            }
        }, o.$events = {}, o.components = {
            LaunchScreen: _LaunchScreen2.default,
            TopTabs: _TopTabs2.default,
            Tiles: _Tiles2.default,
            NewManTile: _NewManTile2.default,
            Nearby: _Nearby2.default,
            LatestSelling: _LatestSelling2.default,
            HotCates: _HotCates2.default,
            PhoneRecovery: _PhoneRecovery2.default,
            SearchBox: _SearchBox2.default,
            SelfBusinesses: _SelfBusinesses2.default,
            Banners: _Banners2.default,
            CategoryGoods: _CategoryGoods2.default,
            TabsPhone: _TabsPhone2.default,
            HeadSet: _CommonCardA2.default,
            UsedBook: _CommonCardB2.default,
            SlideBar: _SlideBar2.default
        }, o.$logPageCommonBackup = function() {
            return {
                defaultTab: o.logInfo.defaultTab
            };
        }, n = r, _possibleConstructorReturn(o, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "pullData",
        value: function() {
            function e(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t) {
                var a, r = t.context;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.$httpWithLogin({
                            url: this.dataUrl
                        });

                      case 2:
                        if (a = e.sent, 0 == a.respCode) {
                            e.next = 5;
                            break;
                        }
                        return e.abrupt("return", a.errMsg || "服务异常，请稍后重试");

                      case 5:
                        return this.setComponentData(a.respData, {
                            context: r
                        }), "buy" == this.activeTopTabId && this.$invoke("CategoryGoods", "initPage"), e.abrupt("return", "ok");

                      case 8:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "getBooksBannerList",
        value: function() {
            var e = this;
            this.$httpWithLogin({
                url: "https://app.zhuanzhuan.com/zzopen/sellbook/getBookListInfoList",
                method: "GET",
                success: function(t) {
                    if (e.selectCateId == e.bookCateId) {
                        var a = t.data;
                        0 == a.respCode && a.respData && a.respData.bookLists && a.respData.bookLists.length && (e.usedBookCardData.bannersList = a.respData.bookLists, 
                        e.$apply());
                    }
                }
            });
        }
    }, {
        key: "initPage",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, a;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return this.$root.api.showPageLoading(), t = void 0, a = "https://app.zhuanzhuan.com/zzopen/mainminiapp/weixinIndexConfig", 
                        e.prev = 2, e.next = 5, this.getQueryStr();

                      case 5:
                        t = e.sent, e.next = 10;
                        break;

                      case 8:
                        e.prev = 8, e.t0 = e.catch(2);

                      case 10:
                        return t && (a = a + "?" + t), this.dataUrl = a, e.next = 14, this.pullData({
                            context: "init"
                        });

                      case 14:
                        this.getBooksBannerList();

                      case 15:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 2, 8 ] ]);
            }));
            return e;
        }()
    }, {
        key: "refreshPage",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.pullData({
                            context: "refresh"
                        });

                      case 2:
                        this.getBooksBannerList(), this.$invoke("CategoryGoods", "initPage", !0);

                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "onPageTabActive",
        value: function() {
            function e(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t) {
                var a, r = this, o = t.init;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, o ? this.initPage() : this.refreshPage();

                      case 2:
                        a = this.topTabs.find(function(e) {
                            return e.id == r.activeTopTabId;
                        }), a.showLog && this.$log(a.showLog), this.$log("VIEW");

                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "parseDataLaunchScreen",
        value: function(e) {
            e.firstScreen && e.firstScreen.picUri && this.$invoke("LaunchScreen", "open", {
                pic: e.firstScreen.picUri,
                buttonPic: e.firstScreen.buttonPicUri,
                path: e.firstScreen.redirectUri,
                appId: e.firstScreen.appId,
                activityId: e.firstScreen.activityId
            });
        }
    }, {
        key: "parseDataTiles",
        value: function(e) {
            this.tiles = e.sellOldTab.fourSoldiers.children.map(function(e) {
                return {
                    icon: e.soldierIconUrl,
                    label: e.soldierLable,
                    title: e.soldierText,
                    href: e.soldierClickUrl,
                    appId: e.soldierClickAppId,
                    clickLog: e.soldierClickLog
                };
            });
        }
    }, {
        key: "parseDataHotCates",
        value: function(e) {
            this.hotCatesTitle = e.sellOldTab.sellOldCells.commonHeadText, this.hotCates = e.sellOldTab.sellOldCells.children.map(function(e) {
                return {
                    title: e.socTitle,
                    desc: e.socSubTitle,
                    action: e.commonBtnText,
                    pic: e.socPicUrl,
                    href: e.commonBtnClickUrl
                };
            });
        }
    }, {
        key: "parseDataSearchBox",
        value: function(e) {
            this.searchBox = {
                placeholder: e.pickGoodsTab.placeHolder.scPlaceHolderText
            };
        }
    }, {
        key: "parseDataSelfBusinesses",
        value: function(e) {
            this.selfBusinesses = e.pickGoodsTab.tiles.children.map(function(e) {
                return {
                    icon: e.tlIconUrl,
                    title: e.tlTitle,
                    desc: e.tlDescription,
                    href: e.tlClickUrl,
                    clickLog: e.tlClickLog
                };
            });
        }
    }, {
        key: "parseDataPhoneCard",
        value: function(e) {
            var t = e.pickGoodsTab.selfSupportGoods;
            this.phoneCardData = t && t.length ? t[0] : [];
        }
    }, {
        key: "parseHeadSetCardData",
        value: function(e) {
            var t = e.pickGoodsTab.selfSupportGoods, a = t && t.length ? t[1] : [];
            a && (a.goodsList = a.selfSupportGoodList.map(function(e) {
                return {
                    goodImg: _handleImg2.default.handleSingle(e.goodImg, 180, 180),
                    goodName: e.goodTitle,
                    goodPrice: parseInt(e.goodMinPrice / 100),
                    jumpUrl: e.jumpUrl
                };
            })), this.headSetCardData = a;
        }
    }, {
        key: "parseUsedBookCardData",
        value: function(e) {
            var t = e.pickGoodsTab.selfSupportGoods, a = t && t.length ? t[2] : [];
            a && (a.goodsList = a.selfSupportGoodList.map(function(e) {
                return {
                    goodImg: _handleImg2.default.handleSingle(e.goodImg, 210, 290),
                    goodName: e.goodTitle,
                    goodPrice: parseInt(e.goodMinPrice / 100),
                    jumpUrl: "https://wxzhuanzhuan.58.com/Mzhuanzhuan/ZZBook/#/Book/Detail?infoId=" + e.infoId + "&bookMetric=" + e.metric + "&from=wechatApp-index-card"
                };
            })), this.usedBookCardData = a;
        }
    }, {
        key: "parseDataBanners",
        value: function(e) {
            this.banners = e.pickGoodsTab.ztOperations.children.map(function(e) {
                return {
                    pic: e.ztPicUrl,
                    path: e.ztClickUrl,
                    appId: e.ztClickAppId
                };
            });
        }
    }, {
        key: "parseDataCategories",
        value: function(e) {
            this.categorys = [ {
                tabCatName: "附近",
                tabCatId: 1
            } ].concat(e.pickGoodsTab.categorys.children);
        }
    }, {
        key: "parseDataSellTab",
        value: function(e) {
            this.parseDataTiles(e), this.nearbyData = Object.assign({}, e.sellOldTab.priceShow || {}), 
            this.oldPhoneRecycle = Object.assign({}, e.sellOldTab.oldPhoneRecycle), this.oldPhoneRecycle.phoneModel = this.phoneModel, 
            this.newManData = e.sellOldTab.operating, this.sellingData = e.sellOldTab.justToSell, 
            "sell" === this.activeTopTabId && (this.$apply(), this.$root.api.hidePageLoading()), 
            this.parseDataHotCates(e);
        }
    }, {
        key: "parseDataBuyTab",
        value: function(e) {
            this.parseDataSearchBox(e), this.parseDataSelfBusinesses(e), this.parseDataBanners(e), 
            this.parseDataPhoneCard(e), this.parseUsedBookCardData(e), "buy" === this.activeTopTabId && (this.$apply(), 
            this.$root.api.hidePageLoading()), this.parseHeadSetCardData(e), this.parseDataCategories(e);
        }
    }, {
        key: "setComponentData",
        value: function(e, t) {
            var a = t.context;
            this.activeTopTabId || (this.activeTopTabId = "PICKGOODS" == e.defaultTab ? "buy" : "sell"), 
            this.logInfo.defaultTab = this.activeTopTabId, "init" === a && this.parseDataLaunchScreen(e), 
            "sell" === this.activeTopTabId ? (this.parseDataSellTab(e), this.parseDataBuyTab(e)) : (this.parseDataBuyTab(e), 
            this.parseDataSellTab(e)), this.$apply();
        }
    }, {
        key: "getQueryStr",
        value: function() {
            var e = this;
            return this.getPhoneModel().then(function(t) {
                var a = {
                    deviceModel: t,
                    entryChannel: _entryInfo2.default.channel
                };
                return e.phoneModel = t, Promise.resolve(_querystring2.default.stringify(a));
            });
        }
    }, {
        key: "getPhoneModel",
        value: function() {
            return new Promise(function(e, t) {
                wx.getSystemInfo({
                    success: function(t) {
                        var a = t.model.split("<")[0];
                        a.includes("iPhone 8") ? a = "iPhone 8" : a.includes("iPhone X") && (a = "iPhone X"), 
                        e(a);
                    },
                    fail: function() {
                        e(void 0);
                    }
                });
            });
        }
    }, {
        key: "pullMoreGoods",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        "buy" == this.activeTopTabId && this.$invoke("CategoryGoods", "pullMoreGoods");

                      case 1:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "onReachBottom",
        value: function(e) {
            "buy" == this.activeTopTabId && this.$invoke("CategoryGoods", "pullMoreGoods");
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
                        return e.prev = 0, e.next = 3, Promise.all([ this.refreshPage(), (0, _operationKit.delay)(500) ]);

                      case 3:
                        e.next = 8;
                        break;

                      case 5:
                        e.prev = 5, e.t0 = e.catch(0), console.error(e.t0);

                      case 8:
                        wx.stopPullDownRefresh();

                      case 9:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 0, 5 ] ]);
            }));
            return e;
        }()
    }, {
        key: "onShareAppMessage",
        value: function() {
            var e = this;
            return {
                title: "买卖二手，省钱又赚钱！转转，一个帮你赚钱的网站！",
                path: "/pages/index/index",
                imageUrl: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/index/index_share.jpeg",
                success: function() {
                    e.$log("HOME-SHARE");
                }
            };
        }
    }, {
        key: "onLoad",
        value: function() {
            this.isIphoneX = this.$root.$parent.globalData.isIphoneX;
        }
    } ]), t;
}(_wepy2.default.component), _applyDecoratedDescriptor(_class.prototype, "pullData", [ _dec ], Object.getOwnPropertyDescriptor(_class.prototype, "pullData"), _class.prototype), 
_applyDecoratedDescriptor(_class.prototype, "parseDataLaunchScreen", [ _decorators.errSafe ], Object.getOwnPropertyDescriptor(_class.prototype, "parseDataLaunchScreen"), _class.prototype), 
_applyDecoratedDescriptor(_class.prototype, "parseDataTiles", [ _decorators.errSafe ], Object.getOwnPropertyDescriptor(_class.prototype, "parseDataTiles"), _class.prototype), 
_applyDecoratedDescriptor(_class.prototype, "parseDataHotCates", [ _decorators.errSafe ], Object.getOwnPropertyDescriptor(_class.prototype, "parseDataHotCates"), _class.prototype), 
_applyDecoratedDescriptor(_class.prototype, "parseDataSearchBox", [ _decorators.errSafe ], Object.getOwnPropertyDescriptor(_class.prototype, "parseDataSearchBox"), _class.prototype), 
_applyDecoratedDescriptor(_class.prototype, "parseDataSelfBusinesses", [ _decorators.errSafe ], Object.getOwnPropertyDescriptor(_class.prototype, "parseDataSelfBusinesses"), _class.prototype), 
_applyDecoratedDescriptor(_class.prototype, "parseDataPhoneCard", [ _decorators.errSafe ], Object.getOwnPropertyDescriptor(_class.prototype, "parseDataPhoneCard"), _class.prototype), 
_applyDecoratedDescriptor(_class.prototype, "parseHeadSetCardData", [ _decorators.errSafe ], Object.getOwnPropertyDescriptor(_class.prototype, "parseHeadSetCardData"), _class.prototype), 
_applyDecoratedDescriptor(_class.prototype, "parseUsedBookCardData", [ _decorators.errSafe ], Object.getOwnPropertyDescriptor(_class.prototype, "parseUsedBookCardData"), _class.prototype), 
_applyDecoratedDescriptor(_class.prototype, "parseDataBanners", [ _decorators.errSafe ], Object.getOwnPropertyDescriptor(_class.prototype, "parseDataBanners"), _class.prototype), 
_applyDecoratedDescriptor(_class.prototype, "parseDataCategories", [ _decorators.errSafe ], Object.getOwnPropertyDescriptor(_class.prototype, "parseDataCategories"), _class.prototype), 
_applyDecoratedDescriptor(_class.prototype, "parseDataSellTab", [ _decorators.errSafe ], Object.getOwnPropertyDescriptor(_class.prototype, "parseDataSellTab"), _class.prototype), 
_applyDecoratedDescriptor(_class.prototype, "parseDataBuyTab", [ _decorators.errSafe ], Object.getOwnPropertyDescriptor(_class.prototype, "parseDataBuyTab"), _class.prototype), 
_applyDecoratedDescriptor(_class.prototype, "pullMoreGoods", [ _decorators.noConcurrent ], Object.getOwnPropertyDescriptor(_class.prototype, "pullMoreGoods"), _class.prototype), 
_class);

exports.default = _default;