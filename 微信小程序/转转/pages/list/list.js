function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
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

Object.defineProperty(exports, "__esModule", {
    value: !0
});

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
}(), _get = function e(t, a, i) {
    null === t && (t = Function.prototype);
    var o = Object.getOwnPropertyDescriptor(t, a);
    if (void 0 === o) {
        var n = Object.getPrototypeOf(t);
        return null === n ? void 0 : e(n, a, i);
    }
    if ("value" in o) return o.value;
    var s = o.get;
    if (void 0 !== s) return s.call(i);
}, _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _filter = require("./../../components/list/filter.js"), _filter2 = _interopRequireDefault(_filter), _SubcatePannel = require("./../../components/list/SubcatePannel.js"), _SubcatePannel2 = _interopRequireDefault(_SubcatePannel), _adjustPic = require("./../../lib/adjustPic.js"), _adjustPic2 = _interopRequireDefault(_adjustPic), _serviceConfig = require("./../../data/serviceConfig.js"), _serviceConfig2 = _interopRequireDefault(_serviceConfig), _GoodsListH = require("./../../components/GoodsListH.js"), _GoodsListH2 = _interopRequireDefault(_GoodsListH), _GoodsListBook = require("./../../components/GoodsListBook.js"), _GoodsListBook2 = _interopRequireDefault(_GoodsListBook), _PageFrame = require("./../../components/common/PageFrame.js"), _PageFrame2 = _interopRequireDefault(_PageFrame), _getLocation = require("./../../lib/getLocation.js"), _getLocation2 = _interopRequireDefault(_getLocation), _wxPromise = require("./../../lib/wxPromise.js"), _ElasticList = require("./../../components/ElasticList.js"), _ElasticList2 = _interopRequireDefault(_ElasticList), deviceInfo = {};

wx.getSystemInfo({
    success: function(e) {
        deviceInfo = e;
    }
});

