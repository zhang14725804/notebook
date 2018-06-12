function e(e, i) {
    try {
        if ("string" == typeof e) return void console.log("data err");
        if (-1 != Object.keys(e).indexOf("shipmentInfoMap") && -1 != Object.keys(e.shipmentInfoMap).indexOf("jdShipment")) {
            i.data.isJdShipment = !0;
            I = e.shipmentInfoMap.jdShipment;
            if (-1 != Object.keys(I).indexOf("showSku") && (i.data.jdShowSku = I.showSku, i.data.jdImgListWidth = 178 * I.showSku.length + "rpx"), 
            i.setData({
                isJdShipment: i.data.isJdShipment,
                jdShipmentID: e.shipmentInfoMap.jdShipment.id,
                jdShowSku: i.data.jdShowSku,
                jdImgListWidth: i.data.jdImgListWidth,
                jdsendVal: I.name
            }), -1 != Object.keys(I).indexOf("midSmallPromise")) if (-1 != Object.keys(I.midSmallPromise).indexOf("promise311") && I.midSmallPromise.promise311.support) {
                var r = I.midSmallPromise.promise311;
                r.selected ? i.setData({
                    order_promiseType: r.promiseType.toString() || "",
                    order_promiseSendPay: JSON.stringify(r.promiseSendPay) || "",
                    order_promiseDate: r.promiseDate.toString() || "",
                    order_promiseTimeRange: r.promiseTimeRange.toString() || "",
                    order_midSmallBatchId: r.batchId.toString() || "",
                    needAlert: !0,
                    isShowSmallMid: !0,
                    isSmall: !0,
                    promise311: r,
                    dateArr: r.days,
                    promiseDate: t(r.show311Text),
                    promiseTime: r.promiseTimeRange
                }) : i.setData({
                    order_promiseType: r.promiseType.toString() || "",
                    order_promiseSendPay: JSON.stringify(r.promiseSendPay) || "",
                    order_promiseDate: "",
                    order_promiseTimeRange: "",
                    order_midSmallBatchId: r.batchId.toString() || "",
                    needAlert: !0,
                    isShowSmallMid: !0,
                    isSmall: !0,
                    promise311: r,
                    dateArr: r.days,
                    promiseDate: "",
                    promiseTime: ""
                });
            } else -1 != Object.keys(I.midSmallPromise).indexOf("promise211") && i.setData({
                isSmall: !0,
                needAlert: !1,
                isShowSmallMid: !1,
                otherVal: "工作日、双休日与假日均可送货"
            });
            if (-1 != Object.keys(I).indexOf("bigItemPromise") && I.bigItemPromise.bigItemBZD.support) {
                var s = "", o = "";
                if ((n = I.bigItemPromise.bigItemBZD).selected) {
                    m = 0;
                    n.days.forEach(function(e, t) {
                        e.selected && (m = t);
                    }), -1 != Object.keys(I.bigItemPromise).indexOf("bigItemInstallDatesList") ? ((d = I.bigItemPromise.bigItemInstallDatesList)[m].forEach(function(e, t) {
                        e.selected && (o = e.name, s = e.value);
                    }), i.setData({
                        order_bigItemSaveInfo_bigItemPromiseType: n.bigItemPromiseType.toString() || "",
                        order_bigItemSaveInfo_bigItemPromiseSendPay: JSON.stringify(n.promiseSendPay) || "",
                        order_bigItemSaveInfo_bigItemPromiseDate: n.promiseDate.toString() || "",
                        order_bigItemSaveInfo_bigItemPromiseTimeRange: "",
                        order_bigItemSaveInfo_bigItemBatchId: n.batchId.toString() || "",
                        order_bigItemInstallDate: s.toString() || "",
                        bigItemBZD: n,
                        bigItemInstallDatesList: d || "",
                        isBig: !0,
                        needAlert: !0,
                        bigDateArr: n.days,
                        installArr: d[m] || [],
                        bigIndex: m,
                        showBigItemText: n.showBigItemText,
                        instalBigItemTex: o || "",
                        hasInstallDatesList: !0
                    })) : i.setData({
                        order_bigItemSaveInfo_bigItemPromiseType: n.bigItemPromiseType.toString() || "",
                        order_bigItemSaveInfo_bigItemPromiseSendPay: JSON.stringify(n.promiseSendPay) || "",
                        order_bigItemSaveInfo_bigItemPromiseDate: n.promiseDate.toString() || "",
                        order_bigItemSaveInfo_bigItemPromiseTimeRange: "",
                        order_bigItemSaveInfo_bigItemBatchId: n.batchId.toString() || "",
                        order_bigItemInstallDate: s.toString() || "",
                        bigItemBZD: n,
                        bigItemInstallDatesList: [],
                        isBig: !0,
                        needAlert: !0,
                        bigDateArr: n.days,
                        installArr: [],
                        bigIndex: m,
                        showBigItemText: n.showBigItemText,
                        instalBigItemTex: "",
                        hasInstallDatesList: !1
                    });
                } else if (-1 != Object.keys(I.bigItemPromise).indexOf("bigItemInstallDatesList")) {
                    d = I.bigItemPromise.bigItemInstallDatesList;
                    i.setData({
                        order_bigItemSaveInfo_bigItemPromiseType: n.bigItemPromiseType.toString() || "",
                        order_bigItemSaveInfo_bigItemPromiseSendPay: JSON.stringify(n.promiseSendPay) || "",
                        order_bigItemSaveInfo_bigItemPromiseDate: "",
                        order_bigItemSaveInfo_bigItemPromiseTimeRange: "",
                        order_bigItemSaveInfo_bigItemBatchId: n.batchId.toString() || "",
                        order_bigItemInstallDate: "",
                        bigItemBZD: n,
                        bigItemInstallDatesList: d,
                        isBig: !0,
                        needAlert: !0,
                        bigIndex: 0,
                        bigDateArr: n.days,
                        installArr: d[0],
                        showBigItemText: "",
                        instalBigItemTex: "",
                        hasInstallDatesList: !0
                    });
                } else i.setData({
                    order_bigItemSaveInfo_bigItemPromiseType: n.bigItemPromiseType.toString() || "",
                    order_bigItemSaveInfo_bigItemPromiseSendPay: JSON.stringify(n.promiseSendPay) || "",
                    order_bigItemSaveInfo_bigItemPromiseDate: "",
                    order_bigItemSaveInfo_bigItemPromiseTimeRange: "",
                    order_bigItemSaveInfo_bigItemBatchId: n.batchId.toString() || "",
                    order_bigItemInstallDate: "",
                    bigItemBZD: n,
                    bigItemInstallDatesList: [],
                    isBig: !0,
                    needAlert: !0,
                    bigIndex: 0,
                    bigDateArr: n.days,
                    installArr: [],
                    showBigItemText: "",
                    instalBigItemTex: "",
                    hasInstallDatesList: !1
                });
            }
        }
        if (-1 != Object.keys(e).indexOf("shipmentInfoMap") && -1 != Object.keys(e.shipmentInfoMap).indexOf("otherShipment")) {
            i.data.isOtherShipment = !0;
            I = e.shipmentInfoMap.otherShipment;
            if (-1 != Object.keys(I).indexOf("showSku") && (i.data.otherShowSku = I.showSku, 
            i.data.otherImgListWidth = 178 * I.showSku.length + "rpx"), i.setData({
                otherVal: "地址超出京东配送范围，将由其它快递配送",
                isOther: !0,
                isSmall: !1,
                needAlert: !1,
                isShowSmallMid: !1,
                isOtherShipment: i.data.isOtherShipment,
                jdShipmentID: e.shipmentInfoMap.otherShipment.id,
                otherShowSku: i.data.otherShowSku,
                otherImgListWidth: i.data.otherImgListWidth,
                otherSendVal: I.name
            }), -1 != Object.keys(I).indexOf("bigItemPromise") && I.bigItemPromise.bigItemBZD.support) {
                var n = I.bigItemPromise.bigItemBZD, s = "", o = "";
                if (n.selected) {
                    var m = 0;
                    n.days.forEach(function(e, t) {
                        e.selected && (m = t);
                    }), -1 != Object.keys(I.bigItemPromise).indexOf("bigItemInstallDatesList") ? ((d = I.bigItemPromise.bigItemInstallDatesList)[m].forEach(function(e, t) {
                        e.selected && (o = e.name, s = e.value);
                    }), i.setData({
                        order_bigItemSaveInfo_bigItemPromiseType: n.bigItemPromiseType.toString() || "",
                        order_bigItemSaveInfo_bigItemPromiseSendPay: JSON.stringify(n.promiseSendPay) || "",
                        order_bigItemSaveInfo_bigItemPromiseDate: n.promiseDate.toString() || "",
                        order_bigItemSaveInfo_bigItemPromiseTimeRange: "",
                        order_bigItemSaveInfo_bigItemBatchId: n.batchId.toString() || "",
                        order_bigItemInstallDate: s.toString() || "",
                        bigItemBZD: n,
                        bigItemInstallDatesList: d || "",
                        isBig: !0,
                        needAlert: !0,
                        bigDateArr: n.days,
                        installArr: d[m] || [],
                        bigIndex: m,
                        showBigItemText: n.showBigItemText,
                        instalBigItemTex: o || "",
                        hasInstallDatesList: !0
                    })) : i.setData({
                        order_bigItemSaveInfo_bigItemPromiseType: n.bigItemPromiseType.toString() || "",
                        order_bigItemSaveInfo_bigItemPromiseSendPay: JSON.stringify(n.promiseSendPay) || "",
                        order_bigItemSaveInfo_bigItemPromiseDate: n.promiseDate.toString() || "",
                        order_bigItemSaveInfo_bigItemPromiseTimeRange: "",
                        order_bigItemSaveInfo_bigItemBatchId: n.batchId.toString() || "",
                        order_bigItemInstallDate: s.toString() || "",
                        bigItemBZD: n,
                        bigItemInstallDatesList: [],
                        isBig: !0,
                        needAlert: !0,
                        bigDateArr: n.days,
                        installArr: [],
                        bigIndex: m,
                        showBigItemText: n.showBigItemText,
                        instalBigItemTex: "",
                        hasInstallDatesList: !1
                    });
                } else if (-1 != Object.keys(I.bigItemPromise).indexOf("bigItemInstallDatesList")) {
                    var d = I.bigItemPromise.bigItemInstallDatesList;
                    i.setData({
                        order_bigItemSaveInfo_bigItemPromiseType: n.bigItemPromiseType.toString() || "",
                        order_bigItemSaveInfo_bigItemPromiseSendPay: JSON.stringify(n.promiseSendPay) || "",
                        order_bigItemSaveInfo_bigItemPromiseDate: "",
                        order_bigItemSaveInfo_bigItemPromiseTimeRange: "",
                        order_bigItemSaveInfo_bigItemBatchId: n.batchId.toString() || "",
                        order_bigItemInstallDate: "",
                        bigItemBZD: n,
                        bigItemInstallDatesList: d,
                        isBig: !0,
                        needAlert: !0,
                        bigIndex: 0,
                        bigDateArr: n.days,
                        installArr: d[0],
                        showBigItemText: "",
                        instalBigItemTex: "",
                        hasInstallDatesList: !0
                    });
                } else i.setData({
                    order_bigItemSaveInfo_bigItemPromiseType: n.bigItemPromiseType.toString() || "",
                    order_bigItemSaveInfo_bigItemPromiseSendPay: JSON.stringify(n.promiseSendPay) || "",
                    order_bigItemSaveInfo_bigItemPromiseDate: "",
                    order_bigItemSaveInfo_bigItemPromiseTimeRange: "",
                    order_bigItemSaveInfo_bigItemBatchId: n.batchId.toString() || "",
                    order_bigItemInstallDate: "",
                    bigItemBZD: n,
                    bigItemInstallDatesList: [],
                    isBig: !0,
                    needAlert: !0,
                    bigIndex: 0,
                    bigDateArr: n.days,
                    installArr: [],
                    showBigItemText: "",
                    instalBigItemTex: "",
                    hasInstallDatesList: !1
                });
            }
        }
        if (-1 != Object.keys(e).indexOf("shipmentInfoMap") && -1 != Object.keys(e.shipmentInfoMap).indexOf("sopOtherShipment")) {
            i.data.isSopOtherShipment = !0;
            var I = e.shipmentInfoMap.sopOtherShipment;
            -1 != Object.keys(I).indexOf("showSku") && (i.data.sopShowSku = I.showSku, i.data.sopImgListWidth = 178 * I.showSku.length + "rpx"), 
            i.setData({
                isSopOtherShipment: i.data.isSopOtherShipment,
                sopShowSku: i.data.sopShowSku,
                sopImgListWidth: i.data.sopImgListWidth,
                sopSendVal: I.name
            });
        }
    } catch (e) {
        (0, a.reportErr)("distribution dataInit error: " + e);
    }
}

