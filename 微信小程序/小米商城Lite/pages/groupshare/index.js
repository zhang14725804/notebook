var e = getApp(), a = require("../../util/util.js");

require("../../util/base64.js").Base64;

Page({
    data: {
        loaded: !1,
        errTip: "",
        id: 0,
        group: ""
    },
    onLoad: function(t) {
        var i = this;
        i.setData({
            id: t.id
        }), wx.showShareMenu({
            withShareTicket: !0
        }), e.work = function() {
            i.data.id, e.storageData.userInfo && e.storageData.userInfo.avatarUrl;
            e.doLogin().then(function(t) {
                e.getShareInfo(function(o) {
                    o = o || {}, Object.assign(t, o), e.request("groupshare/index", t, function(e, t) {
                        t ? 10141002 == t.code ? i.setData({
                            loaded: !0,
                            errTip: "群组未激活"
                        }) : 10141004 == t.code ? i.setData({
                            loaded: !0,
                            errTip: "请在群消息中打开"
                        }) : 10141005 == t.code ? i.setData({
                            loaded: !0,
                            errTip: "操作失败，请再试一下"
                        }) : a.showError(t.desc || "数据加载失败") : i.setData({
                            loaded: !0,
                            valid: e.data.valid,
                            unvalid: e.data.unvalid,
                            group: e.data.group
                        });
                    });
                });
            });
        }, console.log("page onload", new Date().getTime()), i.init();
    },
    init: function() {
        e.work && e.scene && (console.log("page work", e.shareTicket, new Date().getTime()), 
        e.work(), e.work = null);
    },
    onShareAppMessage: function() {
        return {
            title: this.data.group.name,
            imageUrl: "http://i8.mifile.cn/b2c-mimall-media/b0f9c47c9a5fc3bba96b27dcced01c39.jpg"
        };
    }
});