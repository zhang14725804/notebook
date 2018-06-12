var r = require("../../../util/util.js"), t = require("../../../util/tracker.js"), e = getApp();

Page({
    data: {
        loaded: !1,
        maxLen: 200,
        inputLen: 0,
        orderId: "",
        detail: "",
        curId: ""
    },
    onLoad: function(r) {
        var t = this;
        t.setData({
            orderId: r.orderId || "",
            groupId: r.groupId,
            projectId: r.projectId
        }), t.init();
    },
    onShow: function() {
        t.push();
    },
    init: function() {
        var t = this;
        e.request("groupon/payrefundreason", {
            order_id: t.data.orderId
        }, function(e, d) {
            if (d) r.showError(d.desc || "数据加载失败"); else {
                var o = "";
                e.data.forEach(function(r, t) {
                    0 === t && (r.on = !0, o = r.reason_id);
                }), t.setData({
                    loaded: !0,
                    options: e.data,
                    curId: o
                });
            }
        });
    },
    handleVal: function(r) {
        var t = this, e = r.detail.cursor, d = t.filterXSS(r.detail.value);
        t.setData({
            inputLen: e,
            detail: d
        });
    },
    selectCause: function(r) {
        var t = this, e = r.currentTarget.dataset.id, d = t.data.options;
        d.forEach(function(r) {
            r.reason_id === e ? r.on = !0 : r.on = !1;
        }), t.setData({
            options: d,
            curId: e
        });
    },
    refundSubmit: function() {
        var t = this;
        r.showLoading(), e.request("groupon/payrefund", {
            order_id: t.data.orderId,
            reason_id: t.data.curId,
            reason: t.data.detail
        }, function(e, d) {
            d ? r.showError(d.desc || "服务异常请稍后再试,或下载小米商城APP") : setTimeout(function() {
                r.hideLoading(), wx.redirectTo({
                    url: "../orderdetail/index?fromrefund=1&orderId=" + t.data.orderId + "&groupId=" + t.data.groupId + "&projectId=" + t.data.projectId
                });
            }, 1e3);
        });
    },
    filterXSS: function(r) {
        return "string" != typeof r ? r : r.replace(/[&<>`"'\/]/g, function(r) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "`": "&#x60;",
                '"': "&quot;",
                "'": "&#x27;",
                "/": "&#x2f;"
            }[r];
        });
    }
});