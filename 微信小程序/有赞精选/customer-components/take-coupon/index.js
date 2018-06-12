!function() {
    require("./../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 49 ], {
    346: function() {
        var t = getApp(), e = {
            1: "领取成功",
            2: "你已经领取过了",
            3: "活动已结束"
        };
        Component({
            properties: {
                kdtId: {
                    type: Number,
                    value: ""
                },
                couponId: {
                    type: Number,
                    value: ""
                }
            },
            data: {
                isShow: !0,
                text: "你已经领取过了"
            },
            ready: function() {
                var o = this, n = this.data, a = n.kdtId, u = n.couponId;
                t.carmen({
                    get: "GET",
                    api: "youzan.ump.coupon/1.0.0/fetch",
                    data: {
                        id: u,
                        kdt_id: a
                    },
                    success: function(t) {
                        t = t || {}, o.setData({
                            isShow: !0,
                            text: e[t.code]
                        });
                    },
                    fail: function() {}
                });
            },
            methods: {
                closePopup: function() {
                    this.setData({
                        isShow: !1
                    });
                }
            }
        });
    }
}, [ 346 ]);