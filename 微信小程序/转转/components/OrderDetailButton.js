function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _asyncToGenerator(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, o) {
            function n(r, a) {
                try {
                    var i = e[r](a), u = i.value;
                } catch (t) {
                    return void o(t);
                }
                if (!i.done) return Promise.resolve(u).then(function(t) {
                    n("next", t);
                }, function(t) {
                    n("throw", t);
                });
                t(u);
            }
            return n("next");
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

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _createClass = function() {
    function t(t, e) {
        for (var o = 0; o < e.length; o++) {
            var n = e[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, o, n) {
        return o && t(e.prototype, o), n && t(e, n), e;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _BottomButton = require("./BottomButton.js"), _BottomButton2 = _interopRequireDefault(_BottomButton), _DialogCommon = require("./DialogCommon.js"), _DialogCommon2 = _interopRequireDefault(_DialogCommon), _handleImg = require("./../lib/handleImg.js"), _handleImg2 = _interopRequireDefault(_handleImg), _navigate = require("./../logic/navigate.js"), _wxPromise = require("./../lib/wxPromise.js"), _RiskTip = require("./common/RiskTip.js"), _RiskTip2 = _interopRequireDefault(_RiskTip), OrderDetailButton = function(t) {
    function e() {
        var t, o, n, r;
        _classCallCheck(this, e);
        for (var a = arguments.length, i = Array(a), u = 0; u < a; u++) i[u] = arguments[u];
        return o = n = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(i))), 
        n.data = {
            button: [],
            isShow: !1,
            arg: {},
            buttonIndex: null
        }, n.computed = {}, n.watch = {
            orderButton: function(t) {
                var e = this;
                console.log(t, "newValue");
                var o = [];
                0 === t.length && (this.isShow = !1), t.forEach(function(n, r) {
                    var a = "bottom-button-";
                    e.isShow = !0, 1 === t.length ? a += "center" : 2 === t.length && (a += 0 === r ? "left" : "right");
                    var i = [ "cancelOrder", "refuseOrder", "getPay", "applyForRefund", "shipDeliverGood", "remindOtherSide", "confirmReceipt", "fixPrice", "deliver" ], u = {
                        name: n.text,
                        className: a,
                        formType: "submit",
                        callback: e.buttonCallback(n.operationId)
                    };
                    i.includes(n.operationId) || (u.callback = e.buttonCallback("other")), o[r] = u, 
                    n.arg && (e.arg[n.operationId] = n.arg);
                }), this.button = o, this.$apply();
            }
        }, n.$repeat = {}, n.$props = {
            bottomButton: {
                "xmlns:wx": "",
                "xmlns:v-bind": "",
                "v-bind:button.sync": "button"
            }
        }, n.$events = {}, n.components = {
            bottomButton: _BottomButton2.default,
            DialogCommon: _DialogCommon2.default,
            RiskTip: _RiskTip2.default
        }, n.props = {
            orderButton: [],
            orderId: 0,
            payId: 0,
            isBuyer: 0,
            priceData: {},
            goodInfo: {}
        }, n.methods = {}, r = o, _possibleConstructorReturn(n, r);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "onLoad",
        value: function() {}
    }, {
        key: "tipApp",
        value: function() {
            this.$toast({
                title: "请登录转转APP操作",
                duration: 2e3,
                type: "fail"
            });
        }
    }, {
        key: "buttonIndexCallBack",
        value: function(t) {
            this.buttonIndex = t, this.$apply();
        }
    }, {
        key: "buttonCallback",
        value: function(t) {
            var e = this;
            return console.log(t, "operationIdhahah"), {
                cancelOrder: function(t) {
                    1 === parseInt(e.isBuyer) ? e.$log("cancelOrder") : e.$log("refuseOrder"), e.$invoke("../OrderDetailPopup", "cancelOrder", e.arg.cancelOrder, t), 
                    e.$invoke("bottomButton", "enableButton");
                },
                refuseOrder: function(t) {
                    1 === parseInt(e.isBuyer) ? e.$log("cancelOrder") : e.$log("refuseOrder"), e.$invoke("../OrderDetailPopup", "refuseOrder", e.arg.refuseOrder, t), 
                    e.$invoke("bottomButton", "enableButton");
                },
                getPay: function(t) {
                    e.pay(e.orderId, e.payId, e.goodInfo.infoPics, e.priceData.price, t);
                },
                applyForRefund: function(t) {
                    e.tipApp(), e.$invoke("bottomButton", "enableButton");
                },
                shipDeliverGood: function(t) {
                    e.$invoke("../OrderDetailPopup", "shipDeliverGood", t), e.$invoke("bottomButton", "enableButton");
                },
                checkRefund: function(t) {
                    e.tipApp(), e.$invoke("bottomButton", "enableButton");
                },
                applyRefundMoney: function(t) {
                    e.tipApp(), e.$invoke("bottomButton", "enableButton");
                },
                remindOtherSide: function(t) {
                    e.$httpWithLogin({
                        url: "https://app.zhuanzhuan.com/zz/transfer/remindOtherSide?orderId=" + e.orderId + "&otherId=" + e.arg.remindOtherSide.otherId,
                        method: "GET",
                        success: function(t) {
                            if (0 === parseInt(t.data.respCode)) {
                                var o = 1 === parseInt(e.isBuyer) ? "已通知卖家快马加鞭为您发货" : t.data.respData.msg;
                                e.$toast({
                                    title: o,
                                    duration: 2e3,
                                    type: "success"
                                });
                            } else e.$toast({
                                title: t.data.errMsg,
                                duration: 2e3,
                                type: "fail"
                            });
                            e.$invoke("bottomButton", "enableButton");
                        }
                    });
                },
                confirmReceipt: function(t) {
                    var o = e.orderId;
                    e.$httpWithLogin({
                        url: "https://app.zhuanzhuan.com/zzx/transfer/usercreditlevel",
                        data: {
                            orderId: o,
                            type: 1
                        },
                        method: "POST",
                        success: function(o) {
                            var n = o.data.respData;
                            if (0 === parseInt(o.data.respCode)) {
                                var r = function() {
                                    e.$invoke("../Dialog", "showDialog", {
                                        content: "您是否未收到货物？确认收货后钱款将打给卖家，请务必再次确认",
                                        buttonType: "flex",
                                        buttons: [ {
                                            text: "未收到",
                                            callback: function() {
                                                e.$invoke("../Dialog", "closeDialog");
                                            }
                                        }, {
                                            text: "已收到",
                                            callback: function() {
                                                e.$invoke("../Dialog", "closeDialog"), e.$invoke("../OrderDetailPopup", "confirmReceipt", t);
                                            }
                                        } ]
                                    });
                                };
                                "10003" == n.userLevelNew ? e.$invoke("RiskTip", "open", function() {
                                    r();
                                }) : r();
                            }
                            e.$invoke("bottomButton", "enableButton");
                        }
                    });
                },
                turnMView: function() {
                    var t = "";
                    null != e.buttonIndex && (t = e.button[e.buttonIndex].name), "查看钱款去向" == t ? (0, 
                    _navigate.gotoPaymenttip)() : "查看退款去向" == t ? (0, _navigate.gotoRefundtip)() : t.includes("待卖家验号") ? (e.showDialog(e.arg.turnMView.alertInfo), 
                    e.$invoke("bottomButton", "enableButton")) : (e.$invoke("bottomButton", "enableButton"), 
                    e.tipApp());
                },
                commentDeal: function() {
                    e.tipApp(), e.$invoke("bottomButton", "enableButton");
                },
                checkComments: function() {
                    e.tipApp(), e.$invoke("bottomButton", "enableButton");
                },
                reducePrice: function() {
                    e.tipApp(), e.$invoke("bottomButton", "enableButton");
                },
                confirmBuy: function() {
                    e.$invoke("bottomButton", "enableButton");
                    var t = e.arg.confirmBuy.alertInfo;
                    e.$invoke("DialogCommon", "open", {
                        title: t.title,
                        content: t.content,
                        buttons: [ {
                            text: t.cancel
                        }, {
                            text: t.sure,
                            clickHandler: function() {
                                function t() {
                                    return o.apply(this, arguments);
                                }
                                var o = _asyncToGenerator(regeneratorRuntime.mark(function t() {
                                    var o;
                                    return regeneratorRuntime.wrap(function(t) {
                                        for (;;) switch (t.prev = t.next) {
                                          case 0:
                                            return t.next = 2, e.$httpWithLogin({
                                                url: "https://app.zhuanzhuan.com/zzx/transfer/confirmBuy",
                                                data: {
                                                    orderId: e.orderId
                                                }
                                            });

                                          case 2:
                                            if (o = t.sent, 0 == o.respCode) {
                                                t.next = 6;
                                                break;
                                            }
                                            return e.$toast({
                                                title: "确认发货失败",
                                                type: "fail"
                                            }), t.abrupt("return");

                                          case 6:
                                            e.$emit("updata"), e.$apply();

                                          case 8:
                                          case "end":
                                            return t.stop();
                                        }
                                    }, t, e);
                                }));
                                return t;
                            }()
                        } ]
                    });
                },
                fixPrice: function() {
                    e.$invoke("bottomButton", "enableButton"), (0, _navigate.gotoUpdatePrice)(e.priceData.price, e.priceData.freight, e.orderId);
                },
                deliver: function(t) {
                    e.$invoke("../OrderDetailPopup", "deliver", t), e.$invoke("bottomButton", "enableButton");
                },
                other: function() {
                    e.tipApp(), e.$invoke("bottomButton", "enableButton");
                }
            }[t];
        }
    }, {
        key: "showDialog",
        value: function(t) {
            t && this.$invoke("DialogCommon", "open", {
                title: t.title,
                content: t.content,
                buttons: [ {
                    text: t.cancel
                } ]
            });
        }
    }, {
        key: "resetData",
        value: function() {
            this.orderButton = [], this.$apply();
        }
    }, {
        key: "pay",
        value: function(t, e, o, n, r) {
            var a = this;
            this.$httpWithLogin({
                url: "https://app.zhuanzhuan.com/zzx/transfer/getPay",
                data: {
                    orderId: t,
                    payType: 9,
                    systemType: 2,
                    expire: 0,
                    payId: e,
                    refreshToken: "",
                    formId: r
                },
                method: "POST",
                success: function(r) {
                    if (0 === parseInt(r.data.respCode) && r.data.respData && r.data.respData.sign) {
                        var i = r.data.respData;
                        wx.requestPayment({
                            timeStamp: i.timeStamp,
                            nonceStr: i.nonceStr,
                            package: i.package,
                            signType: "MD5",
                            paySign: i.sign,
                            success: function(r) {
                                a.$invoke("bottomButton", "enableButton"), _wxPromise.wxPromise.redirectTo({
                                    url: "/subPages/trade/buy/success?orderId=" + t + "&payId=" + e + "&pic=" + o + "&amount=" + n
                                });
                            },
                            fail: function(t) {
                                a.$invoke("bottomButton", "enableButton"), a.$toast({
                                    title: "支付未完成，请重新支付",
                                    duration: 2e3,
                                    type: "fail"
                                });
                            }
                        });
                    } else if (-2 === parseInt(r.data.respCode)) a.$toast({
                        title: "卖家已经修改了订单价格，即将为您刷新页面",
                        type: "fail"
                    }), setTimeout(function() {
                        var t = [], e = a.$root.$wxpage.options;
                        for (var o in e) t.push([ o, e[o] || "" ].join("="));
                        var n = Object.assign({
                            userId: "",
                            jumpType: "redirectTo"
                        }, t);
                        (0, _navigate.enterOrderDetail)(n);
                    }, 2e3); else if (r.data.respData && r.data.respData.createOrderAlertInfo) {
                        var u = r.data.respData.createOrderAlertInfo.arg.alertInfo;
                        r.data.respData.createOrderAlertInfo;
                        a.$invoke("DialogCommon", "open", {
                            title: "提示",
                            content: u.content,
                            buttons: [ "知道了" ]
                        });
                    } else a.$invoke("bottomButton", "enableButton"), a.$toast({
                        title: r.data.errMsg,
                        duration: 2e3,
                        type: "fail"
                    });
                },
                fail: function(t) {
                    a.$nav.enterOrderDetail({
                        jumpType: "redirectTo",
                        orderId: t.orderId
                    });
                }
            });
        }
    } ]), e;
}(_wepy2.default.component);

exports.default = OrderDetailButton;