function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _asyncToGenerator(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, a) {
            function i(r, n) {
                try {
                    var s = e[r](n), o = s.value;
                } catch (t) {
                    return void a(t);
                }
                if (!s.done) return Promise.resolve(o).then(function(t) {
                    i("next", t);
                }, function(t) {
                    i("throw", t);
                });
                t(o);
            }
            return i("next");
        });
    };
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

function formatLocal(t) {
    for (var e = [], a = 0, i = t.length; a < i; a++) {
        var r = {};
        for (var n in t[a]) "i" == n || "f" == n || "py" == n ? r[n] = t[a][n] : "c" == n ? r[n] = formatLocal(t[a][n]) : (r.name = n, 
        r.id = t[a][n]);
        e.push(r);
    }
    return e;
}

function getKeyProps(t) {
    for (var e = [], a = 0, i = t.length; a < i; a++) e.push({
        id: t[a].id,
        name: t[a].name
    });
    return e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _slicedToArray = function() {
    function t(t, e) {
        var a = [], i = !0, r = !1, n = void 0;
        try {
            for (var s, o = t[Symbol.iterator](); !(i = (s = o.next()).done) && (a.push(s.value), 
            !e || a.length !== e); i = !0) ;
        } catch (t) {
            r = !0, n = t;
        } finally {
            try {
                !i && o.return && o.return();
            } finally {
                if (r) throw n;
            }
        }
        return a;
    }
    return function(e, a) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _createClass = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var i = e[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, a, i) {
        return a && t(e.prototype, a), i && t(e, i), e;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _operationKit = require("./../../lib/operationKit.js"), _wxPromise = require("./../../lib/wxPromise.js"), _getLocation = require("./../../lib/getLocation.js"), _getLocation2 = _interopRequireDefault(_getLocation), areaData = [], provinceMap = {}, getProvince = function(t) {
    return !!provinceMap[t] && provinceMap[t];
}, cateData = [], orderData = [ {
    name: "默认排序",
    id: "0"
}, {
    name: "最新发布",
    id: "1"
}, {
    name: "价格最低",
    id: "2"
}, {
    name: "价格最高",
    id: "3"
}, {
    name: "离我最近",
    id: "4"
} ], priceData = [], Filter = function(t) {
    function e() {
        var t, a, i, r;
        _classCallCheck(this, e);
        for (var n = arguments.length, s = Array(n), o = 0; o < n; o++) s[o] = arguments[o];
        return a = i = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(s))), 
        i.props = [ "initCate", "deleteCates" ], i.data = {
            areaName: "全国",
            cateName: "分类",
            orderName: "排序",
            priceName: "筛选",
            filterType: -1,
            areaVal: "",
            cateVal: "",
            orderVal: "0",
            priceVal: "100000",
            minPrice: "0",
            provinceData: [],
            subAreaData: [],
            thirdAreaData: [],
            currentProvince: {},
            currentSubArea: {},
            currentThirdArea: {},
            allCateData: [],
            subCateData: [],
            thirdCateData: [],
            orderData: orderData,
            priceData: priceData,
            storageName: "zz_wa_province",
            gpsCityData: {},
            initGpsCityData: {},
            gpsFail: "定位中...",
            gpsLoading: !1,
            cate1Id: void 0,
            cate2Id: void 0,
            cate3Id: void 0,
            isOneCity: !1,
            isNew: !1,
            isfreePost: !1,
            minInput: "",
            maxInput: "",
            singleprice: !1,
            searchNeedLocation: !1
        }, i.watch = {
            filterType: function(t, e) {
                var a = [ "SELECTE_AREA", "SELECTE_CATE", "SELECTE_SORT", "SELECTE_FILTER" ];
                this.$log(a[t]);
            },
            initCate: function(t) {
                this.cateVal = t, this.$apply();
            }
        }, i.methods = {
            maskTouchMove: function(t) {
                return !1;
            },
            popAreaHandler: function(t) {
                this.popArea();
            },
            popCateHandler: function(t) {
                this.popCate();
            },
            popOrderHandle: function(t) {
                this.popOrder();
            },
            popPriceHandle: function(t) {
                this.popPrice();
            },
            selectOrderHandler: function(t) {
                this.selectOrder(t);
            },
            selectPriceHandler: function(t, e) {
                this.selectPrice(t, e);
            },
            selectProvinceHandler: function(t) {
                this.selectProvince(t);
            },
            selectSubAreaHandler: function(t) {
                this.selectSubArea(t);
            },
            selectThirdAreaHandler: function(t) {
                this.selectThirdArea(t);
            },
            selectCate1Handler: function(t) {
                this.selectCate1(t);
            },
            selectCate2Handler: function(t) {
                this.selectCate2(t);
            },
            selectCate3Handler: function(t) {
                this.selectCate3(t);
            },
            GPSTap: function() {
                this.getGPSCity();
            },
            lowPriceInput: function(t) {
                var e = t.detail.value;
                this.minPrice = e || "0", this.minInput = e, this.singleprice = 0;
            },
            upPriceInput: function(t) {
                var e = t.detail.value;
                this.priceVal = e || "1000000", this.maxInput = e, this.singleprice = 0;
            },
            oneLabelTap: function(t) {
                var e = t.target.id, a = t.target.dataset.selected;
                switch (e) {
                  case "onecity":
                    this.areaName = this.initGpsCityData.region_localName, this.isOneCity = !a, this.isOneCity && this.$log("SELECTE_BABEL_0");
                    break;

                  case "new":
                    this.isNew = !a, this.isNew && this.$log("SELECTE_BABEL_1");
                    break;

                  case "freepost":
                    this.isfreePost = !a, this.isfreePost && this.$log("SELECTE_BABEL_2");
                }
            },
            confirmTap: function() {
                this.$log("CONFIRM"), this.emitChange();
            },
            resetTap: function() {
                this.isOneCity = !1, this.isNew = !1, this.isfreePost = !1, this.priceVal = "100000", 
                this.minPrice = "0", this.priceName = "筛选", this.minInput = "", this.maxInput = "";
            }
        }, i.events = {
            filterclose: function() {
                this.close();
            },
            filterreset: function() {
                this.areaName = "全国", this.cateName = "分类", this.orderName = "排序", this.priceName = "筛选", 
                this.filterType = -1, this.areaVal = "", this.cateVal = "", this.orderVal = "0", 
                this.priceVal = "100000", this.$apply();
            }
        }, r = a, _possibleConstructorReturn(i, r);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "initFilter",
        value: function() {
            function t() {
                return e.apply(this, arguments);
            }
            var e = _asyncToGenerator(regeneratorRuntime.mark(function t() {
                var e, a, i, r, n = this;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        this.initCate && (this.cateVal = this.initCate), this.$apply(), e = this.getGPSCity(), 
                        a = this.getProvinceData(), i = this.getCateData(), r = this.getPriceData(), e.then(function() {
                            n.emitChange({
                                trigger: "gpsReady"
                            });
                        }), i.then(function() {
                            n.emitChange({
                                trigger: "catesReady"
                            });
                        });

                      case 8:
                      case "end":
                        return t.stop();
                    }
                }, t, this);
            }));
            return t;
        }()
    }, {
        key: "getValue",
        value: function() {
            return (this.gpsCityData.region_id || this.areaVal) + "|" + this.cateVal + "|" + this.orderVal + "|" + this.priceVal + "|" + this.minPrice;
        }
    }, {
        key: "setSearchNeedLocation",
        value: function(t) {
            this.searchNeedLocation = t, this.$apply();
        }
    }, {
        key: "emitChange",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.trigger, a = void 0 === e ? "userSelect" : e;
            if (this.maxInput && this.minInput && this.minInput > this.maxInput) return void this.$toast({
                title: "最低价必须小于最高级哦~",
                type: "fail",
                duration: 2e3
            });
            this.$emit("change", {
                value: this.getValue(),
                cateId: this.cateVal,
                cateName: this.cateName,
                isNew: this.isNew,
                isOneCity: this.isOneCity,
                isfreePost: this.isfreePost,
                gpsId: this.initGpsCityData.region_id
            }, {
                trigger: a
            }), this.close();
        }
    }, {
        key: "close",
        value: function() {
            this.filterType = -1;
        }
    }, {
        key: "popArea",
        value: function() {
            this.closeMaskFunction(0) && (this.filterType = 0, this.$emit("open"));
        }
    }, {
        key: "closeMaskFunction",
        value: function(t) {
            return this.filterType == t ? (this.filterType = -1, this.close(), this.$invoke(this.$parent, "closeMask"), 
            this.$apply(), !1) : (this.$apply(), !0);
        }
    }, {
        key: "selectProvince",
        value: function(t) {
            this.subAreaData = [], this.thirdAreaData = [], this.isOneCity = !1;
            var e = t.currentTarget.dataset.id, a = this.currentProvince = getProvince(e);
            this.currentSubArea = {}, this.currentThirdArea = {}, this.gpsCityData = {}, console.log(this.currentProvince), 
            !a.c || a.c.length <= 0 ? (this.areaVal = a.id, this.areaName = a.name, this.emitChange()) : (this.subAreaData = a.c, 
            this.subAreaData[0].id != a.id && this.subAreaData.unshift({
                id: a.id,
                name: "全" + a.name
            }));
        }
    }, {
        key: "selectSubArea",
        value: function(t) {
            this.thirdAreaData = [], this.isOneCity = !1;
            var e = t.currentTarget.dataset.id, a = this.currentSubArea = this.getSelectOne(e, this.subAreaData);
            this.currentThirdArea = {}, !a.c || a.c.length <= 0 || !a.c[0].c || a.c[0].c.length <= 0 ? (this.areaVal = a.id, 
            this.areaName = a.name, this.emitChange()) : (this.thirdAreaData = a.c, this.thirdAreaData[0].id != a.id && this.thirdAreaData.unshift({
                id: a.id,
                name: "全" + a.name
            }));
        }
    }, {
        key: "getSelectOne",
        value: function(t, e) {
            if (!e || e.length < 0) return null;
            for (var a = 0, i = e.length; a < i; a++) if (e[a].id == t) return e[a];
        }
    }, {
        key: "selectThirdArea",
        value: function(t) {
            this.isOneCity = !1;
            var e = t.currentTarget.dataset.id, a = this.currentThirdArea = this.getSelectOne(e, this.thirdAreaData);
            this.areaVal = a.id, this.areaName = a.name, this.emitChange();
        }
    }, {
        key: "popCate",
        value: function(t) {
            this.allCateData.length && this.closeMaskFunction(1) && (this.filterType = 1, this.$emit("open"));
        }
    }, {
        key: "getCateData",
        value: function() {
            function t() {
                return e.apply(this, arguments);
            }
            var e = _asyncToGenerator(regeneratorRuntime.mark(function t() {
                var e, a;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return e = "https://app.zhuanzhuan.com/zzopen/mainminiapp/weixinIndexCategory", 
                        t.next = 3, this.$http({
                            url: e,
                            method: "GET"
                        });

                      case 3:
                        a = t.sent, 0 == a.respCode ? (this.formatCateData(a.respData), this.inputFirst(), 
                        this.$apply()) : this.$toast({
                            title: a.data.errMsg || "网络错误，请重试~",
                            type: "fail",
                            duration: 2e3
                        });

                      case 5:
                      case "end":
                        return t.stop();
                    }
                }, t, this);
            }));
            return t;
        }()
    }, {
        key: "inputFirst",
        value: function() {
            this.cateVal && (this.cateName = this.allCateObj[this.cateVal].name), this.$apply();
        }
    }, {
        key: "formatCateData",
        value: function(t) {
            for (var e = this, a = {
                cateObj: {},
                cateArr: []
            }, i = 0, r = t.length; i < r; i++) {
                var n = t[i];
                n && (n.id = n.catId, n.name = n.catName, n.catParentId || (n.catParentId = 0), 
                a.cateObj[n.id] = n, 0 == n.catParentId ? a.cateArr.push(n) : a.cateObj[n.catParentId] && (a.cateObj[n.catParentId].cateArr ? a.cateObj[n.catParentId].cateArr.push(n) : a.cateObj[n.catParentId].cateArr = [ n ]));
            }
            a.cateArr.unshift({
                name: "全部",
                id: ""
            }), this.allCateData = getKeyProps(a.cateArr), this.allCateData = this.allCateData.filter(function(t) {
                return e.deleteCates.indexOf(t.id) < 0;
            }), this.allCateObj = a.cateObj;
        }
    }, {
        key: "selectCate1",
        value: function(t) {
            this.subCateData = [], this.thirdCateData = [];
            var e = t.currentTarget.dataset.id;
            if (this.cate1Id = e, console.log(e), e) {
                var a = this.allCateObj[e];
                if (a.cateArr) {
                    var i = getKeyProps(a.cateArr);
                    i.unshift({
                        name: "全" + a.name,
                        id: a.id
                    }), this.subCateData = i, console.log("ok", i);
                } else this.cateVal = a.id, this.cateName = a.name, this.emitChange();
            } else this.cateVal = "", this.cateName = "全部", this.emitChange();
        }
    }, {
        key: "selectCate2",
        value: function(t) {
            this.thirdCateData = [];
            var e = t.currentTarget.dataset.id;
            if (this.cate2Id = e, e == this.subCateData[0].id) this.cateVal = this.subCateData[0].id, 
            this.cateName = this.subCateData[0].name, this.emitChange(); else {
                var a = this.allCateObj[e];
                if (a.cateArr) {
                    var i = getKeyProps(a.cateArr);
                    i.unshift({
                        name: "全" + a.name,
                        id: a.id
                    }), this.thirdCateData = i;
                } else this.cateVal = a.id, this.cateName = a.name, this.emitChange();
            }
        }
    }, {
        key: "selectCate3",
        value: function(t) {
            var e = t.currentTarget.dataset.id, a = null;
            this.cate3Id = e, a = e == this.thirdCateData[0].id ? this.thirdCateData[0] : this.allCateObj[e], 
            this.cateVal = a.id, this.cateName = a.name, this.emitChange();
        }
    }, {
        key: "popOrder",
        value: function() {
            this.closeMaskFunction(2) && (this.filterType = 2, this.$emit("open"));
        }
    }, {
        key: "onShow",
        value: function() {
            console.log("filter onLoad");
        }
    }, {
        key: "selectOrder",
        value: function(t) {
            var e = t.currentTarget.dataset.id;
            console.log(e), this.orderVal = e, this.orderName = orderData[e].name, console.log(orderData[e]);
            var a = "SELECT_SORT" + e;
            console.log(a), this.$log(a), this.emitChange();
        }
    }, {
        key: "getPriceData",
        value: function() {
            function t() {
                return e.apply(this, arguments);
            }
            var e = _asyncToGenerator(regeneratorRuntime.mark(function t() {
                var e, a;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return e = "https://app.zhuanzhuan.com/zz/transfer/getPriceRange", t.next = 3, this.$http({
                            url: e,
                            method: "GET"
                        });

                      case 3:
                        a = t.sent, 0 == a.respCode ? (this.priceData = a.respData, this.$apply()) : this.$toast({
                            title: a.data.errMsg || "网络错误，请重试~",
                            type: "fail",
                            duration: 2e3
                        });

                      case 5:
                      case "end":
                        return t.stop();
                    }
                }, t, this);
            }));
            return t;
        }()
    }, {
        key: "popPrice",
        value: function() {
            this.priceData.length && this.closeMaskFunction(3) && (this.filterType = 3, this.$emit("open"));
        }
    }, {
        key: "selectPrice",
        value: function(t, e) {
            this.minInput = "", this.maxInput = "", this.minPrice = "0", this.singleprice = e.target.id, 
            this.priceVal = t.maxprice;
        }
    }, {
        key: "getProvinceData",
        value: function() {
            function t() {
                return e.apply(this, arguments);
            }
            var e = _asyncToGenerator(regeneratorRuntime.mark(function t() {
                var e, a;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.next = 2, _wxPromise.wxResolve.getStorage({
                            key: this.storageName
                        });

                      case 2:
                        if (e = t.sent, !e.succeeded || !e.data) {
                            t.next = 6;
                            break;
                        }
                        return this.formatAreaData(e.data), t.abrupt("return");

                      case 6:
                        return t.next = 8, this.$http({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getAllDispLocal",
                            header: {
                                cookie: "v=3.2;"
                            }
                        });

                      case 8:
                        if (a = t.sent, 0 == a.respCode) {
                            t.next = 12;
                            break;
                        }
                        return this.$toast({
                            title: a.errMsg || "网络错误，请重试~",
                            type: "fail",
                            duration: 2e3
                        }), t.abrupt("return");

                      case 12:
                        this.formatAreaData(a.respData.province), wx.setStorage({
                            key: this.storageName,
                            data: a.respData.province
                        });

                      case 14:
                      case "end":
                        return t.stop();
                    }
                }, t, this);
            }));
            return t;
        }()
    }, {
        key: "formatAreaData",
        value: function(t) {
            areaData = formatLocal(t), areaData.unshift({
                id: "",
                name: "全国"
            });
            for (var e = 0, a = areaData.length; e < a; e++) provinceMap[areaData[e].id] = areaData[e];
            this.provinceData = getKeyProps(areaData), this.$apply();
        }
    }, {
        key: "getCurrentCateName",
        value: function() {
            return this.cateName;
        }
    }, {
        key: "getGPSCity",
        value: function() {
            function t() {
                return e.apply(this, arguments);
            }
            var e = _asyncToGenerator(regeneratorRuntime.mark(function t() {
                var e, a, i, r = this;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (this.gpsLoading = !0, e = void 0, a = void 0, !this.$root.$parent.globalData.latitude) {
                            t.next = 10;
                            break;
                        }
                        return i = [ this.$root.$parent.globalData.latitude, this.$root.$parent.globalData.longitude ], 
                        e = i[0], a = i[1], t.next = 8, this.getCityData(a, e);

                      case 8:
                        t.next = 12;
                        break;

                      case 10:
                        return t.next = 12, _getLocation2.default.call(this, {
                            systemDisableTip: "转转发现你关闭了微信的“定位服务”，导致获取不了你的地理位置，请去手机“设置-应用授权”里打开",
                            authFailTip: "请开启“定位服务”哦，以便转转帮你发现身边的好货~",
                            success: function() {
                                function t(t) {
                                    return i.apply(this, arguments);
                                }
                                var i = _asyncToGenerator(regeneratorRuntime.mark(function t(i) {
                                    var n, s, o;
                                    return regeneratorRuntime.wrap(function(t) {
                                        for (;;) switch (t.prev = t.next) {
                                          case 0:
                                            return n = [ i.latitude, i.longitude ], r.$root.$parent.globalData.latitude = n[0], 
                                            r.$root.$parent.globalData.longitude = n[1], s = n, o = _slicedToArray(s, 2), e = o[0], 
                                            a = o[1], t.next = 6, r.getCityData(a, e);

                                          case 6:
                                          case "end":
                                            return t.stop();
                                        }
                                    }, t, r);
                                }));
                                return t;
                            }(),
                            fail: function() {
                                wx.showModal({
                                    content: "拒绝定位会导致部分功能不可用。如需授权请点击右上角【...】-【关于转转官方】- 右上角【...】-【设置】-打开地理位置",
                                    showCancel: !1,
                                    confirmText: "知道了",
                                    success: function() {
                                        r.searchNeedLocation && _wxPromise.wxPromise.navigateBack({
                                            delta: 1
                                        });
                                    }
                                }), r.gpsFail = "定位失败", r.gpsLoading = !1, r.$apply();
                            }
                        });

                      case 12:
                      case "end":
                        return t.stop();
                    }
                }, t, this);
            }));
            return t;
        }()
    }, {
        key: "getCityData",
        value: function() {
            function t(t, a) {
                return e.apply(this, arguments);
            }
            var e = _asyncToGenerator(regeneratorRuntime.mark(function t(e, a) {
                var i, r;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.prev = 0, t.next = 3, this.$http({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getCityDispLocal",
                            method: "POST",
                            data: {
                                lng: e,
                                lat: a
                            }
                        });

                      case 3:
                        i = t.sent, 0 == i.respCode ? (r = i.respData, this.initGpsCityData = r, this.gpsLoading = !1, 
                        this.currentProvince = {}, this.currentSubArea = {}, this.currentThirdArea = {}, 
                        this.subAreaData = [], this.thirdAreaData = [], this.areaName = this.gpsCityData.region_localName || "全国", 
                        this.searchNeedLocation && this.emitChange({
                            trigger: "gpsReady"
                        }), this.$apply()) : (this.gpsFail = "定位失败", this.gpsLoading = !1, this.$apply()), 
                        t.next = 13;
                        break;

                      case 7:
                        t.prev = 7, t.t0 = t.catch(0), console.error("getCityDispLocal failed:", t.t0), 
                        this.gpsLoading = !1, this.gpsFail = "定位失败", this.$apply();

                      case 13:
                      case "end":
                        return t.stop();
                    }
                }, t, this, [ [ 0, 7 ] ]);
            }));
            return t;
        }()
    } ]), e;
}(_wepy2.default.component);

exports.default = Filter;