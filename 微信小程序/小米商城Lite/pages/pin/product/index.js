function t(t, o, e) {
    return o in t ? Object.defineProperty(t, o, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[o] = e, t;
}

var o = require("../../../util/conf.js"), e = require("../../../util/util.js"), a = require("../../../util/tracker.js"), r = require("../common/index.js"), i = require("../wxParse/wxParse.js"), n = getApp();

Page({
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
        showShareImg: !1
    },
    timerArr: [],
    updateGroupListTimer: null,
    sharePicInfo: null,
    onLoad: function(t) {
        var o = this;
        if (t.fromshare && o.setData({
            fromshare: 1
        }), t.scene) {
            var e = decodeURIComponent(t.scene).split(";");
            o.setData({
                projectId: e[0] || "",
                groupId: e[1] || "",
                getDetail: !!e[1]
            });
        } else o.setData({
            projectId: t.p || "",
            groupId: t.g || "",
            getDetail: !!t.g
        });
    },
    onShow: function() {
        var t = this;
        a.push({
            analyse: "tap",
            extra: {
                project_id: t.data.projectId
            }
        }), t.init(), t.getShareData();
    },
    onUnload: function() {
        this.clearTimer();
    },
    onHide: function() {
        this.clearTimer();
    },
    init: function() {
        var t = this, o = n.storageData.userId || 0;
        n.request("groupon/projectinfo", {
            project_id: t.data.projectId,
            userId: o
        }, function(o, a) {
            function i() {
                t.formatDetail(o.data.project_detail), t.setData({
                    projectConfig: o.data.project_config,
                    defaultGoodsId: o.data.project_detail.default_goods,
                    goodsStock: o.data.project_config.project_goods
                }), t.formatGoodsStock(), t.toggleTabs(), t.data.getDetail ? t.getGroupDetail() : (t.setData({
                    loaded: !0
                }), t.getGroupList());
            }
            if (a) return 10011003 == a.code ? void wx.switchTab({
                url: "/pages/index/index"
            }) : void e.showError("服务异常请稍后再试,或下载小米商城APP");
            r.book({
                action: "query"
            }).then(function(o) {
                t.setData({
                    bookInfo: o,
                    bookAction: 1 == o.status ? "unsub" : "sub"
                }), i();
            }).catch(function(t) {
                i();
            });
        });
    },
    formatDetail: function(t) {
        var o = this, e = [], a = "", r = [];
        t && (t.gallery_view && t.gallery_view.length ? e = t.gallery_view : t.project_view.img_url && e.push(t.project_view.img_url), 
        t.project_view && (a = {
            title: t.project_view.title,
            price: t.project_view.price,
            tips: t.project_view.short_tips,
            desc: o.filterHtml(t.project_view.project_desc),
            extDesc: t.project_view.project_desc_ext.replace(/<[^>]+>/g, ""),
            tipsMore: t.project_view.tips,
            imgUrl: t.project_view.img_url,
            coupon_tips: i.wxParse("coupon_tips", "html", t.project_view.coupon_tips, o, 5),
            coupon_short_tips: i.wxParse("coupon_short_tips", "html", t.project_view.coupon_short_tips, o, 5)
        }), t.comment_view && t.comment_view.length && (r = t.comment_view[0], t.comment_view.forEach(function(o) {
            o.goods_id === t.default_goods && (r = o);
        })), o.setData({
            galleryView: e,
            productInfo: a,
            goodsList: t.goods_list,
            productContent: t.desc_tabs_view,
            productComment: t.comment_view,
            curComment: r,
            adInfo: t.ad_info,
            detailAdInfo: t.detail_ad_info
        }), r && r.product_id && o.data.getDetail && o.getRecommend(r.product_id));
    },
    formatGoodsStock: function() {
        var t = this, o = t.data.goodsList, e = t.data.goodsStock, a = null, r = t.data.defaultGoodsId;
        if (o.length && e.length) {
            if (o.forEach(function(t) {
                e.forEach(function(o) {
                    t.goods_id == o.goods_id && (t.stock = o.has_stock);
                }), t.goods_id === r ? (a = t, t.on = !0) : t.on = !1;
            }), !a) for (var i = 0; i < o.length; i += 1) if (o[i].stock) {
                (a = o[i]).on = !0;
                break;
            }
            a || ((a = o[0]).on = !0), a.save_price = (a.market_price - 0 - a.group_price).toFixed(2), 
            t.setData({
                goodsList: o,
                defaultGoodsInfo: a,
                showMarketPrice: parseFloat(a.group_price) < parseFloat(a.market_price)
            });
        }
    },
    getGroupList: function() {
        var t = this;
        n.request("groupon/projectstatus", {
            project_id: t.data.projectId
        }, function(o, e) {
            e || (o.data.group_list && o.data.group_list.length ? (t.setData({
                serverTime: o.data.service_time
            }), t.formatGroupList(o.data.group_list)) : t.setData({
                groupList: []
            }));
        });
    },
    formatGroupList: function(t) {
        var o = this, e = [], a = [], i = 0, n = o.data.serverTime || new Date().getTime() / 1e3;
        t.forEach(function(t) {
            t.group_expire_time > n && a.length < 3 && (a.push(t), i = a.length - 1, o.timerArr[i] = r.countdown(), 
            o.timerArr[i].index = i, o.timerArr[i].init(t.group_expire_time, n, function(t, a) {
                e[a] = t, o.setData({
                    groupListCd: e
                });
            }, function() {
                o.clearTimer(), o.getGroupList();
            }));
        }), o.setData({
            groupList: a
        }), a.length && (o.updateGroupListTimer = setTimeout(function() {
            o.clearTimer(), o.getGroupList();
        }, o.data.updateGroupListSpeed));
    },
    getGroupDetail: function() {
        var t = this;
        n.request("groupon/groupinfo", {
            project_id: t.data.projectId,
            group_id: t.data.groupId,
            from: "group"
        }, function(o, a) {
            if (!a) {
                var n = o.data, s = t.data.playerList;
                s.length = n.project_config.person_num, n.group_detail.player_info.length && n.group_detail.player_info.forEach(function(t, o) {
                    s[o] = t;
                });
                var d = "";
                2 === n.group_detail.group_status && (d = e.formatTime(n.group_detail.group_finish_time), 
                2 === n.project_view.project_type && n.group_detail.group_expire_time > n.service_time && (t.timerArr[0] = r.countdown(), 
                t.timerArr[0].init(n.group_detail.group_expire_time, n.service_time, function(o) {
                    t.setData({
                        groupCdStr: o
                    });
                }, function() {
                    t.clearTimer(), t.setData({
                        groupCdStr: ""
                    });
                })));
                var u = void 0;
                n && n.project_config && n.project_config.project_goods && n.project_config.project_goods.length && n.project_config.project_goods.forEach(function(o) {
                    o.goods_id == t.data.defaultGoodsId && (u = o.has_stock);
                }), 1 != t.data.projectConfig.project_status && (u = !1), t.setData({
                    loaded: !0,
                    isGroupDetail: !0,
                    joined: !!n.group_detail.joined,
                    playerList: s,
                    needLens: s.length - n.group_detail.player_info.length,
                    groupStatus: n.group_detail.group_status,
                    groupExpireTime: e.formatTime(n.group_detail.group_expire_time),
                    groupFinishTime: d,
                    share_tips: n.group_detail.share_tips,
                    defaultHasStock: u,
                    productImg: n.project_view.img_url,
                    projectType: n.project_view.project_type,
                    coupon_short_tips: i.wxParse("coupon_short_tips_group", "html", n.project_view.coupon_short_tips, t, 5),
                    coupon_tips_group: i.wxParse("coupon_tips_group", "html", n.project_view.coupon_tips, t, 5)
                }), (1 === n.group_detail.group_status && t.data.needLens <= 0 || 1 !== n.group_detail.group_status) && t.setData({
                    showProductContent: !1
                }), 1 === n.group_detail.group_status && (t.timerArr[0] = r.countdown(), t.timerArr[0].init(n.group_detail.group_expire_time, n.service_time, function(o) {
                    t.setData({
                        groupCdStr: o
                    });
                }, function() {
                    t.clearTimer(), t.getGroupDetail();
                }));
            }
        });
    },
    getRecommend: function(t) {
        var o = this;
        n.request("recommend/product", {
            product_id: t
        }, function(t, e) {
            if (!e) {
                var a = t.data;
                for (var r in a) a[r].img_map || (a[r].img_map = {}), a[r].img_url = a[r].img_map.img_1_1[0] || a[r].img_url;
                o.setData({
                    recList: a
                });
            }
        }, !1, !0);
    },
    getShareData: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], o = this, a = {
            project_id: o.data.projectId,
            group_id: o.data.groupId
        }, r = {
            need_merge: !0
        };
        t && (Object.assign(a, r), e.showLoading()), n.request("groupon/shareinfo", a, function(a, r) {
            if (e.hideLoading(), !r) {
                o.sharePicInfo = a.data;
                var i = !!a.data.merge_share_img && t, n = void 0;
                n = !!t && !a.data.merge_share_img, o.setData({
                    shareData: {
                        title: a.data.title,
                        path: a.data.path_url,
                        imageUrl: a.data.share_img || a.data.img_url,
                        pyqImageUrl: a.data.merge_share_img
                    },
                    showShareIcons: i,
                    showPyShare: n
                });
            }
        });
    },
    onShareAppMessage: function() {
        var t = this;
        return a.push({
            logCode: "wx#bid=3193118." + t.data.projectId + "&page=pinproduct",
            analyse: "tap",
            extra: {
                type: "product_share",
                project_id: t.data.projectId
            }
        }), t.data.shareData ? t.data.shareData : {
            title: t.data.productInfo.title,
            path: "/pages/pin/product/index?fromshare=1&p=" + t.data.projectId
        };
    },
    viewImage: function(t) {
        var o = t.currentTarget.dataset, a = o.current, r = o.urls;
        wx.previewImage({
            current: e.formatUrl(a),
            urls: r.map(e.formatUrl)
        });
    },
    filterHtml: function(t) {
        if (t) return t.replace(/<[^]*<\/[^>]+>/g, "");
    },
    disableBubble: function() {},
    toggleTabs: function(t) {
        var o = this, e = t ? t.currentTarget.dataset.index : 0, a = o.data.productContent;
        a.forEach(function(t, o) {
            t.showMax = 2, o === e ? (t.show = !0, t.showMax || (t.showMax = 2)) : t.show = !1;
        }), o.setData({
            productContent: a
        });
    },
    showAllContent: function() {
        var t = this, o = t.data.productContent;
        o.forEach(function(t) {
            t.show && (t.showMax = t.tab_content.length);
        }), t.setData({
            productContent: o
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
        var o = this, e = t.currentTarget.dataset.selectType, a = t.detail, r = "", i = t.currentTarget.dataset.mode || "sponsor", s = t.currentTarget && t.currentTarget.dataset ? t.currentTarget.dataset.g : "";
        if (a && (r = a.formId), o.setData({
            mode: i,
            groupId: s || o.data.groupId
        }), r && n.request("rebate/reportFormId", {
            form_id: r,
            origin: "pin"
        }, function(t, o) {}), !(o.data.goodsList.length <= 1 && "buy" != e || o.data.joined)) {
            var d = function() {
                1 !== o.data.goodsList.length && ("participator" !== i || 1 !== o.data.goodsList.length) ? o.data.versionShow ? o.setData({
                    versionShow: !1
                }) : o.setData({
                    versionShow: !0
                }) : o.tapSubmit();
            };
            o.data.projectConfig.limit_new && "participator" === i ? n.doLogin().then(function(t) {
                o.getIsNew().then(function(t) {
                    t.new_user ? d() : wx.showModal({
                        title: "这个商品仅限新用户参团哦",
                        content: "你是小米老朋友了，可以去开个团哦",
                        confirmText: "我要开团",
                        confirmColor: "#ff4a00",
                        success: function(t) {
                            t.confirm && wx.redirectTo({
                                url: "/pages/pin/product/index?p=" + o.data.projectId
                            });
                        }
                    });
                });
            }) : d();
        }
    },
    tapSelectGoods: function(t) {
        for (var o = this, e = t.currentTarget.dataset.gid, a = (t.currentTarget.dataset.stock, 
        o.data.goodsList), r = {}, i = {}, n = 0; n < a.length; n += 1) a[n].goods_id === e ? (a[n].on = !0, 
        (r = a[n]).save_price = (a[n].market_price - 0 - a[n].group_price).toFixed(2)) : a[n].on = !1;
        o.data.productComment.forEach(function(t) {
            t.goods_id === e && (i = t);
        }), o.setData({
            goodsList: a,
            defaultGoodsInfo: r,
            curComment: i
        });
    },
    tapSubmit: function(t) {
        var o = this, e = t && t.detail ? t.detail.formId : "", a = "";
        a = o.data.groupId ? "../checkout/index?pid=" + o.data.projectId + "&groupId=" + o.data.groupId + "&goodsNum=" + o.data.buyNum + "&mode=" + o.data.mode + "&gid=" + o.data.defaultGoodsInfo.goods_id : "../checkout/index?pid=" + o.data.projectId + "&gid=" + o.data.defaultGoodsInfo.goods_id + "&goodsNum=" + o.data.buyNum + "&mode=" + o.data.mode, 
        e && n.request("rebate/reportFormId", {
            form_id: e,
            origin: "pin"
        }, function(t, o) {}), o.setData({
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
        var o = this;
        "sub" === t.currentTarget.dataset.type ? o.data.buyNum > 1 && o.setData({
            buyNum: o.data.buyNum -= 1
        }) : o.data.buyNum < o.data.projectConfig.product_max && o.setData({
            buyNum: o.data.buyNum += 1
        });
    },
    getIsNew: function() {
        return new Promise(function(t, o) {
            n.request("groupon/userstatus", {}, function(o, a) {
                a ? e.showError("服务异常请稍后再试,或下载小米商城APP") : t(o.data);
            });
        });
    },
    goProductPage: function() {
        wx.navigateTo({
            url: "/pages/product/index?id=" + this.data.defaultGoodsInfo.goods_id
        });
    },
    closeModal: function(o) {
        var e = o.currentTarget.dataset.type;
        this.setData(t({}, e, !1));
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
                var o = t.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: o,
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
        this.getShareData(!0);
    },
    bindTapAd: function(t) {
        var o = t.currentTarget.dataset.item;
        a.push({
            logCode: "wx#bid=3193118.0&page=pinproduct",
            analyse: "tap"
        }), r.bannerGo(o.action);
    },
    toggleBook: function(t) {
        var o = this, e = (this.data.hasBooked, {
            bookInfo: this.data.bookInfo,
            action: this.data.bookAction
        });
        r.toggleBook(e).then(function(t) {
            t && (wx.showToast({
                title: "sub" == t.action ? "已开启订阅" : "已关闭订阅",
                icon: "none",
                duration: 2e3
            }), o.setData({
                bookInfo: t.bookInfo,
                bookAction: "sub" == t.action ? "unsub" : "sub"
            }));
        });
    }
});