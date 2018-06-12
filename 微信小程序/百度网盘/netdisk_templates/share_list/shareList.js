var a = require("../../netdiisk_requestapi/getShareList.js"), e = require("../../netdisk_utils/shareGroupOper.js"), t = require("../../netdisk_utils/transform.js"), r = require("../../netdisk_templates/dialog/dialog.js"), i = require("../../netdisk_utils/validation.js"), s = wx.ENV, o = s.bgForwardName, n = s.staticName, l = s.version, d = function(e, r, i, s, o) {
    var n = e.data.shareListTabData;
    e.data.shareListTabData.isLoading = !0, 0 !== i && wx.showLoading({
        title: "加载中"
    }), (0, a.getShareList)(i, s).then(function(a) {
        var r = a.data, l = (0, t.dataTransform)(r.list), d = n.list.concat(l);
        "refresh" === o && (d = l), d.forEach(function(a) {
            a.server_mtime_split = / /.test(a.server_mtime) ? a.server_mtime.split(" ")[0] : a.server_mtime;
        }), wx.hideLoading(), e.setData({
            shareListTabData: {
                isLoading: !1,
                hasMore: r.has_more,
                start: i + s,
                list: d
            }
        });
    }, function(a) {
        console.log("server-sharelist error: ", a);
    });
};

