function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function i(o, s) {
                try {
                    var n = t[o](s), r = n.value;
                } catch (e) {
                    return void a(e);
                }
                if (!n.done) return Promise.resolve(r).then(function(e) {
                    i("next", e);
                }, function(e) {
                    i("throw", e);
                });
                e(r);
            }
            return i("next");
        });
    };
}

function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a;
    }
    return Array.from(e);
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

function _applyDecoratedDescriptor(e, t, a, i, o) {
    var s = {};
    return Object.keys(i).forEach(function(e) {
        s[e] = i[e];
    }), s.enumerable = !!s.enumerable, s.configurable = !!s.configurable, ("value" in s || s.initializer) && (s.writable = !0), 
    s = a.slice().reverse().reduce(function(a, i) {
        return i(e, t, a) || a;
    }, s), o && void 0 !== s.initializer && (s.value = s.initializer ? s.initializer.call(o) : void 0, 
    s.initializer = void 0), void 0 === s.initializer && (Object.defineProperty(e, t, s), 
    s = null), s;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _createClass = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, a, i) {
        return a && e(t.prototype, a), i && e(t, i), t;
    };
}(), _desc, _value, _class, _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _Tabs = require("./Tabs.js"), _Tabs2 = _interopRequireDefault(_Tabs), _wxPromise = require("./../../../lib/wxPromise.js"), _decorators = require("./../../../lib/decorators.js"), _adjustPic = require("./../../../lib/adjustPic.js"), _adjustPic2 = _interopRequireDefault(_adjustPic), _serviceConfig = require("./../../../data/serviceConfig.js"), _serviceConfig2 = _interopRequireDefault(_serviceConfig), _GoodsListPhone = require("./../../GoodsListPhone.js"), _GoodsListPhone2 = _interopRequireDefault(_GoodsListPhone), _GoodsListH = require("./../../GoodsListH.js"), _GoodsListH2 = _interopRequireDefault(_GoodsListH), _GoodsListBook = require("./../../GoodsListBook.js"), _GoodsListBook2 = _interopRequireDefault(_GoodsListBook), _PageFrame = require("./../../common/PageFrame.js"), _PageFrame2 = _interopRequireDefault(_PageFrame), _getLocation = require("./../../../lib/getLocation.js"), _getLocation2 = _interopRequireDefault(_getLocation), categoryTabsScrollTop = 1558, searchBarHeight = 96, panelTabHeight = 104, deviceInfo = {};

wx.getSystemInfo({
    success: function(e) {
        deviceInfo = e;
        var t = deviceInfo.windowWidth / 750;
        categoryTabsScrollTop *= t, searchBarHeight *= t, panelTabHeight *= t;
    }
});

