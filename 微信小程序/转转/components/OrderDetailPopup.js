function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
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
        for (var a = 0; a < e.length; a++) {
            var o = e[a];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, a, o) {
        return a && t(e.prototype, a), o && t(e, o), e;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _Popup = require("./Popup.js"), _Popup2 = _interopRequireDefault(_Popup), _navigate = require("./../logic/navigate.js"), OrderDetailPopup = function(t) {
    function e() {
        var t, a, o, r;
        _classCallCheck(this, e);
        for (var n = arguments.length, s = Array(n), i = 0; i < n; i++) s[i] = arguments[i];
        return a = o = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(s))), 
        o.data = {
            cancelReason: [],
            isRefuse: !1,
            popupStatus: {
                orderCancelReason: !1,
                confirmGet: !1,
                post: !1
            },
            captchaCountDown: 0,
            captchaNum: "____",
            xxzl_cp: 0,
            captchaErr: "",
            captcha: !1,
            formId: 0
        }, o.$repeat = {}, o.$props = {
            popup: {
                position: "bottom",
                popType: "custom",
                animation: "0.2s linear"
            }
        }, o.$events = {}, o.components = {
            popup: _Popup2.default
        }, o.props = {
            orderId: 0,
            userInfo: {},
            isBuyer: 0
        }, o.methods = {
            orderCancelHide: function() {
                this.$broadcast("popuphide");
            },
            orderCancelReason: function(t) {
                var e = this, a = t.target.dataset.id, o = encodeURIComponent(this.cancelReason[a]), r = 1 === parseInt(this.isBuyer) ? "cancelOrder" : "refuseOrder";
                this.$log(r + "-" + a);
                var n = this.isRefuse ? "refuseOrder" : "cancelOrder";
                this.$httpWithLogin({
                    url: "https://app.zhuanzhuan.com/zzx/transfer/" + n + "?cancelReason=" + o + "&orderId=" + this.orderId + "&formId=" + this.formId,
                    type: "GET",
                    success: function(t) {
                        e.$broadcast("popuphide");
                        var a = t.data.respCode;
                        0 === parseInt(a) ? e.$emit("handlePageData", t.data.respData) : e.$toast({
                            title: t.data.errMsg,
                            duration: 2e3,
                            type: "fail"
                        });
                    }
                });
            },
            reRendCaptcha: function() {
                this.captcha = !1, this.captchaCountDownFn(60);
            },
            typeTap: function(t) {
                var e = t.target.dataset.index, a = this.captchaNum;
                if (4 !== a.replace(/_/g, "").length) {
                    var o = a.replace(/_/, e), r = o.replace(/_/g, "").length;
                    this.captchaNum = o, this.$apply(), 4 === r && this.confirmCaptcha();
                }
            },
            backTap: function() {
                var t = this.captchaNum, e = t.replace(/\d(?=_)/, "_");
                this.captchaNum = e, this.$apply();
            },
            sellerf2f: function() {
                var t = this;
                this.$broadcast("popuphide"), this.$invoke("../Dialog", "showDialog", {
                    title: "“当面交易”提醒",
                    content: "当面交易时，在买家验货无误后，请要求买家当面点击“确认收货”按钮，以免钱货两失",
                    buttonType: "flex",
                    buttons: [ {
                        text: "取消",
                        callback: function() {
                            t.$invoke("../Dialog", "closeDialog");
                        }
                    }, {
                        text: "继续",
                        callback: function() {
                            t.$invoke("../Dialog", "closeDialog"), t.$httpWithLogin({
                                url: "https://app.zhuanzhuan.com/zzx/transfer/deliverGood",
                                method: "POST",
                                data: {
                                    logisticsCompany: "mianjiao",
                                    orderId: t.orderId,
                                    formId: t.formId
                                },
                                success: function(e) {
                                    var a = e.data.respData;
                                    t.$emit("handlePageData", a);
                                }
                            });
                        }
                    } ]
                });
            },
            sellerPost: function() {
                this.$broadcast("popuphide"), (0, _navigate.gotoDeliver)(this.orderId);
            }
        }, r = a, _possibleConstructorReturn(o, r);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "setPopupStatus",
        value: function(t) {
            var e = this;
            Object.keys(this.popupStatus).forEach(function(t) {
                e.popupStatus[t] = !1;
            }), this.popupStatus[t] = !0, this.$apply();
        }
    }, {
        key: "cancelOrder",
        value: function(t, e) {
            this.cancelReason = t.sheetInfo.contentList, this.isRefuse = !1, e && (this.formId = e), 
            this.$apply(), this.setPopupStatus("orderCancelReason"), this.$broadcast("popupshow");
        }
    }, {
        key: "refuseOrder",
        value: function(t, e) {
            console.log("拒绝订单，不是单纯买家卖家判断是cancelOrder还是refuseOrder，还涉及订单状态"), this.cancelReason = t.sheetInfo.contentList, 
            this.isRefuse = !0, e && (this.formId = e), this.$apply(), this.setPopupStatus("orderCancelReason"), 
            this.$broadcast("popupshow");
        }
    }, {
        key: "confirmReceipt",
        value: function(t) {
            t && (this.formId = t), this.setPopupStatus("confirmGet"), this.$broadcast("popupshow"), 
            this.captchaCountDownFn(60);
        }
    }, {
        key: "deliver",
        value: function(t) {
            t && (this.formId = t), this.setPopupStatus("post"), this.$broadcast("popupshow");
        }
    }, {
        key: "shipDeliverGood",
        value: function(t) {
            this.$broadcast("popuphide"), (0, _navigate.gotoDeliver)(this.orderId);
        }
    }, {
        key: "captchaCountDownFn",
        value: function(t) {
            var e = this;
            if (this.captchaCountDown = t + "s", this.$apply(), 0 === t) return this.captcha = !0, 
            void this.$apply();
            60 === t && this.getCaptcha(), setTimeout(function() {
                e.captchaCountDownFn(t - 1);
            }, 1e3);
        }
    }, {
        key: "getCaptcha",
        value: function() {
            var t = this;
            this.$httpWithLogin({
                url: "https://app.zhuanzhuan.com/zzx/transfer/getPayCaptcha?len=4&orderId=" + this.orderId,
                method: "GET",
                success: function(e) {
                    var a = parseInt(e.data.respCode), o = e.data.respData;
                    0 === a && (t.xxzl_cp = o);
                }
            });
        }
    }, {
        key: "confirmCaptcha",
        value: function() {
            var t = this;
            this.$httpWithLogin({
                url: "https://app.zhuanzhuan.com/zzx/transfer/confirmReceipt",
                method: "POST",
                data: {
                    captcha_input: this.captchaNum,
                    orderId: this.orderId,
                    xxzl_cp: this.xxzl_cp,
                    formId: this.formId
                },
                success: function(e) {
                    if (0 !== parseInt(e.data.respCode)) t.captchaErr = e.data.errMsg, t.captchaNum = "____", 
                    t.$apply(); else {
                        var a = e.data.respData;
                        t.$broadcast("popuphide"), t.$emit("handlePageData", a);
                    }
                }
            });
        }
    } ]), e;
}(_wepy2.default.component);

exports.default = OrderDetailPopup;