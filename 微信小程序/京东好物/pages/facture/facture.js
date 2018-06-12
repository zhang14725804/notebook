function e(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

var t = require("../../utils/util.js"), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../components/toast/toast.js")), o = require("../../utils/keplerReport.js").init(), i = require("../../utils/message_push.js"), a = getApp();

Page({
    data: {
        topTipShow: !0,
        pDir: "/kwxp",
        invoiceInfo: {},
        selectedInvoiceType: "",
        invoiceTypeMessage: "",
        invoiceTypeMessageCss: "",
        newInvoiceContentMsg: [],
        normalContentMessage: "",
        normalDetailMsg: "",
        electroContentMessage: "",
        electroDetailMsg: "",
        phoneVal: "",
        emailVal: "",
        defaultPhoneVal: "",
        defaultEmailVal: "",
        factureGoods: {
            modalDisplay: !1,
            invContentList: []
        }
    },
    onLoad: function(e) {
        var n = this;
        (0, t.request)({
            url: "" + a.globalRequestUrl + this.data.pDir + "/norder/invoice.json",
            success: function(e) {
                n.dataInit(e);
            },
            fail: function(e) {
                (0, t.reportErr)(encodeURIComponent("发票信息request失败，具体信息：") + e.errMsg);
            }
        }), o.set({
            urlParam: e,
            title: "发票信息",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        o.pv();
    },
    dataInit: function(e) {
        var t = {};
        e.invoiceInfo && (t.invoiceInfo = e.invoiceInfo), e.invoiceInfo && e.invoiceInfo.selectedInvoiceType && (t.selectedInvoiceType = e.invoiceInfo.selectedInvoiceType), 
        this.setData(t), e.invoiceInfo && e.invoiceInfo.electroInvoice && (e.invoiceInfo.electroInvoice.invoiceConsigneePhone && this.setData({
            defaultPhoneVal: e.invoiceInfo.electroInvoice.invoiceConsigneePhone,
            phoneVal: e.invoiceInfo.electroInvoice.invoiceConsigneePhone
        }), e.invoiceInfo.electroInvoice.invoiceConsigneeEmail && this.setData({
            defaultEmailVal: e.invoiceInfo.electroInvoice.invoiceConsigneeEmail,
            emailVal: e.invoiceInfo.electroInvoice.invoiceConsigneeEmail
        })), this.invoiceTypeMessageShow(), this.invoiceContentShow(), this.contentSelectedId(), 
        this.contentMessageShow();
    },
    switchType: function(e) {
        var t = e.target.dataset.type;
        e.target.dataset.gray ? n.default.show({
            icon: n.default.icon.error,
            message: "本订单不支持此类发票",
            pageObj: this
        }) : (this.setData({
            selectedInvoiceType: t
        }), this.invoiceTypeMessageShow(), this.invoiceContentShow(), this.contentSelectedId(), 
        this.contentMessageShow());
    },
    invoiceTypeMessageShow: function() {
        var e = "", t = "";
        1 == this.data.selectedInvoiceType && this.data.invoiceInfo && this.data.invoiceInfo.normalInvoice ? (e = this.data.invoiceInfo.normalInvoice.showMessageText, 
        t = this.data.invoiceInfo.normalInvoice.showMessageCss) : 3 == this.data.selectedInvoiceType && this.data.invoiceInfo && this.data.invoiceInfo.electroInvoice && (e = this.data.invoiceInfo.electroInvoice.showMessageText, 
        t = this.data.invoiceInfo.electroInvoice.showMessageCss), this.setData({
            invoiceTypeMessage: e,
            invoiceTypeMessageCss: t
        });
    },
    decideContentType: function() {
        return 1 == this.data.selectedInvoiceType && this.data.invoiceInfo && this.data.invoiceInfo.normalInvoice && this.data.invoiceInfo.normalInvoice.newInvoiceContentMsg ? "normal" : 3 == this.data.selectedInvoiceType && this.data.invoiceInfo && this.data.invoiceInfo.electroInvoice && this.data.invoiceInfo.electroInvoice.newInvoiceContentMsg ? "electro" : void 0;
    },
    invoiceContentShow: function() {
        var e = [];
        "normal" == this.decideContentType() ? e = this.data.invoiceInfo.normalInvoice.newInvoiceContentMsg : "electro" == this.decideContentType() && (e = this.data.invoiceInfo.electroInvoice.newInvoiceContentMsg), 
        this.setData({
            newInvoiceContentMsg: e
        });
    },
    switchContent: function(e) {
        var t = e.target.dataset.index;
        if (e.target.dataset.gray) n.default.show({
            icon: n.default.icon.error,
            message: "本订单不支持此类发票",
            pageObj: this
        }); else {
            if ("normal" == this.decideContentType()) {
                for (var o = 0; o < this.data.invoiceInfo.normalInvoice.newInvoiceContentMsg.length; o++) this.data.invoiceInfo.normalInvoice.newInvoiceContentMsg[o].isSelected = o == t;
                this.setData({
                    newInvoiceContentMsg: this.data.invoiceInfo.normalInvoice.newInvoiceContentMsg
                });
            } else if ("electro" == this.decideContentType()) {
                for (var i = 0; i < this.data.invoiceInfo.electroInvoice.newInvoiceContentMsg.length; i++) this.data.invoiceInfo.electroInvoice.newInvoiceContentMsg[i].isSelected = i == t;
                this.setData({
                    newInvoiceContentMsg: this.data.invoiceInfo.electroInvoice.newInvoiceContentMsg
                });
            }
            this.contentSelectedId(), this.contentMessageShow();
        }
    },
    contentSelectedIndex: function() {
        if ("normal" == this.decideContentType()) {
            for (var e = 0; e < this.data.invoiceInfo.normalInvoice.newInvoiceContentMsg.length; e++) if (this.data.invoiceInfo.normalInvoice.newInvoiceContentMsg[e].isSelected) return e;
        } else if ("electro" == this.decideContentType()) for (var t = 0; t < this.data.invoiceInfo.electroInvoice.newInvoiceContentMsg.length; t++) if (this.data.invoiceInfo.electroInvoice.newInvoiceContentMsg[t].isSelected) return t;
    },
    contentSelectedId: function() {
        var e = void 0;
        "normal" == this.decideContentType() ? (e = this.contentSelectedIndex(), this.data.normalInvoiceSelectedId = this.data.invoiceInfo.normalInvoice.newInvoiceContentMsg[e].id) : "electro" == this.decideContentType() && (e = this.contentSelectedIndex(), 
        this.data.electroInvoiceSelectedId = this.data.invoiceInfo.electroInvoice.newInvoiceContentMsg[e].id);
    },
    contentMessageShow: function() {
        var e = void 0, t = void 0, n = void 0, o = void 0, i = void 0, a = void 0, s = void 0, c = void 0, l = void 0, d = void 0, r = void 0, v = void 0;
        "normal" == this.decideContentType() ? (e = this.contentSelectedIndex(), i = (n = this.data.invoiceInfo.normalInvoice.newInvoiceContentMsg)[e].messageText, 
        a = n[e].messageCss, s = n[e].detailMsgText, c = n[e].detailMsgCss, this.setData({
            normalContentMessage: i,
            normalContentMessageCss: a,
            normalDetailMsg: s,
            normalDetailMsgCss: c
        })) : "electro" == this.decideContentType() && (t = this.contentSelectedIndex(), 
        l = (o = this.data.invoiceInfo.electroInvoice.newInvoiceContentMsg)[t].messageText, 
        d = o[t].messageCss, r = o[t].detailMsgText, v = o[t].detailMsgCss, this.setData({
            electroContentMessage: l,
            electroContentMessageCss: d,
            electroDetailMsg: r,
            electroDetailMsgCss: v
        }));
    },
    setInput: function(e) {
        var t = e.currentTarget.dataset.type;
        "phone" == t && this.setData({
            phoneVal: e.detail.value
        }), "email" == t && this.setData({
            emailVal: e.detail.value
        });
    },
    confirmFacture: function(e) {
        var o = new RegExp("^(1)[0-9]{10}$"), s = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, c = "";
        if (1 == this.data.selectedInvoiceType) c += "" + a.globalRequestUrl + this.data.pDir + "/norder/updateNormalInvoice.action?personInvoiceTitleContant=" + encodeURIComponent("个人") + "&normalInvoiceFormData.idInvoiceContentsType=" + this.data.normalInvoiceSelectedId; else if (3 == this.data.selectedInvoiceType) {
            if ("" == this.data.phoneVal) return n.default.show({
                icon: n.default.icon.error,
                message: "请输入手机号",
                pageObj: this
            }), !1;
            if (this.data.phoneVal != this.data.defaultPhoneVal && !o.test(this.data.phoneVal)) return n.default.show({
                icon: n.default.icon.error,
                message: "手机格式错误，请重新输入",
                pageObj: this
            }), !1;
            if ("" != this.data.emailVal && this.data.emailVal != this.data.defaultEmailVal && !s.test(this.data.emailVal)) return n.default.show({
                icon: n.default.icon.error,
                message: "邮箱格式错误，请重新输入",
                pageObj: this
            }), !1;
            c += "" + a.globalRequestUrl + this.data.pDir + "/norder/updateEleInvoice.action?dzpInvoiceFormData.electroInvoiceEmail=" + this.data.emailVal + "&dzpInvoiceFormData.electroInvoicePhone=" + this.data.phoneVal + "&dzpInvoiceFormData.idInvoiceHeaderType=4&dzpInvoiceFormData.idInvoiceContentsType=" + this.data.electroInvoiceSelectedId;
        }
        (0, t.request)({
            url: c,
            success: function(t) {
                i.messagePush({
                    formId: e.detail.formId,
                    times: 1,
                    type: 30006
                }), console.log(t), wx.navigateBack();
            },
            fail: function(e) {
                (0, t.reportErr)(encodeURIComponent("发票信息页confirmFacture数据请求request失败，具体信息：") + e.errMsg);
            }
        });
    },
    topTipClose: function() {
        this.setData({
            topTipShow: !1
        });
    },
    showProductSort: function() {
        var t = this.data.selectedInvoiceType;
        this.getInvoiceType(t), this.setData(e({}, "factureGoods.modalDisplay", !0));
    },
    getInvoiceType: function(e) {
        var t = this.data.invoiceInfo;
        switch (parseInt(e)) {
          case 1:
            this.setData({
                "factureGoods.invContentList": t.normalInvoice.invContentList
            });
            break;

          case 2:
            this.setData({
                "factureGoods.invContentList": t.vatInvoice.invContentList
            });
            break;

          case 3:
            this.setData({
                "factureGoods.invContentList": t.electroInvoice.invContentList
            });
            break;

          default:
            this.setData({
                "factureGoods.invContentList": null
            });
        }
    },
    hideGoodsModal: function() {
        this.setData({
            "factureGoods.modalDisplay": !1
        });
    }
});