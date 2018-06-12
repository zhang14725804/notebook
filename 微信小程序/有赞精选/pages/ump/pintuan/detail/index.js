!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 25 ], {
    332: function(e, i, t) {
        var a, o = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(t(1)), s = getApp(), n = t(11), r = t(3), u = t(40), c = t(69), d = t(159), l = t(17), p = t(68), g = t(8), h = t(160), m = t(6), f = t(45), _ = t(0), w = null;
        (0, o.default)(r({}, c, p, g.Toast, f, {
            assistData: {},
            data: (a = {
                kdtId: "",
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
                countdownTime: "",
                groupRemindTime: 0,
                membersAvatars: [],
                placeholder: "https://img.yzcdn.cn/public_files/2017/09/20/4135b27618a9fb6f520c70dd6a217ec8.png",
                viewType: "",
                isPennyLottery: !1,
                catOrderDetail: "",
                isNewUserGroup: !1
            }, a.catOrderDetail = "", a.originGoodsData = {}, a.goods = {}, a.goodsPreference = {}, 
            a.miniCode = "", a),
            onLoad: function(e) {
                var i = e.scene ? l.decode("groupOn", e.scene) : {};
                this.setData({
                    orderNo: void 0 === e.orderNo ? null : e.orderNo,
                    groupAlias: e.groupAlias || i.groupAlias,
                    kdtId: e.kdtId || i.kdtId
                }), this.fetchPintunGroupDetail();
            },
            refresh: function() {},
            onReady: function() {},
            onShow: function() {
                _.page.show(), this.runCountdown();
            },
            onHide: function() {
                clearTimeout(w);
            },
            onUnload: function() {
                clearTimeout(w);
            },
            onPullDownRefresh: function() {},
            onReachBottom: function() {},
            shareTapped: function() {
                console.log("点击了分享按钮"), this.onShowShareDialog("goods");
            },
            onShareAppMessage: function() {
                var e = this.data, i = e.isJoinedGroup, t = e.groupAlias, a = e.kdtId, o = e.price, s = e.goodsTitle, n = _.getGlobalData().channel, r = i ? "我" + o + "元拼了" + s + "，快来一起拼团吧" : s, u = getCurrentPages(), c = u[u.length - 1].route + "?groupAlias=" + t + "&kdtId=" + a;
                return n && (c += "&channel=" + n), {
                    title: r,
                    path: c
                };
            },
            formatCountDown: function(e) {
                var i = u.format(e).data, t = function(e) {
                    return e = (10 > e ? "0" : "") + e;
                };
                return t(24 * i.day + i.hour) + ":" + t(i.minute) + ":" + t(i.second);
            },
            coutdown: function() {
                var e = this.assistData.remindTime - Date.now();
                0 > e && (clearInterval(w), this.refresh()), this.setData({
                    countdown: this.formatCountDown(e)
                });
            },
            runCountdown: function() {
                var e = this;
                this.assistData.remindTime && (this.coutdown(), w = setInterval(function() {
                    e.coutdown();
                }, 500));
            },
            fetchPintunGroupDetail: function() {
                var e = this;
                wx.showToast({
                    title: "加载中",
                    icon: "loading"
                });
                var i = {};
                null != this.data.orderNo && (i.order_no = this.data.orderNo), i.group_alias = this.data.groupAlias, 
                i.kdt_id = this.data.kdtId, s.carmen({
                    api: "youzan.ump.groupon.detail/1.0.0/get",
                    query: i,
                    success: function(i) {
                        e.setData({
                            isLoading: !1
                        }), e.parseData(i), e.fetchGoodsDetail();
                    },
                    fail: function(e) {
                        wx.showModal({
                            title: "获取拼团详情失败",
                            content: e.msg,
                            showCancel: !1,
                            confirmText: "返回",
                            success: function() {
                                wx.navigateBack();
                            }
                        });
                    },
                    complete: function() {
                        wx.hideToast();
                    }
                });
            },
            parseData: function(e) {
                var i = [], t = [], a = e.join_records.length;
                wx.setStorageSync("leaderName", e.join_records[0].fans_nickname), n(e.join_records, function(e) {
                    var a = {};
                    if (a.nickname = e.fans_nickname, a.avatar = e.fans_picture, a.isHead = e.is_head, 
                    a.isMock = e.is_mock, a.isAgencyReceive = e.is_agency_receive, i.push(a), 10 > t.length) {
                        var o = {};
                        o.value = e.fans_picture, o.label = 1 == e.is_agency_receive ? "团长代收" : "", o.label = 1 == e.is_head ? "团长" : o.label, 
                        t.push(o);
                    }
                });
                var o = a >= e.join_num ? 0 : e.gap_num, s = 0;
                if (0 < o && 10 > a) {
                    s = 10 >= o + a ? o : 10 - a;
                    for (var r, u = 0; u < s; u++) (r = {}).value = "", r.label = "", t.push(r);
                }
                10 < e.join_num && (10 > a ? t[a].value = "https://img.yzcdn.cn/public_files/2017/09/29/7ad1015d2279c58b2d11dfd125a10b98.png" : t[1].value = "https://img.yzcdn.cn/public_files/2017/09/29/7ad1015d2279c58b2d11dfd125a10b98.png");
                var c = "", d = !1;
                0 < e.price.indexOf("-") ? (c = e.price.split("-")[0], d = !0) : (c = e.price, d = !1), 
                this.assistData.remindTime = 1e3 * e.remind_time + Date.now(), this.runCountdown(), 
                this.setData({
                    originPrice: e.origin_price,
                    price: c,
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
                    orderNo: e.order_no,
                    groupAlias: e.group_alias,
                    catOrderDetail: "查看订单详情"
                }), void 0 == e.view || ("freshman_exclusive" == e.view ? this.setData({
                    viewType: "pintuan_detail_card_cover__img-freshmen",
                    isNewUserGroup: !0
                }) : "one_cent_lottery" == e.view && (this.setData({
                    viewType: "pintuan_detail_card_cover__img-pennylottery",
                    isPennyLottery: !0
                }), this.data.isGrouponSuccess && this.data.isJoinedGroup && this.setData({
                    catOrderDetail: "查看抽奖结果"
                })));
            },
            onPintuanDescClick: function() {
                wx.navigateTo({
                    url: "/pages/ump/pintuan/playingInstruction/playingInstruction"
                });
            },
            onGotoShopHomePageClick: function() {
                wx.redirectTo({
                    url: "/pages/usercenter/shopSelection/shopSelection?kdtId=" + this.data.kdtId
                });
            },
            onGotoTradeDetailPageClick: function() {
                if (this.data.isPennyLottery && this.data.isGrouponSuccess && this.data.isJoinedGroup) s.isBindYouzanAccount() ? wx.navigateTo({
                    url: "/pages/ump/lotteryresult/lotteryresult?groupAlias=" + this.data.groupAlias
                }) : this.bindZanAccount(); else {
                    var e = s.db.set({
                        order_no: this.data.orderNo,
                        type: "order",
                        kdtId: this.data.kdtId
                    });
                    wx.redirectTo({
                        url: "/pages/trade/result/index?dbid=" + e
                    });
                }
            },
            fetchGoodsDetail: function() {
                var e = this;
                wx.showToast({
                    title: "加载中",
                    icon: "loading"
                }), s.carmen({
                    api: "weapp.spotlight.item/1.0.0/get",
                    method: "GET",
                    data: {
                        alias: this.data.goodsAlias
                    },
                    success: function(i) {
                        e.setData({
                            originGoodsData: i
                        }), e.setData(e.parse(i)), e.fetchWeappCode("/pages/ump/pintuan/detail/index?" + l.encode("groupOn", {
                            groupAlias: e.data.groupAlias,
                            kdtId: e.data.kdtId
                        }));
                    },
                    fail: function() {
                        e.showZanToast("获取商品信息失败");
                    },
                    complete: function() {
                        wx.hideToast();
                    }
                });
            },
            onPintuanGoodsCardClick: function() {
                1 < getCurrentPages().length ? wx.redirectTo({
                    url: "/pages/goods/detail/index?fromPintuan=1&alias=" + this.data.goodsAlias
                }) : wx.navigateTo({
                    url: "/pages/goods/detail/index?fromPintuan=1&alias=" + this.data.goodsAlias
                });
            },
            parse: function(e) {
                var i = {};
                i.id = e.id, i.title = h.strDiscode(e.title), i.subTitle = e.sub_title, i.price = this.parsePrice(e), 
                i.pictureRatio = 0, i.picture = [], i.originPicture = [], n(e.picture, function(e) {
                    var t = Math.max;
                    i.picture.push(m(e.url, "!730x0.jpg")), i.originPicture.push(e.url), i.pictureRatio = t(.5, Math.min(1, t(i.pictureRatio, +e.height / +e.width)));
                });
                var t = e.activity.goods_preference;
                return {
                    goods: i,
                    goodsPreference: t
                };
            },
            parsePrice: function(e) {
                var i = {}, t = {
                    desc: e.skus.price,
                    min: e.skus.min_price || e.skus.price
                }, a = e.activity.goods_preference;
                return a && (e.skus.origin = e.skus.price, e.skus.price = a.show_price, e.skus.min_price = a.price_range.min, 
                e.skus.max_price = a.price_range.max, n(e.skus.list, function(e) {
                    e.price = a.skus[e.id].price;
                })), i = e.skus.none_sku || e.skus.min_price == e.skus.max_price ? {
                    desc: e.skus.price,
                    yuan: e.skus.price.split(".")[0],
                    fen: e.skus.price.split(".")[1],
                    isRange: !1
                } : {
                    desc: e.skus.price,
                    isRange: !0,
                    min: {
                        desc: e.skus.min_price,
                        yuan: e.skus.min_price.split(".")[0],
                        fen: e.skus.min_price.split(".")[1]
                    },
                    max: {
                        desc: e.skus.max_price,
                        yuan: e.skus.max_price.split(".")[0],
                        fen: e.skus.max_price.split(".")[1]
                    }
                }, i.origin = t, i;
            },
            parseGoodsData: function(e) {
                var i = this.data.originGoodsData, t = e.currentTarget.dataset.createGroupon, a = [];
                a.push("buy"), console.log("show SKU");
                var o = {
                    item_id: i.id,
                    kdt_id: i.kdt_id,
                    team_name: i.team_name,
                    alias: i.alias,
                    title: i.title,
                    price: i.price,
                    origin: i.origin,
                    wait_to_sold: i.wait_to_sold,
                    is_display: i.is_display,
                    is_virtual: i.is_virtual,
                    picture: i.picture,
                    sold_status: i.sold_status,
                    quota: i.quota,
                    quota_used: i.quota_used
                };
                this.showComponentSKU({
                    alias: i.alias,
                    needFetch: !1,
                    btns: a,
                    goods: {
                        originData: i,
                        brief: o,
                        sku: i.skus,
                        activity: i.activity,
                        use_ump: !0
                    },
                    selectedSKU: i.selectedSKU,
                    needClean: !0,
                    createGroupon: t,
                    activityAlias: t ? "" : this.data.groupAlias
                });
            },
            togglePintuanDialog: function(e) {
                var i = e.currentTarget.dataset.createGroupon, t = e.currentTarget.dataset.joinToGroupon, a = this;
                1 != this.data.isNewUserGroup || 1 != i && 1 != t ? !this.data.isPennyLottery || 1 != i && 1 != t ? this.parseGoodsData(e) : s.isBindYouzanAccount() ? this.parseGoodsData(e) : this.bindZanAccount() : (wx.showToast({
                    title: "加载中",
                    mask: !0,
                    icon: "loading"
                }), d.checkNewUser(function(i) {
                    wx.hideToast(), 1 == i ? a.parseGoodsData(e) : wx.showModal({
                        title: "仅限新用户参加哦",
                        cancelText: "取消",
                        content: "老朋友，去逛逛其他商品吧",
                        confirmText: "进店逛逛",
                        confirmColor: "#FF4444",
                        success: function(e) {
                            e.confirm && a.onGotoShopHomePageClick();
                        }
                    });
                }, function() {
                    wx.hideToast(), a.showZanToast("加载失败", 1e3);
                }));
            },
            fetchWeappCode: function(e) {
                var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 100, t = this;
                s.carmen({
                    api: "weapp.spotlight.weappcode/1.0.0/get",
                    method: "GET",
                    data: {
                        page: e,
                        width: i,
                        type: 1
                    },
                    success: function(e) {
                        t.setData({
                            miniCode: e
                        });
                    },
                    fail: function() {},
                    complete: function() {}
                });
            }
        }));
    }
}, [ 332 ]);