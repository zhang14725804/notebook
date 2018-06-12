var t = require("../../../util/tracker.js"), e = require("../../../util/util.js"), o = getApp();

Page({
    data: {
        loaded: !1,
        err: !0,
        comment_info: {
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
        reply_num: 0,
        new_reply: [],
        is_favorite: !1,
        favorite_num: 0,
        fun_reply: [],
        showbigImg: !1,
        imgsrc: ""
    },
    miaccountBack: function(t) {
        o.doLogin().then(function(n) {
            o.storageData.vid || "" ? (e.showLoading(), o.ssoLogin(!0, function() {
                e.hideLoading();
            })) : t();
        });
    },
    onLoad: function(t) {
        var e = this;
        wx.hideShareMenu(), o.doLogin().then(function(o) {
            e.init(), t.comment_Id && e.setData({
                query_product_id: t.comment_Id || ""
            }), e.getDelInfo();
        });
    },
    onShow: function() {
        t.push();
    },
    onUnload: function() {
        var e = this, o = getCurrentPages();
        o[o.length - 2].setData({
            is_favorite: e.data.is_favorite,
            favorite_num: e.data.favorite_num
        }), t.push();
    },
    getDelInfo: function(t) {
        var n = this;
        o.request("funcomment/detail", {
            comment_id: n.data.query_product_id
        }, function(t, o) {
            if (o) return e.showError("服务异常请稍后再试,或下载小米商城APP"), void n.setData({
                err: !0
            });
            var i = t.data, a = i.goods_info.goods_desc ? i.goods_info.goods_desc : "";
            n.setData({
                loaded: !0,
                err: !1,
                comment_info: {
                    user_name: i.comment_info.user_name || "",
                    user_avatar: i.comment_info.user_avatar || "https://account.xiaomi.com/static/img/passport/photo.jpg",
                    comment_content: i.comment_info.comment_content || "",
                    comment_images: i.comment_info.comment_images ? n.formateProductList(i.comment_info.comment_images) : ""
                },
                goods_info: {
                    goods_img: i.goods_info.goods_img || "",
                    goods_name: i.goods_info.goods_name || "",
                    goods_id: i.goods_info.goods_id || "",
                    goods_price: i.goods_info.goods_price || "",
                    goods_desc: a.replace(/<[^>]*>([^<]*)<\/[^>]*>/g, "$1") || ""
                },
                reply_num: i.reply_num,
                favorite_num: i.favorite_num || 0,
                is_favorite: i.is_favorite || !1,
                fun_reply: !n.isEmptyArr(i.fun_reply_list) && i.fun_reply_list,
                new_reply: !n.isEmptyArr(i.reply_list) && i.reply_list
            });
        });
    },
    isEmptyArr: function(t) {
        return Array.isArray(t) && 0 === t.length || Object.prototype.isPrototypeOf(t) && 0 === Object.keys(t).length;
    },
    trim: function(t) {
        return t.replace(/(^\s*)|(\s*$)/g, "");
    },
    formateProductList: function(t) {
        for (var e = [], o = 0, n = t.length; o < n; o += 3) e.push(t.slice(o, o + 3));
        return e;
    },
    getLike: function(t) {
        var n = this, i = t.currentTarget.dataset.type, a = t.currentTarget.dataset.id || "", r = t.currentTarget.dataset.action;
        n.miaccountBack(function() {
            o.request("funcomment/favorite", {
                comment_id: n.data.query_product_id,
                action: r,
                reply_id: a
            }, function(o, a) {
                if (a) return e.showError(a.desc || "服务异常请稍后再试,或下载小米商城APP"), void n.setData({
                    err: !0
                });
                if ("comment" === i && n.setData({
                    favorite_num: o.data.favorite_num,
                    is_favorite: !n.data.is_favorite
                }), "new_reply" === i) {
                    var r = parseInt(t.currentTarget.dataset.index), s = n.data.new_reply;
                    s[r].favorite_num = o.data.favorite_num, s[r].is_favorite = !s[r].is_favorite, n.setData({
                        new_reply: s
                    });
                }
                if ("fun_reply" === i) {
                    var d = parseInt(t.currentTarget.dataset.index), _ = n.data.fun_reply;
                    _[d].favorite_num = o.data.favorite_num, _[d].is_favorite = !_[d].is_favorite, n.setData({
                        fun_reply: _
                    });
                }
            });
        });
    },
    init: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    sysInfo: e
                });
            }
        });
    },
    toItemPage: function(t) {
        wx.redirectTo({
            url: "/pages/product/index?id=" + t.currentTarget.dataset.gid
        });
    },
    showBigImg: function(t) {
        this.setData({
            showbigImg: !0,
            imgsrc: t.currentTarget.dataset.src
        });
    },
    closeModal: function() {
        this.setData({
            showbigImg: !1
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "这条评论有点意思",
            path: "/pages/everydayComment/index?comment_id=" + this.data.query_product_id,
            imageUrl: "",
            success: function(t) {}
        };
    },
    imgload: function(t) {
        var e = this.data.sysInfo.windowWidth / 1080;
        t.detail.width, t.detail.height;
    }
});