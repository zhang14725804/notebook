function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e = require("../../../util/util.js"), r = require("../../../util/tracker.js"), o = require("../common/index.js"), d = getApp();

Page({
    data: (t = {
        loaded: !1,
        orderId: "",
        projectId: "",
        groupId: "",
        ttl: 0,
        shipment: 0,
        address: {},
        invoice: {},
        bestTime: ""
    }, a(t, "orderId", ""), a(t, "orderTime", ""), a(t, "amount", 0), a(t, "goodsImg", ""), 
    a(t, "goodsName", ""), a(t, "goodsNum", ""), a(t, "goodsTags", ""), a(t, "status", ""), 
    a(t, "statusDesc", ""), a(t, "invoiceTypeDesc", ""), a(t, "playerList", []), a(t, "shareData", ""), 
    a(t, "canRefund", !1), t),
    timerArr: [],
    onLoad: function(a) {
        var t = this;
        t.setData({
            orderId: a.orderId || "",
            projectId: a.projectId || "",
            groupId: a.groupId || ""
        }), d.doLogin().then(function(a) {
            t.init();
        });
    },
    onUnload: function() {
        this.clearTimer();
    },
    onShow: function() {
        r.push();
    },
    init: function() {
        var a = this;
        e.showLoading(), d.request("groupon/orderdetail", {
            order_id: a.data.orderId
        }, function(t, r) {
            if (e.hideLoading(), r) e.showError(r.desc || "数据加载失败"); else if (t.data) {
                t.data.address.tel = t.data.address.tel.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
                var o = wx.getStorageSync("checkout:invoiceList"), d = "";
                o && o.forEach(function(a) {
                    a.value == t.data.invoice.invoice_type && (d = a.desc);
                });
                var i = "";
                i = t.data.fanscard ? t.data.fanscard.tip || "" : t.data.status_desc, a.setData({
                    loaded: !0,
                    address: t.data.address,
                    invoice: t.data.invoice,
                    bestTime: t.data.best_time,
                    orderId: t.data.order_id,
                    orderTime: e.formatTime(t.data.order_time),
                    amount: t.data.amount,
                    goodsImg: t.data.goods_img,
                    goodsName: t.data.goods_name,
                    goodsNum: t.data.goods_num,
                    goodsTags: t.data.goods_tags.join(" "),
                    status: t.data.status,
                    statusDesc: i,
                    invoiceTypeDesc: d,
                    ttl: e.formatTime(t.data.expire_time),
                    statusLongDesc: t.data.status_long_desc,
                    goodsPrice: t.data.goods_price,
                    refundDesc: t.data.refund_desc,
                    canRefund: 2 === t.data.order_button_status,
                    couponInfo: t.data.coupon_info || "",
                    lotteryView: t.data.lottery_view,
                    fanscard: t.data.fanscard || {}
                }), 2 === t.data.status && a.data.projectId && a.data.groupId && (a.getGroupDetail(), 
                a.getShareData());
            } else e.showError("数据加载失败");
        });
    },
    getGroupDetail: function() {
        var a = this;
        e.showLoading(), d.request("groupon/groupinfo", {
            project_id: a.data.projectId,
            group_id: a.data.groupId,
            from: "order"
        }, function(t, r) {
            if (!r) {
                e.hideLoading();
                var d = t.data, i = a.data.playerList;
                i.length = d.project_config.person_num, d.group_detail.player_info.length && d.group_detail.player_info.forEach(function(a, t) {
                    i[t] = a;
                }), 2 === d.group_detail.group_status ? a.setData({
                    groupFinishTime: e.formatTime(d.group_detail.group_finish_time)
                }) : 3 === d.group_detail.group_status && a.setData({
                    groupFinishTime: e.formatTime(d.group_detail.group_expire_time)
                }), a.setData({
                    playerList: i,
                    needLens: i.length - d.group_detail.player_info.length,
                    groupStatus: d.group_detail.group_status,
                    projectInfo: d.project_view,
                    groupExpireTime: e.formatTime(d.group_detail.group_expire_time),
                    groupFinishTime: d.group_detail.group_finish_time ? e.formatTime(d.group_detail.group_expire_time) : ""
                }), 1 === d.group_detail.group_status && (a.timerArr[0] = o.countdown(), a.timerArr[0].init(d.group_detail.group_expire_time, d.service_time, function(t) {
                    a.setData({
                        groupCdStr: t
                    });
                }, function() {
                    a.clearTimer(), a.getGroupDetail();
                }), a.data.needLens <= 0 && a.setData({
                    statusDesc: "正在成团中",
                    statusLongDesc: ""
                }));
            }
        });
    },
    orderPay: function(a) {
        var t = this;
        o.wxPay({
            orderId: t.data.orderId,
            projectId: t.data.projectId,
            groupId: t.data.groupId
        });
    },
    getShareData: function() {
        var a = this;
        d.request("groupon/shareinfo", {
            project_id: a.data.projectId,
            group_id: a.data.groupId
        }, function(t, e) {
            e || a.setData({
                shareData: {
                    title: t.data.title,
                    path: t.data.path_url,
                    imageUrl: t.data.share_img || t.data.img_url
                }
            });
        });
    },
    onShareAppMessage: function() {
        var a = this, t = "/pages/pin/product/index?";
        return r.push({
            logCode: "wx#bid=3193118." + a.data.projectId + "." + a.data.groupId + "&page=pinorderdetail",
            analyse: "tap",
            extra: {
                type: "orderdetail_share",
                project_id: a.data.projectId,
                group_id: a.data.groupId
            }
        }), a.data.shareData ? a.data.shareData : (t += "p=" + a.data.projectId + "&g=" + a.data.groupId, 
        {
            title: a.data.goodsName,
            path: t
        });
    },
    clearTimer: function() {
        var a = this;
        a.timerArr.length && a.timerArr.forEach(function(a) {
            a.stop(), a = null;
        });
    },
    goMicard: function() {
        var a = this.data.fanscard || {};
        o.goMicard(a.url);
    }
});