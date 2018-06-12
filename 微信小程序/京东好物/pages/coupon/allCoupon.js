var a = require("../../utils/util.js"), t = require("../../utils/keplerReport.js").init(), o = getApp();

Page({
    data: {
        homedir: "/kwxhome",
        screenHeight: 0,
        pageNum: 1,
        pageSize: 10,
        isHaveMore: !0,
        couponList: [],
        isHaveData: !0,
        noDataItem: {
            msg: "很遗憾，您暂无可以使用的优惠券"
        },
        returnpage: "/pages/coupon/allCoupon",
        toTopDisplay: "none",
        scrollTop: 0
    },
    onLoad: function(a) {
        var o = this;
        wx.getSystemInfo({
            success: function(a) {
                o.setData({
                    screenHeight: a.windowHeight
                });
            }
        }), this.dataRequest(), t.set({
            urlParam: a,
            title: "我的优惠券",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        t.pv();
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNum: 1,
            couponList: []
        }), this.dataRequest();
    },
    dataRequest: function() {
        var t = this, e = o.globalRequestUrl + t.data.homedir + "/wallet/coupons.json";
        this.data.isHaveMore = !1, a.request({
            url: e,
            data: {
                page: t.data.pageNum,
                PAGESIZE: t.data.pageSize
            },
            success: function(a) {
                t.dataInit(a, t);
            },
            fail: function(t) {
                a.reportErr("home coupons.json: " + t), wx.navigateTo({
                    url: "../error/error"
                });
            }
        });
    },
    dataInit: function(t, o) {
        if ("string" != typeof t) {
            if ("999" == t.code) return this.loginModalShow(), !1;
            t.couponCount ? (o.data.isHaveData = !0, t.couponCount - o.data.pageNum * o.data.pageSize > 0 || t.couponCount - o.data.pageNum * o.data.pageSize < 0 && Math.abs(t.couponCount - o.data.pageNum * o.data.pageSize) < o.data.pageSize ? (o.data.couponList = o.data.couponList.concat(t.couponList), 
            o.data.pageNum++, o.data.isHaveMore = !0) : t.couponCount - o.data.pageNum * o.data.pageSize == 0 ? (o.data.couponList = o.data.couponList.concat(t.couponList), 
            o.data.isHaveMore = !1) : o.data.isHaveMore = !1) : (o.data.isHaveData = !1, o.data.isHaveMore = !1), 
            o.setData({
                pageNum: o.data.pageNum,
                couponList: o.data.couponList,
                isHaveMore: o.data.isHaveMore,
                isHaveData: o.data.isHaveData
            });
        } else a.reportErr("home coupons.json data err");
    },
    loadMoreCoupons: function() {
        this.data.isHaveMore && this.dataRequest();
    },
    couponShowInfo: function() {
        wx.showModal({
            title: "提示",
            content: "1、运费券仅可用于抵减京东自营商品订单运费,即用户下单结算时,可选择该优惠券按券面值（¥6）抵减每笔结算订单中的运费,运费券可叠加使用在同一个订单中,不设找零；2、虚拟商品及部分特殊购物流程不可用, 特殊流程如秒杀、夺宝岛等；3、运费券可与京券、东券、京东E卡、京豆同时使用",
            showCancel: !1,
            success: function(a) {
                a.confirm && console.log("用户点击确定");
            }
        });
    },
    listScroll: function(a) {
        a.detail.scrollTop > this.data.screenHeight ? this.setData({
            toTopDisplay: "block"
        }) : this.setData({
            toTopDisplay: "none"
        });
    },
    toTopTap: function(a) {
        this.setData({
            toTopDisplay: "none",
            scrollTop: .001 * Math.random()
        });
    },
    loginModalShow: function() {
        a.globalLoginShow(this);
    }
});