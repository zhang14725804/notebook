function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = require("../../util/util.js"), e = require("../../util/tracker.js"), i = require("../../util/conf.js"), o = getApp();

Page({
    data: {
        loaded: !1,
        PageNum: 2,
        dataList: [],
        more: !0,
        productList: [],
        getAward: !1,
        player_more: !1,
        playerList: [ "", "", "", "", "", "", "", "", "", "" ],
        history: !1,
        unhistory: !1,
        isbindmiaccount: !1
    },
    onLoad: function(t) {
        var a = this;
        t.scene ? a.setData({
            report_id: t.scene || ""
        }) : a.setData({
            report_id: t.report_id || ""
        });
    },
    onShow: function() {
        var t = this;
        e.push(), o.doLogin().then(function(a) {
            t.init();
        });
    },
    commoncallBack: function(t, e, i) {
        o.request(t, e, function(t, e) {
            a.hideLoading(), e ? a.showError("服务异常请稍后再试,或下载小米商城APP") : (wx.stopPullDownRefresh(), 
            i(t, e));
        });
    },
    getbaseInfo: function(t) {
        var a = this, e = [ "", "", "", "", "", "", "", "", "", "" ], i = o.storageData.vid || "";
        a.commoncallBack("immifans/reportInfo", t, function(t, o) {
            a.setData({
                loaded: !0,
                PageNum: 2,
                userinfo: {
                    username: t.data.user_info.user_name,
                    content: t.data.user_info.content.split("\n")
                },
                report_id: t.data.report_id,
                productList: a.formateProductList(t.data.product_list),
                support_info: {
                    title: t.data.support_info.title,
                    des: t.data.support_info.desc,
                    coupon_product: {
                        image: t.data.support_info.coupon_product.image
                    }
                },
                playerList: a.replaceArr(e, t.data.support_info.support_list),
                supportList: a.replaceArr(e, t.data.support_info.support_list),
                history: t.data.support_info.total_support > 10,
                unhistory: !1,
                action: {
                    desc: t.data.action.desc,
                    type: t.data.action.type
                },
                available_score: t.data.available_score
            }), t.data.product_list.length < 20 ? a.setData({
                more: !1
            }) : a.setData({
                more: "more" === t.data.product_list[19].ext
            }), "report" !== t.data.action.type && i ? a.setData({
                isbindmiaccount: !1
            }) : a.setData({
                isbindmiaccount: !0
            }), a.commoncallBack("immifans/shareInfo", {
                report_id: a.data.report_id
            }, function(t, e) {
                a.setData({
                    shareData: {
                        title: t.data.title,
                        path: t.data.path_url,
                        imageUrl: t.data.share_img,
                        merge_share_url: t.data.merge_share_url || "https://i8.mifile.cn/webfile/h5/weixin/0328/mifans_show_share_1.jpg"
                    }
                });
            });
        });
    },
    viewmore: function() {
        var t = this, i = t.data.productList, o = t.data.more;
        a.showLoading(), e.push({
            logCode: "wx#bid=3197391.6&page=mifans",
            analyse: "tap"
        }), t.commoncallBack("immifans/productList", {
            report_id: t.data.report_id,
            page: t.data.PageNum
        }, function(e, n) {
            a.hideLoading(), 0 != e.data.length ? (i = t.data.productList.length ? i.concat(t.formateProductList(e.data)) : t.formateProductList(e.data), 
            o = !(e.data.length < 20) && "more" === e.data[19].ext, t.setData({
                PageNum: t.data.PageNum + 1,
                more: o,
                productList: i
            })) : t.setData({
                more: !1
            });
        });
    },
    saveFile: function() {
        var t = this, n = "client_id=" + i.client_id;
        n += ";channel_id=" + i.channel_id, n += ";serviceToken=" + encodeURIComponent(o.storageData.serviceToken), 
        n += ";xm_open_id=" + o.storageData.xm_open_id, a.showLoading(), e.push({
            logCode: "wx#bid=3197391.5&page=mifans",
            analyse: "tap"
        }), wx.downloadFile({
            url: t.data.shareData.merge_share_url,
            header: {
                cookie: n
            },
            success: function(e) {
                var i = e.tempFilePath;
                a.hideLoading(), wx.saveImageToPhotosAlbum({
                    filePath: i,
                    success: function(a) {
                        wx.showToast({
                            title: "保存成功",
                            icon: "success",
                            duration: 1e3
                        }), t.setData({
                            showShareImg: !1
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "保存失败",
                            icon: "none",
                            duration: 1e3
                        });
                    }
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "保存失败",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    supportsList: function() {
        var t = this, a = [];
        t.commoncallBack("immifans/supportList", {
            report_id: t.data.report_id
        }, function(e, i) {
            t.setData({
                playerList: t.replaceArr(a, e.data),
                history: !1,
                unhistory: !0
            });
        });
    },
    replaceArr: function(t, a) {
        for (var e = 0; e < a.length; e++) t[e] = a[e].user_avatar;
        return t;
    },
    formateProductList: function(t) {
        for (var a = [], e = 0, i = t.length; e < i; e += 5) a.push(t.slice(e, e + 5));
        return a;
    },
    closeModal: function(a) {
        var e = this, i = a.currentTarget.dataset.type;
        e.setData(t({}, i, !1)), "showPrizeInfo" === i && e.getbaseInfo({
            report_id: e.data.report_id
        });
    },
    init: function() {
        var t = this, a = "";
        t.data.report_id && (a = {
            report_id: t.data.report_id
        }), t.getbaseInfo(a);
    },
    share: function() {
        var t = this;
        e.push({
            logCode: "wx#bid=3197391.1&page=mifans",
            analyse: "tap"
        }), t.setData({
            showShareImg: !0
        });
    },
    goBindLogin: function() {
        var t = this;
        a.showLoading(), o.ssoLogin(!0, function() {
            a.hideLoading(), t.setData({
                isbindmiaccount: !1
            });
        }), o.ssoLogin(!1, function() {
            a.hideLoading(), t.setData({
                isbindmiaccount: t.data.isbindmiaccount
            });
        });
    },
    miaccountBack: function(t) {
        o.doLogin().then(function(e) {
            o.storageData.vid || "" ? (a.showLoading(), o.ssoLogin(!0, function() {
                a.hideLoading();
            })) : t();
        });
    },
    lottery: function() {
        var t = this;
        a.showLoading(), e.push({
            logCode: "wx#bid=3197391.3&page=mifans",
            analyse: "tap"
        }), t.miaccountBack(function() {
            o.request("immifans/lottery", {}, function(e, i) {
                a.hideLoading(), !i && e.data && e.data.prize_info && e.data.prize_info.prize_name ? t.setData({
                    getAward: !0,
                    showPrizeInfo: !0,
                    prize_name: e.data.prize_info.prize_name
                }) : t.setData({
                    getAward: !1,
                    showPrizeInfo: !0
                });
            });
        });
    },
    unsupportsList: function() {
        this.setData({
            playerList: this.data.supportList,
            history: !0,
            unhistory: !1
        });
    },
    report: function() {
        e.push({
            logCode: "wx#bid=3197391.2&page=mifans",
            analyse: "tap"
        }), wx.redirectTo({
            url: "index"
        });
    },
    onShareAppMessage: function() {
        var t = this;
        if (e.push({
            logCode: "wx#bid=3197391.4&page=mifans",
            analyse: "tap"
        }), t.data.shareData) return t.data.shareData;
        t.data.report_id;
    }
});