var dataList = [], queue = [], key = "", hasInit = !1, _default = (_class = function(e) {
    function t() {
        var e, a, i, o;
        _classCallCheck(this, t);
        for (var s = arguments.length, n = Array(s), r = 0; r < s; r++) n[r] = arguments[r];
        return a = i = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(n))), 
        i.props = {
            tabs: {
                type: Array
            },
            bookData: {
                type: Array
            }
        }, i.data = {
            disablePanelSticky: !1,
            selectCateId: 113,
            subCates: [],
            allBtnConfig: {
                tabCatName: "全部",
                tabCatPicUrl: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/index/all.png?1",
                tabCatId: 0
            },
            booksBanners: [],
            bookCateId: 113,
            phoneCateId: 101,
            phoneTopList: [],
            nearCateId: 1,
            gameCateId: 123,
            showBackTop: !1,
            goodsListScrollTop: 600,
            searchBarHeight: 48,
            panelTabHeight: 96,
            goodsListScrollTopOffset: 100,
            goodsList: [],
            scrollTop: "",
            isLoading: !1,
            isEmpty: !1,
            isEnd: !1,
            redirect: !1,
            isNew: !1,
            tipText: "加载中…",
            endText: "没有更多了",
            goodsCardType: 0,
            fetchTime: 0,
            fetchTimeLimit: 500,
            elasticStart: 0,
            itemHeight: 311,
            pageNum: 1,
            pageSize: 20,
            elastic: !0,
            preLoadPageNum: 2,
            rangePageNum: 4,
            imgLazyLoadKey: "pic|cover|picUrl",
            showPlaceholder: !1,
            waitingData: !1
        }, i.methods = {
            goToBookList: function(e) {
                var t = "https://wxzhuanzhuan.58.com/Mzhuanzhuan/ZZBook/?listId=" + e + "#/TopicPage";
                _wxPromise.wxPromise.navigateTo({
                    url: "/pages/webview/webview?url=" + encodeURIComponent(t)
                }), this.$log("BOOKLISTCLK");
            },
            backTopHandler: function() {
                this.backTop();
            },
            changeCate: function(e) {
                e.parentCateId ? _wxPromise.wxPromise.navigateTo({
                    url: "/pages/category/allCatesSub?cateId=" + e.parentCateId + "&cateName=" + e.parentCateName
                }) : _wxPromise.wxPromise.navigateTo({
                    url: "/pages/list/list?cate=" + e.tabCatId + "&cateName=" + e.tabCatName + "&metricType=weixin_getCateInfoList_level_2"
                });
            },
            onGoodClick: function(e) {
                e.jumpUrl && (/^http/.test(e.jumpUrl) ? _wxPromise.wxPromise.navigateTo({
                    url: "/pages/webview/webview?url=" + encodeURIComponent(e.jumpUrl)
                }) : _wxPromise.wxPromise.navigateTo({
                    url: e.jumpUrl.replace(/^pages/, "/pages")
                }));
            }
        }, i.events = {
            onTouchEnd: function(e) {
                this.checkBackTop(e);
            }
        }, i.$repeat = {}, i.$props = {
            Tabs: {
                "xmlns:v-bind": "",
                "v-bind:tabClick.once": "onTabClick",
                "v-bind:tabs.sync": "tabs"
            },
            GoodsList: {
                class: "elasticList",
                "v-bind:goodsList.sync": "goodsList",
                "v-bind:clickItemHandler.once": "clickHandler",
                "v-bind:redirect.once": "redirect"
            },
            GoodsListBook: {
                class: "elasticList",
                "v-bind:goodsList.sync": "goodsList",
                "v-bind:clickItemHandler.once": "clickHandler",
                "v-bind:redirect.once": "redirect"
            },
            GoodsListPhone: {
                class: "elasticList",
                "v-bind:goodsList.sync": "phoneTopList",
                "v-bind:clickItemHandler.once": "clickHandler",
                "v-bind:redirect.once": "redirect"
            }
        }, i.$events = {}, i.components = {
            Tabs: _Tabs2.default,
            PageFrame: _PageFrame2.default,
            GoodsList: _GoodsListH2.default,
            GoodsListBook: _GoodsListBook2.default,
            GoodsListPhone: _GoodsListPhone2.default
        }, o = a, _possibleConstructorReturn(i, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onCateSelected",
        value: function(e) {
            var t = this;
            this.selectCateId = e, this.goodsList = [], this.subCates = [], this.waitingData = !0, 
            this.$apply(), e == this.bookCateId ? this.goodsCardType = 2 : e == this.nearCateId ? this.goodsCardType = 0 : (this.goodsCardType = 0, 
            this.subCates = this.tabs.find(function(t) {
                return t.tabCatId == e;
            }), this.allBtnConfig.parentCateId = this.subCates.tabCatId, this.allBtnConfig.parentCateName = this.subCates.tabCatName, 
            this.subCates = this.subCates.children.filter(function(e) {
                return !!e.tabIsRecommend;
            }).slice(0, 7).concat([ this.allBtnConfig ])), e == this.phoneCateId && this.getPhoneTopList(), 
            this.pageNum = 1, this.$apply();
            var a = Object.assign({}, dataList[this.selectCateId]);
            a && a.data && a.data.length ? this.queueEmpty(function() {
                t.pageNum = a.pageNum, t.goodsList = a.data, t.waitingData = !1, t.$apply();
            }) : this.loadGoods(1, !0), hasInit ? this.backCateTop() : hasInit = !0;
        }
    }, {
        key: "emptyGoodList",
        value: function() {
            this.goodsList = [], this.$apply();
        }
    }, {
        key: "emptySubCates",
        value: function() {
            this.subCates = [], this.$apply();
        }
    }, {
        key: "onTabClick",
        value: function(e) {
            var t = this, a = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i = this.selectCateId;
            1 == e ? (_getLocation2.default.call(this, {
                systemDisableTip: "转转发现你关闭了微信的“定位服务”，导致获取不了你的地理位置，请去手机“设置-应用授权”里打开",
                authFailTip: "请开启“定位服务”哦，以便转转帮你发现身边的好货~",
                success: function(a) {
                    t.$root.$parent.globalData = t.$root.$parent.globalData || {}, t.$root.$parent.globalData.latitude = a.latitude, 
                    t.$root.$parent.globalData.longitude = a.longitude, t.$apply(), t.onCateSelected(e);
                },
                fail: function() {
                    t.isFirstQueryPosition && wx.showModal({
                        content: "拒绝定位会导致部分功能不可用。如需授权请点击右上角【...】-【关于转转官方】- 右上角【...】-【设置】-打开地理位置",
                        showCancel: !1,
                        confirmText: "知道了"
                    }), t.$broadcast("setTab", i);
                }
            }), a && this.$log("NEARBYTABCLK"), this.$log("NEARBYTABSHOW")) : (this.queueEmpty(), 
            setTimeout(function() {
                t.onCateSelected(e);
            }, 100), a && this.$log("CATEGORYCLK", null, {
                cateid: e
            }), this.$log("CATEGORYSHOW", null, {
                cateid: e
            }));
        }
    }, {
        key: "clickTab",
        value: function(e, t) {
            this.selectCateId = e, this.$apply(), this.$broadcast("setTab", this.selectCateId), 
            this.onTabClick(e, t);
        }
    }, {
        key: "clickHandler",
        value: function(e) {
            this.$log("CATEGOODSCLK");
        }
    }, {
        key: "backTop",
        value: function() {
            var e = this;
            this.disablePanelSticky = !0, this.showBackTop = !1, this.$apply(), wx.pageScrollTo && wx.pageScrollTo({
                scrollTop: 0,
                duration: 10
            }), setTimeout(function() {
                e.disablePanelSticky = !1, e.$apply();
            }, 300);
        }
    }, {
        key: "backCateTop",
        value: function() {
            if (this.showBackTop = !1, this.$apply(), wx.pageScrollTo) {
                var e = categoryTabsScrollTop + panelTabHeight + searchBarHeight;
                wx.pageScrollTo({
                    scrollTop: parseInt(e),
                    duration: 100
                });
            }
        }
    }, {
        key: "formatListData",
        value: function(e) {
            e.map(function(e) {
                e.pic = _adjustPic2.default.handleSingle(e.infoImage.split("|")[0], 320, 320), e.lazyImg = !0, 
                e.desc = e.desc.replace(/\r\n/g, " "), e.desc = e.desc.replace("\b", ""), e.desc = e.desc.replace("\t", ""), 
                e.desc = e.desc.replace("\n", ""), e.desc = e.desc.replace("\v", ""), e.desc = e.desc.replace("\f", ""), 
                e.desc = e.desc.replace("\r", ""), e.desc = e.desc.replace('"', ""), e.desc = e.desc.replace("'", ""), 
                e.desc = e.desc.replace("\\", ""), e.desc = e.desc.replace(" ", ""), e.desc = e.desc.replace("\u2028", ""), 
                e.desc = e.desc.replace("\u2029", ""), e.desc = e.desc.replace("\ufeff", "");
            });
        }
    }, {
        key: "formatBookListData",
        value: function(e) {
            e.map(function(e) {
                e.sellPrice = Math.floor(parseInt(e.sellPrice) / 100), e.price = Math.floor(parseInt(e.price) / 100), 
                e.lazyImg = !0;
            });
        }
    }, {
        key: "formattedGoods",
        value: function(e) {
            var t = this;
            return e.map(function(e, a) {
                var i = JSON.stringify(e.labels || "");
                return e.isNew = i.indexOf("777789291349671938") > -1, e.title = "101" != e.parentCate ? e.tinyTitle + "。" + e.desc : e.tinyTitle, 
                e.infoLabels = t.determineInfoLabels(e), e.paraNames = e.paraNames ? e.paraNames.split("|") : [], 
                e;
            });
        }
    }, {
        key: "determineInfoLabels",
        value: function(e) {
            var t = e.isNew ? {
                icon: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/common/infoLabels/brandNew.png",
                w: 60,
                h: 30
            } : "";
            return [ e.labels && e.labels.infoLabels && e.labels.infoLabels.length && e.labels.infoLabels.some(function(e) {
                return "834395700687935820" == e.labelId;
            }) ? {
                icon: "https://img.58cdn.com.cn/zhuanzhuan/zz/labels/yiyanji@2x.png",
                w: 105,
                h: 30
            } : "" ].concat(_toConsumableArray(e.serviceIds && e.serviceIds.map(function(e) {
                return _serviceConfig2.default.serviceLabel(e);
            }) || []), [ t ]).filter(function(e) {
                return e && e.icon;
            }).slice(0, 1);
        }
    }, {
        key: "queueHandle",
        value: function(e, t, a) {
            var i = this;
            1 == t ? this.queueEmpty(function() {
                i.queueStart(e, t, a);
            }) : this.queueStart(e, t, a);
        }
    }, {
        key: "queueStart",
        value: function(e, t, a) {
            dataList[this.selectCateId] = dataList[this.selectCateId] || {
                pageNum: t,
                data: []
            }, queue = [].concat(e), this.queueRun(a);
        }
    }, {
        key: "dataListAdd",
        value: function(e) {
            dataList[this.selectCateId].data = dataList[this.selectCateId].data.concat(e);
        }
    }, {
        key: "queueEmpty",
        value: function(e) {
            queue = [], this.goodsList = [], this.$apply(), e && e.call(this);
        }
    }, {
        key: "queueRun",
        value: function(e) {
            var t = this;
            if (queue.length <= 0) return void (e && e.call(this));
            for (var a = {}, i = Math.min(5, queue.length), o = dataList[this.selectCateId].data.length, s = dataList[this.selectCateId].data.length + i, n = o; n < s; n++) {
                var r = queue.shift();
                a[key + "[" + n + "]"] = r, this.dataListAdd(r);
            }
            this.$wxpage.setData(a, function() {
                t.queueRun(e);
            });
        }
    }, {
        key: "loadGoods",
        value: function(e) {
            var t = this, a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            if ((!this.isLoading || a) && (this.isEnd = 1 != e && this.isEnd, !this.isEnd || a)) {
                var i = this.$root.$parent.globalData, o = {
                    cityId: "",
                    minprice: "",
                    price: "",
                    sortby: 0
                };
                this.tipText = "加载中…", this.isLoading = !0, this.$apply();
                var s = this.selectCateId == this.bookCateId, n = this.selectCateId == this.nearCateId, r = this.selectCateId == this.phoneCateId, c = void 0, l = {
                    lat: i.latitude,
                    lon: i.longitude,
                    cateid: this.selectCateId,
                    areaId: o.cityId,
                    areaid: o.cityId,
                    minprice: o.minprice,
                    maxprice: o.price,
                    sortpolicy: o.sortby,
                    pagenum: e,
                    pagesize: this.pageSize
                };
                s ? (c = "https://app.zhuanzhuan.com/zzopen/sellbook/homePageList", l = {
                    pageSize: this.pageSize,
                    cateId2: 2113008,
                    cateId3: 2113008001,
                    cateid: 113,
                    pageNum: e,
                    sortBy: 0
                }, key = "$SubPageHome$CategoryGoods$GoodsListBook$goodsList") : n ? (c = "https://app.zhuanzhuan.com/zzopen/mainminiapp/getNearInfoList", 
                l.cateid = "", l.metricType = "weixin_getNearInfoList_buy", key = "$SubPageHome$CategoryGoods$GoodsList$goodsList") : r ? (c = "https://app.zhuanzhuan.com/zzopen/mainminiapp/getPhoneCateInfoList", 
                l.filteritemids = 1006, key = "$SubPageHome$CategoryGoods$GoodsList$goodsList") : (c = "https://app.zhuanzhuan.com/zzopen/mainminiapp/getCateInfoList", 
                l.metricType = "weixin_getCateInfoList_level_1", key = "$SubPageHome$CategoryGoods$GoodsList$goodsList"), 
                this.$http({
                    url: c,
                    data: l,
                    method: "GET",
                    header: {
                        cookie: "v=3.3;"
                    },
                    dataType: "json",
                    success: function(a) {
                        if (t.selectCateId == l.cateid || !l.cateid) {
                            if (0 != a.data.respCode) return void t.$toast({
                                title: a.data.errMsg || "对不起，没有合适的数据~",
                                type: "fail",
                                duration: 2e3
                            });
                            var i = s ? a.data.respData.list : a.data.respData.infos;
                            s || (i = t.formattedGoods(i)), i && Array.isArray(i) && 0 == i.length && (t.tipText = "没有更多了", 
                            t.isEnd = !0), i.length ? (s ? t.formatBookListData(i) : t.formatListData(i), t.queueHandle(i, e, function() {
                                t.waitingData = !1, t.goodsList = 1 == e ? i : t.goodsList.concat(i), t.$apply();
                            }), t.isEmpty = !1, t.pageNum = e, t.$apply()) : 1 == e && (t.isEmpty = !0, t.goodsList = []), 
                            t.$apply();
                        }
                    },
                    complete: function() {
                        t.isLoading = !1, t.$apply();
                    }
                });
            }
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
                        this.loadGoods(this.pageNum + 1);

                      case 1:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "checkBackTop",
        value: function(e) {
            if (wx.pageScrollTo) {
                var t = 0;
                try {
                    t = e.changedTouches[0].pageY;
                } catch (e) {}
                var a = t > categoryTabsScrollTop + deviceInfo.screenHeight;
                a != this.showBackTop && (this.showBackTop = a, this.$apply());
            }
        }
    }, {
        key: "getPhoneTopList",
        value: function() {
            var e = this;
            this.$httpWithLogin({
                url: "https://app.zhuanzhuan.com/zzopen/mainminiapp/getPhoneCateList",
                method: "GET",
                success: function(t) {
                    if (e.selectCateId == e.phoneCateId) {
                        var a = t.data;
                        0 == a.respCode && a.respData && a.respData && a.respData.length && (e.phoneTopList = a.respData.map(function(e) {
                            return /^\/\//.test(e.picUrl) && (e.picUrl = "https:" + e.picUrl), e;
                        }), e.$apply());
                    }
                }
            });
        }
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
                        0 == a.respCode && a.respData && a.respData.bookLists && a.respData.bookLists.length && (e.booksBanners = a.respData.bookLists, 
                        e.$apply());
                    }
                }
            });
        }
    }, {
        key: "initPage",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            if (!hasInit || e) {
                hasInit = !1;
                var t = this.tabs.filter(function(e) {
                    return e.tabIsDefault;
                });
                t = t ? t[0].tabCatId : [ this.bookCateId, this.phoneCateId ][parseInt(10 * Math.random() % 2)], 
                this.clickTab(t, !1);
            }
        }
    } ]), t;
}(_wepy2.default.component), _applyDecoratedDescriptor(_class.prototype, "pullMoreGoods", [ _decorators.noConcurrent ], Object.getOwnPropertyDescriptor(_class.prototype, "pullMoreGoods"), _class.prototype), 
_class);

exports.default = _default;