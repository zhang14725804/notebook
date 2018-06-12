!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 26 ], {
    339: function(t, e, a) {
        var o = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(a(1)), n = a(44), i = a(3), r = a(105), s = (a(40), getApp());
        (0, o.default)(i({}, r, {
            data: {
                loadFail: !1,
                loading: !0,
                groupAlias: "",
                clickInterface: {
                    clickInterface: "refreshData"
                },
                icon_network_error: "../../../resources/icon/ic_network_error.png",
                datasource: {},
                selected_coupon: {
                    id: 2
                }
            },
            onLoad: function(t) {
                n(this);
                var e = this;
                this.setData({
                    groupAlias: t.groupAlias
                }), s.on("onTokenRefresh", function() {
                    console.log("on Token refresh"), e.refreshData();
                }), this.refreshData();
            },
            refreshData: function() {
                this.setData({
                    loadFail: !1,
                    loading: !0
                }), this.getlotteryInfo();
            },
            handleCoupon: function(t) {
                var e = t, a = e;
                if (a.show_more_desc = !1, a.component = {}, a.component.name = e.team_name, a.component.kdtId = e.kdt_id, 
                a.preferential_type = 1, 1 == e.preferential_type || "code" == a.component.type) {
                    var o = (t.origin_value / 100).toString().split("."), n = o[0], i = 2 == o.length ? o[1] : null;
                    i = "00" == i ? null : i, a.component.yuan = n, a.component.cent = i;
                } else if (2 == e.preferential_type) {
                    var r = e.discount.split(".");
                    a.component.discount = 2 == r.length ? 0 == r[1] ? r[0] : e.discount : r[0];
                }
                var s = 0;
                if (1 == e.is_at_least && (s = e.origin_at_least), a.component.condition = 0 < s ? "满" + s / 100 + "元可用" : "无使用门槛", 
                e.start_time && e.end_time) {
                    var l = this._timeStampToDate(e.start_time), c = this._timeStampToDate(e.end_time);
                    a.component.valid_time = l + " - " + c;
                } else if (1 == e.date_type || "code" == a.component.type) {
                    var p = this._timeStampToDate(e.start_at), d = this._timeStampToDate(e.end_at);
                    a.component.valid_time = p + " - " + d;
                } else 2 == e.date_type && (a.component.valid_time = "领到券" + (0 == e.fixed_begin_term ? "当日" : "次日") + "开始" + e.fixed_term + "天内有效");
                var u = "";
                return u += "all" == e.range_type ? "全部商品可用" : "部分商品可用", u += ", 不可抵扣运费", a.component.desclist = [ u ], 
                a.component.valid_content = "立即使用", a.component.type = "", a.component.status = "valid", 
                a;
            },
            _timeStampToDate: function(t) {
                var e = new Date(1e3 * t);
                return e.getFullYear() + "." + (e.getUTCMonth() + 1) + "." + e.getDate();
            },
            getlotteryInfo: function() {
                var t = this, e = this;
                this.data.page;
                this.setData({
                    loading: !0
                }), s.carmen({
                    api: "weapp.spotlight.coupon/1.0.0/get",
                    method: "GET",
                    data: {
                        groupAlias: this.data.groupAlias
                    },
                    success: function(a) {
                        var o = [];
                        a.list ? ((a.list || []).forEach(function(e) {
                            var a = t.handleCoupon(e, !0);
                            o.push(a);
                        }), a.list = o, e.setData({
                            datasource: a,
                            loadFail: !1
                        })) : a.data.error_response && e.setData({
                            loadFail: !0
                        });
                    },
                    fail: function() {
                        console.log("load fail"), e.setData({
                            loadFail: !0
                        });
                    },
                    complete: function() {
                        e.setData({
                            loading: !1
                        });
                    }
                });
            }
        }));
    }
}, [ 339 ]);