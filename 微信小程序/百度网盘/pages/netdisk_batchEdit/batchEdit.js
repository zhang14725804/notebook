var t = require("../../netdisk_templates/file_list/fileList.js"), a = require("../../netdiisk_requestapi/fileOper.js"), e = require("../../netdisk_templates/dialog/dialog.js"), i = require("../../netdisk_utils/validation.js"), s = getApp(), l = wx.ENV.CONF.BATCH_EDIT_LIMITED_COUNT, o = function(t, a) {
    a = !!a;
    var e = t.list.map(function(t, e) {
        return t.isSelect = a, a && e > l - 1 && (t.isSelect = !1), t;
    });
    return {
        isSelectedAll: a,
        selectedCount: a ? Math.min(e.length, l) : 0,
        "fileListTabData.list": e,
        selectList: a ? e.slice(0, l) : []
    };
}, n = !1;

Page({
    data: {
        isSelectedAll: !1,
        selectedCount: 0,
        fileListTabData: {
            list: [],
            mod: "batchEdit"
        },
        isOwner: 1,
        selectList: []
    },
    onLoad: function(a) {
        var e = a.from, i = a.isOwner;
        n = !1;
        var l = wx.getPageData(e).query("fileListTabData");
        this.fromPage = e, this.fromPageMod = l.mod, this.isOwner = i, this.hasLoadMore = !1, 
        this.pageName = "batchEditPage", (0, t.fileListInit)(s, this, "batchEdit"), this.setData({
            boxHeight: s.globalData.systemInfo.windowHeightRpx - 220,
            fileListTabData: Object.assign({}, l, {
                mod: "batchEdit"
            })
        });
    },
    onUnload: function() {
        if (n || this.hasLoadMore) {
            var t = this.data.fileListTabData;
            t.mod = this.fromPageMod, wx.getPageData(this.fromPage).update({
                fileListTabData: t
            });
        }
    },
    backForward: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    selectedAll: function() {
        var t = this.data.isSelectedAll;
        "sharedir" === this.fromPage ? wx.log.share.batch_pickall.send() : wx.log.normal.batch_pickall.send(), 
        this.setData(o(this.data.fileListTabData, !t));
    },
    renameItems: function() {
        var t = this;
        if ("sharedir" === t.fromPage ? wx.log.share.batch_rename.send() : wx.log.normal.batch_rename.send(), 
        !(this.data.selectList.length > 1)) {
            var a = this.data.selectList[0], i = a.server_filename;
            if ("sharedir" !== this.fromPage || parseInt(this.isOwner, 10) || a.oper_id === wx.getStorageSync("uk")) {
                var l = "ios" === s.globalData.systemInfo.platform ? 250 : i.length;
                e.WeDialog.dialog({
                    title: "sharedir" === t.fromPage ? "修改共享名称" : "重命名",
                    value: i,
                    selectionEnd: l
                }), e.WeDialog.show();
            } else wx.wetoast({
                content: "只能管理自己上传的文件哦",
                duration: 1500
            });
        }
    },
    bindKeyInput: function(t) {
        var a = t.detail.value, e = i.validation.TextValidationCheck(a);
        this.setData({
            "dialogData.errorText": "legal" === e ? null : e,
            "dialogData.inputText": a
        });
    },
    bindInputBlur: function(t) {
        var a = t.detail.value, e = i.validation.TextValidationCheck(a);
        this.setData({
            "dialogData.errorText": "legal" === e ? null : e,
            "dialogData.inputText": a
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
            "dialogData.errorText": i.validation.TextValidationCheck("")
        });
    },
    dialogCancel: function() {
        e.WeDialog.dialog(), e.WeDialog.hide();
    },
    dialogConfirm: function() {
        var t = this;
        if (e.WeDialog.dialog(), e.WeDialog.dialogConfirm({
            isValidation: !0
        }), this.data.dialogData.errorText) this.setData({
            "dialogData.showErrorText": !0
        }); else {
            this.setData({
                "dialogData.isShow": !1
            });
            var i = this.data.selectList[0].path, s = this.data.dialogData.inputText, l = wx.getCurrentViewPage();
            a.fileOper.asyncRenameDir(i, s).then(function(a) {
                var e = a.data, s = e.errno, o = e.list[0];
                if (0 == +s && o) {
                    wx.wetoast({
                        content: "文件夹重命名成功",
                        duration: 3e3
                    });
                    for (var r, d = o.to.replace(t.data.fileListTabData.path, ""), h = l.data.fileListTabData.list, c = 0; c < h.length; c++) if ((r = h[c]).path === i) {
                        r.server_filename = d.replace("/", ""), r.path = o.to, r.isSelect = !1, l.setData({
                            "fileListTabData.list": h,
                            selectedList: [],
                            selectedCount: 0
                        });
                        break;
                    }
                    n = !0;
                } else wx.wetoast({
                    content: "文件夹重命名失败",
                    duration: 3e3
                });
            }).catch(function() {
                wx.wetoast({
                    content: "文件夹重命名失败",
                    duration: 3e3
                });
            }), this.setData(o(this.data.fileListTabData, !1));
        }
    },
    deleteItems: function() {
        var e = this;
        "sharedir" === this.fromPage ? wx.log.share.batch_delete.send() : wx.log.normal.batch_delete.send();
        var i = this.data.selectList;
        if (0 !== i.length) {
            var s = this.data.fileListTabData.list.filter(function(t) {
                return !i.some(function(a) {
                    return a.fs_id === t.fs_id;
                });
            });
            a.fileOper.deleteFile(i).then(function() {
                e.setData({
                    isSelectedAll: !1,
                    selectedCount: 0,
                    selectedList: [],
                    "fileListTabData.list": s
                }), 0 === s.length && (0, t.refreshTopList)(e), n = !0;
            }, function(t) {
                t && wx.showToast({
                    title: "删除失败",
                    icon: "none",
                    duration: 1e3
                });
            });
        } else wx.wetoast({
            content: "请先选中文件",
            duration: 1e3
        });
    }
});