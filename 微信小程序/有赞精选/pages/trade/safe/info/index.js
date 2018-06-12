!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 28 ], {
    312: function(t, e, a) {
        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var n = o(a(2)), s = o(a(1)), d = a(3), i = a(8), r = a(0), c = getApp(), u = a(64), f = a(56), h = a(111), l = a(313), _ = a(315), w = a(316);
        (0, s.default)(d({}, i.Toast, i.Tab, _, w, {
            data: {
                fetching: !0,
                safe_no: "",
                order_no: "",
                item_id: "",
                type: "safe-ing",
                timeout: 0,
                countdown: {},
                countdownStr: {},
                goods: {},
                refund_process: {
                    show: !1
                },
                tab: {
                    selectedId: "1",
                    list: [ {
                        id: "1",
                        title: "退款详情"
                    }, {
                        id: "2",
                        title: "协商记录"
                    } ]
                },
                btns: [],
                log: [],
                messageDialog: {
                    show: !1,
                    message: "",
                    imgs: []
                },
                youzanDialog: {
                    show: !1,
                    message: "",
                    imgs: []
                },
                MAX_PICTURES: 5
            },
            onPullDownRefresh: function() {
                this.fetchSafeData(!0);
            },
            onLoad: function(t) {
                var e = c.db.get(t.dbid) || {};
                this.setData({
                    safe_no: e.safe_no || t.safe_no || "",
                    order_no: e.order_no || t.order_no || "",
                    kdt_id: e.kdt_id || t.kdt_id || ""
                });
            },
            onShow: function() {
                r.page.show(), this.fetchSafeData();
            },
            handleZanTabChange: function(t) {
                var e = t.selectedId;
                this.setData({
                    "tab.selectedId": e
                });
            },
            showPicture: function(t) {
                var e = t.currentTarget.dataset.src;
                wx.previewImage({
                    urls: [ e ]
                });
            },
            closeSafe: function() {
                var t = this;
                wx.showModal({
                    title: "提示",
                    content: "确定要关闭维权么？",
                    success: function(e) {
                        e.confirm && h.close({
                            safe_no: t.data.safe_no,
                            order_no: t.data.order_no,
                            kdt_id: t.data.kdt_id
                        }, function() {
                            return t.fetchSafeData();
                        });
                    }
                });
            },
            backToOrder: function() {
                var t = c.db.set({
                    order_no: this.data.order_no,
                    type: "order",
                    kdtId: this.data.kdt_id
                });
                wx.redirectTo({
                    url: "/pages/trade/result/index?dbid=" + t
                });
            },
            jumpToFillAddress: function() {
                var t = c.db.set({
                    safe_no: this.data.safe_no,
                    order_no: this.data.order_no,
                    kdt_id: this.data.kdt_id
                });
                wx.redirectTo({
                    url: "/pages/trade/safe/express/index?dbid=" + t
                });
            },
            modifySafe: function() {
                var t = c.db.set({
                    safe_no: this.data.safe_no,
                    order_no: this.data.order_no,
                    kdt_id: this.data.kdt_id
                });
                wx.redirectTo({
                    url: "/pages/trade/safe/apply/index?dbid=" + t
                });
            },
            fetchSafeData: function(t) {
                var e = this;
                this.countdown && this.countdown.stop(), wx.showToast({
                    title: "数据加载中",
                    icon: "loading",
                    duration: 1e4
                }), h.getSafeDetail(this.data, function(a) {
                    wx.hideToast(), t && wx.stopPullDownRefresh();
                    var o = l.parseSafeData(a);
                    e.setData((0, n.default)({
                        fetching: !1
                    }, o)), "agreed" == e.data.type && e.fetchRefundProcess(), e.startTimeout();
                }, function(a) {
                    wx.hideToast(), t && wx.stopPullDownRefresh(), e.showZanToast(a || "网络出了点问题~请稍候再试~");
                });
            },
            fetchRefundProcess: function() {
                var t = this;
                h.getRefundProcess(this.data, function(e) {
                    var a = (0, n.default)({}, t.data.refund_process, l.parseRefundProcessData(e));
                    t.setData({
                        refund_process: a
                    });
                });
            },
            showRefundProcess: function() {
                this.setData({
                    "refund_process.show": !0
                });
            },
            startTimeout: function() {
                var t = this;
                this.data.timeout && (this.countdown = new u(this.data.timeout, {
                    onChange: function(e, a) {
                        t.setData({
                            countdown: e,
                            countdownStr: a
                        });
                    },
                    onEnd: function() {
                        t.fetchSafeData();
                    }
                }));
            },
            onClickToYouzanPhone: function() {
                wx.showModal({
                    title: "0571-89988550",
                    cancelText: "取消",
                    confirmText: "拨打",
                    cancelColor: "#333",
                    success: function(t) {
                        t.confirm && wx.makePhoneCall({
                            phoneNumber: "0571-89988550"
                        });
                    }
                });
            },
            generateKey: function() {
                return f.makeRandomString(8) + new Date().getTime();
            },
            validateImages: function() {
                return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : []).every(function(t) {
                    return !t.uploading;
                });
            }
        }));
    }
}, [ 312 ]);