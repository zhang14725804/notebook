!function(e) {
    function t(s) {
        if (a[s]) return a[s].exports;
        var r = global.installedModules[s] = a[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return e[s].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e), e = Object.assign(require("../../../vendors.js").modules, e);
    var a = {};
    a = global.installedModules = global.installedModules || {}, t.m = e, t.c = a, t.d = function(e, a, s) {
        t.o(e, a) || Object.defineProperty(e, a, {
            configurable: !1,
            enumerable: !0,
            get: s
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var a = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(a, "a", a), a;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 214);
}({
    206: function(e, t, a) {
        function s(e, t, a) {
            return t in e ? Object.defineProperty(e, t, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = a, e;
        }
        var r = function(e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return function(e, t) {
                var a = [], s = !0, r = !1, i = void 0;
                try {
                    for (var n, o = e[Symbol.iterator](); !(s = (n = o.next()).done) && (a.push(n.value), 
                    !t || a.length !== t); s = !0) ;
                } catch (e) {
                    r = !0, i = e;
                } finally {
                    try {
                        !s && o.return && o.return();
                    } finally {
                        if (r) throw i;
                    }
                }
                return a;
            }(e, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }, i = a(7), n = "current", o = {
            datepicker: {
                title: "请选择到店时刻",
                confirmText: "确定",
                show: !1,
                weekDay: [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ],
                nowWeekDay: 0,
                view: 1,
                currentTime: "",
                currentWeek: "",
                currentMonthDay: "",
                currentYear: "",
                navs: [],
                timeboxs: [],
                monthList: [],
                businessStartTime: {},
                businessEndTime: {},
                weekdaysBusinessTime: {},
                startMonthDay: "",
                startTime: new Date()
            }
        }, d = {
            getNavs: function(e) {
                var t = this, a = o.datepicker, s = function(e) {
                    var s = e.getFullYear(), r = a.weekDay[e.getDay()], i = e.getTime(), n = a.weekdaysBusinessTime.hasOwnProperty(r), o = t.formatMonthDay(e.getMonth(), e.getDate()), d = new Date(), c = r;
                    if (s === d.getFullYear() && e.getMonth() === d.getMonth()) {
                        var h = e.getDate() - d.getDate();
                        h > -1 && h < 3 && (c = [ "今天", "明天", "后天" ][h]);
                    }
                    return {
                        year: s,
                        week: c,
                        monthDay: o,
                        time: i,
                        real_week: r,
                        canSelect: n
                    };
                }, r = s(e ? new Date(e) : new Date());
                if (!r.canSelect) for (var i = 0; i < 7; i++) {
                    var n = s(new Date(r.time + 864e5 * (i + 1)));
                    if (n.canSelect) {
                        r = n;
                        break;
                    }
                }
                a.currentYear = r.year, a.currentWeek = r.week, a.currentMonthDay = r.monthDay, 
                t.setData({
                    "datepicker.currentWeek": a.currentWeek,
                    "datepicker.currentMonthDay": a.currentMonthDay,
                    "datepicker.currentYear": a.currentYear
                });
                for (var d = [], c = 1 == s(new Date(r.time)).canSelect ? 0 : 1, h = 0 + c; h < 5 + c; h++) {
                    var l = s(new Date(r.time + 864e5 * h));
                    d.push({
                        year: l.year,
                        real_week: l.real_week,
                        week: l.week,
                        monthDay: l.monthDay,
                        canSelect: l.canSelect
                    });
                }
                return d;
            },
            getBusinessTime: function(e) {
                if (null != e && 0 != e.length) {
                    var t = {};
                    return e.forEach(function(e, a, s) {
                        var r = {
                            startHour: e.open_time.split(":")[0],
                            startMinute: e.open_time.split(":")[1]
                        }, i = {
                            endHour: e.close_time.split(":")[0],
                            endMinute: e.close_time.split(":")[1]
                        };
                        e.weekdays.forEach(function(e) {
                            t[e] = {
                                open_time: r,
                                end_time: i
                            };
                        });
                    }), t;
                }
            },
            getTimeboxs: function(e, t) {
                var a = o.datepicker, s = [], r = 0;
                if (e && t) for (var n = 0; n < a.navs.length; n++) if (a.navs[n].monthDay == e + "-" + t) {
                    r = n;
                    break;
                }
                for (var d = a.navs[r], c = a.weekdaysBusinessTime[d.real_week], h = c.open_time, l = h.startHour, u = h.startMinute, f = parseInt(l), p = o.datepicker.startTime, g = p.getDate(), y = p.getHours(), m = p.getMinutes(), v = parseInt(u) || 0, D = c.end_time, _ = D.endHour, w = D.endMinute, T = function(e, t, a, s) {
                    var r = 2 * f;
                    v >= 30 && (r += 1);
                    var i = 2 * a;
                    return s >= 30 && (i += 1), i - r;
                }(0, 0, parseInt(_), parseInt(w)), b = 0; b < T; b++) {
                    var k = f + ":" + (0 === v ? "00" : v);
                    (v += 30) >= 60 && (f++, v -= 60);
                    var x = f + ":" + (0 === v ? "00" : v), S = "feature";
                    (0, i.moment)(p, "MM-DD") == d.monthDay && (0, i.moment)(p, "YYYY") == d.year && (y > f || y === f && m > v) && (S = "expired"), 
                    (e > p.getMonth() + 1 || t > g) && (S = "feature"), s.push({
                        value: k + "-" + x,
                        stateClass: S
                    });
                }
                for (var P = 0, C = s.length; P < C; P++) {
                    var O = s[P];
                    if ("expired" != O.stateClass) {
                        O.stateClass = "current", a.currentTime = O.value;
                        break;
                    }
                }
                return s;
            },
            formatMonthDay: function(e, t) {
                return (e = e + 1 < 10 ? "0" + (e + 1) : e + 1) + "-" + (t = t < 10 ? "0" + t : t);
            },
            getMonthList: function(e) {
                for (var t = [], a = e && e.length > 0 ? new Date(e) : new Date(), s = a.getFullYear(), r = a.getMonth(), i = 0; i < 3; i++) {
                    var n = new Date(s, r + i), o = n.getFullYear(), d = n.getMonth() + 1, c = this.getDaysInOneMonth(o, d);
                    t.push({
                        y: o,
                        m: d,
                        ds: c
                    });
                }
                return t;
            },
            getDaysInOneMonth: function(e, t) {
                var a = [], s = new Date(), r = s.getDate(), i = s.getMonth() + 1, n = s.getFullYear();
                s.setMonth(t), s.setDate(0);
                for (var d = new Date(e + "/" + t + "/1").getDay(), c = 0; c < d; c++) a.push({
                    day: ""
                });
                for (var h = 1; h <= s.getDate(); h++) {
                    var l = h, u = !(e > n || t > i || t === i && r <= l);
                    if (!u) {
                        var f = new Date(e, t - 1, l), p = o.datepicker.weekDay[f.getDay()];
                        u = !o.datepicker.weekdaysBusinessTime.hasOwnProperty(p);
                    }
                    var g = t === i && l === r, y = this.formatMonthDay(t - 1, l);
                    a.push({
                        day: l,
                        isExpired: u,
                        isToday: g,
                        monthDayStr: y
                    });
                }
                return a;
            },
            showDatePicker: function(e, t) {
                e ? (t && t.length > 0 && (o.datepicker.startTime = new Date(t)), o.datepicker.weekdaysBusinessTime = {}, 
                Object.assign(o.datepicker.weekdaysBusinessTime, this.getBusinessTime(e)), Object.assign(o.datepicker, {
                    navs: this.getNavs(t && t.length > 0 ? t : void 0)
                }), Object.assign(o.datepicker, {
                    timeboxs: this.getTimeboxs(),
                    monthList: this.getMonthList(t)
                }), this.setData({
                    datepicker: o.datepicker
                }), this.setData({
                    "datepicker.show": !this.data.datepicker.show
                })) : this.setData({
                    "datepicker.show": !this.data.datepicker.show
                });
            },
            getDatetime: function() {
                var e = this.data.datepicker.currentMonthDay.split("-"), t = r(e, 2), a = t[0], s = t[1], i = this.data.datepicker.currentTime;
                return {
                    date: this.data.datepicker.currentYear + "-" + a + "-" + s + " " + i
                };
            }
        }, c = {
            onDatePickerToggle: function(e) {
                this.setData({
                    "datepicker.show": !this.data.datepicker.show
                });
            },
            onDateTimeChange: function(e) {},
            onInvalidNavClick: function(e) {},
            onInvalidTimeClick: function(e) {},
            onCalClick: function() {
                this.setData({
                    "datepicker.view": 2
                });
            },
            onTimeBoxClick: function(e) {
                var t, a = this, r = e.currentTarget.dataset.timeboxIndex, i = a.data.datepicker.timeboxs[r];
                i.stateClass !== n && a.data.datepicker.timeboxs.forEach(function(e, t) {
                    e.stateClass === n && "expired" !== e.stateClass && a.setData(s({}, "datepicker.timeboxs[" + t + "].stateClass", "feature"));
                }), a.setData((s(t = {}, "datepicker.timeboxs[" + r + "].stateClass", n), s(t, "datepicker.currentTime", i.value), 
                t));
            },
            onConfirmBtnClick: function(e) {
                var t = this.getDatetime().date;
                this.onDateTimeChange(t), this.onDatePickerToggle();
            },
            onDayTimeNavClick: function(e) {
                var t = e.currentTarget.dataset.navIndex, a = t, s = this.data.datepicker.navs[t], i = s.week, n = s.monthDay, o = s.year, d = n.split("-"), c = r(d, 2), h = c[0], l = c[1], u = this.getTimeboxs(h, l);
                this.setData({
                    "datepicker.nowWeekDay": a,
                    "datepicker.currentWeek": i,
                    "datepicker.currentMonthDay": n,
                    "datepicker.currentYear": o,
                    "datepicker.timeboxs": u
                });
            },
            onDayboxClick: function(e) {
                var t = e.currentTarget.dataset.year, a = e.currentTarget.dataset.month, s = e.currentTarget.dataset.day, i = new Date(t, a - 1, s), n = new Date();
                if (i.getTime() >= n.getTime()) {
                    var o = this.getNavs(t + "/" + a + "/" + s);
                    this.setData({
                        "datepicker.navs": o
                    });
                    var d = this.formatMonthDay(a - 1, s).split("-"), c = r(d, 2), h = c[0], l = c[1], u = this.getTimeboxs(h, l);
                    this.setData({
                        "datepicker.timeboxs": u,
                        "datepicker.view": 1,
                        "datepicker.nowWeekDay": 0,
                        "datepicker.currentWeek": this.data.datepicker.currentWeek,
                        "datepicker.currentMonthDay": this.data.datepicker.currentMonthDay,
                        "datepicker.currentYear": this.data.datepicker.currentYear
                    });
                }
            }
        };
        e.exports = Object.assign({}, c, d);
    },
    207: function(e, t, a) {
        var s = getApp();
        e.exports = {
            onPayClick: function(e) {
                var t = this;
                if (!this.data.isPayBtnLoading) if (this.data.showDescResult.forbidPay) this.showZanToast(this.data.showDescResult.payMsg); else {
                    var a = e.detail.formId || "";
                    if (!this.validateOrder() && this.validateDeliveryStyle() && !this.isPaying) {
                        this.isPaying = !0;
                        var r = Promise.resolve({});
                        this.data.payment.points && (r = s.getPoints()), r.then(function(e) {
                            var s = e.current_points;
                            if (t.data.payment.points && t.data.payment.points > s) return wx.showModal({
                                content: "积分余额不足，无法兑换。你有" + s + "积分可用",
                                showCancel: !1,
                                confirmText: "我知道了"
                            });
                            wx.showToast({
                                title: "数据提交中",
                                icon: "loading",
                                duration: 1e4
                            }), t.data.order_no ? t.doPayOrder() : t.createOrder(a, function() {
                                t.doPayOrder();
                            }, function() {
                                wx.hideToast(), t.isPaying = !1;
                            });
                        });
                    }
                }
            },
            doPayOrder: function() {
                var e = this;
                this.payOrder({
                    success: function() {
                        wx.hideToast(), e.isPaying = !1;
                    },
                    fail: function() {
                        wx.hideToast(), e.isPaying = !1;
                    }
                });
            }
        };
    },
    208: function(e, t, a) {
        e.exports = {
            showUnavailableDetail: function() {
                var e = this.data.unavailable_goods;
                e.showDetail = !0, this.setData({
                    unavailable_goods: e
                });
            },
            hideUnavailableDetail: function() {
                var e = this.data.unavailable_goods;
                e.showDetail = !1, this.setData({
                    unavailable_goods: e
                });
            }
        };
    },
    209: function(e, t, a) {
        e.exports = {
            onSmsChange: function(e) {
                var t = +e.detail.value;
                this.data.order_no || this.setData({
                    sms: t
                });
            }
        };
    },
    210: function(e, t, a) {
        var s = getApp();
        e.exports = {
            onMessageBlur: function(e) {
                var t = e.detail.value, a = this.data.shop;
                a.buyer_msg = t, this.setData({
                    shop: a
                });
            },
            onIdCardInputBlur: function(e) {
                var t = e.detail.value;
                this.setData({
                    idCardNo: t
                });
            },
            showShopActivity: function() {
                var e = this.data.shop;
                e.showActivityDetail = !0, this.setData({
                    shop: e
                });
            },
            hideShopActivity: function() {
                var e = this.data.shop;
                e.showActivityDetail = !1, this.setData({
                    shop: e
                });
            },
            showGoodsMessage: function(e) {
                var t = e.currentTarget.dataset.goodsid, a = e.currentTarget.dataset.skuid, r = this.data.goods_list.find(function(e) {
                    return e.goodsId == t && e.skuId == a;
                });
                if (r) {
                    var i = s.db.set(r);
                    wx.navigateTo({
                        url: "/packages/trade/goods-message/index?goods=" + i
                    });
                }
            },
            doReselectGoods: function() {
                wx.navigateBack();
            },
            handleContactPhoneService: function() {
                var e = this;
                wx.showModal({
                    title: this.data.servicePhoneNumber,
                    confirmText: "呼叫",
                    success: function(t) {
                        t.confirm && wx.makePhoneCall({
                            phoneNumber: e.data.servicePhoneNumber
                        });
                    }
                });
            }
        };
    },
    211: function(e, t, a) {
        var s = getApp(), r = a(4), i = a(18);
        e.exports = {
            onAddressTap: function() {
                var e = this;
                if (!(this.data.order_no || this.data.isGroupon && this.data.isLeaderSelected && !this.data.isLeader)) if (r.track({
                    act_name: "address_change",
                    address: "express"
                }), "function" == typeof this.__yzLog__ && this.__yzLog__({
                    et: "click",
                    ei: "address_change",
                    en: "更换地址"
                }), this.data.logisticsSetting.isLocal && 1 !== this.data.localDeliveryInfo.settings.editionType) {
                    var t = s.db.set(this.data.address);
                    wx.navigateTo({
                        url: "/packages/trade/buy/address/index?address=" + t
                    });
                } else i("scope.address").then(function() {
                    wx.chooseAddress({
                        success: function(e) {
                            var t = {
                                address_detail: e.detailInfo,
                                id: 0,
                                area_code: e.nationalCode,
                                city: e.cityName,
                                county: e.countyName,
                                postal_code: e.postalCode,
                                province: e.provinceName,
                                tel: e.telNumber,
                                user_name: e.userName
                            };
                            s.trigger("order-address-change", t);
                        },
                        fail: function(t) {
                            if ("chooseAddress:cancel" !== t.errMsg && "chooseAddress:fail cancel" !== t.errMsg) {
                                var a = s.db.set(e.data.address);
                                wx.navigateTo({
                                    url: "/packages/trade/buy/address/index?address=" + a
                                });
                            }
                        }
                    });
                }).catch(function() {
                    var t = s.db.set(e.data.address);
                    wx.navigateTo({
                        url: "/packages/trade/buy/address/index?address=" + t
                    });
                });
            }
        };
    },
    212: function(e, t, a) {
        var s = a(31), r = a(32);
        e.exports = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a = s.formatOrderPaymentData(e), i = a.order.buyWay, n = e.isFromTradeCore;
            r.payOrder(a, function(e) {
                !function(e, t, a, s, r) {
                    switch (t) {
                      case 1:
                        !function(e, t, a, s) {
                            if (e) {
                                if (!(a.time_stamp && a.nonce_str && a.package && a.sign_type && a.pay_sign)) return void (s.fail && s.fail("支付参数配置错误"));
                                wx.requestPayment({
                                    timeStamp: a.time_stamp,
                                    nonceStr: a.nonce_str,
                                    package: a.package,
                                    signType: a.sign_type,
                                    paySign: a.pay_sign,
                                    success: function(e) {
                                        s.success && s.success(t, e);
                                    },
                                    fail: function(e) {
                                        s.fail && s.fail(e.errMsg);
                                    }
                                });
                            } else wx.requestPayment({
                                timeStamp: a.timeStamp,
                                nonceStr: a.nonceStr,
                                package: a.package,
                                signType: a.signType,
                                paySign: a.paySign,
                                success: function(e) {
                                    s.success && s.success(t, e);
                                },
                                fail: function(e) {
                                    s.fail && s.fail(e.errMsg);
                                }
                            });
                        }(e, t, a, r);
                        break;

                      case 16:
                        !function(e, t, a) {
                            a.success && a.success(e, t);
                        }(t, a, r);
                    }
                }(n, i, e, 0, t);
            }, function(e) {
                t.fail && t.fail(e);
            });
        };
    },
    214: function(e, t, a) {
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var r = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = arguments[t];
                for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
            }
            return e;
        }, i = s(a(0)), n = s(a(33)), o = getApp(), d = a(13), c = a(1), h = a(32), l = a(31), u = a(212), f = a(6), p = a(15), g = a(211), y = a(210), m = a(209), v = a(208), D = a(207), _ = a(206), w = a(8), T = a(34), b = a(51), k = a(23), x = a(36), S = [];
        (0, i.default)(c.Toast, n.default, g, y, m, v, D, _, w, {
            data: {
                $cashier: {
                    password: "",
                    loaded: !1,
                    actions: [],
                    show: !1,
                    componentId: "cashier",
                    cancelText: "关闭",
                    showPassword: !1
                },
                includeFx: !1,
                isPayBtnLoading: !1,
                themeClass: o.themeClass,
                fetching: !0,
                userInfo: null,
                userInfoDeny: !1,
                book_key: d.makeRandomString(10) + new Date().getTime(),
                order_no: "",
                orderFrom: "",
                address: {},
                origin_goods_list: [],
                goods_list: [],
                hasPresale: !1,
                unavailable_goods: {
                    list: [],
                    showDetail: !1
                },
                shop: {
                    canSellerDelivery: !0,
                    canSelfFetch: !0,
                    ump_activity: [],
                    buyer_msg: ""
                },
                postageInfo: {
                    list: [],
                    selected: {
                        postage: 0,
                        expressType: -1,
                        postageTitle: "",
                        postageDesc: ""
                    }
                },
                localDeliveryInfo: {
                    showLocalDeliveryTime: !0,
                    showLocalDeliveryScope: !0,
                    settings: {},
                    selected: {}
                },
                logisticsSetting: {},
                coupons: {
                    list: [],
                    inValid: [],
                    selected: {},
                    changed: !1
                },
                idCardNo: "",
                sms: 1,
                is_virtual: 0,
                showCountDown: !1,
                countdown: {},
                isGuarantedTrade: !1,
                canSelfFetch: !1,
                showExpress: !0,
                showSelfFetch: !1,
                fetchUserName: "",
                fetchPhoneNumber: "",
                fetchAddress: "",
                fetchTime: "",
                fetchTel: "",
                showDeliveryDialog: !1,
                steps: {},
                selfFetchAddress: {},
                hideSegmentOnlySelfFetch: !1,
                tapExpress: !1,
                tapSelfFetch: !1,
                show_fetch_time_arrow: !0,
                goodsPresaleStartTime: "",
                is_optional_self_fetch_time: 1,
                self_fetch_address_id: "",
                self_fetch_city_code: "",
                self_fetch_city_name: "",
                showBindPhoneNumber: !1,
                showGroupCollect: !0,
                forceEnableGroupCollect: !1,
                isGrouponOrder: !1,
                isGroupon: !1,
                isLeader: !1,
                isLeaderSelected: !1,
                isOrderResult: !1,
                leaderName: "",
                page_path: "",
                kdt_id: "",
                servicePhoneNumber: "",
                formId: "",
                showPostagePriceOnOrderTotal: !0,
                showDescResult: {}
            },
            onExpressTap: function() {
                this.setData({
                    postageInfo: {
                        list: [],
                        selected: {
                            postage: 0,
                            expressType: -1,
                            postageTitle: "",
                            postageDesc: ""
                        }
                    },
                    showExpress: !0,
                    showSelfFetch: !1,
                    tapExpress: !0
                }), this.fetchOrderData();
            },
            onSelfFetchTap: function() {
                if (this.data.goods_list.find(function(e) {
                    return 10 === e.goodsType;
                })) return this.showZanToast("部分商品不支持到店自提");
                this.setData({
                    postageInfo: {
                        list: [],
                        selected: {
                            postage: 0,
                            expressType: -1,
                            postageTitle: "",
                            postageDesc: ""
                        }
                    },
                    showExpress: !1,
                    showSelfFetch: !0,
                    tapSelfFetch: !0
                }), this.fetchOrderData();
            },
            onShowDeliveryDialog: function() {
                this.setData({
                    showDeliveryDialog: !0
                });
            },
            onSwitchExpressTap: function(e) {
                var t = e.currentTarget.dataset, a = t.type;
                if ("false" != t.available && (this.onHideDeliveryDialog(), +a != +this.data.postageInfo.expressType)) {
                    var s = this.data.postageInfo.list.find(function(e) {
                        return +e.expressType == +a;
                    });
                    this.setData({
                        postageInfo: Object.assign(this.data.postageInfo, {
                            selected: s
                        })
                    }), this.fetchOrderData();
                }
            },
            onChooseDeliveryTimeTap: function() {
                var e = this, t = this.data.localDeliveryInfo.settings, a = new b({
                    localDeliverySetting: t
                });
                a.setSelectedSlot(this.data.localDeliveryInfo.selected), a.setSelectCallback(function(t) {
                    e.setData({
                        "localDeliveryInfo.selected": t
                    });
                }), k.registerService("tradeServiceDo", "localDeliveryService", a);
                var s = a.getShowType(), r = "";
                "day" == s ? r = "/pages/common/datepicker/index" : "halfDay" == s ? r = "/pages/common/halfdaypicker/index" : "timeSlot" == s && (r = "/pages/common/timepicker/index"), 
                wx.navigateTo({
                    url: r + "?serviceDomain=tradeServiceDo&serviceName=localDeliveryService"
                });
            },
            bindNameInput: function(e) {
                var t = e.detail.value;
                this.setData({
                    fetchUserName: t
                });
            },
            bindPhoneNumberInput: function(e) {
                if ("" != this.data.fetchUserName) {
                    var t = e.detail.value;
                    this.setData({
                        fetchPhoneNumber: t
                    });
                } else this.showZanToast("请先填写提货人姓名");
            },
            onHideDeliveryDialog: function(e) {
                this.setData({
                    showDeliveryDialog: !1
                });
            },
            onFetchAddressTap: function(e) {
                "" != this.data.fetchPhoneNumber ? wx.navigateTo({
                    url: "./selectAddress/selectAddress?id=" + this.data.self_fetch_address_id + "&cityName=" + this.data.self_fetch_city_name + "&cityCode=" + this.data.self_fetch_city_code
                }) : this.showZanToast("请先填写提货人手机号");
            },
            onFetchTimeTap: function() {
                if (this.data.currentFetchModel && this.data.currentFetchModel.offline_business_hours) {
                    if (-1 == this.data.fetchTime.indexOf("到店自提")) {
                        var e = this.data.localDeliveryInfo.settings.prepareTime, t = this.data.goodsPresaleStartTime, a = t && t.length ? new Date(t).getTime() + e : Date.now() + e;
                        a = new Date(a).toString(), this.data.fetchTime.length > 0 ? this.showDatePicker(void 0, a) : this.showDatePicker(this.data.currentFetchModel.offline_business_hours, a);
                    }
                } else this.showZanToast("请先选择自提地址");
            },
            handleContactSelfFetchService: function() {
                var e = this;
                wx.showModal({
                    title: null != this.data.selfFetchAddress.tel ? this.data.selfFetchAddress.tel : this.data.fetchTel,
                    confirmText: "呼叫",
                    success: function(t) {
                        t.confirm && wx.makePhoneCall({
                            phoneNumber: null != e.data.selfFetchAddress.tel ? e.data.selfFetchAddress.tel : e.data.fetchTel
                        });
                    }
                });
            },
            onLoad: function(e) {
                var t = this;
                Promise.all([ o.getLocalDelivery(), o.getLogisticsSetting() ]).then(function(a) {
                    t._onLoad(e);
                }), wx.removeStorageSync("selectDetailModel");
            },
            _onLoad: function(e) {
                var t = this, a = e.dbid, s = e.orderNo, r = {};
                r = a ? o.db.get(a) || {} : {
                    order_no: s,
                    type: "order"
                };
                var i = o.globalData.localDeliverySetting || {}, n = o.globalData.logisticsSetting || {};
                o.getPoints().then(function(e) {
                    return t.setData({
                        points: e.current_points
                    });
                }), this.setData({
                    "localDeliveryInfo.settings": i,
                    logisticsSetting: n
                }), this.payConstructor = new T();
                var d = [], c = !1, h = {}, u = e.orderFrom || "";
                "order" == r.type ? (s = r.order_no, c = !0) : (h = wx.getStorageSync("trade-buy-address-custom") || {}, 
                !n.isLocal || 1 === i.editionType || h.lat && h.lon || (h = {}, wx.setStorage({
                    key: "trade-buy-address-custom",
                    data: {}
                })), d = r.goods_list || [], h && Object.keys(h).length);
                var f = wx.getStorageSync("is_secured_transactions");
                if (this.setData({
                    isGuarantedTrade: f,
                    fetchUserName: h.user_name,
                    fetchPhoneNumber: h.tel
                }), s || 0 != d.length) {
                    var p = !!r.isGroupon, g = !!r.isGrouponOrder, y = !!r.createGroupon, m = wx.getStorageSync("leaderName"), v = r.activityAlias || "";
                    this.setData({
                        origin_goods_list: d,
                        order_no: s || "",
                        orderFrom: u,
                        showCountDown: c,
                        address: h,
                        isGroupon: p,
                        isLeader: y,
                        leaderName: m,
                        activityAlias: v,
                        isGrouponOrder: g
                    }), this.fetchOrderData({
                        isFirst: !1
                    }, function(e) {
                        if (t.data.order_no) {
                            if (e.data.orderAddress) {
                                t.setData({
                                    address: l.parseOrderAddressData(e.data.orderAddress),
                                    customer: {
                                        user_name: e.data.orderAddress.userName,
                                        telephone: e.data.orderAddress.tel
                                    }
                                });
                                try {
                                    var a = e.data.shopResultList[0].postageResult;
                                    if (e.data.showDescResult.showLocalDeliveryTime) {
                                        var s = a.deliveryStartTime, r = a.deliveryEndTime, i = new Date(1e3 * s), n = new Date(1e3 * r), o = JSON.parse(e.data.orderAddress.extraInfo), d = b.formatDeliveryTimeToShow(i, n, o.deliveryTimeSpan);
                                        t.setData({
                                            "localDeliveryInfo.selected.show": d
                                        });
                                    }
                                } catch (e) {
                                    console.error("解析同城送配送时间出错");
                                }
                            } else e.data.selfFetchAddress && t.setData({
                                selfFetchAddress: e.data.selfFetchAddress || {}
                            });
                            t.setData({
                                idCardNo: l.desensitizationIdNo(t.data.idCardNo)
                            }), t.initCountDown(e.data);
                        }
                        t.autoUseCoupon();
                    }, function(e, t) {
                        var a = o.db.set({
                            text: e,
                            code: t.code
                        });
                        wx.redirectTo({
                            url: "/pages/common/error/index?dbid=" + a
                        });
                    }), o.on("order-address-change", function(e) {
                        wx.setStorage({
                            key: "trade-buy-address-custom",
                            data: e
                        }), t.fetchOrderData({
                            address: e
                        }, function() {
                            t.setData({
                                address: e
                            });
                        }, function(e) {
                            t.showZanToast(e || "地址切换失败，请稍候再试");
                        });
                    }, this);
                } else o.db.set({
                    text: "没有找到可以买的商品~"
                });
            },
            onUnload: function() {
                o.off(null, null, this), k.removeAllServiceInDomain("tradeServiceDo");
            },
            onShow: function() {
                var e = wx.getStorageSync("trade-buy-customer");
                this.setData({
                    customer: e,
                    userInfoDeny: o.globalData.userInfoDeny,
                    userInfo: o.globalData.userInfo
                });
                var t = !1;
                t = !o.getBuyerId(), this.fetchCustomService(), this.setData({
                    copyright: o.globalData.copyright,
                    is_big_shop: o.globalData.is_big_shop
                }), this.setData({
                    copyright: o.globalData.copyright,
                    is_big_shop: o.globalData.is_big_shop,
                    showBindPhoneNumber: t
                });
                var a = wx.getStorageSync("selectDetailModel");
                if (this.setData({
                    fetchAddress: "" == a ? "" : a.name + "  " + a.city + a.area + a.address,
                    fetchTel: a.tel || "",
                    currentFetchModel: a || "",
                    self_fetch_address_id: a.id || 0,
                    self_fetch_city_code: a.city_code || 0,
                    self_fetch_city_name: a.city || ""
                }), a.is_optional_self_fetch_time && "0" == a.is_optional_self_fetch_time) {
                    var s = this.data.goodsPresaleStartTime.length > 0 ? "请在" + this.data.goodsPresaleStartTime + "后到店自提" : "请尽快到店自提";
                    this.setData({
                        fetchTime: s,
                        show_fetch_time_arrow: !1,
                        is_optional_self_fetch_time: 0
                    });
                } else this.setData({
                    fetchTime: "",
                    show_fetch_time_arrow: !0,
                    is_optional_self_fetch_time: 1,
                    kdt_id: o.getKdtId()
                });
                this.data.coupons.changed && (this.setData({
                    "coupons.changed": !1
                }), this.updateOrderPayment());
            },
            createOrder: function(e, t, a) {
                var s = this;
                this.validateOrder() || (this.data.formId = e, h.createOrder.call(this, this.data, function(e, a) {
                    a.cashier_list;
                    var r = x.toCamelCase(e);
                    if (s.setData({
                        idCardNo: l.desensitizationIdNo(s.data.idCardNo)
                    }), r.fromTradeCore) {
                        var i = r.corePayResult || {}, n = i.preparePayResult || {}, d = !!i.prepay, c = d ? i.newPrepayResult : n;
                        if (Object.assign(c, {
                            bizExt: n.bizExt || ""
                        }), s.setData({
                            isFromTradeCore: !0,
                            order_no: r.orderNo,
                            isPrepay: d,
                            newPayResult: c
                        }), s.payConstructor.setPrepayMode(d), d && !i.prepaySuccess) return wx.showToast({
                            title: "支付失败，请稍后再试",
                            icon: "none",
                            duration: 2e3
                        }), s.fetchOrderData(), void wx.hideToast();
                        if (d && r.zeroOrder || !d && 0 === n.payAmount) return void s.navigateSuccess();
                        s.payConstructor.createCashierOrder(c).then(function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            e.acquire_no && s.setData({
                                "preparePayResult.acquireNo": e.acquire_no || ""
                            }), t();
                        }).catch(function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            s.showZanToast(e.msg || "收单失败～");
                        });
                    } else {
                        var h = r.orderResultList[0].orderPayment, u = {
                            realPay: h.realPay,
                            goodsPay: h.itemPay,
                            postage: h.postage,
                            activity: h.decrease
                        }, f = l.parsePaymentData(u);
                        s.setData({
                            order_no: r.orderNo,
                            payment: u,
                            payment_strs: f
                        }), t();
                    }
                    o.trigger("trade:order:create", s.data.order_no);
                }, function(e) {
                    s.showZanToast(e || "网络出了点问题，再点下试试~"), a && a(e);
                }));
            },
            openCashier: function(e, t) {
                var a = this;
                this.data.$cashier.loaded ? (this.setData({
                    "$cashier.show": !0
                }), "function" == typeof e && e()) : (this.setData({
                    isPayBtnLoading: !0
                }), this.payConstructor.getPayWays({
                    partner_id: this.data.newPayResult.partnerId,
                    prepay_id: this.data.newPayResult.prepayId,
                    cashier_sign: this.data.newPayResult.cashierSign,
                    cashier_salt: this.data.newPayResult.cashierSalt
                }).then(function(s) {
                    if (!s || 0 === s.length) return console.warn("暂无可用支付方式，请联系商家开启更多支付方式"), void ("function" == typeof t && t("暂无可用支付方式，请联系商家开启更多支付方式"));
                    if ("function" == typeof e && e(), 1 === s.length) {
                        var r = s[0] || {};
                        r.available ? a.$cashierClick({
                            pay_channel: r.pay_channel,
                            pay_channel_name: r.pay_channel_name
                        }) : a.setData({
                            "$cashier.actions": s,
                            "$cashier.show": !0,
                            "$cashier.loaded": !0
                        });
                    } else a.setData({
                        "$cashier.actions": s,
                        "$cashier.show": !0,
                        "$cashier.loaded": !0
                    });
                }).catch(function(e) {
                    console.warn("获取收银台支付列表失败：", e), "function" == typeof t && t(e.msg || "网络抖了下，再点下试试~");
                }).then(function() {
                    a.setData({
                        isPayBtnLoading: !1
                    });
                }));
            },
            $cashierClick: function(e, t) {
                var a = this;
                "function" == typeof this.__yzLog__ && this.__yzLog__({
                    et: "click",
                    ei: "pay_item",
                    en: "选择支付方式",
                    params: {
                        pay_channel: e.pay_channel,
                        pay_channel_name: e.pay_channel_name
                    }
                }), "CASH_ON_DELIVERY" !== e.pay_channel ? this.payConstructor.doPayAction(e, t).then(function(t) {
                    if (o.trigger("trade:order:paid", a.data.order_no), "CREDIT_CARD" === e.pay_channel) {
                        var s = t && t.deep_link_info || {};
                        return Object.assign(s, {
                            partner_return_url: t.partner_return_url
                        }), void wx.navigateTo({
                            url: "/pages/pay/credit-card/index?deepLinkData=" + encodeURIComponent(JSON.stringify(s))
                        });
                    }
                    a.navigateSuccess();
                }).catch(function(e) {
                    var t = e.msg, s = e.type;
                    "need_password" === s ? a.setData({
                        "$cashier.showPassword": !0
                    }) : "cancel" !== s && "adjust_price" !== s && a.showZanToast(t || "网络抖了下，再点下试试~");
                }) : this.payConstructor.doCODPay(e).then(function() {
                    h.requestCOD({
                        order_no: a.data.order_no
                    }, function(e) {
                        e && e.orderNoList ? a.navigateSuccess() : a.showZanToast("确认货到付款失败，请稍后再试");
                    }, function(e) {
                        a.showZanToast(e || "网络抖了下，再点下试试~");
                    });
                }).catch(function() {});
            },
            $cashierCancel: function() {
                this.setData({
                    "$cashier.show": !1
                });
            },
            payOrder: function() {
                var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.data.isFromTradeCore ? this.openCashier(function() {
                    t.success && t.success();
                }, function(a) {
                    t.fail && t.fail(""), e.showZanToast(a || "网络抖了下，再点下试试~");
                }) : u(this.data, {
                    success: function() {
                        o.trigger("trade:order:paid", e.data.order_no), t.success && t.success(), e.navigateSuccess();
                    },
                    fail: function(a) {
                        "requestPayment:fail cancel" !== a && e.showZanToast(a || "网络抖了下，再点下试试~"), t.fail && t.fail(a);
                    }
                });
            },
            navigateSuccess: function() {
                var e = o.db.set({
                    order_no: this.data.order_no
                });
                this.data.isGroupon || this.data.isGrouponOrder ? wx.redirectTo({
                    url: "/packages/ump/pintuan/detail/index?orderNo=" + this.data.order_no
                }) : wx.redirectTo({
                    url: "/packages/trade/buy/paid/index?dbid=" + e
                });
            },
            validateOrder: function() {
                var e = this.data.address, t = this.data.is_virtual;
                if (!(3 !== t || this.data.customer.user_name && this.data.customer.telephone)) return this.showZanToast("请选择联系人"), 
                "请选择联系人";
                if (this.data.showSelfFetch) {
                    if (this.data.order_no && this.data.order_no.length > 0) return !1;
                    if (!this.data.fetchUserName || "" == this.data.fetchUserName) return this.showZanToast("请填写提货人姓名"), 
                    "请填写提货人姓名";
                    if (!this.data.fetchPhoneNumber || "" == this.data.fetchPhoneNumber) return this.showZanToast("请填写手机号码"), 
                    "请填写手机号码";
                    if (this.data.fetchPhoneNumber.length < 11) return this.showZanToast("请填写正确的手机号码"), 
                    "请填写正确的手机号码";
                    if ("" == this.data.fetchAddress) return this.showZanToast("请选择提货地址"), "请选择提货地址";
                    if ("" == this.data.fetchTime) return this.showZanToast("请选择提货时间"), "请选择提货时间";
                } else {
                    if (!e.user_name && !t) return this.showZanToast("请先选择一个收货地址~"), "请先选择一个收货地址~";
                    if (!this.data.order_no && this.data.localDeliveryInfo.showLocalDeliveryTime && !this.data.localDeliveryInfo.selected.start) return this.showZanToast("请选择期望送达时间"), 
                    "请选择期望送达时间";
                }
                if (this.data.shop.needIdCardNo && !this.data.order_no) {
                    var a = function(e) {
                        return e ? /(^\d{17}(\d|X)$)|(^\d{15}$)/gi.test(e) ? /^\d{17}(\d|X)$/gi.test(e) && !function(e) {
                            for (var t = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ], a = 0, s = 0, r = e.length; s < r - 1; s++) a += parseInt(e.charAt(s), 10) * t[s];
                            return [ "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" ][a % 11] === e.charAt(17).toUpperCase();
                        }(e) ? "身份证号输入错误" : "" : "身份证为15或18位数字,末位可以为x" : "身份证号不能为空";
                    }(this.data.idCardNo);
                    if (a) return this.showZanToast(a), a;
                }
                return this.data.CURRENT_GLOBAL_SHOP && this.data.CURRENT_GLOBAL_SHOP.isServiceDue ? (this.showZanToast(this.data.CURRENT_GLOBAL_SHOP.service.statusText), 
                this.data.CURRENT_GLOBAL_SHOP.service.statusText) : void 0;
            },
            validateDeliveryStyle: function() {
                return !!this.data.showSelfFetch || !S || 1 != S.length || 2 != S[0].expressType || (this.showZanToast("小程序暂不支持同城配送"), 
                !1);
            },
            fetchOrderData: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = this, a = arguments[1], s = arguments[2];
                wx.showToast({
                    title: "数据加载中",
                    icon: "loading",
                    duration: 1e4
                });
                var r = Object.assign({}, this.data, e);
                h.fetchOrderData(r, function(e) {
                    var r = e.data || {}, i = r.fromTradeCore || !1;
                    if (wx.hideToast(), t.setData({
                        fetching: !1
                    }), i && (r.preparePayResult || r.newPrepayResult)) {
                        var n = r.preparePayResult || {}, o = !!r.prepay, d = o ? r.newPrepayResult : n;
                        if (Object.assign(d, {
                            bizExt: n.bizExt || ""
                        }), t.setData({
                            isFromTradeCore: !0,
                            isPrepay: o,
                            newPayResult: d
                        }), t.payConstructor.setPrepayMode(o), o && !r.prepaySuccess) return void wx.showToast({
                            title: "支付失败，请稍后再试",
                            icon: "none",
                            duration: 2e3
                        });
                        if (0 === n.pay_amount) return void t.navigateSuccess();
                        t.setOrderData(e), t.payConstructor.createCashierOrder(d).then(function() {
                            var s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            s.acquire_no && t.setData({
                                "preparePayResult.acquireNo": s.acquire_no || ""
                            }), a && a(e);
                        }).catch(function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            s && s(e.msg || "收单失败～", e);
                        });
                    } else t.setOrderData(e), a && a(e);
                }, function(e, t) {
                    wx.hideToast(), s && s(e, t);
                });
            },
            setOrderData: function(e) {
                this.setData(l.parseOrderData(e.data, this.data)), this.autoUseCoupon();
                var t = e.data.shopResultList[0].groupInfo;
                if (null != t && this.data.isLeaderSelected && !this.data.isLeader) {
                    var a = {}, s = {};
                    a.tel = t.headerTel, a.user_name = t.headerUserName, a.province = t.headerProvince, 
                    a.city = t.headerCity, a.county = t.headerCounty, a.address_detail = t.headerAddressDetail, 
                    s.userTel = t.headerTel, s.name = t.headerUserName, s.province = t.headerProvince, 
                    s.city = t.headerCity, s.county = t.headerCounty, s.addressDetail = t.headerAddressDetail, 
                    this.setData({
                        address: a,
                        selfFetchAddress: s
                    });
                } else {
                    var r = wx.getStorageSync("trade-buy-address-custom") || {}, i = !0;
                    try {
                        var n = +e.data.shopResultList[0].postageResult.currentExpressType;
                        this.data.is_virtual || 1 == n || r.user_name || (i = !1);
                    } catch (e) {
                        console.log(e);
                    }
                    this.data.postageInfo.selected.available || (i = !1), this.setData({
                        showPostagePriceOnOrderTotal: i,
                        address: r,
                        selfFetchAddress: e.data.selfFetchAddress || {}
                    });
                }
            },
            updateOrderPayment: function() {
                if (!this.data.order_no) {
                    var e = this.data.payment, t = this.data.coupons.selected || {}, a = e.goodsPay + e.postage - e.activity;
                    1 === this.data.goods_list.length && 5 === this.data.goods_list[0].activityType || !t.id || (a -= 100 * parseFloat(t.priceStr)), 
                    e.realPay = a;
                    var s = l.parsePaymentData(e);
                    this.setData({
                        payment: e,
                        payment_strs: s
                    });
                }
            },
            initCountDown: function(e) {
                var t = this, a = 1e3 * e.shopResultList[0].order.expireTime, s = new Date().getTime();
                new p(a - s, {
                    onChange: function(e, a) {
                        t.setData({
                            countdown: a
                        });
                    },
                    onEnd: function() {
                        var e = o.db.set({
                            order_no: t.data.order_no
                        });
                        wx.redirectTo({
                            url: "/packages/trade/order/result/index?dbid=" + e
                        });
                    }
                });
            },
            onDateTimeChange: function(e) {
                this.setData({
                    fetchTime: e,
                    show_fetch_time_arrow: !0
                });
            },
            autoUseCoupon: function() {
                var e = this.data.coupons, t = e.list || [], a = {};
                t.length > 0 && ((a = t[0]).priceStr = f(a.value).toYuan()), this.setData({
                    coupons: Object.assign(e, {
                        selected: a
                    })
                }), this.updateOrderPayment();
            },
            showCouponList: function() {
                if (!(this.data.order_no && this.data.order_no.length > 0)) {
                    var e = {
                        charge_coupon: this.data.coupons.list,
                        unavailable_coupon: this.data.coupons.inValid,
                        selected_coupon: this.data.coupons.selected,
                        exchangeParams: {
                            item_pay: this.data.payment.goodsPay,
                            postage: this.data.payment.postage,
                            item_list: JSON.stringify(l.getBriefGoodsData(this.data.goods_list))
                        }
                    }, t = o.db.set(r({}, e));
                    wx.navigateTo({
                        url: "./coupon/index?dbid=" + t
                    });
                }
            },
            fetchCustomService: function() {
                var e = this;
                h.fetchCustomService(function(t) {
                    e.setData({
                        servicePhoneNumber: t
                    });
                });
            },
            handleContactPhoneService: function() {
                var e = this;
                wx.showModal({
                    title: this.data.servicePhoneNumber,
                    confirmText: "呼叫",
                    success: function(t) {
                        t.confirm && wx.makePhoneCall({
                            phoneNumber: e.data.servicePhoneNumber
                        });
                    }
                });
            },
            fetchUserInfo: function() {
                var e = this;
                o.getUserInfo(function(t) {
                    e.setData({
                        userInfo: t.userInfo
                    }), o.updateYouzanUserInfo(t.userInfo);
                }, function(t) {
                    e.setData({
                        userInfoDeny: o.globalData.userInfoDeny
                    });
                });
            },
            onLeaderSelected: function(e) {
                if (this.data.forceEnableGroupCollect) wx.showModal({
                    content: "你的包裹必须由团长代收",
                    showCancel: !1
                }); else {
                    var t = this.data.isLeaderSelected;
                    this.setData({
                        isLeaderSelected: !t
                    }), this.fetchOrderData();
                }
            }
        });
    }
});