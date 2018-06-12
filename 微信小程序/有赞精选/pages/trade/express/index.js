!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 34 ], {
    292: function(e, o, s) {
        function t(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var a = t(s(2)), r = t(s(1)), n = getApp(), i = s(0), d = (0, a.default)({}, {
            data: {
                kdt_id: "",
                fetching: !0,
                order_no: "",
                image_url: "",
                goods_count: 0,
                express: {}
            },
            onLoad: function(e) {
                var o = this, s = e.dbid, t = n.db.get(s) || {};
                this.setData({
                    order_no: t.order_no,
                    image_url: t.image_url,
                    goods_count: t.goods_count,
                    kdt_id: t.kdt_id
                }), n.carmen({
                    api: "youzan.trade.dc.query/1.0.0/querybyorderno",
                    data: {
                        order_no: this.data.order_no,
                        kdt_id: this.data.kdt_id,
                        include_dist_order_and_detail: !0
                    },
                    success: function(e) {
                        var s = {};
                        try {
                            var t = e[0].distOrderDTOs, a = (void 0 === t ? [ {} ] : t)[0].expressInfo, r = void 0 === a ? {} : a, n = r.expressId, i = r.expressNo, d = void 0 === i ? "" : i, c = r.expressDetail, u = void 0 === c ? {} : c, p = u.expressStatus, l = void 0 === p ? "" : p, _ = u.expressCompanyName, f = void 0 === _ ? "" : _, g = u.expressProgressInfo, x = void 0 === g ? "[]" : g;
                            if (!n) return void wx.showModal({
                                title: "",
                                content: "订单无需物流",
                                showCancel: !1,
                                confirmText: "我知道了",
                                confirmColor: "#ff4444",
                                success: function() {
                                    wx.navigateBack();
                                }
                            });
                            s = {
                                expressProgressInfo: JSON.parse(x),
                                expressNo: d,
                                expressStatus: l,
                                expressCompanyName: f
                            };
                        } catch (e) {
                            console.error(e.message);
                        }
                        o.setData({
                            fetching: !1,
                            express: s
                        });
                    },
                    fail: function(e) {
                        wx.showModal({
                            title: "哎呀出错了",
                            content: e.msg || "没有找到物流信息",
                            showCancel: !1,
                            confirmText: "返回",
                            success: function() {
                                wx.navigateBack();
                            }
                        });
                    }
                });
            },
            onShow: function() {
                i.page.show(), this.setData({
                    copyright: n.globalData.copyright,
                    is_big_shop: n.globalData.is_big_shop
                });
            },
            navigateBack: function() {
                wx.navigateBack();
            }
        });
        (0, r.default)(d);
    }
}, [ 292 ]);