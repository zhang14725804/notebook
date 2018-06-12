!function(e) {
    function i(o) {
        if (t[o]) return t[o].exports;
        var n = global.installedModules[o] = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(n.exports, n, n.exports, i), n.l = !0, n.exports;
    }
    e = Object.assign(require("../../../../commons.js").modules, e), e = Object.assign(require("../../../../vendors.js").modules, e);
    var t = {};
    t = global.installedModules = global.installedModules || {}, i.m = e, i.c = t, i.d = function(e, t, o) {
        i.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, i.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, i.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return i.d(t, "a", t), t;
    }, i.o = function(e, i) {
        return Object.prototype.hasOwnProperty.call(e, i);
    }, i.p = "", i(i.s = 180);
}({
    180: function(e, i, t) {
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var n = o(t(0)), a = o(t(3)), s = t(4), r = t(5), u = t(10), c = t(7), d = t(14), l = getApp(), p = null;
        (0, n.default)(d, {
            assistData: {},
            data: {
                themeClass: l.themeClass,
                orderNo: null,
                groupAlias: null,
                isLoading: !0,
                grouponDetail: {},
                originPrice: "",
                price: "",
                isMultiPrice: !1,
                goodsTitle: "",
                goodsThumbUrl: "",
                goodsAlias: "",
                isJoinedGroup: null,
                isGrouponSuccess: null,
                isGrouponFailed: null,
                isInvalid: null,
                isNewGroup: null,
                joinRecords: [],
                statusTitle: "",
                joinNumber: 0,
                gapNumber: 0,
                loading: null,
                isAgencyReceive: null,
                hasFission: !1,
                countdownTime: "",
                groupRemindTime: 0,
                membersAvatars: [],
                placeholder: "https://img.yzcdn.cn/public_files/2017/09/20/4135b27618a9fb6f520c70dd6a217ec8.png"
            },
            onLoad: function(e) {
                var i = e.orderNo || "";
                "undefined" === i && (i = ""), this.request = u(l), this.setData({
                    orderNo: i,
                    groupAlias: e.groupAlias
                }), this.fetchPintunGroupDetail(), this.tryCreateAndGetFission();
            },
            refresh: function() {},
            onReady: function() {},
            onShow: function() {
                this.runCountdown();
            },
            onHide: function() {
                clearTimeout(p);
            },
            onUnload: function() {
                clearTimeout(p);
            },
            onPullDownRefresh: function() {},
            onReachBottom: function() {},
            onShareAppMessage: function() {
                return this.data.isJoinedGroup ? s.page.processShareData({
                    title: "我" + this.data.price.join(".") + "元拼了" + this.data.goodsTitle + "，快来一起拼团吧",
                    path: "/pages/ump/pintuan/detail/index?groupAlias=" + this.data.groupAlias
                }) : s.page.processShareData({
                    title: this.data.goodsTitle,
                    path: "/pages/ump/pintuan/detail/index?groupAlias=" + this.data.groupAlias
                });
            },
            formatCountDown: function(e) {
                var i = c.format(e).data, t = function(e) {
                    return e = (e < 10 ? "0" : "") + e;
                };
                return {
                    hour: t(24 * i.day + i.hour),
                    minute: t(i.minute),
                    second: t(i.second)
                };
            },
            coutdown: function() {
                var e = this.assistData.remindTime - Date.now();
                e < 0 && (clearInterval(p), this.refresh()), this.setData({
                    countdown: this.formatCountDown(e)
                });
            },
            runCountdown: function() {
                var e = this;
                this.assistData.remindTime && (this.coutdown(), p = setInterval(function() {
                    e.coutdown();
                }, 500));
            },
            fetchPintunGroupDetail: function() {
                var e = this, i = {};
                this.data.orderNo && (i.order_no = this.data.orderNo), i.group_alias = this.data.groupAlias || "", 
                wx.showLoading({
                    title: "数据加载中..."
                }), l.carmen({
                    api: "youzan.ump.groupon.detail/1.0.0/get",
                    query: i,
                    success: function(i) {
                        wx.hideLoading(), e.setData({
                            isLoading: !1
                        }), e.parseData(i);
                    },
                    fail: function(i) {
                        if (50800 == i.code) return wx.showLoading({
                            title: "数据加载中..."
                        }), void setTimeout(function() {
                            e.fetchPintunGroupDetail();
                        }, 1e3);
                        wx.hideLoading(), wx.showModal({
                            title: "获取拼团详情失败",
                            content: i.msg,
                            showCancel: !1,
                            confirmText: "返回",
                            success: function() {
                                wx.navigateBack();
                            }
                        });
                    }
                });
            },
            parseData: function(e) {
                var i = [], t = [], o = e.join_records.length;
                wx.setStorageSync("leaderName", e.join_records[0].fans_nickname), r(e.join_records, function(e) {
                    var o = {};
                    if (o.nickname = e.fans_nickname, o.avatar = e.fans_picture, o.isHead = e.is_head, 
                    o.isMock = e.is_mock, o.isAgencyReceive = e.is_agency_receive, i.push(o), t.length < 10) {
                        var n = {};
                        n.value = e.fans_picture, n.label = 1 == e.is_agency_receive ? "团长代收" : "", n.label = 1 == e.is_head ? "团长" : n.label, 
                        t.push(n);
                    }
                });
                var n = o >= e.join_num ? 0 : e.gap_num, a = 0;
                if (n > 0 && o < 10) {
                    a = n + o <= 10 ? n : 10 - o;
                    for (var s = 0; s < a; s++) {
                        var u = {
                            value: "",
                            label: ""
                        };
                        t.push(u);
                    }
                }
                e.join_num > 10 && (o < 10 ? t[o].value = "https://img.yzcdn.cn/public_files/2017/09/29/7ad1015d2279c58b2d11dfd125a10b98.png" : t[1].value = "https://img.yzcdn.cn/public_files/2017/09/29/7ad1015d2279c58b2d11dfd125a10b98.png");
                var c = "", d = !1;
                e.price.indexOf("-") > 0 ? (c = e.price.split("-")[0], d = !0) : (c = e.price || "", 
                d = !1), c = c.split("."), this.assistData.remindTime = 1e3 * e.remind_time + Date.now(), 
                this.runCountdown(), this.setData({
                    originPrice: e.origin_price,
                    price: c,
                    payRest: Number(e.origin_price - e.price).toFixed(2),
                    isMultiPrice: d,
                    goodsTitle: e.goods_title,
                    goodsThumbUrl: e.attachment_url,
                    goodsAlias: e.goods_alias,
                    isJoinedGroup: e.is_joined_group,
                    isGrouponSuccess: e.is_groupon_success,
                    isGrouponFailed: e.is_groupon_failed,
                    isInvalid: e.is_invalid,
                    isNewGroup: e.new_group,
                    joinRecords: i,
                    joinNumber: e.join_num,
                    gapNumber: e.gap_num,
                    groupRemindTime: e.remind_time,
                    membersAvatars: t,
                    isAgencyReceive: e.is_agency_receive,
                    orderNo: e.order_no || this.data.orderNo || "",
                    groupAlias: e.group_alias
                });
            },
            onPintuanDescClick: function() {
                a.default.navigate({
                    url: "/packages/ump/pintuan/playingInstruction/playingInstruction"
                });
            },
            onGotoShopHomePageClick: function() {
                console.log("Back to Home click"), a.default.switchTab({
                    url: "/pages/home/dashboard/index"
                });
            },
            onGotoTradeDetailPageClick: function() {
                var e = l.db.set({
                    order_no: this.data.orderNo,
                    type: "order"
                });
                wx.navigateTo({
                    url: "/packages/trade/order/result/index?dbid=" + e
                });
            },
            fetchGoodsDetail: function(e) {
                var i = this;
                "" != this.data.goodsAlias && (wx.showToast({
                    title: "加载中",
                    icon: "loading"
                }), l.carmen({
                    api: "weapp.wsc.item.detail/1.0.0/get",
                    query: {
                        alias: this.data.goodsAlias,
                        fans_type: l.getFansType()
                    },
                    success: function(t) {
                        var o = JSON.parse(JSON.stringify(t));
                        i.parseGoodsData(o, e);
                    },
                    fail: function() {
                        i.showZanToast("获取商品信息失败");
                    },
                    complete: function() {
                        wx.hideToast();
                    }
                }));
            },
            parseGoodsData: function(e, i) {
                var t = i.currentTarget.dataset.createGroupon, o = i.currentTarget.dataset.isGroupon, n = [];
                n.push("buy"), this.showComponentSKU({
                    alias: e.alias,
                    needFetch: !1,
                    btns: n,
                    goods: {
                        components: e.components,
                        brief: e.brief,
                        sku: e.sku,
                        activity: e.activity,
                        use_ump: !0
                    },
                    selectedSKU: e.selectedSKU,
                    needClean: !0,
                    createGroupon: t,
                    isGroupon: o,
                    activityAlias: t ? "" : this.data.groupAlias
                });
            },
            togglePintuanDialog: function(e) {
                this.fetchGoodsDetail(e);
            },
            onPintuanGoodsCardClick: function() {
                wx.navigateTo({
                    url: "/pages/goods/detail/index?alias=" + this.data.goodsAlias
                });
            },
            tryCreateAndGetFission: function() {
                this.request({
                    path: "/wscump/targeted-marketing/fission/create-get.json",
                    query: {
                        order_no: this.data.orderNo
                    }
                }).then(function(e) {}).catch(function(e) {
                    console.log(e);
                });
            }
        });
    }
});