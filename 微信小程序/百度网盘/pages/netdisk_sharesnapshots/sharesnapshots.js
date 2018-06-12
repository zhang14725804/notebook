var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./sharesnapshotsUtils.js")), t = require("../../netdiisk_requestapi/getFileList.js"), a = require("../../netdisk_utils/transform.js"), s = require("../../netdisk_utils/shareGroupOper.js"), i = getApp(), n = wx.ENV.staticName;

Page({
    data: {
        isMedia: !1,
        mediaType: "",
        isMediaMore: !1,
        showThumb: "",
        videoName: "",
        videoSize: "",
        serverFilename: "",
        fileListTabData: {
            list: [],
            staticName: n,
            fileCategory: wx.ENV.CONF.FILE_CATEGORY,
            isLoading: !0
        },
        currentFileItem: {},
        thumbStyle: "",
        mediaBgStyle: "",
        shareType: ""
    },
    onLoad: function(s) {
        var n = this;
        if (this.data.currentFileItem = {
            fid: s.fid,
            path: decodeURIComponent(s.path),
            serverFilename: s.serverFilename,
            share: s.share,
            uk: s.uk
        }, "true" === s.hasListData) {
            var r = i.globalData.preShareData.list, o = e.default.filterListMedia(r);
            o.imgList.length > 0 || o.videoList.length > 0 ? (this.setData({
                isMedia: !0
            }), wx.showLoading({
                title: "处理中"
            }), e.default.initSnapShots(o, this, i)) : (this.analyticsHanleList(r), this.setData({
                "fileListTabData.list": r.slice(0, 4),
                "fileListTabData.isLoading": !1
            }));
        } else {
            var l = this.data.currentFileItem.path;
            (0, t.getFileList)(l, 0, 10).then(function(t) {
                var s = t.data.list;
                t.data.list.length;
                n.data.fileListTabData.list = (0, a.dataTransform)(s);
                var r = e.default.filterListMedia(n.data.fileListTabData.list);
                r.imgList.length > 0 || r.videoList.length > 0 ? (n.setData({
                    isMedia: !0
                }), wx.showLoading({
                    title: "处理中"
                }), e.default.initSnapShots(r, n, i)) : (n.analyticsHanleList(s), n.setData({
                    "fileListTabData.list": n.data.fileListTabData.list.slice(0, 4),
                    "fileListTabData.isLoading": !1
                }));
            }, function(e) {
                console.log("server-list error: ", e);
            });
        }
        this.setData({
            serverFilename: this.data.currentFileItem.serverFilename
        });
    },
    analyticsHanleList: function(e) {
        e.length <= 0 ? (this.data.shareType = "empty", wx.log.snapshoot.snapshootempty.send()) : 1 === e.length ? (this.data.shareType = "single", 
        wx.log.snapshoot.snapshootsingle.send()) : (this.data.shareType = "more", wx.log.snapshoot.snapshootmore.send());
    },
    onShareAppMessage: function(e) {
        var t = this;
        wx.showShareMenu({
            withShareTicket: !0
        });
        var a = this;
        if ("menu" === e.from) return wx.log.normal.normalDirDetailShare.send(), {
            title: "邀请您加入网盘小程序",
            path: "pages/netdisk_index/index",
            imageUrl: n + "/mini-program/images/bg_forward.png?v=" + version
        };
        wx.log.snapshoot.snapshootclick.send(), "" !== this.data.shareType && wx.log.snapshoot["snapshootSend" + this.data.shareType].send();
        var r = a.data.currentFileItem.uk, o = a.data.currentFileItem.fid, l = a.data.currentFileItem.share;
        return {
            title: "点击加入“" + this.data.serverFilename + "”",
            path: "pages/netdisk_index/index?to=sharedir&from=sharetoweixingroup&fid=" + o + "&uk=" + r + "&mod=" + this.data.shareType,
            imageUrl: "",
            success: function(e) {
                "" !== t.data.shareType && wx.log.snapshoot["snapshootSendSuccess" + t.data.shareType].send(), 
                s.shareGroupOper.dirSendWeixinCardSuccess(i, a, {
                    isShare: l,
                    fid: o
                });
            }
        };
    },
    snapshootTouchS: function() {
        this.setData({
            snapshootBtnStyle: "opacity: 0.6;"
        });
    },
    snapshootTouchE: function() {
        this.setData({
            snapshootBtnStyle: ""
        });
    }
});