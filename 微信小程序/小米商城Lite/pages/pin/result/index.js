function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var a = require("../../../util/conf.js"), t = require("../../../util/util.js"), r = require("../../../util/tracker.js"), o = require("../common/index.js"), i = (require("../wxParse/wxParse.js"), 
getApp());

Page({
    data: {
        loaded: !1,
        projectId: "",
        groupId: "",
        isSucc: 0,
        playerList: [],
        groupCdStr: "",
        groupFinishTime: "",
        groupExpireTime: "",
        orderId: "",
        tipsMoreShow: !1,
        orderStatus: 0,
        groupStatus: 0,
        isNew: !1,
        share_tips: "",
        goodsName: "",
        goodsNum: 0,
        joined: !1,
        showShareIcons: !1,
        showPyShare: !1,
        shareTip: !1,
        adInfo: []
    },
    timerArr: [],
    onLoad: function(e) {
        var a = this;
        a.setData({
            isSucc: "1" === e.res,
            projectId: e.projectId,
            groupId: e.groupId || "",
            orderId: e.orderId || "",
            mode: e.mode || ""
        }), setTimeout(a.getOrderStatus, 1e3);
    },
    initPage: function() {
        var e = this;
        wx.stopPullDownRefresh(), e.data.isSucc ? setTimeout(e.getOrderStatus, 1e3) : e.setData({
            loaded: !0
        });
    },
    onShow: function() {
        r.push();
    },
    onUnload: function() {
        this.clearTimer();
    },
    onPullDownRefresh: function() {
        var e = this.data.shareData;
        this.clearTimer(), e.pyqImageUrl = "", this.setData({
            shareData: e
        }), this.initPage();
    },
    tapSubmit: function(e) {
        var a = this, t = e.detail.formId || "";
        o.wxPay({
            orderId: a.data.orderId,
            projectId: a.data.projectId,
            groupId: a.data.groupId,
            goodsNum: a.data.goodsNum,
            mode: a.data.mode
        }), i.request("rebate/reportFormId", {
            form_id: t,
            origin: "pin"
        }, function(e, a) {});
    },
    getOrderStatus: function() {
        var e = this;
        i.request("groupon/orderdetail", {
            order_id: e.data.orderId
        }, function(a, r) {
            r ? t.showError(r.desc || "数据加载失败") : a.data ? (e.setData({
                orderStatus: a.data.status,
                orderDesc: a.data.status_long_desc,
                goodsId: a.data.goods_id,
                goodsName: a.data.goods_name || "",
                goodNum: a.data.order_num || 0,
                amount: a.data.amount || "",
                loaded: !0
            }), e.data.isSucc && (e.init(), e.getShareData(), e.getRecommend(a.data.goods_id))) : t.showError("数据加载失败");
        });
    },
    init: function() {
        var e = this;
        i.request("groupon/groupinfo", {
            project_id: e.data.projectId,
            group_id: e.data.groupId,
            from: "pay"
        }, function(a, r) {
            if (r) t.showError("服务异常请稍后再试,或下载小米商城APP"); else {
                var i = a.data, s = e.data.playerList;
                s.length = i.project_config.person_num, i.group_detail.player_info.length && i.group_detail.player_info.forEach(function(e, a) {
                    s[a] = e;
                }), 2 === i.group_detail.group_status ? e.setData({
                    groupFinishTime: t.formatTime(i.group_detail.group_finish_time)
                }) : 3 === i.group_detail.group_status && e.setData({
                    groupFinishTime: t.formatTime(i.group_detail.group_expire_time)
                }), e.setData({
                    loaded: !0,
                    playerList: s,
                    needLens: s.length - i.group_detail.player_info.length,
                    groupStatus: i.group_detail.group_status,
                    projectInfo: i.project_view,
                    groupExpireTime: t.formatTime(i.group_detail.group_expire_time),
                    isNew: i.project_config.limit_new,
                    share_tips: i.group_detail.share_tips,
                    joined: i.group_detail.joined,
                    adInfo: i.ad_info || []
                }), 1 === i.group_detail.group_status && s.length - i.group_detail.player_info.length > 0 && (e.timerArr[0] = o.countdown(), 
                e.timerArr[0].init(i.group_detail.group_expire_time, i.service_time, function(a) {
                    e.setData({
                        groupCdStr: a
                    });
                }), e.shareTipCd());
            }
        });
    },
    getRecommend: function(e) {
        var a = this;
        i.request("recommend/product", {
            product_id: e
        }, function(e, t) {
            if (!t) {
                var r = e.data;
                for (var o in r) r[o].img_map || (r[o].img_map = {}), r[o].img_url = r[o].img_map.img_1_1[0] || r[o].img_url;
                a.setData({
                    recList: r
                });
            }
        }, !1, !0);
    },
    getShareData: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], a = this;
        if (a.data.shareData && a.data.shareData.pyqImageUrl) a.setData({
            showShareIcons: !0
        }); else {
            var r = {
                project_id: a.data.projectId,
                group_id: a.data.groupId
            }, o = {
                need_merge: !0
            };
            e && (Object.assign(r, o), t.showLoading()), i.request("groupon/shareinfo", r, function(r, o) {
                if (t.hideLoading(), !o) {
                    a.sharePicInfo = r.data;
                    var i = !!r.data.merge_share_img && e, s = void 0;
                    s = !!e && !r.data.merge_share_img, a.setData({
                        shareData: {
                            title: r.data.title,
                            path: r.data.path_url,
                            imageUrl: r.data.share_img || r.data.img_url,
                            pyqImageUrl: r.data.merge_share_img,
                            success: function() {
                                a.setData({
                                    shareAgain: !0
                                });
                            }
                        },
                        showShareIcons: i,
                        showPyShare: s
                    });
                }
            });
        }
    },
    closeModal: function(a) {
        var t = a.currentTarget.dataset.type;
        this.setData(e({}, t, !1));
    },
    shareFriends: function(e) {
        var t = this, r = "client_id=" + a.client_id;
        r += ";channel_id=" + a.channel_id, r += ";serviceToken=" + encodeURIComponent(i.storageData.serviceToken), 
        r += ";xm_open_id=" + i.storageData.xm_open_id, wx.canIUse("saveImageToPhotosAlbum") && (t.setData({
            showShareIcons: !1
        }), wx.downloadFile({
            url: t.data.shareData.pyqImageUrl,
            header: {
                cookie: r
            },
            success: function(e) {
                var a = e.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: a,
                    success: function(e) {
                        wx.showToast({
                            title: "图片已保存，赶快分享吧",
                            icon: "none",
                            duration: 2e3
                        });
                    },
                    fail: function(e) {
                        wx.showToast({
                            title: "保存失败",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "保存失败",
                    icon: "loading",
                    duration: 1e3
                });
            }
        }));
    },
    share: function() {
        this.getShareData(!0), this.shareTipTimer && clearTimeout(this.shareTipTimer);
    },
    onShareAppMessage: function() {
        var e = this, a = "/pages/pin/product/index?fromshare=1";
        return r.push({
            logCode: "wx#bid=3193118." + e.data.projectId + "&page=pinresult",
            analyse: "tap",
            extra: {
                type: "result_share",
                project_id: e.data.projectId
            }
        }), e.data.shareData ? e.data.shareData : (a += "&p=" + e.data.projectId + "&g=" + e.data.groupId, 
        e.shareTipTimer && clearTimeout(e.shareTipTimer), {
            title: e.data.projectInfo.title,
            path: a
        });
    },
    tapToggleTips: function() {
        var e = this;
        e.data.tipsMoreShow ? e.setData({
            tipsMoreShow: !1
        }) : e.setData({
            tipsMoreShow: !0
        });
    },
    clearTimer: function() {
        var e = this;
        e.timerArr.length && e.timerArr.forEach(function(e) {
            e.stop(), e = null;
        }), e.shareTipTimer && clearTimeout(e.shareTipTimer);
    },
    shareTipCd: function() {
        var e = this;
        e.shareTipTimer = setTimeout(function() {
            e.toggleShareTip();
        }, 3e3), wx.canIUse("onUserCaptureScreen") && wx.onUserCaptureScreen(function(a) {
            e.shareTipTimer && clearTimeout(e.shareTipTimer), e.toggleShareTip();
        });
    },
    openShare: function() {
        var e = this;
        e.toggleShareTip(), e.share();
    },
    toggleShareTip: function() {
        this.setData({
            shareTip: !this.data.shareTip
        });
    },
    bindTapAd: function(e) {
        var a = this, t = e.currentTarget.dataset.item;
        r.push({
            logCode: t.action.log_code,
            analyse: "tap",
            extra: {
                project_id: a.data.projectId
            }
        }), o.bannerGo(t.action);
    }
});