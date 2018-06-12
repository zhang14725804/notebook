function t(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var e, o = require("../../util/tracker.js"), n = require("../../util/util.js"), i = getApp(), a = 0, s = "Right", r = 0, c = 0, d = 0, m = 0, u = 0;

Page({
    data: (e = {
        loaded: !1,
        list: [],
        randomNum: 0,
        comment_info: {
            comment_id: "",
            user_name: "",
            user_avatar: "",
            comment_content: "",
            comment_images: ""
        },
        goods_info: {
            goods_img: "",
            goods_name: "",
            goods_id: "",
            goods_price: "",
            goods_desc: ""
        },
        animationData: {},
        animationData2: {},
        sysInfo: "",
        screenWidth: 375,
        zIndex1: 2,
        zIndex2: 1,
        left1: 0,
        left2: 0
    }, t(e, "animationData2", {}), t(e, "animationData", {}), t(e, "favorite_num", 0), 
    t(e, "is_favorite", !1), t(e, "comment_id", ""), e),
    onLoad: function(t) {
        var e = this;
        t.comment_id && e.setData({
            report_id: t.comment_id || 0
        }), i.doLogin().then(function(t) {
            e.init(), e.getList(1, e.data.report_id), e.getList(3, 0);
        });
    },
    onShow: function() {
        o.push();
    },
    touchStart: function(t) {
        0 === u && t && t.changedTouches[0] && t.changedTouches[0].pageX && (r = t.changedTouches[0].pageX || 0);
    },
    touchMove: function() {},
    touchEnd: function(t) {
        var e = this;
        if (0 === u) {
            d++;
            t.currentTarget.dataset.id;
            t && t.changedTouches[0] && t.changedTouches[0].pageX && (c = t.changedTouches[0].pageX || 0);
            var o = c - r;
            o > 30 || o < -30 ? (s = c - r > 30 ? "Right" : "Left", u = 1, e.move(s), e.data.list.length <= 2 && e.getList(4), 
            setTimeout(function() {
                var t = e.data.list;
                t.splice(0, 1)[0].move = "", e.getCurInfo(0), e.setData({
                    list: t
                }), u = 0;
            }, 400)) : (s = "", e.getDelpage(t));
        }
    },
    getCurInfo: function(t) {
        var e = this.data.list[t];
        e && this.setData({
            cur: t,
            favorite_num: e.favorite_num || 0,
            is_favorite: e.is_favorite || !1,
            comment_id: e.comment_info.comment_id || "",
            goodsId: e.goods_info.goods_id || "",
            is_sale: e.goods_info.is_sale || !1
        });
    },
    move: function(t) {
        var e = this.data.list;
        e[0].move = t, this.setData({
            "list[0]": e[0]
        });
    },
    getDelpage: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/everydayComment/list/index?comment_Id=" + e
        });
    },
    getList: function(t, e) {
        var o = this, n = new Array(t).fill().map(function(t) {
            return o.getData(e);
        });
        Promise.all(n).then(function(t) {
            if (t) {
                var e = [];
                t.includes(null) ? (e = o.data.list, t.forEach(function(t) {
                    t && (e = e.concat(t));
                }), o.setData({
                    list: e
                })) : o.setData({
                    list: o.data.list.concat(t)
                });
            }
            0 === a && (o.getCurInfo(0), a = 1);
        });
    },
    getData: function(t) {
        var e = this;
        return new Promise(function(o, n) {
            i.request("funcomment/get", {
                comment_id: t || 0
            }, function(t, n) {
                if (n) o(null); else if (t && t.data) {
                    var i = t.data, a = [];
                    a.push(i.goods_info.goods_img);
                    var s = a.concat(i.comment_info.comment_images);
                    o({
                        move: "",
                        randomNum: Math.floor(4 * Math.random() + 1),
                        comment_info: {
                            comment_id: i.comment_info.comment_id || 0,
                            user_name: i.comment_info.user_name || "",
                            user_avatar: i.comment_info.user_avatar || "",
                            comment_content: i.comment_info.comment_content || "",
                            comment_images: s ? e.formateProductList(s) : ""
                        },
                        goods_info: {
                            goods_name: i.goods_info.goods_name || "",
                            goods_id: i.goods_info.goods_id || "",
                            goods_price: i.goods_info.goods_price || "",
                            goods_desc: i.goods_info.goods_desc || "",
                            is_sale: i.goods_info.is_sale
                        },
                        reply: null !== i.reply && i.reply.reply_content,
                        reply_name: null !== i.reply && i.reply.user_name,
                        favorite_num: 0 !== i.favorite_num && i.favorite_num,
                        is_favorite: i.is_favorite
                    }), m = 1;
                }
            });
        });
    },
    formateProductList: function(t) {
        for (var e = [], o = 0, n = t.length; o < n; o += 3) e.push(t.slice(o, o + 3));
        return e;
    },
    addCard: function(t) {
        wx.navigateTo({
            url: "/pages/product/index?id=" + t.currentTarget.dataset.id
        });
    },
    init: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    loaded: !0,
                    sysInfo: e,
                    screenWidth: e.windowWidth
                });
            }
        });
    },
    miaccountBack: function(t) {
        i.doLogin().then(function(e) {
            i.storageData.vid || "" ? (n.showLoading(), i.ssoLogin(!0, function() {
                n.hideLoading();
            })) : t();
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "这条评论有点意思",
            path: "/pages/everydayComment/index?comment_id=" + this.data.comment_id,
            imageUrl: "",
            success: function(t) {}
        };
    },
    getLike: function(t) {
        var e = this, o = t.currentTarget.dataset.id, a = t.currentTarget.dataset.action;
        e.miaccountBack(function() {
            i.request("funcomment/favorite", {
                comment_id: o,
                action: a,
                reply_id: ""
            }, function(t, o) {
                if (o) return n.showError(o.desc || "服务异常请稍后再试,或下载小米商城APP"), void e.setData({
                    err: !0
                });
                e.setData({
                    favorite_num: t.data.favorite_num,
                    is_favorite: !e.data.is_favorite
                });
            });
        });
    },
    imgload: function(t) {
        var e = this.data.sysInfo.windowWidth / 1080;
        t.detail.width, t.detail.height;
    }
});