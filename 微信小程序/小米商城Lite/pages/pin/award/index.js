function t(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var e, o = require("../../../util/conf.js"), a = require("../../../util/util.js"), i = require("../../../util/tracker.js"), r = require("../common/index.js"), d = require("../wxParse/wxParse.js"), n = getApp();

Page((e = {
    data: {
        projectId: 1,
        defaultGoodsId: "",
        groupId: "",
        galleryView: [],
        productInfo: {},
        defaultGoodsInfo: {},
        goodsList: [],
        productContent: [],
        productComment: [],
        curComment: {},
        commentsTotal: 0,
        groupList: [],
        groupListCd: [],
        goodsStock: [],
        versionShow: !1,
        playerList: [],
        projectConfig: {},
        needLens: 0,
        groupStatus: 1,
        groupFinishTime: 0,
        groupExpireTime: 0,
        updateGroupListSpeed: 6e3,
        groupCdStr: "",
        mode: "",
        buyNum: 1,
        curProductId: 0,
        isGroupDetail: !1,
        getDetail: !1,
        showMarketPrice: !0,
        recList: [],
        showProductContent: !0,
        adInfo: [],
        showShareIcons: !1,
        showShareImg: !1,
        isAddingCart: !1
    },
    timerArr: [],
    updateGroupListTimer: null,
    sharePicInfo: null,
    onLoad: function(t) {
        var e = this;
        if (t.fromshare && e.setData({
            fromshare: 1
        }), t.scene) {
            var o = decodeURIComponent(t.scene).split(";");
            e.setData({
                projectId: o[0] || "",
                groupId: o[1] || "",
                getDetail: !!o[1]
            });
        } else {
            var a = t.order_id || "";
            e.setData({
                projectId: t.p || "",
                groupId: t.g || "",
                getDetail: !!t.g,
                orderId: a
            });
        }
    },
    onShow: function() {
        var t = this;
        i.push({
            analyse: "tap",
            extra: {
                project_id: t.data.projectId
            }
        }), t.getCouponDetail();
    },
    onUnload: function() {
        this.clearTimer();
    },
    onHide: function() {
        this.clearTimer();
    },
    init: function() {
        var t = this, e = n.storageData.userId || 0;
        n.request("groupon/projectinfo", {
            project_id: t.data.projectId,
            userId: e
        }, function(e, o) {
            if (o) return 10011003 == o.code ? void wx.switchTab({
                url: "/pages/index/index"
            }) : void a.showError("服务异常请稍后再试,或下载小米商城APP");
            t.formatDetail(e.data.project_detail), t.setData({
                projectConfig: e.data.project_config,
                defaultGoodsId: e.data.project_detail.default_goods,
                goodsStock: e.data.project_config.project_goods
            }), t.formatGoodsStock(), t.toggleTabs(), t.data.getDetail ? t.getGroupDetail() : (t.setData({
                loaded: !0
            }), t.getGroupList());
        });
    },
    formatDetail: function(t) {
        var e = this, o = [], a = "", i = [];
        t && (t.gallery_view && t.gallery_view.length ? o = t.gallery_view : t.project_view.img_url && o.push(t.project_view.img_url), 
        t.project_view && (a = {
            title: t.project_view.title,
            price: t.project_view.price,
            tips: t.project_view.short_tips,
            desc: e.filterHtml(t.project_view.project_desc),
            extDesc: t.project_view.project_desc_ext.replace(/<[^>]+>/g, ""),
            tipsMore: t.project_view.tips,
            imgUrl: t.project_view.img_url,
            coupon_tips: d.wxParse("coupon_tips", "html", t.project_view.coupon_tips, e, 5),
            coupon_short_tips: d.wxParse("coupon_short_tips", "html", t.project_view.coupon_short_tips, e, 5)
        }), t.comment_view && t.comment_view.length && (i = t.comment_view[0], t.comment_view.forEach(function(e) {
            e.goods_id === t.default_goods && (i = e);
        })), t.ad_info.length && t.ad_info.forEach(function(t) {
            if ("product" === t.action.type) t.action.path = "/pages/product/index?id=" + t.action.path; else if ("cate" === t.action.type) t.action.path = "/pages/cate/list/index?cate_id=" + t.action.path; else if ("url" === t.action.type) {
                var e = [ "/pages/index/index", "/pages/cate/index", "/pages/discovery/index" ];
                t.action.isTabBar = e.includes(t.action.path);
            }
        }), t.detail_ad_info && t.detail_ad_info.length && t.detail_ad_info.forEach(function(t) {
            if ("product" === t.action.type) t.action.path = "/pages/product/index?id=" + t.action.path; else if ("cate" === t.action.type) t.action.path = "/pages/cate/list/index?cate_id=" + t.action.path; else if ("url" === t.action.type) {
                var e = [ "/pages/index/index", "/pages/cate/index", "/pages/discovery/index" ];
                t.action.isTabBar = e.includes(t.action.path);
            }
        }), e.setData({
            galleryView: o,
            productInfo: a,
            goodsList: t.goods_list,
            productContent: t.desc_tabs_view,
            productComment: t.comment_view,
            curComment: i,
            adInfo: t.ad_info,
            detailAdInfo: t.detail_ad_info
        }), i && i.product_id && e.data.getDetail && e.getRecommend(i.product_id));
    },
    formatGoodsStock: function() {
        var t = this, e = t.data.goodsList, o = t.data.goodsStock, a = null, i = t.data.defaultGoodsId;
        if (console.log(i), e.length && o.length) {
            if (e.forEach(function(t) {
                o.forEach(function(e) {
                    t.goods_id == e.goods_id && (t.stock = e.has_stock);
                }), t.goods_id === i ? (a = t, t.on = !0) : t.on = !1;
            }), !a) for (var r = 0; r < e.length; r += 1) if (e[r].stock) {
                (a = e[r]).on = !0;
                break;
            }
            a || ((a = e[0]).on = !0), a.save_price = (a.market_price - 0 - a.group_price).toFixed(2), 
            t.setData({
                goodsList: e,
                defaultGoodsInfo: a,
                showMarketPrice: parseFloat(a.group_price) < parseFloat(a.market_price)
            });
        }
    },
    getGroupList: function() {
        var t = this;
        n.request("groupon/projectstatus", {
            project_id: t.data.projectId
        }, function(e, o) {
            o || (e.data.group_list && e.data.group_list.length ? (t.setData({
                serverTime: e.data.service_time
            }), t.formatGroupList(e.data.group_list)) : t.setData({
                groupList: []
            }));
        });
    },
    formatGroupList: function(t) {
        var e = this, o = [], a = [], i = 0, d = e.data.serverTime || new Date().getTime() / 1e3;
        t.forEach(function(t) {
            t.group_expire_time > d && a.length < 3 && (a.push(t), i = a.length - 1, e.timerArr[i] = r.countdown(), 
            e.timerArr[i].index = i, e.timerArr[i].init(t.group_expire_time, d, function(t, a) {
                o[a] = t, e.setData({
                    groupListCd: o
                });
            }, function() {
                e.clearTimer(), e.getGroupList();
            }));
        }), e.setData({
            groupList: a
        }), a.length && (e.updateGroupListTimer = setTimeout(function() {
            e.clearTimer(), e.getGroupList();
        }, e.data.updateGroupListSpeed));
    },
    getGroupDetail: function() {
        var t = this;
        n.request("groupon/groupinfo", {
            project_id: t.data.projectId,
            group_id: t.data.groupId,
            from: "group"
        }, function(e, o) {
            if (!o) {
                var i = e.data, n = t.data.playerList;
                n.length = i.project_config.person_num, i.group_detail.player_info.length && i.group_detail.player_info.forEach(function(t, e) {
                    n[e] = t;
                });
                var s = "";
                2 === i.group_detail.group_status && (s = a.formatTime(i.group_detail.group_finish_time));
                var c = void 0;
                i && i.project_config && i.project_config.project_goods && i.project_config.project_goods.length && i.project_config.project_goods.forEach(function(e) {
                    e.goods_id == t.data.defaultGoodsId && (c = e.has_stock);
                }), 1 != t.data.projectConfig.project_status && (c = !1), console.log("defaultHasStock: " + c), 
                t.setData({
                    loaded: !0,
                    isGroupDetail: !0,
                    joined: !!i.group_detail.joined,
                    playerList: n,
                    needLens: n.length - i.group_detail.player_info.length,
                    groupStatus: i.group_detail.group_status,
                    groupExpireTime: a.formatTime(i.group_detail.group_expire_time),
                    groupFinishTime: s,
                    share_tips: i.group_detail.share_tips,
                    defaultHasStock: c,
                    productImg: i.project_view.img_url,
                    coupon_short_tips: d.wxParse("coupon_short_tips_group", "html", i.project_view.coupon_short_tips, t, 5),
                    coupon_tips_group: d.wxParse("coupon_tips_group", "html", i.project_view.coupon_tips, t, 5)
                }), console.log(t.data.productImg), (1 === i.group_detail.group_status && t.data.needLens <= 0 || 1 !== i.group_detail.group_status) && t.setData({
                    showProductContent: !1
                }), 1 === i.group_detail.group_status && (t.timerArr[0] = r.countdown(), t.timerArr[0].init(i.group_detail.group_expire_time, i.service_time, function(e) {
                    t.setData({
                        groupCdStr: e
                    });
                }, function() {
                    t.clearTimer(), selt.getGroupDetail();
                }));
            }
        });
    },
    getRecommend: function(t) {
        var e = this;
        n.request("recommend/product", {
            product_id: t
        }, function(t, o) {
            if (!o) {
                var a = t.data;
                for (var i in a) a[i].img_map || (a[i].img_map = {}), a[i].img_url = a[i].img_map.img_1_1[0] || a[i].img_url;
                e.setData({
                    recList: a
                });
            }
        }, !1, !0);
    },
    getShareData: function() {
        var t = this;
        n.request("groupon/shareinfo", {
            project_id: t.data.projectId,
            group_id: t.data.groupId
        }, function(e, o) {
            o || (t.sharePicInfo = e.data, t.setData({
                shareData: {
                    title: e.data.title,
                    path: e.data.path_url,
                    imageUrl: e.data.share_img || e.data.img_url,
                    pyqImageUrl: e.data.merge_share_img,
                    success: function(e) {
                        i.push({
                            logCode: "wx#bid=3193118." + t.data.projectId + "&page=pinawark",
                            analyse: "tap",
                            extra: {
                                type: "award_share",
                                project_id: t.data.projectId
                            }
                        });
                    }
                }
            }));
        });
    },
    onShareAppMessage: function() {
        var t = this;
        return t.data.shareData ? t.data.shareData : {
            title: t.data.productInfo.title,
            path: "/pages/pin/product/index?fromshare=1&p=" + t.data.projectId,
            success: function(e) {
                i.push({
                    logCode: "wx#bid=3193118." + t.data.projectId + "&page=pinawark",
                    analyse: "tap",
                    extra: {
                        type: "award_share",
                        project_id: t.data.projectId
                    }
                });
            }
        };
    },
    viewImage: function(t) {
        var e = t.currentTarget.dataset, o = e.current, i = e.urls;
        wx.previewImage({
            current: a.formatUrl(o),
            urls: i.map(a.formatUrl)
        });
    },
    filterHtml: function(t) {
        if (t) return t.replace(/<[^]*<\/[^>]+>/g, "");
    },
    disableBubble: function() {},
    toggleTabs: function(t) {
        var e = this, o = t ? t.currentTarget.dataset.index : 0, a = e.data.productContent;
        a.forEach(function(t, e) {
            t.show = e === o;
        }), e.setData({
            productContent: a
        });
    },
    tapToggleTips: function() {
        var t = this;
        t.data.tipsMoreShow ? t.setData({
            tipsMoreShow: !1
        }) : t.setData({
            tipsMoreShow: !0
        });
    },
    tapToggleVersion: function(t) {
        var e = this, o = t.currentTarget.dataset.selectType, a = t.detail, i = "", r = "sponsor", d = t.currentTarget && t.currentTarget.dataset ? t.currentTarget.dataset.g : "";
        if (!(e.data.goodsList.length <= 1 && "buy" != o || (a && (i = a.formId, r = a.value && a.value.mode ? a.value.mode : "sponsor"), 
        e.setData({
            mode: r,
            groupId: d || e.data.groupId
        }), i && n.request("rebate/reportFormId", {
            form_id: i,
            origin: "pin"
        }, function(t, e) {}), e.data.joined))) {
            var s = function() {
                1 !== e.data.goodsList.length && ("participator" !== r || 1 !== e.data.goodsList.length) ? e.data.versionShow ? e.setData({
                    versionShow: !1
                }) : e.setData({
                    versionShow: !0
                }) : e.tapSubmit();
            };
            e.data.projectConfig.limit_new && "participator" === r ? n.doLogin().then(function(t) {
                e.getIsNew().then(function(t) {
                    t.new_user ? s() : wx.showModal({
                        title: "这个商品仅限新用户参团哦",
                        content: "你是小米老朋友了，可以去开个团哦",
                        confirmText: "我要开团",
                        confirmColor: "#ff4a00",
                        success: function(t) {
                            t.confirm && wx.redirectTo({
                                url: "/pages/pin/product/index?p=" + e.data.projectId
                            });
                        }
                    });
                });
            }) : s();
        }
    },
    tapSelectGoods: function(t) {
        for (var e = this, o = t.currentTarget.dataset.gid, a = (t.currentTarget.dataset.stock, 
        e.data.goodsList), i = {}, r = {}, d = 0; d < a.length; d += 1) a[d].goods_id === o ? (a[d].on = !0, 
        i = a[d]) : a[d].on = !1;
        e.data.productComment.forEach(function(t) {
            t.goods_id === o && (r = t);
        }), e.setData({
            goodsList: a,
            defaultGoodsInfo: i,
            curComment: r
        });
    },
    tapSubmit: function(t) {
        var e = this, o = t && t.detail ? t.detail.formId : "", a = "";
        a = e.data.groupId ? "../checkout/index?pid=" + e.data.projectId + "&groupId=" + e.data.groupId + "&goodsNum=" + e.data.buyNum + "&mode=" + e.data.mode + "&gid=" + e.data.defaultGoodsInfo.goods_id : "../checkout/index?pid=" + e.data.projectId + "&gid=" + e.data.defaultGoodsInfo.goods_id + "&goodsNum=" + e.data.buyNum + "&mode=" + e.data.mode, 
        o && n.request("rebate/reportFormId", {
            form_id: o,
            origin: "pin"
        }, function(t, e) {}), e.setData({
            versionShow: !1
        }), wx.navigateTo({
            url: a,
            fail: function() {
                wx.redirectTo({
                    url: a
                });
            }
        });
    },
    tapAddCart: function(t) {},
    clearTimer: function() {
        var t = this;
        t.timerArr.length && t.timerArr.forEach(function(t) {
            t.stop(), t = null;
        }), clearTimeout(t.updateGroupListTimer);
    },
    changeNum: function(t) {
        var e = this;
        "sub" === t.currentTarget.dataset.type ? e.data.buyNum > 1 && e.setData({
            buyNum: e.data.buyNum -= 1
        }) : e.data.buyNum < e.data.projectConfig.product_max && e.setData({
            buyNum: e.data.buyNum += 1
        });
    },
    getIsNew: function() {
        return new Promise(function(t, e) {
            n.request("groupon/userstatus", {}, function(e, o) {
                o ? a.showError("服务异常请稍后再试,或下载小米商城APP") : t(e.data);
            });
        });
    },
    goProductPage: function() {
        wx.navigateTo({
            url: "/pages/product/index?id=" + this.data.defaultGoodsInfo.goods_id
        });
    },
    closeModal: function(e) {
        var o = e.currentTarget.dataset.type;
        this.setData(t({}, o, !1));
    },
    shareFriends: function(t) {
        var e = this, a = "client_id=" + o.client_id;
        a += ";channel_id=" + o.channel_id, a += ";serviceToken=" + encodeURIComponent(n.storageData.serviceToken), 
        a += ";xm_open_id=" + n.storageData.xm_open_id, e.setData({
            showShareIcons: !1
        }), wx.downloadFile({
            url: e.data.shareData.pyqImageUrl,
            header: {
                cookie: a
            },
            success: function(t) {
                var e = t.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: e,
                    success: function(t) {
                        wx.showToast({
                            title: "图片已保存，赶快分享吧",
                            icon: "none",
                            duration: 2e3
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "保存失败",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "保存失败",
                    icon: "loading",
                    duration: 1e3
                });
            }
        });
    },
    share: function() {
        this.setData({
            showShareIcons: !0
        });
    },
    bindTapAd: function(t) {
        var e = t.currentTarget.dataset.item;
        i.push({
            logCode: "wx#bid=3193118.0&page=pinproduct",
            analyse: "tap"
        }), r.bannerGo(e.action);
    },
    getCouponDetail: function() {
        var t = this;
        n.request("groupon/couponDetail", {
            order_id: t.data.orderId
        }, function(e, o) {
            a.hideLoading(), o && a.showError(o.desc || "网络开小差了了~请稍后再试");
            var i = void 0, r = void 0, n = void 0, s = void 0, c = e.data;
            c && (i = c.coupon_info, r = c.project_view, n = c.recommend_goods_list, s = c.exchange_notice, 
            i.desc = d.wxParse("couponDesc", "html", i.desc, t, 5), t.setData({
                loaded: !0,
                couponInfo: i,
                drawProductInfo: r,
                recommendGoodsList: n,
                lotteryId: i.lottery_id || "",
                recommendTitleImage: c.recommend_title_image,
                exchangeNotice: s
            }));
        });
    },
    getPrize: function() {
        var t = this;
        i.push({
            logCode: "wx#bid=3193118." + t.data.projectId + "&pid=" + t.data.groupId + "&page=pinaward&type=award",
            analyse: "tap",
            extra: {
                project_id: t.data.projectId
            }
        }), n.request("groupon/exchangePrize", {
            lottery_id: t.data.lotteryId
        }, function(e, o) {
            a.hideLoading(), o && a.showError(o.desc || "网络开小差了了~请稍后再试");
            var i = e.data;
            if (i && i.result) {
                var r = t.data.couponInfo;
                r.status = 1, t.setData({
                    couponInfo: r
                }), wx.showModal({
                    title: t.data.exchangeNotice && t.data.exchangeNotice.title || "领奖成功",
                    content: t.data.exchangeNotice && t.data.exchangeNotice.desc || "",
                    confirmText: t.data.exchangeNotice && t.data.exchangeNotice.right_button && t.data.exchangeNotice.right_button.title || "我知道了",
                    cancelText: t.data.exchangeNotice && t.data.exchangeNotice.left_button && t.data.exchangeNotice.left_button.title || "查看奖品",
                    success: function(e) {
                        if (e.confirm) console.log("用户点击确定"); else if (e.cancel) {
                            var o = !1;
                            [ "/pages/index/index", "/pages/cate/index", "/pages/discovery/index", "pages/mycart/index", "pages/my/index" ].forEach(function(e) {
                                t.data.exchangeNotice && t.data.exchangeNotice.left_button && t.data.exchangeNotice.left_button.path.indexOf(e) > -1 && (o = !0);
                            }), o ? wx.switchTab({
                                url: t.data.exchangeNotice && t.data.exchangeNotice.left_button && t.data.exchangeNotice.left_button.path
                            }) : wx.navigateTo({
                                url: t.data.exchangeNotice && t.data.exchangeNotice.left_button && t.data.exchangeNotice.left_button.path
                            });
                        }
                    }
                });
            } else wx.showToast({
                title: "加入购物车失败",
                icon: "loading",
                duration: 1e3
            });
        });
    }
}, t(e, "tapAddCart", function(t) {
    var e = this, o = t.currentTarget.dataset, a = o.item, r = o.quickOrder, d = {
        analyse: "tap"
    };
    i.push({
        logCode: "wx#bid=3193118." + e.data.projectId + "&pid=" + e.data.groupId + "&page=pinaward&product_id=" + a.goods_id,
        analyse: "tap",
        extra: {
            project_id: e.data.projectId
        }
    }), "0" === r ? d.logCode = "wx#bid=3034668.1&page=product" : "1" === r && (d.logCode = "wx#bid=3034668.2&page=product"), 
    i.push(d), e.addCartRouter(a);
}), t(e, "addCartRouter", function(t) {
    var e = this;
    e.setData({
        quick_order: 0
    }), e.addCard(t);
}), t(e, "addCard", function(t) {
    var e = this;
    if (t && !e.data.isAddingCart) {
        a.showLoading(), e.setData({
            isAddingCart: !0
        });
        var o = {
            product_id: t.goods_id,
            consumption: 1,
            sku: t.product_id,
            quick_order: e.data.quick_order,
            position_id: e.data.position_id || ""
        };
        e.data.batchGoodsIDs && (o.item_id = e.data.batchGoodsIDs), n.request("cart/add", o, function(t, o) {
            if (a.hideLoading(), (e.data.isRushing || e.data.layerSellingOut) && e.setData({
                isRushing: !1,
                layerSellingOut: !1
            }), setTimeout(function() {
                e.setData({
                    isAddingCart: !1
                });
            }, 1e3), o) if (2003009 == o.code) a.showError(o.desc); else if (10001002 == o.code || 10001008 == o.code) a.showError("网络开小差了了~请稍后再试"); else {
                var i = o.desc || "网络开小差了了~请稍后再试";
                a.showError(i);
            } else wx.showToast({
                title: "成功加入购物车",
                icon: "success",
                duration: 1e3
            });
        });
    }
}), e));