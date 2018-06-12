var a = require("../../netdisk_utils/shareGroupOper.js"), t = require("../../netdisk_utils/validation.js"), e = getApp(), i = wx.ENV, r = i.bgForwardName, n = i.staticName, o = i.version;

Page({
    data: {
        dialogData: {}
    },
    state: {
        isClear: !1
    },
    onLoad: function() {
        var t = this, i = e.globalData.systemInfo.platform, r = e.globalData.userWxInfo.nickName;
        a.shareGroupOper.createNewDir(e, this, r).then(function(a) {
            if (wx.hideLoading(), 0 == +a.data.errno) {
                var e = a.data.fs_id, r = a.data.path, n = {
                    fid: a.data.fs_id,
                    path: a.data.path,
                    isSharing: !0
                };
                wx.setStorageSync("newDirTemData", n);
                var o = "ios" === i ? 250 : r.length - 1;
                t.setData({
                    dialogData: {
                        fid: e,
                        errorText: null,
                        showErrorText: !1,
                        value: r.substr(1),
                        defaultText: r.substr(1),
                        inputText: null,
                        selectionEnd: o
                    }
                });
            } else wx.wetoast({
                content: "创建文件夹出错",
                duration: 3e3
            });
        });
    },
    onShow: function() {
        e.globalData.toCreateSharing = !1;
    },
    onHide: function() {},
    onShareAppMessage: function() {
        var t = this;
        return e.globalData.createSharing = !0, {
            title: "邀请您加入共享",
            path: "pages/netdisk_index/index?to=sharedir&from=creategroup&fid=" + t.data.dialogData.fid + "&uk=" + wx.getStorageSync("uk"),
            imageUrl: n + "/mini-program/images/" + r + "?v=" + o,
            success: function(i) {
                i.shareTickets ? wx.log.share.createShareToGroup.send() : wx.log.share.createShareToSingle.send(), 
                wx.removeStorageSync("newDirTemData"), a.shareGroupOper.createGroupSendWeixinCardSuccess(e, t, function(a) {
                    wx.redirectTo({
                        url: "/pages/netdisk_index/index"
                    });
                });
            },
            fail: function() {
                wx.log.share.createShareCancleSend.send(), a.shareGroupOper.createGroupCancel(e, t), 
                wx.removeStorageSync("newDirTemData"), wx.redirectTo({
                    url: "/pages/netdisk_index/index"
                });
            }
        };
    },
    bindKeyInput: function(a) {
        this.state.isClear = !1;
        var e = a.detail.value, i = t.validation.TextValidationCheck(e);
        this.setData({
            "dialogData.errorText": i,
            "dialogData.inputText": e
        });
    },
    bindKeyBlur: function(a) {
        if (!this.state.isClear || "" !== this.data.dialogData.inputText) {
            this.state.isClear = !1;
            var e = a.detail.value, i = t.validation.TextValidationCheck(e);
            this.setData({
                "dialogData.errorText": i,
                "dialogData.inputText": e
            });
        }
    },
    clearErrorText: function() {
        this.setData({
            "dialogData.showErrorText": !1
        });
    },
    handleClearInput: function() {
        this.state.isClear = !0, this.setData({
            "dialogData.inputText": "",
            "dialogData.value": "",
            "dialogData.showErrorText": !1,
            "dialogData.errorText": t.validation.TextValidationCheck("")
        });
    },
    handleInputConfirm: function() {
        var a = t.validation.TextValidationCheck(this.data.dialogData.inputText);
        "" !== a && this.setData({
            "dialogData.showErrorText": !0,
            "dialogData.errorText": a
        });
    }
});