function t(e) {
    var t = e.split(" ");
    return t[0] + " " + t[1];
}

function i(e) {
    var t = "?", i = 0;
    for (var a in e) e.hasOwnProperty(a) && (t += i ? "&" + a + "=" + e[a] : a + "=" + e[a], 
    i++);
    return t;
}

var a = require("../../utils/util.js"), r = require("../../utils/keplerReport.js").init(), s = require("../../utils/message_push.js"), o = getApp();

Page({
    data: {
        pDir: "/kwxp",
        isJdShipment: !1,
        isOtherShipment: !1,
        isSopOtherShipment: !1,
        jdShowSku: [],
        otherShowSku: [],
        sopShowSku: [],
        jdImgListWidth: "100%",
        otherImgListWidth: "100%",
        sopImgListWidth: "100%",
        jdsendVal: "京东物流",
        othersendVal: "第三方快递",
        sopsendVal: "商家配送",
        promise311: null,
        jdShipmentID: null,
        dateArr: [],
        bigDateArr: [],
        installArr: [],
        promiseDate: "",
        promiseTime: "",
        showBigItemText: "",
        instalBigItemTex: "",
        midDataSelectIndex: 0,
        bigDataSelectIndex: 0,
        bigInstallSelectIndex: 0,
        lTop: 0,
        rTop: 0,
        cTop: 0,
        iTop: 0,
        jdzShow: !1,
        bigShow: !1,
        installShow: !1,
        leftIndex: 0,
        bigIndex: 0,
        isBig: !1,
        isOther: !1,
        isSmall: !1,
        needAlert: !1,
        isShowSmallMid: !1,
        hasInstallDatesList: !1,
        order_paymentId: "4",
        order_shipmentId: "0",
        order_promiseType: "",
        order_promiseSendPay: "",
        order_promiseDate: "",
        order_promiseTimeRange: "",
        order_midSmallBatchId: "",
        order_bigItemSaveInfo_bigItemPromiseType: "",
        order_bigItemSaveInfo_bigItemPromiseSendPay: "",
        order_bigItemSaveInfo_bigItemPromiseDate: "",
        order_bigItemSaveInfo_bigItemPromiseTimeRange: "",
        order_bigItemSaveInfo_bigItemBatchId: "",
        order_bigItemInstallDate: ""
    },
    alertInit: function() {
        if (this.data.needAlert && this.data.isShowSmallMid) {
            var e = 0, t = this;
            this.data.dateArr.forEach(function(i, a) {
                i.selected && (e = a, t.midDataSelectIndex = a);
            }), this.data.dateArr && this.data.dateArr.length && this.data.dateArr[e].hours.forEach(function(e, i) {
                e.selected = !1, e.promiseTimeRange == t.data.promise311.promiseTimeRange && (e.selected = !0);
            }), this.setData({
                jdzShow: !0,
                lTop: .001 * Math.random(),
                rTop: .001 * Math.random(),
                dateArr: this.data.dateArr,
                timeArr: this.data.dateArr[e].hours,
                leftIndex: e
            });
        }
    },
    leftClick: function(e) {
        var t = e.currentTarget.dataset.index;
        this.data.dateArr.forEach(function(e) {
            e.selected = !1;
        }), this.data.dateArr[t].selected = !0, this.data.dateArr[t].hours.forEach(function(e) {
            e.selected = !1;
        }), this.data.dateArr[t].hours[0].selected = !0, this.setData({
            dateArr: this.data.dateArr,
            timeArr: this.data.dateArr[t].hours,
            rTop: .001 * Math.random(),
            leftIndex: t
        });
    },
    rightClick: function(e) {
        var t = e.currentTarget.dataset.index;
        this.data.dateArr[this.data.leftIndex].hours.forEach(function(e) {
            e.selected = !1;
        }), this.data.dateArr[this.data.leftIndex].hours[t].selected = !0, this.setData({
            timeArr: this.data.dateArr[this.data.leftIndex].hours
        });
    },
    onTimeCloseBtn: function(e) {
        this.data.dateArr.forEach(function(e) {
            e.selected = !1;
        }), this.data.dateArr[this.midDataSelectIndex].selected = !0, this.setData({
            jdzShow: !1
        });
    },
    onTimeConfirmBtn: function(e) {
        try {
            var t = 0, i = 0, r = this.data.dateArr, s = this.data.timeArr;
            r.forEach(function(e, i) {
                e.selected && (t = i);
            }), s.forEach(function(e, t) {
                e.selected && (i = t);
            }), this.data.promise311.promiseTimeRange = s[i].promiseTimeRange.toString(), this.setData({
                jdzShow: !1,
                promiseDate: r[t].dateStr || "",
                promiseTime: s[i].promiseTimeRange || "",
                order_promiseDate: r[t].date.toString() || "",
                order_promiseTimeRange: s[i].promiseTimeRange.toString() || "",
                order_promiseSendPay: JSON.stringify(s[i].promiseSendPay) || "",
                order_midSmallBatchId: s[i].batchId.toString() || ""
            });
        } catch (e) {
            (0, a.reportErr)("distribution onTimeConfirmBtn error: " + e);
        }
    },
    alertBigItemBZD: function() {
        var e = this;
        this.data.needAlert && (this.data.bigDateArr.forEach(function(t, i) {
            t.selected && (e.bigDataSelectIndex = i);
        }), this.setData({
            bigDateArr: this.data.bigDateArr,
            bigShow: !0,
            cTop: .001 * Math.random()
        }));
    },
    bigCenterClick: function(e) {
        var t = e.currentTarget.dataset.index;
        this.data.bigDateArr.forEach(function(e) {
            e.selected = !1;
        }), this.data.bigDateArr[t].selected = !0, this.data.hasInstallDatesList ? (this.data.bigItemInstallDatesList[t].forEach(function(e) {
            e.selected = !1;
        }), this.data.bigItemInstallDatesList[t][0].selected = !0, this.setData({
            bigDateArr: this.data.bigDateArr,
            installArr: this.data.bigItemInstallDatesList[t]
        })) : this.setData({
            bigDateArr: this.data.bigDateArr
        });
    },
    bigCloseBtn: function(e) {
        this.data.bigDateArr.forEach(function(e) {
            e.selected = !1;
        }), this.data.bigDateArr[this.bigDataSelectIndex].selected = !0, this.setData({
            bigShow: !1
        });
    },
    bigTimeConfirmBtn: function(e) {
        try {
            var t = this.data.bigDateArr, i = 0;
            if (t.forEach(function(e, t) {
                e.selected && (i = t);
            }), this.data.hasInstallDatesList) {
                var r = this.data.order_bigItemSaveInfo_bigItemPromiseTimeRange, s = "";
                this.data.bigItemInstallDatesList[i].forEach(function(e) {
                    e.selected && (s = e.name, r = e.value);
                }), this.setData({
                    order_bigItemSaveInfo_bigItemPromiseDate: t[i].date,
                    order_bigItemSaveInfo_bigItemPromiseTimeRange: r,
                    bigShow: !1,
                    showBigItemText: t[i].dateStr,
                    bigIndex: i,
                    instalBigItemTex: s
                });
            } else this.setData({
                order_bigItemSaveInfo_bigItemPromiseDate: t[i].date,
                bigShow: !1,
                showBigItemText: t[i].dateStr,
                bigIndex: i
            });
        } catch (e) {
            (0, a.reportErr)("distribution bigTimeConfirmBtn error: " + e);
        }
    },
    alertBigItemInstallDatesList: function() {
        var e = this;
        if (this.data.needAlert) {
            var t = this.data.bigIndex;
            this.data.installArr.forEach(function(t, i) {
                t.selected && (e.bigInstallSelectIndex = i);
            }), this.data.bigItemInstallDatesList[t] = this.data.installArr, this.setData({
                installArr: this.data.installArr,
                bigItemInstallDatesList: this.data.bigItemInstallDatesList,
                installShow: !0,
                iTop: .001 * Math.random()
            });
        }
    },
    installClick: function(e) {
        var t = e.currentTarget.dataset.index, i = this.data.bigIndex;
        this.data.installArr.forEach(function(e) {
            e.selected = !1;
        }), this.data.installArr[t].selected = !0, this.data.bigItemInstallDatesList[i] = this.data.installArr, 
        this.setData({
            installArr: this.data.installArr,
            bigItemInstallDatesList: this.data.bigItemInstallDatesList
        });
    },
    installTimeCloseBtn: function() {
        this.data.installArr.forEach(function(e) {
            e.selected = !1;
        }), this.data.installArr[this.bigInstallSelectIndex].selected = !0, this.setData({
            installShow: !1
        });
    },
    installTimeConfirmBtn: function() {
        try {
            var e = this.data.installArr, t = 0;
            e.forEach(function(e, i) {
                e.selected && (t = i);
            }), this.setData({
                installShow: !1,
                instalBigItemTex: e[t].name,
                order_bigItemInstallDate: e[t].value
            });
        } catch (e) {
            (0, a.reportErr)("distribution installTimeConfirmBtn error: " + e);
        }
    },
    pageSubmit: function(e) {
        try {
            if (s.messagePush({
                formId: e.detail.formId,
                times: 1,
                type: 30005
            }), this.data.needAlert) {
                var t = {
                    "order.paymentId": this.data.order_paymentId,
                    "order.shipmentId": this.data.jdShipmentID
                };
                if (this.data.isBig) {
                    var r = {
                        "order.bigItemSaveInfo.bigItemPromiseType": this.data.order_bigItemSaveInfo_bigItemPromiseType,
                        "order.bigItemSaveInfo.bigItemPromiseSendPay": this.data.order_bigItemSaveInfo_bigItemPromiseSendPay,
                        "order.bigItemSaveInfo.bigItemPromiseDate": this.data.order_bigItemSaveInfo_bigItemPromiseDate,
                        "order.bigItemSaveInfo.bigItemPromiseTimeRange": "",
                        "order.bigItemSaveInfo.bigItemBatchId": this.data.order_bigItemSaveInfo_bigItemBatchId,
                        "order.bigItemInstallDate": this.data.order_bigItemInstallDate
                    };
                    Object.assign(t, r);
                }
                if (this.data.isSmall) {
                    var n = {
                        "order.promiseType": this.data.order_promiseType,
                        "order.promiseSendPay": this.data.order_promiseSendPay,
                        "order.promiseDate": this.data.order_promiseDate,
                        "order.promiseTimeRange": this.data.order_promiseTimeRange,
                        "order.midSmallBatchId": this.data.order_midSmallBatchId
                    };
                    Object.assign(t, n);
                }
                var m = o.globalRequestUrl + this.data.pDir + "/norder/savePaymentShipment.json" + i(t);
                wx.showToast({
                    title: "加载中...",
                    icon: "loading",
                    duration: 1e4,
                    mask: !0
                }), (0, a.request)({
                    url: m,
                    success: function(e) {
                        wx.navigateBack();
                    },
                    complete: function() {
                        wx.hideToast();
                    },
                    fail: function(e) {
                        (0, a.reportErr)("distribution savePaymentShipment.json: " + e), wx.navigateTo({
                            url: "../error/error"
                        });
                    }
                });
            } else wx.navigateBack();
        } catch (e) {
            (0, a.reportErr)("distribution pageSubmit error: " + e);
        }
    },
    onLoad: function(t) {
        var i = this, s = o.globalRequestUrl + i.data.pDir + "/norder/payShipment.json";
        (0, a.request)({
            url: s,
            success: function(t) {
                console.log(t), e(t, i);
            },
            fail: function(e) {
                (0, a.reportErr)("distribution payShipment.json: " + e), wx.navigateTo({
                    url: "../error/error"
                });
            }
        }), r.set({
            urlParam: t,
            title: "配送方式",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        r.pv();
    }
});