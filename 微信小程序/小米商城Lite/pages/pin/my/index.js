var t = require("../../../util/util.js"), r = require("../../../util/tracker.js"), e = require("../common/index.js"), a = getApp();

Page({
    data: {
        loaded: !1,
        orderStatus: 0,
        tabBar: 2,
        orderList: [],
        orderType: "全部",
        curPage: 1,
        canUpdate: !0,
        loading: !1,
        pullLoading: !1,
        types: [ {
            id: 0,
            desc: "全部",
            on: !0
        }, {
            id: 1,
            desc: "待支付",
            on: !1
        }, {
            id: 2,
            desc: "拼单中",
            on: !1
        }, {
            id: 3,
            desc: "已成团",
            on: !1
        }, {
            id: 4,
            desc: "已失效",
            on: !1
        } ]
    },
    onLoad: function(t) {
        var r = this;
        a.doLogin().then(function(t) {
            r.init();
        });
    },
    onShow: function() {
        r.push();
    },
    onReachBottom: function() {
        var t = this;
        t.data.canUpdate && (t.setData({
            curPage: t.data.curPage + 1,
            loading: !0
        }), setTimeout(t.init, 500));
    },
    onPullDownRefresh: function() {
        var t = this;
        t.data.orderList.length ? (t.setData({
            curPage: 1
        }), t.init(!0)) : wx.stopPullDownRefresh();
    },
    init: function(r) {
        var e = this;
        a.request("groupon/orderlist", {
            order_status: e.data.orderStatus,
            page: e.data.curPage
        }, function(a, o) {
            o ? t.showError("服务异常请稍后再试,或下载小米商城APP") : (r && wx.stopPullDownRefresh(), a.data.forEach(function(r) {
                r.orderTime && (r.orderTimeStr = t.formatTime(r.orderTime));
            }), e.data.orderList.length ? a.data && a.data.length ? e.setData({
                orderList: r ? a.data : e.data.orderList.concat(a.data),
                loading: !1
            }) : e.setData({
                canUpdate: !1,
                loading: !1
            }) : e.setData({
                loaded: !0,
                orderList: a.data || [],
                loading: !1
            }));
        });
    },
    orderCancel: function(r) {
        var e = this, o = r.currentTarget.dataset.id, d = [];
        o && (t.showLoading(), a.request("groupon/ordercancel", {
            order_id: o
        }, function(r, a) {
            t.hideLoading(), a ? t.showError("服务异常请稍后再试,或下载小米商城APP") : (wx.showToast({
                title: "取消成功",
                icon: "success"
            }), e.data.orderList.forEach(function(t) {
                t.orderId !== o && d.push(t);
            }), e.setData({
                orderList: d,
                canUpdate: !0
            }));
        }));
    },
    orderPay: function(t) {
        var r = this, a = t.currentTarget.dataset.id;
        if (a) {
            var o = r.data.orderList.filter(function(t) {
                return t.orderId === a;
            });
            o && e.wxPay({
                orderId: o[0].orderId,
                projectId: o[0].projectId,
                groupId: o[0].groupId
            });
        }
    },
    onShareAppMessage: function(t) {
        var r = this, e = "/pages/pin/product/index?fromshare=1", a = t.target.dataset.id, o = r.data.orderList.filter(function(t) {
            return t.orderId === a;
        });
        if (o) return e += "&p=" + o[0].projectId + "&g=" + o[0].groupId, {
            title: o[0].share_title || o[0].goodsName,
            path: e,
            imageUrl: o[0].share_img || o[0].goodsImg
        };
    },
    tapSwitch: function(t) {
        var r = this, e = t.currentTarget.dataset.type, a = r.data.types, o = "";
        e !== r.data.orderStatus && (void 0 !== e ? (a.forEach(function(t) {
            t.id === e ? (t.on = !0, o = t.desc) : t.on = !1;
        }), r.setData({
            orderStatus: e,
            types: a,
            orderType: o,
            orderList: [],
            curPage: 1,
            loading: !0,
            canUpdate: !0
        }), r.init()) : r.setData({
            orderType: "",
            orderList: []
        }));
    }
});