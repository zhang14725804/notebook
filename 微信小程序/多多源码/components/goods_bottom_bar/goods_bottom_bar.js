function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var s = e[a];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(t, s.key, s);
        }
    }
    return function(e, a, s) {
        return a && t(e.prototype, a), s && t(e, s), e;
    };
}(), s = require("../../common/index"), n = t(require("../../storage/ram_manager")), o = t(require("../../configs/api")), i = t(require("../../libs/co/we-index")), u = t(require("../../libs/regenerator-runtime/runtime")), l = {
    FIRST: "已加入收藏,可在您的个人中心查看",
    DEFAULT: "已加入收藏",
    LIKE_MALL: "收藏店铺成功"
}, r = function() {
    function t(a) {
        e(this, t), this.setDataFunc = a.setDataFunc, this.addRootFunc = a.addRootFunc, 
        this.showToastFunc = a.showToast, this.goodsId = a.goodsId, this.goodsBottomBarData = null, 
        this.addGoodsLikeEvent();
    }
    return a(t, [ {
        key: "setData",
        value: function(t) {
            "function" == typeof this.setDataFunc && this.setDataFunc(t);
        }
    }, {
        key: "initComponentData",
        value: function(t, e, a) {
            if (t) {
                this.dataObj = {
                    hasLiked: !!t.hasLiked,
                    singlePurchaseButton: !0,
                    clockShow: !1,
                    singleButtonClass: "",
                    singleButtonLabel: "",
                    clickSingleButtonFunc: "",
                    secondButtonClass: "",
                    secondButtonLabel01: "",
                    secondButtonLabel02Class: "",
                    SecondButtonLabel02: "",
                    isIpx: t.isIpx
                };
                var s = t.groupRoleDesc || "", n = t.normalPrice || "", o = t.groupPrice || "", i = t.totalPrice || "", u = !!t.isOnSale, l = !!t.isFreeTrial, r = !!t.isLottery, d = !!t.spikeComing, c = !!t.lotteryComing, b = t.resultOn || "", h = !!t.hasFreeCoupons, g = !!t.hasAssociatedGroup, B = !!t.hasCaptainCoupons, O = !!t.isCapitalGift, j = !!t.isCapitalGiftLottery, p = !!t.isSpike, k = !!t.isSuperSpike, f = t.resultLabel || "", L = t.lotteryWaitingLabel || "", C = t.eventComingLabel || "", v = "¥  " + o, m = "¥  " + i;
                if (this.dataObj.normalPrice = n, this.dataObj.singlePurchaseButton = !1, this.dataObj.secondButtonClass = "goods-group-btn", 
                this.dataObj.secondButtonLabel01 = "一键开团", this.dataObj.secondButtonLabel02Class = "goods-buy-price", 
                this.dataObj.SecondButtonLabel02 = v, r || l) c ? (this.dataObj.singlePurchaseButton = !0, 
                this.dataObj.singleButtonClass = "goods-event-coming-btn", this.dataObj.singleButtonLabel = C.join(" "), 
                this.dataObj.clickSingleButtonFunc = "") : "on" === b ? (this.dataObj.singlePurchaseButton = !0, 
                this.dataObj.singleButtonClass = "goods-lottery-result-btn", this.dataObj.singleButtonLabel = f, 
                this.dataObj.clickSingleButtonFunc = "goDrawLuckyList", a.$showModal({
                    title: "来晚一步，活动已结束",
                    content: "快去看看其他超值好货吧~",
                    confirmText: "¥  0.01抢好货",
                    cancelText: "我想再看看",
                    contentAlign: "center",
                    reportFormId: !0,
                    success: function(t) {
                        t.confirm ? a.clickOverDuePopConfirm() : t.cancel && a.confirmClose();
                    }
                })) : "waiting" === b ? (this.dataObj.singlePurchaseButton = !0, this.dataObj.singleButtonClass = "goods-lottery-waiting-btn", 
                this.dataObj.singleButtonLabel = L, this.dataObj.clickSingleButtonFunc = "") : g || j ? !g && j && (this.dataObj.singlePurchaseButton = !1, 
                this.dataObj.secondButtonClass = "goods-group-btn", this.dataObj.secondButtonLabel01 = "开团送礼", 
                this.dataObj.secondButtonLabel02Class = "goods-buy-price", this.dataObj.SecondButtonLabel02 = m) : r || l ? (this.dataObj.isLotteryFreeTrialOn = !0, 
                this.dataObj.singlePurchaseButton = !0, this.dataObj.singleButtonClass = "goods-lottery-result-btn", 
                this.dataObj.singleButtonLabel = v + (r ? " 一键拼" : " 申请免费试用"), this.dataObj.clickSingleButtonFunc = "groupBuy") : (this.dataObj.singlePurchaseButton = !1, 
                this.dataObj.secondButtonClass = "goods-group-btn", this.dataObj.secondButtonLabel01 = "一键开团", 
                this.dataObj.secondButtonLabel02Class = "goods-buy-price", this.dataObj.SecondButtonLabel02 = v); else if (p || k) {
                    if (d && !u) {
                        this.dataObj.singlePurchaseButton = !0, this.dataObj.singleButtonClass = e.reminded ? "spike-has-remind-btn" : "spike-no-remind-btn", 
                        this.dataObj.singleButtonLabel = C.join(" "), this.dataObj.clickSingleButtonFunc = "spikeRemind", 
                        this.dataObj.clockShow = !0, this.setData(this.dataObj);
                        var y = this, S = e.groupTypes[1].startTime - e.serverTime + 3;
                        if (e && e.groupTypes && e.groupTypes[1] && S <= 180) {
                            var F = Math.floor(S / 60), P = S % 60;
                            this.dataObj.clockShow = !1, F > 0 ? (F += "分", P < 10 && (P = "0" + P)) : F = "";
                            var w = "剩余 " + F + P + "秒 即将开抢";
                            y.setData({
                                clickSingleButtonFunc: "",
                                singleButtonClass: "goods-lottery-result-btn",
                                clockShow: !1,
                                singleButtonLabel: w
                            });
                        }
                        return y.spikeComingInterval && clearInterval(y.spikeComingInterval), void (y.spikeComingInterval = setInterval(function() {
                            if (--S < 180 && S > 0) {
                                var t = Math.floor(S / 60), e = S % 60;
                                t > 0 ? (t += "分", e < 10 && (e = "0" + e)) : t = "";
                                var s = "剩余 " + t + e + "秒 即将开抢";
                                y.setData({
                                    clickSingleButtonFunc: "",
                                    singleButtonClass: "goods-lottery-result-btn",
                                    singleButtonLabel: s
                                });
                            } else S <= 0 && (clearInterval(y.spikeComingInterval), a.data.goodsInfo.isOnSale = !0, 
                            y.setData({
                                singlePurchaseButton: !1,
                                secondButtonClass: "goods-group-btn",
                                secondButtonLabel01: "一键开团",
                                secondButtonLabel02Class: "goods-buy-price",
                                SecondButtonLabel02: v
                            }));
                        }, 1e3));
                    }
                    d && u && (this.dataObj.singlePurchaseButton = !1, this.dataObj.secondButtonClass = "goods-event-coming-s-btn", 
                    this.dataObj.secondButtonLabel01 = C[0], this.dataObj.secondButtonLabel02Class = "g-ec-line2", 
                    this.dataObj.SecondButtonLabel02 = C[1]);
                }
                u ? g ? (this.dataObj.singlePurchaseButton = !0, this.dataObj.singleButtonClass = "goods-group-buy-button", 
                this.dataObj.singleButtonLabel = s, this.dataObj.clickSingleButtonFunc = "groupBuyOrPromptShare") : h ? (this.dataObj.singlePurchaseButton = !0, 
                this.dataObj.singleButtonClass = "goods-group-buy-button", this.dataObj.singleButtonLabel = "团长免费开团", 
                this.dataObj.clickSingleButtonFunc = "groupBuyOrPromptShare") : B ? (this.dataObj.singlePurchaseButton = !0, 
                this.dataObj.singleButtonClass = "goods-group-buy-button", this.dataObj.singleButtonLabel = "一元换购", 
                this.dataObj.clickSingleButtonFunc = "groupBuyOrPromptShare") : O && (this.dataObj.singlePurchaseButton = !1, 
                this.dataObj.secondButtonClass = "goods-group-btn", this.dataObj.secondButtonLabel01 = "开团送礼", 
                this.dataObj.secondButtonLabel02Class = "goods-buy-price", this.dataObj.SecondButtonLabel02 = m) : (p ? (this.dataObj.singlePurchaseButton = !0, 
                this.dataObj.singleButtonClass = "spike-no-remind-btn", this.dataObj.singleButtonLabel = "已售罄", 
                this.dataObj.singleButtonLabel02 = "去店铺看看", this.dataObj.clickSingleButtonFunc = "navigationToMallPage") : (this.dataObj.singlePurchaseButton = !0, 
                this.dataObj.singleButtonClass = "goods-out-btn", this.dataObj.singleButtonLabel = "已售罄", 
                this.dataObj.clickSingleButtonFunc = ""), this.setData(this.dataObj)), this.setData(this.dataObj);
            }
        }
    }, {
        key: "doLikeOrCancelLikeGoods",
        value: function() {
            return i.default.wrap(u.default.mark(function t(e, a, i, r) {
                var d, c;
                return u.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (t.prev = 0, a && !i.likeGoodsRequestLock) {
                            t.next = 3;
                            break;
                        }
                        return t.abrupt("return");

                      case 3:
                        return i.likeGoodsRequestLock = !0, d = e ? o.default.doLikeGoods : o.default.unLikeGoods, 
                        t.next = 7, s.Request.apiRequest("POST", d + a);

                      case 7:
                        (c = t.sent) && (n.default.likeGoodsIds[a] = e), i.setData({
                            hasLiked: !!n.default.likeGoodsIds[a]
                        }), r || (e ? (i.showToastFunc(n.default.isFirstShowLikeHint ? l.FIRST : l.DEFAULT), 
                        n.default.isFirstShowLikeHint = !1) : (n.default.likeGoodsList = s.DataUtil.removeItemByKey(n.default.likeGoodsList, "goodsId", a), 
                        i.showToastFunc("取消收藏成功"))), i.likeGoodsRequestLock = !1, t.next = 18;
                        break;

                      case 14:
                        t.prev = 14, t.t0 = t.catch(0), console.error(t.t0), i.showToastFunc("加载出错");

                      case 18:
                      case "end":
                        return t.stop();
                    }
                }, t, this, [ [ 0, 14 ] ]);
            }));
        }
    }, {
        key: "addGoodsLikeEvent",
        value: function() {
            var t = this, e = this;
            try {
                "function" == typeof this.addRootFunc && this.addRootFunc("goodsLike", function(e, a) {
                    var s = t.goodsId;
                    if (s) {
                        var o = !n.default.likeGoodsIds[s], l = t;
                        (0, i.default)(u.default.mark(function t() {
                            return u.default.wrap(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                  case 0:
                                    return t.prev = 0, t.next = 3, l.doLikeOrCancelLikeGoods()(o, s, l, a);

                                  case 3:
                                    t.next = 8;
                                    break;

                                  case 5:
                                    t.prev = 5, t.t0 = t.catch(0), console.error(t.t0);

                                  case 8:
                                  case "end":
                                    return t.stop();
                                }
                            }, t, this, [ [ 0, 5 ] ]);
                        }));
                    }
                });
            } catch (t) {
                console.error(t), e.showToastFunc("加载出错");
            }
        }
    }, {
        key: "load",
        value: function(t, e, a) {
            this.goodsBottomBarData = t, this.initComponentData(t, e, a);
        }
    }, {
        key: "unload",
        value: function() {
            this.spikeComingInterval && clearInterval(this.spikeComingInterval);
        }
    } ]), t;
}();

exports.default = r;