var List = function(e) {
    function t() {
        var e, a, i, o;
        _classCallCheck(this, t);
        for (var n = arguments.length, s = Array(n), r = 0; r < n; r++) s[r] = arguments[r];
        return a = i = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(s))), 
        i.config = {
            navigationBarTitleText: " "
        }, i.$repeat = {}, i.$props = {
            filter: {
                class: "list-filter",
                "xmlns:v-on": "",
                "xmlns:v-bind": "",
                "v-bind:initCate.sync": "initCate",
                "v-bind:deleteCates.once": "deleteCates"
            },
            GoodsList: {
                class: "elasticList",
                "v-bind:goodsList.sync": "goodsList",
                "v-bind:clickItemHandler.once": "clickHandler",
                "v-bind:redirect.once": "redirect"
            },
            SubcatePannel: {
                "v-bind:cateData.sync": "subCateData"
            },
            ElasticList: {
                "v-bind:listData.sync": "goodsList",
                "v-bind:loadHandle.sync": "loadGoods",
                "v-bind:pageNum.sync": "pageNum",
                "v-bind:listStartScrollTop.sync": "elasticStart",
                "v-bind:itemHeight.once": "itemHeight",
                "v-bind:pageSize.sync": "pageSize",
                "v-bind:elastic.once": "elastic",
                "v-bind:preLoadPageNum.once": "preLoadPageNum",
                "v-bind:rangePageNum.once": "rangePageNum",
                "v-bind:imgKey.once": "imgLazyLoadKey"
            },
            GoodsListBook: {
                class: "elasticList",
                "v-bind:goodsList.sync": "goodsList",
                "v-bind:clickItemHandler.once": "clickHandler",
                "v-bind:redirect.once": "redirect"
            }
        }, i.$events = {
            filter: {
                "v-on:open": "openHandler",
                "v-on:change": "filterChangeHandler"
            }
        }, i.components = {
            PageFrame: _PageFrame2.default,
            filter: _filter2.default,
            GoodsList: _GoodsListH2.default,
            SubcatePannel: _SubcatePannel2.default,
            ElasticList: _ElasticList2.default,
            GoodsListBook: _GoodsListBook2.default
        }, i.data = {
            showBackTop: !1,
            timeStamp: 0,
            deleteCates: [ "123" ],
            showPage: !1,
            popMask: !1,
            initCate: "",
            currentCate: "",
            cateName: "",
            keyword: "",
            goodsList: [],
            scrollTop: "",
            isLoading: !1,
            isAuthing: !1,
            pageType: "",
            isEmpty: !1,
            isEnd: !1,
            redirect: !1,
            filteritemids: void 0,
            isNew: !1,
            isOneCity: !1,
            isfreePost: !1,
            gpsId: 0,
            tipText: "加载中…",
            endText: "没有更多了",
            goodsCardType: 0,
            brandInfo: null,
            subCateData: [ {
                cateId: 2101018,
                image: "https://img.58cdn.com.cn/zhuanzhuan/bannericon/5855103240590492479pingguo@2x.png",
                name: "苹果"
            }, {
                cateId: 2101020,
                image: "https://img.58cdn.com.cn/zhuanzhuan/bannericon/7545641950734544876xiaomi@2x.png",
                name: "小米"
            }, {
                cateId: 2101012,
                image: "https://img.58cdn.com.cn/zhuanzhuan/bannericon/5843281291568623463OPPO@2x.png",
                name: "oppo"
            }, {
                cateId: 2101010,
                image: "https://img.58cdn.com.cn/zhuanzhuan/bannericon/5867910352030850711VIVO@2x.png",
                name: "vivo"
            }, {
                cateId: 2101002,
                image: "https://img.58cdn.com.cn/zhuanzhuan/bannericon/4312198155748225117huawei@2x.png",
                name: "华为"
            }, {
                cateId: 2101001,
                image: "https://img.58cdn.com.cn/zhuanzhuan/bannericon/4147676031877324711sanxing@2x.png",
                name: "三星"
            }, {
                cateId: 2101003,
                image: "https://img.58cdn.com.cn/zhuanzhuan/bannericon/5601916499038796962meizu@2x.png",
                name: "魅族"
            }, {
                cateId: 101,
                image: "https://img.58cdn.com.cn/zhuanzhuan/bannericon/2420827050526060940quanbu@3x.png",
                name: "全部手机",
                isParent: !0
            } ],
            elasticStart: 0,
            itemHeight: 311,
            pageNum: 1,
            pageSize: 40,
            elastic: !0,
            preLoadPageNum: 2,
            rangePageNum: 4,
            imgLazyLoadKey: "pic"
        }, i.methods = {
            brandClickHandler: function() {
                this.brandInfo && _wxPromise.wxPromise.navigateTo({
                    url: "/pages/webview/webview?url=" + encodeURIComponent(this.brandInfo.jumpUrl)
                });
            },
            moveStop: function() {},
            scrollEvent: function(e) {
                var t = new Date().getTime();
                if (!(t - this.timeStamp < 100)) {
                    this.timeStamp = t;
                    deviceInfo.windowWidth;
                    this.showBackTop = e.detail.scrollTop > deviceInfo.screenHeight, this.$apply();
                }
            },
            openHandler: function() {
                this.popMask = !0;
            },
            filterChangeHandler: function(e, t) {
                var a = t.trigger;
                this.popMask = !1, this.filterVal = e.value, "catesReady" != a && (this.goodsList = []), 
                this.isNew = e.isNew, this.isOneCity = e.isOneCity, this.isfreePost = e.isfreePost, 
                this.gpsId = e.gpsId, "catesReady" != a && this.loadGoods(1), this.currentCate = e.cateId, 
                "2101" == this.currentCate.toString().substr(0, 4) && (this.brandInfo = null), this.cateName = e.cateName, 
                "category" == this.pageType && wx.setNavigationBarTitle({
                    title: e.cateName
                });
            },
            closeMask: function() {
                this.popMask = !1, this.$broadcast("filterclose");
            },
            loadMore: function() {
                this.isLoading || this.loadGoods(this.pageNum + 1);
            },
            backTopHandler: function() {
                this.backTop();
            },
            inputHandler: function(e) {
                this.keyword = e.detail.value;
            },
            confirmHandler: function(e) {
                var t = this.keyword = e.detail.value;
                this.doSearch(t);
            }
        }, o = a, _possibleConstructorReturn(i, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onShareAppMessage",
        value: function() {
            var e = this, t = "这些xxx超级棒，分享给你看看", a = "/pages/list/list?", i = this.pageType;
            if (i || (i = this.keyword ? "search" : "category"), "search" == i) t = t.replace("xxx", this.keyword), 
            a += "keyword=" + this.keyword; else {
                if ("100" == this.currentCate || "2100000" == this.currentCate) t = t.replace("xxx", "宝贝"); else {
                    var o = this.cateName;
                    t = t.replace("xxx", o);
                }
                a += "cate=" + this.currentCate;
            }
            return {
                title: t,
                path: a,
                success: function() {
                    e.$log(e.pageType.toUpperCase() + "-LIST-SHARE");
                }
            };
        }
    }, {
        key: "onScroll",
        value: function(e) {
            this.$broadcast("elasticListOnScroll", e);
        }
    }, {
        key: "clickHandler",
        value: function(e) {
            this.$log(this.pageType.toUpperCase() + "-LIST-CLICK-ITEM");
        }
    }, {
        key: "doSearch",
        value: function(e) {
            e && (this.reset(), this.keyword = e, this.pageType = "search", this.loadGoods(1, !0), 
            wx.setNavigationBarTitle({
                title: e
            }));
        }
    }, {
        key: "backTop",
        value: function() {
            this.setData({
                scrollTop: 0
            }), this.$wxpage.setData({
                $list$scrollTop: 0
            });
        }
    }, {
        key: "getFilterDataObj",
        value: function() {
            var e = this.filterVal.split("|");
            return {
                cityId: e[0],
                cateId: e[1],
                sortby: e[2],
                price: e[3],
                minprice: e[4]
            };
        }
    }, {
        key: "formatBookListData",
        value: function(e) {
            e.map(function(e) {
                e.sellPrice = Math.floor(parseInt(e.sellPrice) / 100), e.price = Math.floor(parseInt(e.price) / 100);
            });
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
        key: "formattedGoods",
        value: function(e) {
            var t = this;
            return e.map(function(e, a) {
                var i = JSON.stringify(e.labels || "");
                return e.isNew = i.indexOf("777789291349671938") > -1, e.title = e.tinyTitle + "。" + e.desc, 
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
            return [].concat(_toConsumableArray(e.serviceIds && e.serviceIds.map(function(e) {
                return _serviceConfig2.default.serviceLabel(e);
            }) || []), [ t ]).filter(function(e) {
                return e && e.icon;
            }).slice(0, 1);
        }
    }, {
        key: "loadGoods",
        value: function(e, t) {
            var a = this;
            if (!this.isLoading && (this.isEnd = 1 != e && this.isEnd, !this.isEnd)) {
                var i = this.$root.$parent.globalData, o = this.getFilterDataObj();
                this.tipText = "加载中…", this.isLoading = !0, this.pageType = this.keyword ? "search" : "category";
                var n = "search" === this.pageType, s = "https://app.zhuanzhuan.com/zzopen/mainminiapp/getCateInfoList", r = {
                    lat: i.latitude,
                    lon: i.longitude,
                    cateid: o.cateId,
                    areaId: o.cityId,
                    areaid: o.cityId,
                    minprice: o.minprice,
                    maxprice: o.price,
                    sortpolicy: o.sortby,
                    pagenum: e,
                    metricType: this.metricType || "",
                    pagesize: 40
                }, c = 113 == o.cateId;
                c && (s = "https://app.zhuanzhuan.com/zzopen/book/homePageList", r = {
                    pageSize: 20,
                    cateId2: 100,
                    pageNum: e,
                    sortBy: 0
                }), n && (t && (r.cateid = ""), r.filteritemids = (this.isNew ? "1002" : "") + "|" + (this.isfreePost ? "1004" : ""), 
                r.keyword = this.keyword, this.isOneCity ? r.areaid = this.gpsId : r.areaid = o.cityId, 
                s = "https://app.zhuanzhuan.com/zzopen/mainminiapp/search"), this.$http({
                    url: s,
                    data: r,
                    method: "GET",
                    header: {},
                    dataType: "json",
                    success: function(i) {
                        if (a.showPage = !0, 0 != i.data.respCode) return 6060 == i.data.respCode ? (a.$invoke("filter", "setSearchNeedLocation", !0), 
                        a.isAuthing = !0, a.isLoading = !1, a.$apply(), void _getLocation2.default.call(a, {
                            systemDisableTip: "转转发现你关闭了微信的“定位服务”，导致获取不了你的地理位置，请去手机“设置-应用授权”里打开",
                            authFailTip: "请开启“定位服务”哦，以便转转帮你发现身边的好货~",
                            success: function(i) {
                                a.$root.$parent.globalData = a.$root.$parent.globalData || {}, a.$root.$parent.globalData.latitude = i.latitude, 
                                a.$root.$parent.globalData.longitude = i.longitude, a.isLoading = !1, a.isAuthing = !1, 
                                a.$apply(), a.loadGoods(e, t);
                            },
                            fail: function() {
                                wx.showModal({
                                    content: "拒绝定位会导致部分功能不可用。如需授权请点击右上角【...】-【关于转转官方】- 右上角【...】-【设置】-打开地理位置",
                                    showCancel: !1,
                                    confirmText: "知道了",
                                    success: function() {
                                        _wxPromise.wxPromise.navigateBack({
                                            delta: 1
                                        });
                                    }
                                });
                            }
                        })) : void a.$toast({
                            title: i.data.errMsg || "对不起，没有合适的数据~",
                            type: "fail",
                            duration: 2e3
                        });
                        a.goodsCardType = c ? 2 : 0, a.$invoke("filter", "setSearchNeedLocation", !1);
                        var o = c ? i.data.respData.list : i.data.respData.infos;
                        c || (o = a.formattedGoods(o)), 1 == e && (a.brandInfo = i.data.respData.brandInfo || null), 
                        o && Array.isArray(o) && 0 == o.length && (a.tipText = "没有更多了", a.isEnd = !0), o.length ? (c ? a.formatBookListData(o) : a.formatListData(o), 
                        a.isEmpty = !1, a.goodsList = 1 == e ? o.map(function(e) {
                            return e.lazyImg = !1, e;
                        }) : a.goodsList.concat(o), a.$apply(), a.pageNum = e, 1 == e && (a.setData({
                            scrollTop: 0
                        }), wx.createSelectorQuery().select(".elasticList").boundingClientRect(function(e) {
                            setTimeout(function() {
                                e && e.hasOwnProperty("top") && e.top > 0 && (a.elasticStart = e.top, a.$apply(), 
                                a.$broadcast("startElasticList"), console.info("braodcast"));
                            }, 100);
                        }).exec()), a.$log(a.pageType.toUpperCase() + "-LIST-VIEW-ITEM")) : 1 == e && (a.isEmpty = !0), 
                        a.$apply();
                    },
                    complete: function() {
                        a.isAuthing || (a.isLoading = !1), a.$apply();
                    }
                });
            }
        }
    }, {
        key: "reset",
        value: function() {
            this.initCate = "", this.keyword = "", this.goodsList = [], this.$broadcast("filterreset"), 
            this.$apply();
        }
    }, {
        key: "onUnload",
        value: function() {
            this.reset(), _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "onUnload", this) && _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "onUnload", this).call(this);
        }
    }, {
        key: "onLoad",
        value: function(e) {
            this.$updatePageFrame({
                backHome: {
                    extraStyle: "bottom: 150rpx; right: 10rpx"
                }
            }), this.reset(), e.cate && (this.initCate = e.cate, this.currentCate = e.cate), 
            this.metricType = e.metricType, this.$apply(), e.keyword = decodeURIComponent(e.keyword || ""), 
            e.keyword ? (this.keyword = e.keyword, this.pageType = "search", wx.setNavigationBarTitle({
                title: this.keyword
            })) : this.pageType = "category", this.$apply(), this.$invoke("filter", "initFilter"), 
            this.$log(this.pageType.toUpperCase() + "-LIST-VIEW");
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(List, "pages/list/list"));