var e = getApp(), a = require("../../../util/util.js"), t = require("../../../util/page.js");

require("../../../util/base64.js").Base64;

Page({
    data: {
        info: {},
        share: {},
        loaded: !1,
        id: 0,
        share_user: 0,
        hd_id: "",
        hd_img: "",
        download_img: "",
        refer: "",
        img_width: 0,
        img_height: 0
    },
    onLoad: function(i) {
        var o = this;
        Object.assign(o, t), o.setData({
            id: i.id,
            share_user: i.share_user,
            hd_id: i.hd_id,
            refer: i.refer || ""
        }), wx.showShareMenu({
            withShareTicket: !0
        }), e.work = function() {
            o.data.id, o.data.share_user, o.data.hd_id, o.data.refer, e.storageData.userInfo && e.storageData.userInfo.avatarUrl;
            e.doLogin().then(function(t) {
                e.getShareInfo(function(i) {
                    i = i || {}, Object.assign(t, i), e.request("groupshare/share", t, function(e, t) {
                        if (t) a.showError(t.desc || "数据加载失败"); else {
                            var i = e.data.page ? e.data.page.content : {}, s = e.data.hd || {};
                            o.setData({
                                loaded: !0,
                                info: i,
                                hd_name: s.name,
                                share: i.page && i.page.share ? i.page.share : {},
                                hd_img: s.list_image
                            });
                        }
                    });
                });
            });
        }, o.init();
    },
    init: function() {
        e.work && e.scene && (console.log("page work", new Date().getTime()), e.work(), 
        e.work = null);
    },
    onShareAppMessage: function() {
        var a = this, t = "/pages/groupshare/share/index", i = e.storageData.vid || "", o = e.storageData.userId || "";
        return t += "?hd_id=" + a.data.hd_id, t += "&id=" + a.data.id, t += "&share_user=" + (o || i), 
        {
            imageUrl: a.data.hd_img,
            path: t,
            title: a.data.hd_name
        };
    },
    createImg: function() {
        var t = this;
        a.showLoading(), e.request("groupshare/qrcode", {
            hd_id: t.data.hd_id,
            id: t.data.id
        }, function(e, i) {
            a.hideLoading(), i ? a.showError("生成二维码失败") : t.setData({
                download_img: e.data.img + "?version=" + new Date().getTime()
            });
        });
    },
    closeImg: function() {
        this.setData({
            download_img: ""
        });
    },
    saveImg: function() {
        var e = this;
        "" != e.data.download_img ? (a.showLoading(), wx.downloadFile({
            url: e.data.download_img,
            type: "image",
            success: function(e) {
                a.hideLoading(), wx.saveImageToPhotosAlbum({
                    filePath: e.tempFilePath,
                    success: function() {
                        console.log("save success");
                    },
                    fail: function() {
                        console.log("save fail"), wx.getSetting({
                            success: function(e) {
                                e.authSetting["scope.writePhotosAlbum"] ? a.showError("保存图片失败") : wx.showModal({
                                    title: "温馨提示",
                                    content: "不授权无法下载图片，去授权",
                                    success: function(e) {
                                        e.confirm && wx.openSetting({
                                            success: function(e) {
                                                e.authSetting["scope.writePhotosAlbum"] && a.showError("授权成功，请重新下载");
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            },
            fail: function(e) {
                a.showError("下载图片失败");
            }
        })) : a.showError("生成图片失败");
    },
    imgAutoFill: function(e) {
        var a = e.detail.width, t = e.detail.height, i = t / a, o = 0, s = 0;
        wx.getSystemInfo({
            success: function(e) {
                var r = e.windowWidth, n = (d = e.windowHeight) / r, d = (r = 700) * n;
                i < n ? (o = r, s = r * t / a) : (s = d, o = d * a / t);
            }
        }), this.setData({
            img_width: o,
            img_height: s
        });
    }
});