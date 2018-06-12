var e = require("../../../util/tracker.js"), t = require("../../../util/util.js"), i = getApp();

Page({
    data: {
        invoiceTitleType: "personal",
        topBannerText: ""
    },
    invoiceType: -1,
    onShow: function() {
        e.push();
    },
    onLoad: function(e) {
        var t = this;
        this.invoiceType = e.type, this.topbanner = e.topbanner, i.doLogin().then(function(e) {
            t.init();
        });
    },
    init: function() {
        var e = this, t = this, i = wx.getStorageSync("checkout:invoice_title_type") || "personal", c = wx.getStorageSync("checkout:invoice_type"), o = wx.getStorageSync("checkout:invoice_title"), n = wx.getStorageSync("checkout:invoice_company_code"), a = wx.getStorageSync("checkout:invoiceList"), r = wx.getStorageSync("checkout:invoice_tel"), v = wx.getStorageSync("checkout:invoice_email"), s = wx.getStorageSync("checkout:not_show_company_code");
        -1 == this.invoiceType ? a.reverse() : a = a.filter(function(t) {
            return t.value == e.invoiceType;
        }), t.setData({
            invoice_type: c,
            invoice_company_code: n,
            invoice_title: o,
            invoice_list: a,
            invoiceTitleType: i,
            invoice_tel: r,
            invoice_email: v,
            not_show_company_code: s,
            topBannerText: t.topbanner ? "第三方商品的发票由相关企业单独开具" : ""
        });
    },
    typeChecked: function(e) {
        var t = this, i = e.currentTarget.dataset.type;
        1 == i ? wx.showModal({
            title: "纸质发票注意事项",
            content: "发票不与商品随箱寄出，将在订单妥投完成7日后单独寄出。发票收到后请妥善保存，退货需一同寄回",
            confirmText: "确认使用",
            cancelText: "取消",
            success: function(e) {
                e.confirm || e.cancel && (i = 4), t.setData({
                    invoice_type: i
                });
            }
        }) : t.setData({
            invoice_type: i
        });
    },
    titleChanged: function(e) {
        var t = this, i = e.detail.value;
        t.setData({
            invoice_title: i
        });
    },
    codeChanged: function(e) {
        var t = this, i = e.detail.value;
        t.setData({
            invoice_company_code: i
        });
    },
    telChanged: function(e) {
        var t = this, i = e.detail.value;
        i.includes("*") && i.length < 11 && (i = ""), t.setData({
            invoice_tel: i
        });
    },
    emailChanged: function(e) {
        var t = this, i = e.detail.value;
        t.setData({
            invoice_email: i
        });
    },
    confirmChecked: function(e) {
        var i = this, c = i.data.invoice_type || "个人", o = i.data.invoice_title, n = i.data.invoice_company_code || "", a = i.data.invoiceTitleType, r = i.data.invoice_tel, v = i.data.invoice_email, s = n.length, l = /^[0-9A-Z]*$/g;
        if (4 != c && 1 != c || "company" != i.data.invoiceTitleType || n && ("" == n || !(!l.test(n) || s < 15 || s > 20))) {
            if (4 == c) {
                if (!r && !v) return void t.showError("为了接收你的电子发票，请任一填写收票人手机或邮箱。");
                "company" === a && "" === n && (this.data.invoiceTitleType = "personal");
            }
            wx.setStorageSync("checkout:invoice_type", c), wx.setStorageSync("checkout:invoice_title", o), 
            wx.setStorageSync("checkout:invoice_company_code", n), wx.setStorageSync("checkout:invoice_title_type", a), 
            r && wx.setStorageSync("checkout:invoice_tel", r), v && wx.setStorageSync("checkout:invoice_email", v), 
            wx.navigateBack({
                delta: 1
            });
        } else t.showError("纳税人识别号需为15-20位数字或大写字母，请正确填写");
    },
    chooseInvoiceTitle: function(e) {
        var t = e.currentTarget.dataset.type, i = this.data.invoice_company_code;
        "personal" === t && (i = ""), this.setData({
            invoiceTitleType: t,
            invoice_company_code: i
        });
    }
});