function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, i) {
            function r(a, n) {
                try {
                    var o = t[a](n), s = o.value;
                } catch (e) {
                    return void i(e);
                }
                if (!o.done) return Promise.resolve(s).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(s);
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

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _createClass = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var r = t[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, i, r) {
        return i && e(t.prototype, i), r && e(t, r), t;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _adjustPic = require("./../lib/adjustPic.js"), _adjustPic2 = _interopRequireDefault(_adjustPic), _Dialog = require("./Dialog.js"), _Dialog2 = _interopRequireDefault(_Dialog), _OrderDetailButton = require("./OrderDetailButton.js"), _OrderDetailButton2 = _interopRequireDefault(_OrderDetailButton), _OrderDetailPopup = require("./OrderDetailPopup.js"), _OrderDetailPopup2 = _interopRequireDefault(_OrderDetailPopup), _navigate = require("./../logic/navigate.js"), _OrderDetailUserButton = require("./OrderDetailUserButton.js"), _OrderDetailUserButton2 = _interopRequireDefault(_OrderDetailUserButton), _wxPromise = require("./../lib/wxPromise.js"), _DialogCommon = require("./DialogCommon.js"), _DialogCommon2 = _interopRequireDefault(_DialogCommon), OrderDetail = function(e) {
    function t() {
        var e, i, r, a;
        _classCallCheck(this, t);
        for (var n = arguments.length, o = Array(n), s = 0; s < n; s++) o[s] = arguments[s];
        return i = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(o))), 
        r.data = {
            orderId: "",
            dataReady: !1,
            isBuyer: 0,
            isShowLogistics: !1,
            orderIdData: 0,
            priceData: {},
            payId: 0,
            status: -1,
            detailInfo: "",
            detailInfo1: "",
            isShowCountDown: !1,
            countDown: 0,
            timeId: 0,
            userInfo: {},
            deliver: {},
            address: {},
            goodInfo: {},
            infoDetail: {},
            button: [],
            middleButton: [],
            processItems: [],
            srviceWindowData: void 0,
            availableServices: [],
            activityLink: [],
            addressHidden: !1,
            packId: "",
            param: {}
        }, r.computed = {
            orderResult: function() {
                var e = [ {
                    isActive: !1,
                    activeImg: "//j2.58cdn.com.cn/zhuanzhuan/zzwa/main/orderDetail/order-fail.png"
                }, {
                    isActive: !1,
                    activeImg: "//j2.58cdn.com.cn/zhuanzhuan/zzwa/main/orderDetail/order-success.png"
                }, {
                    isActive: !1,
                    activeImg: "//j2.58cdn.com.cn/zhuanzhuan/zzwa/main/orderDetail/order-refund.png"
                } ], t = {
                    5: !0,
                    6: !0,
                    21: !0,
                    22: !0
                };
                return {
                    8: !0,
                    9: !0,
                    10: !0,
                    11: !0,
                    15: !0,
                    16: !0,
                    17: !0
                }[this.status] ? e[2].isActive = !0 : t[this.status] ? e[1].isActive = !0 : e[0].isActive = !0, 
                e;
            },
            orderStatus: function() {
                var e = this, t = [ {
                    isActive: !0,
                    orderCode: 1,
                    activeName: "已拍下",
                    activeImg: "//j2.58cdn.com.cn/zhuanzhuan/publicComponent/images/orderDetail/order-ordered.png"
                }, {
                    isActive: !1,
                    orderCode: 3,
                    readyName: "待付款",
                    activeName: "已付款",
                    readyImg: "//j2.58cdn.com.cn/zhuanzhuan/publicComponent/images/orderDetail/order-needToPay.png",
                    activeImg: "//j2.58cdn.com.cn/zhuanzhuan/publicComponent/images/orderDetail/order-payed.png"
                }, {
                    isActive: !1,
                    orderCode: 4,
                    readyName: "待发货",
                    activeName: "已发货",
                    readyImg: "//j2.58cdn.com.cn/zhuanzhuan/publicComponent/images/orderDetail/order-needToSend.png",
                    activeImg: "//j2.58cdn.com.cn/zhuanzhuan/publicComponent/images/orderDetail/order-send.png",
                    detail: "卖家已发货，待买家确认收货"
                }, {
                    isActive: !1,
                    orderCode: 100,
                    readyName: "待收货",
                    activeName: "已收货",
                    readyImg: "//j2.58cdn.com.cn/zhuanzhuan/publicComponent/images/orderDetail/order-needToGet.png"
                } ];
                if (this.processItems && this.processItems.length && 5 == this.processItems.length) {
                    var i = {
                        isActive: !1,
                        orderCode: 50,
                        readyName: "待验机",
                        activeName: "验机完成",
                        readyImg: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/sanqi/yanji1.png",
                        activeImg: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/sanqi/yanji2.png",
                        detail: "已发货，待质检平台收货"
                    };
                    "hasService" == this.processItems[3].processStateId ? i.isActive = !0 : i.isActive = !1, 
                    t.splice(3, 0, i);
                }
                return t.forEach(function(t) {
                    t.orderCode <= parseInt(e.status) && (t.isActive = !0);
                }), t;
            },
            isComplete: function() {
                var e = {
                    2: !0,
                    5: !0,
                    6: !0,
                    8: !0,
                    9: !0,
                    10: !0,
                    11: !0,
                    13: !0,
                    14: !0,
                    15: !0,
                    16: !0,
                    17: !0,
                    18: !0,
                    19: !0,
                    20: !0,
                    21: !0,
                    22: !0
                };
                return console.log(this.status, "this.status"), !!e[this.status];
            },
            showServiceWindow: function() {
                return this.srviceWindowData && this.srviceWindowData.title;
            }
        }, r.$repeat = {}, r.$props = {
            OrderDetailPopup: {
                "xmlns:v-bind": "",
                "v-bind:orderId.sync": "orderIdData",
                "v-bind:userInfo.sync": "userInfo",
                "v-bind:isBuyer.sync": "isBuyer"
            },
            OrderDetailButton: {
                "xmlns:v-bind": "",
                "v-bind:orderButton.sync": "button",
                "v-bind:orderId.sync": "orderIdData",
                "v-bind:priceData.sync": "priceData",
                "v-bind:payId.sync": "payId",
                "v-bind:goodInfo.sync": "goodInfo",
                "v-bind:isBuyer.sync": "isBuyer"
            },
            OrderDetailUserButton: {
                "xmlns:v-bind": "",
                "v-bind:middleButton.sync": "middleButton",
                "v-bind:goodInfo.sync": "goodInfo"
            }
        }, r.$events = {}, r.components = {
            OrderDetailPopup: _OrderDetailPopup2.default,
            OrderDetailButton: _OrderDetailButton2.default,
            OrderDetailUserButton: _OrderDetailUserButton2.default,
            Dialog: _Dialog2.default,
            DialogCommon: _DialogCommon2.default
        }, r.events = {
            handlePageData: function(e) {
                r.handlePageData(e);
            },
            pageLoad: function(e) {
                r.orderId = e.orderId, r.param = e, r.param.scene && (r.param.scene = r.param.scene.split("_")[1]), 
                r.getOrderDetailData(), r.$apply();
            }
        }, r.methods = {
            serviceWinBtnTap: function(e) {
                "查看质检报告" == e ? this.$log("SERVICESHOOWCASE_YANJISERVICEREPORT_CLICK") : this.$log("SERVICESHOOWCASE_GAMEBUTTON_CLICK"), 
                wx.showModal({
                    content: "小程序暂不支持此功能，请登录转转APP操作",
                    showCancel: !1,
                    confirmText: "知道了"
                });
            },
            deliverDetail: function() {
                (0, _navigate.gotoDeliverDetail)(this.deliver.logisticsCompany, this.deliver.logisticsNum, this.orderId);
            },
            gotoMinePage: function() {
                console.log("前往个人主页");
            },
            gotoGoodDetail: function() {
                this.$nav.enterDetail({
                    userId: this.goodInfo.userId || this.goodInfo.uid,
                    infoId: this.goodInfo.infoId
                });
            },
            setClipboard: function() {
                var e = this;
                _wepy2.default.setClipboardData({
                    data: this.orderId,
                    success: function(t) {
                        e.$toast({
                            title: "订单号已复制",
                            duration: 2e3,
                            type: "success"
                        });
                    }
                });
            }
        }, a = i, _possibleConstructorReturn(r, a);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "getSceneInfo",
        value: function() {
            return this.$httpWithLogin({
                url: "https://app.zhuanzhuan.com/zzopen/wxcommon/getParamByCode",
                data: {
                    code: this.param.scene
                }
            });
        }
    }, {
        key: "intercept",
        value: function(e) {
            if ("34857644331526" === e.userId && !this.param.noRedirectTo) {
                var t = "https://m.zhuanzhuan.58.com/youpin/website/order/detail.html?oid=" + e.orderId;
                _wxPromise.wxPromise.redirectTo({
                    url: "/pages/webview/webview?url=" + encodeURIComponent(t)
                });
            }
        }
    }, {
        key: "getOrderDetailData",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, i, r = this;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (this.orderId || !this.param.scene) {
                            e.next = 5;
                            break;
                        }
                        return e.next = 3, this.getSceneInfo();

                      case 3:
                        t = e.sent, 0 == t.respCode && t.respData && t.respData.result && (i = JSON.parse(t.respData.result), 
                        this.$root.$parent.fulfillAsyncChannel(i && i.channel), this.orderId = i.orderId, 
                        this.$apply());

                      case 5:
                        this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getOrder?orderId=" + this.orderId,
                            type: "GET",
                            success: function(e) {
                                var t = e.data.respData;
                                r.processItems = t.processItems, console.log(t.userId, "data.userId"), r.userId = t.userId, 
                                r.intercept({
                                    orderId: r.orderId,
                                    userId: t.userId
                                }), r.availableServices = t.availableServices, r.packId = t.packId, r.activityLink = t.activityLink, 
                                r.addressHidden = "3" == t.orderCategory || "1" == t.addressHidden, r.handlePageData(t), 
                                r.$apply();
                            }
                        });

                      case 6:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "handlePageData",
        value: function(e) {
            console.log(e, "data"), this.dataReady = !0, this.isBuyer = e.isBuyer, this.orderIdData = this.orderId, 
            "1" == e.isShowService && this.getOrderService(), this.priceData = {
                price: e.price,
                freight: e.freight
            }, this.status = parseInt(e.status), this.detailInfo = e.detailInfo, e.isShowLogistics && (this.isShowLogistics = e.isShowLogistics) && this.getDeliverData(), 
            !!parseInt(e.payTime) && this.countDownFn(e.payTime / 1e3), e.detailInfo1 ? (this.detailInfo1 = e.detailInfo1, 
            this.isShowCountDown = !0) : (this.timeId && clearTimeout(this.timeId), this.isShowCountDown = !1, 
            this.countDown = "", this.detailInfo1 = ""), this.userInfo = {
                userId: e.userId,
                userPic: e.userPic,
                userNickName: e.userNickName,
                btnTextContract: e.btnTextContract,
                userTel: e.userTel && e.userTel.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2")
            }, this.address = JSON.parse(e.address), this.goodInfo = {
                userId: e.userId,
                infoId: e.infoId,
                infoPics: e.infoPics,
                infoPicsHandle: _adjustPic2.default.handleSingle(e.infoPics),
                infoTitle: e.infoTitle,
                price: e.price,
                freight: e.freight,
                infoTotalPrice: parseInt(e.price) + parseInt(e.freight),
                packAmount: 1 === parseInt(this.isBuyer) ? parseInt(e.packAmount) : 0,
                actualPayMoney: e.actualPayMoney
            }, this.infoDetail = {
                orderId: e.orderId,
                payTypeTitle: e.payTypeTitle,
                createTime: this.format(new Date(parseInt(e.createTime)), "yyyy-MM-dd HH:mm:ss"),
                buyerPayTime: parseInt(e.buyerPayTime) ? this.format(new Date(parseInt(e.buyerPayTime)), "yyyy-MM-dd HH:mm:ss") : 0,
                deliverTime: parseInt(e.deliverTime) ? this.format(new Date(parseInt(e.deliverTime)), "yyyy-MM-dd HH:mm:ss") : 0
            }, this.payId = e.payId, this.button = e.operationInfo, this.middleButton = e.middleOperationList.reverse(), 
            this.$apply(), this.$log("viewOrderDetail-" + this.isBuyer);
        }
    }, {
        key: "getDeliverData",
        value: function() {
            var e = this, t = this.orderId;
            this.$httpWithLogin({
                url: "https://app.zhuanzhuan.com/zz/transfer/getOrderKuaiDi",
                data: {
                    orderId: t
                },
                method: "POST",
                success: function(t) {
                    var i = t.data.respData;
                    e.deliver = {
                        lastLogisticsInfo: i.lastLogisticsInfo,
                        lastLogisticsTime: e.format(new Date(parseInt(i.lastLogisticsTime)), "yyyy年MM月dd日 HH:mm"),
                        logisticsCompany: i.logisticsCompany,
                        logisticsNum: i.logisticsNum,
                        orderHelpTipUrl: i.orderHelpTipUrl
                    }, e.$apply();
                }
            });
        }
    }, {
        key: "getOrderService",
        value: function() {
            var e = this, t = this.orderId;
            this.$httpWithLogin({
                url: "https://app.zhuanzhuan.com/zz/transfer/getOrderService",
                data: {
                    orderId: t
                },
                method: "POST",
                success: function(t) {
                    var i = t.data.respData, r = i.serviceWinContent.split("<br/>").map(function(e) {
                        return e.replace(/<\/?[^>]*>/g, "").replace(/(&nbsp(;)?)/g, " ");
                    });
                    i.title = r[0], i.content = r[1], e.srviceWindowData = i, e.$apply();
                }
            });
        }
    }, {
        key: "format",
        value: function(e, t) {
            var i = function(e, t) {
                var i = "", r = e < 0, a = String(Math.abs(e));
                return a.length < t && (i = new Array(t - a.length + 1).join("0")), (r ? "-" : "") + i + a;
            }, r = function(e, i) {
                t = t.replace(e, i);
            }, a = e.getFullYear(), n = e.getMonth() + 1, o = e.getDate(), s = e.getHours(), d = e.getMinutes(), u = e.getSeconds();
            return r(/yyyy/g, i(a, 4)), r(/yy/g, i(parseInt(a.toString().slice(2), 10), 2)), 
            r(/MM/g, i(n, 2)), r(/M/g, n), r(/dd/g, i(o, 2)), r(/d/g, o), r(/HH/g, i(s, 2)), 
            r(/H/g, s), r(/hh/g, i(s % 12, 2)), r(/h/g, s % 12), r(/mm/g, i(d, 2)), r(/m/g, d), 
            r(/ss/g, i(u, 2)), r(/s/g, u), t;
        }
    }, {
        key: "countDownFn",
        value: function(e) {
            var t = this;
            if (e <= 0) return void this.getOrderDetailData();
            var i = parseInt(e), r = parseInt(i / 60), a = Math.floor(r / 60), n = 0, o = r - 60 * a;
            a >= 24 && (n = Math.floor(a / 24), a -= 24 * n), this.countDown = n ? n + "天" + a + "小时" + o + "分钟" : a + "小时" + o + "分钟", 
            this.$apply(), this.timeId = setTimeout(function() {
                t.countDownFn(i - 60);
            }, 6e4);
        }
    }, {
        key: "resetData",
        value: function() {
            this.data = {
                dataReady: !1,
                isBuyer: 0,
                isShowLogistics: !1,
                orderIdData: 0,
                priceData: {},
                payId: 0,
                status: -1,
                detailInfo: "",
                detailInfo1: "",
                countDown: 0,
                timeId: 0,
                userInfo: {},
                deliver: {},
                address: {},
                goodInfo: {},
                infoDetail: {},
                button: [],
                middleButton: []
            }, this.timeId && (clearTimeout(this.timeId), this.timeId = 0), this.$invoke("OrderDetailButton", "resetData"), 
            this.$invoke("OrderDetailButton/bottomButton", "enableButton"), this.$apply();
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = OrderDetail;