var t = require("./utils"), e = require("./apis"), o = require("./report"), i = {
    SUCCESS: 1,
    EMPTY: 2,
    OVER: 3,
    NO_AUTHORIZATION: 4,
    UNKNOWN: 101
};

Component({
    properties: {
        activityId: String,
        couponPackId: String,
        poiId: String,
        shareOpenId: String,
        moneyText: {
            type: String,
            value: 0
        }
    },
    data: {
        COUPON_STATUS_MAPPING: i,
        status: 1,
        authFailCount: 0,
        visible: !1,
        users: [],
        userCount: 0,
        remainCount: 0,
        bizName: "",
        description: "",
        type: 0,
        beginTime: 0,
        endTime: 0,
        minConsumption: 0,
        accurateMinConsum: 0,
        discountAmount: 0,
        accurateDiscount: 0,
        errMsg: "",
        toast: {
            show: !1,
            title: "出错了",
            duration: 3e3
        }
    },
    methods: {
        report: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = this.data, s = i.activityId, a = i.couponPackId, n = i.poiId, r = i.shareOpenId;
            (0, o.report)(t, Object.assign(e, {
                activityid: s,
                couponpackid: a,
                poiid: n,
                shareopenid: r
            }));
        },
        openToast: function(t) {
            var e = this, o = this.data.toast;
            "string" == typeof t ? o.title = t : Object.assign(o, t), o.show = !0, this.setData({
                toast: o
            }), clearTimeout(this.toastTimeId), this.toastTimeId = setTimeout(function() {
                e.setData({
                    "toast.show": !1
                });
            }, o.duration);
        },
        open: function() {
            this.data.visible || this.setData({
                visible: !0
            }), this.triggerEvent("open", 1 === this.data.status);
        },
        close: function() {
            this.setData({
                visible: !1
            }), this.triggerEvent("close");
        },
        setStatus: function(t) {
            this.setData({
                status: t,
                statusClass: t === i.NO_AUTHORIZATION || t === i.UNKNOWN ? "coupon-no-authorize" : 1 !== t ? "coupon-over" : ""
            });
        },
        requestCoupon: function() {
            var o = this;
            (0, t.getFullUserInfo)().then(function(t) {
                o.userInfo = t;
                var i = o.data, s = i.activityId, a = i.couponPackId, n = i.poiId, r = i.orderId, u = i.shareOpenId, c = t.openId, d = t.unionId, p = t.avatarUrl, h = t.nickName;
                return (0, e.assignCoupon)({
                    activityId: s,
                    couponPackId: a,
                    poiId: n,
                    orderId: r,
                    shareOpenId: u,
                    openId: c,
                    unionId: d,
                    headImgUrl: p,
                    nickName: h,
                    extTag: {
                        unconditional: c === u
                    }
                });
            }).then(function(t) {
                o.handleResponse(t);
            }).catch(function(t) {
                t.errMsg && 0 === t.errMsg.indexOf("getUserInfo:fail") ? (o.setData({
                    authFailCount: o.data.authFailCount + 1
                }), o.setStatus(i.NO_AUTHORIZATION), o.open(), o.report("mt_coupon_error", {
                    code: 7,
                    msg: "取消授权"
                })) : (o.setStatus(i.UNKNOWN), o.open(), o.openToast("网络异常，请稍后重试！"), o.report("mt_coupon_error", {
                    code: 6,
                    msg: "网络异常"
                }));
            });
        },
        handleResponse: function(e) {
            switch (e.status) {
              case 200:
                var o = e.data, s = o.coupons[0];
                s && (this.setData({
                    bizName: o.bizName,
                    description: s.description,
                    type: s.type,
                    beginTime: (0, t.formatDate)(s.beginTime, "."),
                    endTime: (0, t.formatDate)(s.endTime, "."),
                    minConsumption: s.minConsumption,
                    accurateMinConsum: s.accurateMinConsum / 100,
                    discountAmount: s.discountAmount,
                    accurateDiscount: s.accurateDiscount / 100
                }), this.setStatus(i.SUCCESS), this.fetchCouponMemberList());
                break;

              case 114:
              case 144:
              case 112:
                this.setStatus(i.OVER), this.report("mt_coupon_error", {
                    code: 3,
                    msg: "活动已截止"
                });
                break;

              case 141:
              case 117:
                this.setStatus(i.EMPTY), this.report("mt_coupon_error", {
                    code: 2,
                    msg: "优惠券领完"
                });
                break;

              default:
                this.setStatus(i.UNKNOWN), this.openToast("服务端异常，请稍后重试"), console.log("后端接口返回值：", e), 
                this.report("mt_coupon_error", {
                    code: 5,
                    msg: e.msg
                });
            }
            this.open();
        },
        onGotUserInfo: function(t) {
            t.detail.userInfo ? (getApp().globalData.fullUserInfo = t.detail, this.requestCoupon(), 
            this.report("mt_coupon_authorize_ok")) : (this.setData({
                authFailCount: this.data.authFailCount + 1
            }), this.report("mt_coupon_authorize_fail"));
        },
        fetchCouponMemberList: function() {
            var o = this, i = this.data, s = i.activityId, a = i.couponPackId;
            (0, e.assignList)({
                activityId: s,
                couponPackId: a
            }).then(function(e) {
                if (200 === e.status) {
                    var i = e.data.couponMemberList, s = i.length;
                    o.setData({
                        remainCount: e.data.remainCount,
                        userCount: s,
                        users: (s > 4 ? [ i[0], i[1], i[s - 2], i[s - 1] ] : i).map(function(e) {
                            var o = e.headImgUrl, i = e.discountAmount, s = e.accurateDiscount;
                            return {
                                id: e.openId,
                                headImgUrl: (0, t.isEmpty)(o) ? "https://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-st/file:bcde5843/xiaomei.png" : o,
                                discountAmount: i,
                                accurateDiscount: s / 100
                            };
                        })
                    });
                } else console.log(e.msg);
            });
        }
    },
    ready: function() {
        var e = this.data, o = e.activityId, i = e.couponPackId, s = e.poiId, a = e.shareOpenId;
        (0, t.allIsNotEmpty)([ o, i, s, a ]) && (this.requestCoupon(), this.fetchCouponMemberList(), 
        this.report("mt_coupon_assign"));
    }
});