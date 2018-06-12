var e = require("../../../util/util.js"), o = require("../../../util/tracker.js"), t = require("../common/index.js"), d = getApp();

Page({
    data: {
        loaded: !1,
        can_pay: !1,
        can_delivery: !0,
        submiting: !1
    },
    onLoad: function(e) {
        this.setData({
            projectId: e.pid || "",
            goodsId: e.gid || "",
            goodsNum: e.goodsNum || 1,
            mode: e.mode || "",
            groupId: e.groupId || ""
        });
    },
    onShow: function() {
        var e = this;
        o.push(), e.data.submiting || d.doLogin().then(function(o) {
            e.init();
        });
    },
    init: function() {
        var o = this, t = wx.getStorageSync("checkout:address") || "", i = wx.getStorageSync("checkout:deliver"), a = wx.getStorageSync("checkout:invoice_type"), c = wx.getStorageSync("checkout:invoice_title"), n = wx.getStorageSync("checkout:invoice_company_code") || "", r = wx.getStorageSync("checkout:invoice_tel") || "", s = wx.getStorageSync("checkout:invoice_email") || "";
        wx.getStorageSync("checkout:invoiceList");
        e.showLoading(), d.request("groupon/ordercheckout", {
            project_id: o.data.projectId,
            goods_id: o.data.goodsId,
            goods_num: o.data.goodsNum,
            mode: o.data.mode,
            address_id: t || "",
            group_id: o.data.groupId || ""
        }, function(t, d) {
            if (e.hideLoading(), d) e.showError(d.desc || "数据加载失败"); else {
                var u = o.getChecked(t.data.invoice), _ = "";
                (a = Number(a)) && u.value !== a ? (t.data.invoice.forEach(function(e) {
                    e.value === a && (_ = e.desc, a = e.value);
                }), _ || (_ = u.desc, a = u.value)) : (_ = u.desc, a = u.value);
                var g = !1, v = !1;
                t.data.address && (1 != t.data.address.can_delivery || t.data.address.is_cos || (g = !0), 
                v = t.data.address.can_delivery), o.setData({
                    loaded: !0,
                    goodsInfo: t.data.goods_info,
                    addressId: t.data.address ? t.data.address.address_id : "",
                    address: t.data.address,
                    amount: t.data.amount,
                    deliver: o.getChecked(i || t.data.delivertime),
                    shipment: o.getChecked(t.data.shipmentlist),
                    need_pay_amount: t.data.need_pay_amount,
                    can_pay: g,
                    can_delivery: v,
                    invoice_type: a,
                    invoice_title: c || "个人",
                    invoice_type_title: _,
                    invoice_company_code: n || "",
                    invoice_tel: r,
                    invoice_email: s
                }), wx.setStorage({
                    key: "checkout:deliver",
                    data: i || t.data.delivertime
                }), wx.setStorage({
                    key: "checkout:invoice_type",
                    data: o.data.invoice_type
                }), wx.setStorage({
                    key: "checkout:invoice_title",
                    data: o.data.invoice_title
                }), wx.setStorage({
                    key: "checkout:invoice_company_code",
                    data: o.data.invoice_company_code
                });
                var l = [];
                t.data.invoice.forEach(function(e) {
                    4 !== e.value && 1 !== e.value || l.push(e);
                }), wx.setStorageSync("checkout:invoiceList", l);
            }
        });
    },
    getChecked: function(e) {
        var o = null;
        return e.forEach(function(e, t) {
            e.checked && (o = e);
        }), o;
    },
    tapOrderSubmit: function(o) {
        var i = this, a = i.data, c = a.address.address_id, n = a.invoice_type, r = a.invoice_title, s = a.invoice_company_code, u = a.deliver.value, _ = a.invoice_email, g = a.invoice_tel, v = o.detail.formId || "";
        i.data.submiting || (c ? (e.showLoading(), d.request("groupon/ordersubmit", {
            address_id: c,
            pay_id: 1,
            project_id: a.projectId,
            goods_id: a.goodsId,
            goods_num: a.goodsNum,
            mode: a.mode,
            group_id: a.groupId,
            invoice_type: n,
            invoice_title: r,
            invoice_company_code: s,
            invoice_email: _,
            invoice_tel: g,
            paymethod: "weixin_little",
            deliver_id: u,
            form_id: v
        }, function(o, d) {
            if (e.hideLoading(), d) return i.setData({
                submiting: !1
            }), void (d.desc && e.showError(d.desc));
            var a = o.data.orderId, c = o.data.groupId || "";
            i.setData({
                submiting: !0
            }), t.wxPay({
                orderId: a,
                projectId: i.data.projectId,
                groupId: c
            });
        }), d.request("rebate/reportFormId", {
            form_id: v,
            origin: "pin"
        }, function(e, o) {})) : e.showError("请添加收货地址"));
    }
});