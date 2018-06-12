var a = require("../../netdiisk_requestapi/fileOper.js"), t = require("../../netdisk_templates/dialog/dialog.js"), e = require("../../netdisk_utils/validation.js"), i = getApp(), r = wx.ENV, o = (r.bgForwardName, 
r.staticName), s = r.version;

Page({
    data: {
        systemInfo: i.globalData.systemInfo,
        showAllAvator: null,
        bottomFixed: !0,
        divideRow: [],
        sharedirData: {
            isRoot: null,
            memberNum: null,
            avator: [],
            uname: [],
            fileName: null,
            updateTime: null,
            path: null
        },
        isOwner: 1
    },
    onLoad: function(a) {
        if (this.setData({
            systemInfo: i.globalData.systemInfo
        }), i.globalData && i.globalData.shareDirData.currentDirData.dirMeta) {
            var t = i.globalData.shareDirData.currentDirData, e = t.isRoot, r = t.publicMeta, o = t.dirMeta;
            r.avator.length > 9 && e || r.avator.length > 10 && !e ? this.data.showAllAvator = !1 : this.data.showAllAvator = !0, 
            this.data.sharedirData = {
                isRoot: e,
                memberNum: r.memberNum,
                avator: r.avator,
                uname: r.uname,
                fileName: o.server_filename,
                updateTime: o.server_mtime,
                path: o.path
            }, this.setData({
                showAllAvator: this.data.showAllAvator,
                divideRow: this.handleDivideRow(r.avator, r.uname),
                sharedirData: this.data.sharedirData,
                isOwner: o.is_owner
            });
        }
    },
    handleAddPeople: function(a) {
        wx.log.share.shareDetailSettingAddMemberClick.send();
        var t = i.globalData.shareDirData.currentDirData.dirMeta, e = t.uk, r = t.fid, o = t.server_filename, s = t.path, l = t.share;
        wx.navigateTo({
            url: "/pages/netdisk_sharesnapshots/sharesnapshots?&uk=" + e + "&fid=" + r + "&share=" + l + "&hasListData=false&serverFilename=" + o + "&path=" + encodeURIComponent(s)
        });
    },
    handleShowAllAvator: function() {
        this.data.showAllAvator = !0;
        var a = this.handleDivideRow(this.data.sharedirData.avator, this.data.sharedirData.uname), t = this.data.systemInfo.windowHeightRpx - 100, e = 34 + 218 * (a.length - 1) + 212, i = this.data.showAllAvator ? 0 : 76;
        this.data.bottomFixed = t > e + i + 144, this.setData({
            showAllAvator: this.data.showAllAvator,
            bottomFixed: this.data.bottomFixed,
            divideRow: a
        });
    },
    handleDivideRow: function(a, t) {
        for (var e = this.data.sharedirData.isRoot, i = [ [] ], r = 0; r < a.length && ((this.data.showAllAvator || 9 !== r || !e) && (this.data.showAllAvator || 10 !== r || e)); r++) {
            var o = i.length;
            i[o - 1].length < 5 ? i[o - 1].push({
                avator: a[r],
                uname: t[r]
            }) : i.push([ {
                avator: a[r],
                uname: t[r]
            } ]);
        }
        if (e) {
            var s = i.length;
            i[s - 1].length < 5 ? i[s - 1].push({
                addMember: !0
            }) : i.push([ {
                addMember: !0
            } ]);
        }
        return i;
    },
    bindKeyInput: function(a) {
        var t = a.detail.value, i = e.validation.TextValidationCheck(t);
        this.setData({
            "dialogData.errorText": "legal" === i ? null : i,
            "dialogData.inputText": t
        });
    },
    bindInputBlur: function(a) {
        var t = a.detail.value, i = e.validation.TextValidationCheck(t);
        this.setData({
            "dialogData.errorText": "legal" === i ? null : i,
            "dialogData.inputText": t
        });
    },
    clearErrorText: function() {
        this.setData({
            "dialogData.showErrorText": !1
        });
    },
    handleClearInput: function() {
        this.setData({
            "dialogData.inputText": "",
            "dialogData.value": "",
            "dialogData.showErrorText": !1,
            "dialogData.errorText": e.validation.TextValidationCheck("")
        });
    },
    renameShareDir: function() {
        if (wx.log.normal.modifiedShareDirName.send(), 0 !== this.data.sharedirData.isOwner) {
            var a = this.data.sharedirData.fileName, e = "ios" === i.globalData.systemInfo.platform ? 250 : a.length;
            t.WeDialog.dialog({
                title: "修改共享名称",
                selectionEnd: e,
                value: a
            }), t.WeDialog.show();
        }
    },
    dialogCancel: function() {
        t.WeDialog.dialog(), t.WeDialog.hide();
    },
    dialogConfirm: function() {
        var e = this;
        if (t.WeDialog.dialog(), t.WeDialog.dialogConfirm({
            isValidation: !0
        }), this.data.dialogData.errorText) this.setData({
            "dialogData.showErrorText": !0
        }); else {
            this.setData({
                "dialogData.isShow": !1
            });
            var r = this.data.sharedirData, o = r.path;
            i.globalData.shareDirData.currentDirData.oldDirName = r.fileName;
            var s = "/" === o.substr(-1) ? o.substring(0, o.length - 1) : o, l = this.data.dialogData.inputText;
            a.fileOper.asyncRenameDir(s, l).then(function(a) {
                if (0 == +a.data.errno && 0 == +a.data.task_errno) {
                    wx.wetoast({
                        content: "文件夹重命名成功",
                        duration: 3e3
                    });
                    var t = a.data.list[0], o = s.replace(r.fileName, ""), l = t.to.replace(o, "");
                    e.data.sharedirData.fileName = l.replace("/", ""), e.data.sharedirData.path = t.to, 
                    e.setData({
                        sharedirData: e.data.sharedirData
                    }), i.globalData.shareDirData.currentDirData.dirMeta.path = t.to, i.globalData.shareDirData.currentDirData.dirMeta.server_filename = l.replace("/", ""), 
                    i.globalData.shareDirData.currentDirData.dirListPath = "/" === o.substr(-1) ? o.substring(0, o.length - 1) : o, 
                    i.globalData.shareDirData.currentDirData.olddirPath = s;
                } else wx.wetoast({
                    content: "文件夹重命名失败",
                    duration: 3e3
                });
            }).catch(function(a) {
                wx.wetoast({
                    content: "文件夹重命名失败",
                    duration: 3e3
                });
            });
        }
    },
    onShareAppMessage: function(a) {
        if (wx.showShareMenu({
            withShareTicket: !0
        }), "menu" === a.from) return {
            title: "邀请您加入网盘小程序",
            path: "pages/netdisk_index/index",
            imageUrl: o + "/mini-program/images/bg_forward.png?v=" + s
        };
    }
});