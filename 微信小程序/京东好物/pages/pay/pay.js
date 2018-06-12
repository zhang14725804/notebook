var e = require("../../components/passwordModal/passwordModal.js"), o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../components/toast/toast.js")), t = require("../../utils/util.js"), n = require("../../utils/MPay.js"), r = require("../../utils/newMPay.js"), i = require("../../utils/message_push.js"), a = require("../../utils/keplerReport.js").init(), c = getApp();

Page(Object.assign({}, e.passwordModalObject, {
    data: {
        pDir: "/kwxp",
        isShowContent: !1,
        addressInfo: {},
        commodityInfo: {},
        couponInfo: {},
        invoiceInfo: {},
        payShipMap: {},
        zzfp: !0,
        dzfp: !1,
        gr: !0,
        invoiceShow: !1,
        phoneVal: "",
        emailVal: "",
        phoneTest: !1,
        emailTest: !1,
        invoiceInfoInner: {},
        invoiceContent: [],
        kplNewSubmitorder: !1,
        objGift: {},
        loadOption: {
            wareId: "",
            wareNum: ""
        },
        isSupportEleInvoice: !0,
        returnpage: "",
        isfirstload: "0",
        picurl: "",
        submitLoading: !1,
        lastOptionTime: 0,
        imageDomain: "",
        mainCommodities: [],
        imgListWidth: 0,
        yunfeeList: [],
        totalInteger: 0,
        totalDecimal: 0,
        stockStatus: "",
        isMidSmallDate: !1,
        isNormalDate: !1,
        isOtherTip: !1,
        isSopTip: !1,
        isOpenPassword: !1,
        isPasswordModalData: {
            passwordShort: !1,
            modalDisplay: !1,
            passwordFocus: !0,
            passWordValue: "",
            mondalHint: ""
        },
        jdBeanObj: {
            jdBeanList: [],
            currentJdBeanIndex: 0,
            jdInfoObj: null,
            isShowRuleInfo: !1,
            isSwitchChecked: !1,
            isAccordRule: !1,
            jdBeanDiscount: 0
        }
    },
    onLoad: function(e) {
        try {
            var o = this;
            wx.showToast({
                title: "加载中...",
                icon: "loading",
                mask: !0
            }), o.setScreenInfo(), o.invoice = o.invoiceFunction(o), o.setData({
                loadOption: e
            }), this.data.isfirstload = "1";
            var n = "", r = wx.getStorageSync("sid");
            e.wareId ? n = c.globalRequestUrl + o.data.pDir + "/norder/wxorder.json?wareId=" + e.wareId + "&wareNum=" + e.wareNum + "&enterOrder=true" : r ? n = c.globalRequestUrl + o.data.pDir + "/norder/wxorder.json?enterOrder=true&sid=" + r : (console.log("非法请求或者请求时参数丢失"), 
            t.reportErr(encodeURIComponent("非法请求或者请求时参数丢失，参数如下：") + e)), t.request({
                url: n,
                success: o.dealWithOrdeData.bind(o),
                fail: function(e) {
                    t.reportErr(encodeURIComponent("填写订单页onload数据请求request失败，具体信息：") + e.errMsg);
                }
            }), a.set({
                urlParam: e,
                title: "填写订单",
                siteId: "WXAPP-JA2016-1",
                account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
            });
        } catch (e) {
            t.reportErr(encodeURIComponent("填写订单页onload异常，具体信息：") + e.message);
        }
    },
    setScreenInfo: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(o) {
                e.setData({
                    screenHeight: o.windowHeight,
                    screenWidth: o.windowWidth
                });
            }
        });
    },
    onShow: function() {
        try {
            wx.showToast({
                title: "加载中...",
                icon: "loading",
                mask: !0
            });
            var e = this;
            "1" != e.data.isfirstload && t.request({
                url: c.globalRequestUrl + e.data.pDir + "/norder/wxorder.json?tt=" + new Date().getTime(),
                success: e.dealWithOrdeData.bind(e),
                fail: function(e) {
                    t.reportErr(encodeURIComponent("填写订单页onShow数据请求request失败，具体信息：") + e.errMsg);
                }
            }), this.data.isfirstload = "0", a.pv();
        } catch (e) {
            t.reportErr(encodeURIComponent("填写订单页onShow异常，具体信息：") + e.message);
        }
    },
    dealWithOrdeData: function(e) {
        try {
            console.log(e);
            var o = this;
            if ("999" == e.code) {
                var n = "/pages/pay/pay?enterOrder=true&sid=" + o.data.loadOption.sid;
                return o.setData({
                    returnpage: n
                }), o.loginModalShow(), !1;
            }
            if (wx.hideToast(), e.currentOrder && e.currentOrder.orderInfo && e.currentOrder.orderInfo.stockStatus && this.setData({
                stockStatus: e.currentOrder.orderInfo.stockStatus
            }), e.kplNewSubmitorder && this.setData({
                kplNewSubmitorder: e.kplNewSubmitorder
            }), e.currentOrder && e.currentOrder.orderInfo && e.currentOrder.orderInfo.address && ("" != e.currentOrder.orderInfo.address.Where ? e.currentOrder.orderInfo.address.isNeedAdd = !1 : e.currentOrder.orderInfo.address.isNeedAdd = !0, 
            this.setData({
                addressInfo: e.currentOrder.orderInfo.address
            })), e.currentOrder && e.currentOrder.orderInfo && e.currentOrder.orderInfo.mainCommodities && 1 == e.currentOrder.orderInfo.mainCommodities.length) {
                var r = e.currentOrder.orderInfo.mainCommodities[0];
                if (r.returnGoodsMsg) {
                    var i = r.returnGoodsMsg.split(",");
                    r.returnGoodsMsg = i[1], r.returnGoodColor = i[0];
                }
                r.finalNumShowShow = r.weightAndNum || r.num, this.setData({
                    mainCommodities: e.currentOrder.orderInfo.mainCommodities,
                    commodityInfo: r,
                    picurl: "https://img10.360buyimg.com/n4/" + r.imageUrl
                }), this.justifyStock(this.data.stockStatus) || wx.showModal({
                    title: "提示",
                    content: "所选商品暂时无货，请选择返回上一页或者修改当前收货地址",
                    showCancel: !0,
                    cancelText: "修改地址",
                    confirmText: "回上一页",
                    confirmColor: "#f23030",
                    success: function(e) {
                        e.confirm ? wx.navigateBack() : wx.navigateTo({
                            url: "../addressul/addressul"
                        });
                    }
                });
            }
            if (e.currentOrder && e.currentOrder.orderInfo) {
                var a = {};
                e.currentOrder.orderInfo.imageDomain && (a.imageDomain = e.currentOrder.orderInfo.imageDomain), 
                e.currentOrder.orderInfo.mainCommodities && e.currentOrder.orderInfo.mainCommodities.length > 1 && (a.mainCommodities = e.currentOrder.orderInfo.mainCommodities, 
                a.imgListWidth = 178 * e.currentOrder.orderInfo.mainCommodities.length + "rpx"), 
                this.setData(a);
            }
            if (e.currentOrder && e.currentOrder.orderInfo && e.currentOrder.orderInfo.payShipMap && e.currentOrder.orderInfo.payShipMap.sopOtherShipment && !e.currentOrder.orderInfo.payShipMap.otherShipment && !e.currentOrder.orderInfo.payShipMap.jdShipment ? this.setData({
                distributionUrl: "",
                distriHoverClass: "none"
            }) : this.setData({
                distributionUrl: "../distribution/distribution?title=navigate",
                distriHoverClass: "navigator-hover"
            }), e.currentOrder && e.currentOrder.orderInfo && e.currentOrder.orderInfo.payShipMap) {
                var s = {};
                e.currentOrder.orderInfo.payShipMap.jdShipment && !e.currentOrder.orderInfo.payShipMap.otherShipment && e.currentOrder.orderInfo.payShipMap.jdShipment.bigItemShipDate && e.currentOrder.orderInfo.payShipMap.jdShipment.midSmallDate ? s.isMidSmallDate = !0 : s.isMidSmallDate = !1, 
                e.currentOrder.orderInfo.payShipMap.jdShipment && !e.currentOrder.orderInfo.payShipMap.jdShipment.bigItemShipDate ? s.isNormalDate = !0 : s.isNormalDate = !1, 
                e.currentOrder.orderInfo.payShipMap.jdShipment || !e.currentOrder.orderInfo.payShipMap.otherShipment || e.currentOrder.orderInfo.payShipMap.otherShipment.bigItemShipDate ? s.isOtherTip = !1 : s.isOtherTip = !0, 
                e.currentOrder.orderInfo.payShipMap.jdShipment || !e.currentOrder.orderInfo.payShipMap.sopOtherShipment || e.currentOrder.orderInfo.payShipMap.otherShipment ? s.isSopTip = !1 : s.isSopTip = !0, 
                this.setData(s);
            }
            if (e.virtualPayNew && this.setData({
                isOpenPassword: e.virtualPayNew.openPaymentPassword,
                "isPasswordModalData.passwordShort": e.virtualPayNew.shortPwd
            }), e.virtualPayNew && e.virtualPayNew.couponInfos && this.setData({
                couponInfo: e.virtualPayNew.couponInfos
            }), e.currentOrder && e.currentOrder.orderInfo && e.currentOrder.orderInfo.virtualPay) {
                var d = e.currentOrder.orderInfo.virtualPay;
                if (d.CouponDiscount && "0.0" != d.CouponDiscount || d.FreeFreight && "0.0" != d.FreeFreight) {
                    var p = 0;
                    p = d.CouponDiscount + d.FreeFreight, p = parseFloat(p).toFixed(2), this.setData({
                        sumCouponPri: p
                    });
                } else this.setData({
                    sumCouponPri: ""
                });
            }
            e.currentOrder && e.currentOrder.orderInfo && this.setData({
                isSupportInvoiceImprove: e.currentOrder.orderInfo.isSupportInvoiceImprove
            }), e.currentOrder && e.currentOrder.orderInfo && e.currentOrder.orderInfo.invoice && this.invoiceFn(e.currentOrder.orderInfo.invoice), 
            e.currentOrder && e.currentOrder.orderInfo && e.currentOrder.orderInfo.payShipMap && this.deliveryFn(e.currentOrder.orderInfo.payShipMap), 
            e.currentOrder.yunfeeList && o.operatePrice(e.currentOrder.yunfeeList), e.virtualPayNew && e.virtualPayNew.usedJdBeanMap && (e.virtualPayNew.usedJdBeanMap.useJdBeanCount && e.jdBeanList && e.jdBeanList.length > 0 && o.setData({
                "jdBeanObj.currentJdBeanIndex": e.jdBeanList.indexOf(e.virtualPayNew.usedJdBeanMap.useJdBeanCount)
            }), o.setData({
                "jdBeanObj.jdInfoObj": e.virtualPayNew.usedJdBeanMap,
                "jdBeanObj.isAccordRule": !!(e.jdBeanList && e.jdBeanList.length > 0),
                "jdBeanObj.isSwitchChecked": !!e.virtualPayNew.usedJdBeanMap.useJdBeanCount
            })), e.jdBeanList.length > 0 && o.setData({
                "jdBeanObj.jdBeanList": e.jdBeanList
            });
        } catch (e) {
            t.reportErr(encodeURIComponent("填写订单页dealWithOrdeData处理数据方法异常，具体信息：") + e.message);
        }
        o.setData({
            isShowContent: !0
        }), c.globalConfig && c.globalConfig.needBindUserRel && require("../../utils/bindUserRel.js").bindUserRel(), 
        c.globalConfig && c.globalConfig.needUserVisitHistory && require("./option/userVisitHistory.js").userVisitHistory.bind(this, c)();
    },
    operatePrice: function(e) {
        var o = this;
        if (e) {
            this.setData({
                yunfeeList: e
            });
            for (var t = 0; t < e.length; t++) if ("应付总额" == e[t].label) {
                var n = o.devidePrice(e[t].value);
                o.setData({
                    totalInteger: n.integer,
                    totalDecimal: n.decimal
                });
            }
        }
    },
    useJingdou: function(e, o) {
        var n = this;
        wx.showToast({
            title: "请稍后...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        });
        var r = c.globalRequestUrl + n.data.pDir + "/norder/calcYunfeeVm.json?useJdBeanCount=" + e + "&updateFlag=1&IsUseJdBean=" + o;
        t.request({
            url: r,
            method: "get",
            success: function(e) {
                n.operatePrice(e.yunfeeList), e && e.virtualPayNew && e.virtualPayNew.usedJdBeanMap && n.setData({
                    "jdBeanObj.jdInfoObj": e.virtualPayNew.usedJdBeanMap
                });
            },
            complete: function() {
                wx.hideToast();
            },
            fail: function(e) {
                t.reportErr(encodeURIComponent("使用京豆结算失败，具体信息：") + e.errMsg);
            }
        });
    },
    showRuleInfo: function() {
        this.setData({
            "jdBeanObj.isShowRuleInfo": !0
        });
    },
    closeModal: function() {
        this.setData({
            "jdBeanObj.isShowRuleInfo": !1
        });
    },
    jdPickerChange: function(e) {
        var o = this, t = e.detail.value;
        o.useJingdou(o.data.jdBeanObj.jdBeanList[t], !0), o.setData({
            "jdBeanObj.currentJdBeanIndex": t
        });
    },
    jdSwitchChange: function(e) {
        var o = this, t = e.detail.value;
        console.log(t), t ? o.data.jdBeanObj.isAccordRule ? (o.useJingdou(o.data.jdBeanObj.jdBeanList[o.data.jdBeanObj.currentJdBeanIndex], !0), 
        o.setData({
            "jdBeanObj.isSwitchChecked": !0
        })) : o.setData({
            "jdBeanObj.isSwitchChecked": !1,
            "jdBeanObj.isShowRuleInfo": !0
        }) : (o.useJingdou(o.data.jdBeanObj.jdBeanList[o.data.jdBeanObj.currentJdBeanIndex], !1), 
        o.setData({
            "jdBeanObj.isSwitchChecked": !1
        }));
    },
    tapPriceInfoFn: function() {
        wx.showModal({
            title: "价格说明",
            content: "因可能存在系统缓存、页面更新导致价格变动异常等不确定性情况出现,商品售价以本结算价格为准；如有疑问，请您立即联系销售商咨询。",
            showCancel: !1,
            confirmText: "我知道了",
            success: function(e) {
                e.confirm;
            }
        });
    },
    devidePrice: function(e) {
        var o, t, n;
        return o = /^(\d*)(\.\d{2})\d*\D*$/, t = e.replace(o, "$1"), n = e.replace(o, "$2"), 
        {
            integer: t,
            decimal: n
        };
    },
    invoiceFn: function(e) {
        try {
            var o = "", n = "";
            1 == e.IdInvoiceType || 2 == e.IdInvoiceType ? (o = e.invoiceTypeNameText ? e.invoiceTypeNameText : e.InvoiceTypeName + "-", 
            1 == e.IdInvoiceType && 4 == e.IdInvoiceHeaderType ? o += e.InvoiceTitle : o += e.CompanyName) : o = e.invoiceTypeNameText ? e.invoiceTypeNameText : e.InvoiceTypeName + "-" + e.InvoiceTitle, 
            this.data.isSupportInvoiceImprove ? e.InvoiceContentsType && (n += e.InvoiceContentsType) : (e.InvoiceContentsTypeBook && (n = "图书商品-" + e.InvoiceContentsTypeBook), 
            e.InvoiceContentsType && (e.InvoiceContentsTypeBook && (n += " | "), 2 == e.IdInvoiceType ? n += "明细" : n += "非图书商品-" + e.InvoiceContentsType)), 
            e.invoiceName = o, e.invoiceType = n, this.setData({
                invoiceInfo: e
            });
        } catch (e) {
            t.reportErr(encodeURIComponent("填写订单页invoiceFn异常，具体信息：") + e.message);
        }
    },
    deliveryFn: function(e) {
        try {
            var o = "";
            e.jdShipment && (o = e.jdShipment.name), e.pickShipment && e.pickShipment.pickName && (o = e.pickShipment.pickName, 
            this.resetShipment()), e.otherShipment && e.otherShipment.name && (o = "第三方快递"), 
            e.sopOtherShipment && e.sopOtherShipment.name && ((e.pickShipment || e.jdShipment || e.otherShipment) && (o += "+"), 
            o += "商家配送"), e.jdShipment && e.jdShipment.midSmallDate && (e.deliverDate = e.jdShipment.midSmallDate), 
            e.jdShipment && e.jdShipment.bigItemShipDate ? e.deliverDate = e.jdShipment.bigItemShipDate : e.otherShipment && e.otherShipment.bigItemShipDate && (e.deliverDate = e.otherShipment.bigItemShipDate), 
            e.jdShipment && e.jdShipment.bigItemInstallDate ? e.installDate = e.jdShipment.bigItemInstallDate : e.otherShipment && e.otherShipment.bigItemInstallDate && (e.installDate = e.otherShipment.bigItemInstallDate), 
            e.deliveryName = o, this.setData({
                payShipMap: e
            });
        } catch (e) {
            t.reportErr(encodeURIComponent("填写订单页deliveryFn处理数据方法异常，具体信息：") + e.message);
        }
    },
    resetShipment: function() {
        var e = this;
        t.request({
            url: c.globalRequestUrl + e.data.pDir + "/norder/savePaymentShipment.json?order.shipmentId=65&order.paymentId=4",
            success: function(o) {
                e.onShow();
            },
            fail: function(e) {
                t.reportErr(encodeURIComponent("填写订单页resetShipment数据请求request失败，具体信息：") + e.errMsg), 
                wx.navigateTo({
                    url: "../error/error"
                });
            }
        });
    },
    pingClick: function(e, o, t, n, r) {
        a.click({
            eid: e,
            elevel: o,
            eparam: t,
            pname: "",
            pparam: "",
            target: n,
            event: r
        });
    },
    paymentPingClick: function(e) {
        var o = this;
        o.pingClick("MNeworder_PayType", "", "", o.data.distributionUrl, e);
    },
    userAddressPingClick: function(e) {
        this.pingClick("MNeworder_Address", "", "", "../address/address?addressId=0&addressType=add", e);
    },
    couponPingClick: function(e) {
        this.pingClick("MNeworder_Coupons", "", "", "../coupon/coupon?title=navigate", e);
    },
    setInput: function(e) {
        var o = e.currentTarget.dataset.type;
        "phone" == o && this.setData({
            phoneVal: e.detail.value
        }), "email" == o && this.setData({
            emailVal: e.detail.value
        });
    },
    typeClick: function(e) {
        this.invoice.typeClick(e);
    },
    invoiceFunction: function(e) {
        var o = this;
        try {
            return {
                prevent: e,
                invoiceData: null,
                invoiceDataTemp: null,
                typeClick: function(e) {
                    var o = this, t = e.currentTarget.dataset.type;
                    1 == t ? (o.invoiceDataTemp.zzfp = !0, o.invoiceDataTemp.dzfp = !1) : 2 == t && (o.invoiceDataTemp.zzfp = !1, 
                    o.invoiceDataTemp.dzfp = !0), o.prevent.setData({
                        zzfp: o.invoiceDataTemp.zzfp,
                        dzfp: o.invoiceDataTemp.dzfp
                    });
                },
                invoiceShow: function() {
                    var e = this;
                    e.prevent.pingClick("MNeworder_Invoice", "", "", "", ""), t.request({
                        url: c.globalRequestUrl + e.prevent.data.pDir + "/norder/invoice.json?isExposedPay=true",
                        success: function(o) {
                            o.invoiceInfo && o.invoiceInfo.selectedInvoiceType ? (e.invoiceData = {}, e.invoiceData.invoiceInfo = o.invoiceInfo, 
                            e.initInvoiceData(o.invoiceInfo, o.order)) : (e.invoiceData = {}, e.invoiceData.invoiceInfo = o.invoiceInfo, 
                            e.initInvoiceData(null, null)), e.invoiceDataTemp = JSON.parse(JSON.stringify(e.invoiceData)), 
                            e.invoiceView();
                        },
                        fail: function(e) {
                            t.reportErr(encodeURIComponent("填写订单页invoiceShow数据请求request失败，具体信息：") + e.errMsg);
                        }
                    });
                },
                initInvoiceData: function(e, o) {
                    var t = this;
                    if (e && e.selectedInvoiceType) {
                        if (t.invoiceData.selectedInvoiceType = e.selectedInvoiceType, 1 == t.invoiceData.selectedInvoiceType ? (t.invoiceData.zzfp = !0, 
                        t.invoiceData.dzfp = !1) : (t.invoiceData.zzfp = !1, t.invoiceData.dzfp = !0), e && e.electroInvoice ? (t.invoiceData.phoneVal = e.electroInvoice.invoiceConsigneePhone, 
                        t.invoiceData.emailVal = e.electroInvoice.invoiceConsigneeEmail, t.invoiceData.isSupportEleInvoice = !0) : t.invoiceData.isSupportEleInvoice = !1, 
                        t.invoiceData.hasBookSku = e.hasBookSku, t.invoiceData.hasCommonSku = e.hasCommonSku, 
                        e.normalInvoice) {
                            if (1 == e.hasBookSku) {
                                t.invoiceData.normalBookSupportContent = e.normalInvoice.bookInvoiceContent.supportContent, 
                                t.invoiceData.normalBookSelectContent = e.normalInvoice.bookInvoiceContent.selectContent;
                                var n = t.transferResult("normalBook", t.invoiceData.normalBookSupportContent);
                                t.getDefaultChecked("normalBook", n);
                            }
                            if (1 == e.hasCommonSku) {
                                t.invoiceData.normalComSupportContent = e.normalInvoice.normalInvoiceContent.supportContent, 
                                t.invoiceData.normalComSelectContent = e.normalInvoice.normalInvoiceContent.selectContent;
                                var r = t.transferResult("normalCom", t.invoiceData.normalComSupportContent);
                                t.getDefaultChecked("normalCom", r);
                            }
                        }
                        if (e.electroInvoice) {
                            if (1 == e.hasBookSku) {
                                t.invoiceData.electroBookSupportContent = e.electroInvoice.bookInvoiceContent.supportContent, 
                                t.invoiceData.electroBookSelectContent = e.electroInvoice.bookInvoiceContent.selectContent;
                                var i = t.transferResult("electroBook", t.invoiceData.electroBookSupportContent);
                                t.getDefaultChecked("electroBook", i);
                            }
                            if (1 == e.hasCommonSku) {
                                t.invoiceData.electroComSupportContent = e.electroInvoice.normalInvoiceContent.supportContent, 
                                t.invoiceData.electroComSelectContent = e.electroInvoice.normalInvoiceContent.selectContent;
                                var a = t.transferResult("electroCom", t.invoiceData.electroComSupportContent);
                                t.getDefaultChecked("electroCom", a);
                            }
                        }
                    } else t.invoiceData.zzfp = !0, t.invoiceData.dzfp = !1;
                    t.invoiceData.invoiceInfo.electroInvoice && (e.hasBookSku && (t.invoiceData.dzfpBooKSendArg = t.invoiceData.invoiceInfo.electroInvoice.bookInvoiceContent.selectContent), 
                    e.hasCommonSku && (t.invoiceData.dzfpComSendArg = t.invoiceData.invoiceInfo.electroInvoice.normalInvoiceContent.selectContent)), 
                    t.invoiceData.invoiceInfo.normalInvoice && (e.hasBookSku && (t.invoiceData.ptfpBooKSendArg = t.invoiceData.invoiceInfo.normalInvoice.bookInvoiceContent.selectContent), 
                    e.hasCommonSku && (t.invoiceData.ptfpComSendArg = t.invoiceData.invoiceInfo.normalInvoice.normalInvoiceContent.selectContent));
                },
                transferResult: function(e, o) {
                    var n = this, r = t.transfer2Array(o);
                    n.invoiceData[e + "SupportContentObject"] = n.getBackJsonArr(r.arrValue), n.invoiceData[e + "SupportContentKey"] = r.arrKey;
                    var i = -1, a = 0;
                    for (var c in o) n.judgInvoiceSelect(c, n.invoiceData[e + "SelectContent"]) && 0 == a && (i = n.getIndexByVal(n.invoiceData[e + "SupportContentKey"], c), 
                    a = 1);
                    return i;
                },
                judgInvoiceSelect: function(e, o) {
                    return e == o;
                },
                getDefaultChecked: function(e, o) {
                    var t = this;
                    -1 != o ? t.invoiceData[e + "SupportContentObject"][o].checked = !0 : t.invoiceData.invoiceInfo.hasBookSku && ("normalBook" == e ? -1 != (o = t.getIndexByVal(t.invoiceData[e + "SupportContentKey"], "-2")) ? t.invoiceData[e + "SupportContentObject"][o].checked = !0 : t.invoiceData[e + "SupportContentObject"][0].checked = !0 : "electroBook" == e && (t.invoiceData[e + "SupportContentObject"][0].checked = !0));
                },
                invoiceView: function() {
                    var e = this;
                    e.prevent.setData({
                        phoneVal: e.invoiceData.phoneVal,
                        emailVal: e.invoiceData.emailVal,
                        zzfp: e.invoiceData.zzfp,
                        dzfp: e.invoiceData.dzfp,
                        invoiceInfoInner: e.invoiceData.invoiceInfo,
                        nrBookArr: e.invoiceData.normalBookSupportContentObject,
                        nrComArr: e.invoiceData.normalComSupportContentObject,
                        dzBookArr: e.invoiceData.electroBookSupportContentObject,
                        dzComArr: e.invoiceData.electroComSupportContentObject,
                        nrBookArrKey: e.invoiceData.normalBookSupportContentKey,
                        nrComArrKey: e.invoiceData.normalComSupportContentKey,
                        dzBookArrKey: e.invoiceData.electroBookSupportContentKey,
                        dzComArrKey: e.invoiceData.electroComSupportContentKey,
                        isSupportEleInvoice: e.invoiceData.isSupportEleInvoice
                    });
                },
                getBackJsonArr: function(e) {
                    for (var o = [], t = 0, n = e.length; t < n; t++) o.push({
                        inner: e[t],
                        checked: !1
                    });
                    return o;
                },
                getIndexByVal: function(e, o) {
                    if (!e || !e.length) return -1;
                    for (var t = 0, n = e.length; t < n; t++) if (e[t] == o) return t;
                },
                invoiveConClick: function(e, o, t, n) {
                    var r = this, i = e.currentTarget.dataset.index, a = r.prevent.data[o];
                    a.forEach(function(e) {
                        e.checked = !1;
                    }), a[i].checked = !0;
                    var c = r.prevent.data[o + "Key"];
                    r.invoiceDataTemp[t + "SupportContentObject"] = a, r.invoiceDataTemp[t + "SupportContentKey"] = c, 
                    r.invoiceDataTemp[n + "SendArg"] = c[i];
                    var s = {};
                    s[o] = a, r.prevent.setData(s);
                },
                invoiceClose: function() {
                    var e = this;
                    t.request({
                        url: c.globalRequestUrl + e.prevent.data.pDir + "/norder/wxorder.json",
                        success: e.prevent.dealWithOrdeData.bind(o),
                        fail: function(e) {
                            t.reportErr(encodeURIComponent("填写订单页invoiceClose数据请求request失败，具体信息：") + e.errMsg);
                        }
                    }), e.prevent.setData({
                        invoiceShow: !1
                    });
                },
                invoiceConfirm: function() {
                    var e = this, o = c.globalRequestUrl + e.prevent.data.pDir + "/norder/updateNormalInvoice.action?personInvoiceTitleContant=" + encodeURIComponent("个人");
                    e.invoiceData.hasBookSku && (o += "&normalInvoiceFormData.idInvoiceContentTypeBook=" + e.invoiceDataTemp.ptfpBooKSendArg), 
                    e.invoiceData.hasCommonSku && (o += "&normalInvoiceFormData.idInvoiceContentsType=" + e.invoiceDataTemp.ptfpComSendArg), 
                    t.request({
                        url: o,
                        success: function(o) {
                            e.invoiceData = e.invoiceDataTemp, e.invoiceClose();
                        },
                        fail: function(e) {
                            t.reportErr(encodeURIComponent("填写订单页invoiceConfirm数据请求request失败，具体信息：") + e.errMsg);
                        }
                    });
                },
                dzInvoiceConfirm: function() {
                    var e = this, o = new RegExp("^(1)[0-9]{10}$");
                    if (e.prevent.data.phoneVal != e.invoiceData.phoneVal && !o.test(e.prevent.data.phoneVal)) return e.prevent.setData({
                        phoneTest: !0
                    }), !1;
                    if (null != e.prevent.data.emailVal && e.prevent.data.emailVal.length > 40) return !1;
                    var n = c.globalRequestUrl + e.prevent.data.pDir + "/norder/updateEleInvoice.action?dzpInvoiceFormData.electroInvoiceEmail=" + e.prevent.data.emailVal + "&dzpInvoiceFormData.electroInvoicePhone=" + e.prevent.data.phoneVal + "&dzpInvoiceFormData.idInvoiceHeaderType=4";
                    e.invoiceData.hasBookSku && (n += "&dzpInvoiceFormData.idInvoiceContentTypeBook=" + e.invoiceDataTemp.dzfpBooKSendArg), 
                    e.invoiceData.hasCommonSku && (n += "&dzpInvoiceFormData.idInvoiceContentsType=" + e.invoiceDataTemp.dzfpComSendArg), 
                    t.request({
                        url: n,
                        success: function(o) {
                            e.invoiceData = e.invoiceDataTemp, e.invoiceClose();
                        },
                        fail: function(e) {
                            t.reportErr(encodeURIComponent("填写订单页dzInvoiceConfirm数据请求request失败，具体信息：") + e.errMsg);
                        }
                    });
                }
            };
        } catch (e) {
            t.reportErr(encodeURIComponent("填写订单页invoiceFunction处理数据方法异常，具体信息：") + e.message);
        }
    },
    invoiceInit: function() {
        this.invoice.invoiceShow(), this.setData({
            invoiceShow: !0,
            phoneTest: !1,
            emailTest: !1
        });
    },
    invoiceClose: function() {
        this.setData({
            invoiceShow: !1
        });
    },
    invoiceConfirm: function() {
        this.invoice.invoiceConfirm();
    },
    dzInvoiceConfirm: function() {
        this.invoice.dzInvoiceConfirm();
    },
    nrBookClick: function(e) {
        this.invoice.invoiveConClick(e, "nrBookArr", "normalBook", "ptfpBooK");
    },
    nrComClick: function(e) {
        this.invoice.invoiveConClick(e, "nrComArr", "normalCom", "ptfpCom");
    },
    dzBookClick: function(e) {
        this.invoice.invoiveConClick(e, "dzBookArr", "electroBook", "dzfpBooK");
    },
    dzComClick: function(e) {
        this.invoice.invoiveConClick(e, "dzComArr", "electroCom", "dzfpCom");
    },
    loginModalShow: function() {
        t.globalLoginShow(this);
    },
    submitOrder: function(e) {
        try {
            var s = e.detail.formId, d = this.data.lastOptionTime;
            if (0 == d) this.setData({
                lastOptionTime: new Date().getTime()
            }); else if (new Date().getTime() - d < 5e3) return !1;
            var p = this;
            if (this.justifyStock(this.data.stockStatus)) {
                var l = c.globalRequestUrl + p.data.pDir + "/norder/checkAndSubmitOrder.json", u = p.data.isPasswordModalData.passWordValue, m = p.data.isPasswordModalData.modalDisplay ? {
                    "order.securityPayPassword": u
                } : null, v = p.data.kplNewSubmitorder, h = [ "__jda", (c.globalData.__ad__ ? c.globalData.__ad__.jda : wx.getStorageSync("__jda")) + ";" ].join("="), f = [ "__jdv", (c.globalData.__ad__ ? c.globalData.__ad__.getJDV() : wx.getStorageSync("__jdv")) + ";" ].join("=");
                this.pingClick("MNeworder_Submit", "", "", "", e);
                var I = {
                    formId: s
                };
                v ? r.newGotopay(p, a, I) : t.request({
                    url: l,
                    method: "POST",
                    data: m,
                    selfCookie: "kxcxtype=" + c.globalData.kxcxtype + ";" + h + f,
                    success: function(e) {
                        if (e.flag && e.orderId > 0) {
                            s && i.messagePush({
                                formId: s,
                                times: 1,
                                type: 30001
                            });
                            var t = e.orderId, r = e.factPrice, c = e.orderType, d = e.skuIdsList, l = {
                                orderId: t,
                                orderType: c,
                                orderTypeCode: "0",
                                factPrice: r
                            };
                            s && (l.formId = s), a.order({
                                eid: "",
                                orderList: p.strList2ArrObjList(d),
                                orderid: t,
                                total: r
                            }), e.factPrice > 0 ? n.gotopay(l) : wx.redirectTo({
                                url: "../orderSubmitSuccess/orderSubmitSuccess?factPrice=" + e.factPrice + "&btnType=primary"
                            });
                        } else e.submitResult.needPassword ? p.data.isOpenPassword ? p.setData({
                            "isPasswordModalData.modalDisplay": !0,
                            "isPasswordModalData.passwordFocus": !0
                        }) : o.default.show({
                            icon: o.default.icon.error,
                            message: "请到“京东APP-账户设置-账户安全-支付密码”设置支付密码",
                            pageObj: p,
                            duration: 3e3,
                            complete: function() {}
                        }) : 60065 == e.submitResult.submitOrder.MessageType ? (p.setData({
                            "isPasswordModalData.modalDisplay": !1,
                            "isPasswordModalData.passwordFocus": !1
                        }), wx.showModal({
                            content: e.submitResult.submitOrder.Message,
                            showCancel: !1,
                            confirmText: "我知道了",
                            confirmColor: "#f23030",
                            success: function(e) {
                                e.confirm && p.setData({
                                    "isPasswordModalData.modalDisplay": !0,
                                    "isPasswordModalData.passwordFocus": !0,
                                    "isPasswordModalData.passWordValue": ""
                                });
                            }
                        })) : wx.showModal({
                            title: "提示",
                            content: e.submitResult.submitOrder.Message,
                            showCancel: !1,
                            confirmText: "我知道了",
                            confirmColor: "#f23030"
                        });
                    },
                    fail: function(e) {
                        t.reportErr(encodeURIComponent("填写订单页submitOrderm数据请求request失败，具体信息：") + e.errMsg);
                    }
                });
            } else wx.showModal({
                title: "提示",
                content: "所选商品/赠品部分无货，请选择返回购物车或者去除无货商品重新下单",
                showCancel: !0,
                cancelText: "去除无货",
                confirmText: "回上一页",
                confirmColor: "#f23030",
                success: function(e) {
                    e.confirm ? wx.navigateBack() : t.request({
                        url: c.globalRequestUrl + p.data.pDir + "/norder/removeCommodityFromOrder.action?stockStatusValue=无货",
                        method: "POST",
                        success: function(e) {
                            p.onShow();
                        },
                        fail: function(e) {
                            t.reportErr(encodeURIComponent("去除无货removeCommodityFromOrder.action数据异常，具体信息：") + e.errMsg);
                        }
                    });
                }
            });
        } catch (e) {
            t.reportErr(encodeURIComponent("填写订单页submitOrder处理数据方法异常，具体信息：") + e.message);
        }
    },
    justifyStock: function(e) {
        return !(!e || 1 == e || 3 == e);
    },
    strList2ArrObjList: function(e) {
        for (var o = {}, t = 0; t < e.length; t++) o[e[t]] = 1;
        return o;
    },
    gotoInvoice: function() {
        this.data.isSupportInvoiceImprove ? this.chooseFacture() : this.invoiceInit();
    },
    chooseFacture: function() {
        wx.navigateTo({
            url: "../facture/facture"
        });
    }
}));