module.exports = {
    showTab: function(a, t) {
        d(a, 0, 0, 10, "refresh"), a.handleShareFileTouchS = function(e) {
            var t = e.currentTarget.dataset.index;
            a.data.shareListTabData.list[t].shareFileItemStyle = "background: #F9F9FA", a.setData({
                "shareListTabData.list": a.data.shareListTabData.list
            });
        }, a.handleShareFileTouchE = function(e) {
            var t = e.currentTarget.dataset.index;
            a.data.shareListTabData.list[t].shareFileItemStyle = "", a.setData({
                "shareListTabData.list": a.data.shareListTabData.list
            });
        }, a.handleTapCreateShareDir = function(a) {
            t.globalData.toCreateSharing || (t.globalData.toCreateSharing = !0, wx.navigateTo({
                url: "/pages/netdisk_createshare/createshare"
            }), wx.log.share.createShareBtnClick.send());
        }, a.handleTapItemMore = function(e) {
            wx.log.share.shareBtnMoreClick.send();
            var t = e.currentTarget.dataset.index, r = a.data.shareListTabData.list[t];
            a.setData({
                bottomModalData: {
                    isShow: !0,
                    tapListItem: r,
                    title: r.server_filename,
                    buttons: [ {
                        text: "添加共享成员",
                        tapFunc: "addShareMember",
                        icon: "icon-addto-member"
                    }, {
                        text: "修改共享名称",
                        tapFunc: "modifiedShareDirName",
                        icon: "icon-rename"
                    } ]
                }
            });
        }, a.addShareMember = function() {
            wx.log.share.shareBtnAddMemberClick.send();
            var e = a.data.bottomModalData.tapListItem, t = e.uk, r = e.fid, i = e.server_filename, s = e.path, o = e.share;
            a.closeBottomModal(), wx.navigateTo({
                url: "/pages/netdisk_sharesnapshots/sharesnapshots?&uk=" + t + "&fid=" + r + "&share=" + o + "&serverFilename=" + i + "&path=" + encodeURIComponent(s) + "&hasListData=false"
            });
        }, a.scrollToLower = function(e) {
            var t = a.data.shareListTabData, r = t.hasMore, i = t.isLoading, s = t.start;
            if (r && !i && 0 !== s) {
                var o = a.data.shareListTabData.start;
                d(a, 0, o, 10);
            }
        }, a.handleTapShareItem = function(e) {
            wx.log.share.visitShareDir.send();
            var r = e.currentTarget.dataset.index, i = a.data.shareListTabData.list[r];
            t.globalData.shareDirData.currentDirData = {
                isRoot: !0,
                isWeixin: i.is_wx,
                publicMeta: {
                    avator: i.avator,
                    uname: i.uname,
                    memberNum: i.group_num,
                    shareinfo: {
                        fid: i.fid,
                        tt: i.tt,
                        uk: i.uk,
                        invitor: i.invitor,
                        sign: i.sign
                    }
                },
                dirMeta: i
            }, wx.navigateTo({
                url: "/pages/netdisk_sharedir/sharedir?from=sharelist"
            });
        }, a.bindKeyInput = a.bindInputBlur = function(e) {
            var t = e.detail.value, r = i.validation.TextValidationCheck(t);
            a.setData({
                "dialogData.errorText": "legal" === r ? null : r,
                "dialogData.inputText": t
            });
        }, a.clearErrorText = function() {
            a.setData({
                "dialogData.showErrorText": !1
            });
        }, a.handleClearInput = function() {
            a.setData({
                "dialogData.inputText": "",
                "dialogData.value": "",
                "dialogData.showErrorText": !1,
                "dialogData.errorText": i.validation.TextValidationCheck("")
            });
        }, a.modifiedShareDirName = function() {
            wx.log.share.modifiedShareDirName.send(), a.closeBottomModal();
            var e = a.data.bottomModalData.title, i = a.data.shareListTabData.list.filter(function(a) {
                return a.server_filename === e;
            });
            if (!i[0] || i[0].is_owner) {
                var s = "ios" === t.globalData.systemInfo.platform ? 250 : e.length;
                r.WeDialog.dialog({
                    title: "修改共享名称",
                    value: e,
                    selectionEnd: s
                }), r.WeDialog.show();
            } else wx.wetoast({
                content: "只能管理自己上传的文件哦",
                duration: 1500
            });
        }, a.dialogCancel = function() {
            r.WeDialog.dialog(), r.WeDialog.hide();
        }, a.dialogConfirm = function() {
            if (r.WeDialog.dialog(), r.WeDialog.dialogConfirm({
                isValidation: !0
            }), a.data.dialogData.errorText) a.setData({
                "dialogData.showErrorText": !0
            }); else {
                a.setData({
                    "dialogData.isShow": !1
                });
                var i = "/" + a.data.dialogData.value, s = a.data.dialogData.inputText;
                e.shareGroupOper.renameFileName(t, a, i, s, function() {
                    d(a, 0, 0, 10, "refresh");
                });
            }
        }, a.onShareAppMessage = function(r) {
            var i = r.target, s = void 0 === i ? {} : i, h = r.currentTarget, u = void 0 === h ? {} : h, g = r.from;
            wx.showShareMenu({
                withShareTicket: !0
            });
            var c = s.dataset || u.dataset;
            return "menu" === g ? (wx.log.index.indexShare.send(), {
                title: "邀请您加入网盘小程序",
                path: "pages/netdisk_index/index",
                imageUrl: n + "/mini-program/images/bg_forward.png?v=" + l
            }) : c.buttonfrom && "createGroup" === c.buttonfrom ? (t.globalData.createSharing = !0, 
            {
                title: "邀请您加入共享",
                path: "pages/netdisk_index/index?to=sharedir&from=creategroup&fid=" + a.data.dialogData.fid + "&uk=" + wx.getStorageSync("uk"),
                imageUrl: n + "/mini-program/images/" + o + "?v=" + l,
                success: function(r) {
                    r.shareTickets ? wx.log.share.createShareToGroup.send() : wx.log.share.createShareToSingle.send(), 
                    wx.removeStorageSync("newDirTemData"), e.shareGroupOper.createGroupSendWeixinCardSuccess(t, a, function() {
                        d(a, 0, 0, 10, "refresh");
                    });
                },
                fail: function() {
                    wx.log.share.createShareCancleSend.send(), wx.removeStorageSync("newDirTemData"), 
                    e.shareGroupOper.createGroupCancel(t, a);
                }
            }) : void 0;
        };
    },
    clearTab: function(a) {
        a.setData({
            shareListTabData: {
                isLoading: !0,
                shareToWeixin: null,
                start: 0,
                hasMore: null,
                list: []
            }
        });
    }
};