var a = require("../../netdisk_utils/transform.js"), t = require("../../netdiisk_requestapi/getFileList.js"), e = require("../../netdisk_utils/common.js"), i = require("./fileHandlers.js"), o = require("../../netdiisk_requestapi/fileOper.js"), r = require("../../netdisk_templates/dialog/dialog.js"), s = require("../../netdisk_utils/validation.js"), n = wx.ENV, l = n.CONF.FILES_LOAD_LIMITED_COUNT, d = function(e, i, o) {
    var r = wx.ENV.CONF.BATCH_EDIT_LIMITED_COUNT, s = "batchEditPage" === i.pageName, n = i.data, d = n.fileListTabData, c = n.currentFileItem, f = n.isSelectedAll, u = void 0 !== f && f, h = n.selectedCount, D = void 0 === h ? 0 : h, g = d.start;
    return d.isLoading = !0, d.path = o, 0 !== g && wx.showLoading({
        title: "加载中"
    }), (0, t.getFileList)(o, g, l).then(function(t) {
        wx.hideLoading();
        var o = (0, a.dataTransform)(t.data.list);
        o.length < l && (d.hasMore = !1), d.isLoading = !1, d.start = d.start + l;
        var n = d.list = d.list.concat(o), f = {};
        if (s && u && D < r) {
            var h = [], g = n.length;
            g > r && (g = r);
            for (var m, p = 0; p < g; p++) (m = n[p]).isSelect = !0, h.push(m);
            f.selectedCount = g, f.selectList = h;
        }
        f.fileListTabData = Object.assign({}, d), i.setData(f), e.globalData.preShareData = {
            currentFileItem: c,
            list: n
        };
    });
};

module.exports = {
    refreshTopList: function(e) {
        var i = "batchEditPage" === e.pageName, o = e.data.fileListTabData;
        return o.start = 0, o.isLoading = !0, (0, t.getFileList)(o.path, 0, l).then(function(t) {
            var r = t.data, s = o.list = (0, a.dataTransform)(r.list);
            o.hasMore = !(s.length < l), o.isLoading = !1, o.start = o.start + l;
            var n = {};
            i && (n.isSelectedAll = !1, n.selectedCount = 0, n.selectList = []), n.fileListTabData = Object.assign({}, o), 
            e.setData(n);
        });
    },
    fileListInit: function(a, t, o) {
        t.setData({
            fileListTabData: {
                staticName: n.staticName,
                fileCategory: n.CONF.FILE_CATEGORY,
                mod: o,
                list: [],
                isLoading: !0,
                hasMore: !0,
                path: "/",
                start: 0
            }
        }), (0, i.fileHandlersInit)(t, o), t.formSubmit = function(a) {
            (0, e.generateFormId)(a);
        }, t.loadMoreScrollLower = function() {
            var e = t.data.fileListTabData, i = e.isLoading, o = e.hasMore, r = e.path;
            !i && o && (t.hasLoadMore = !0, d(a, t, r));
        };
    },
    getFileListData: d,
    showTab: function(a, t) {
        a.handleTapItemMore = function(t) {
            wx.log.normal.normalBtnMoreClick.send();
            var e = a.data.fileListTabData, i = t.currentTarget.dataset.index, o = e.list[i], r = [ {
                text: "重命名",
                tapFunc: "rename",
                icon: "icon-rename"
            }, {
                text: "删除",
                tapFunc: "deleteFiles",
                icon: "icon-delete"
            } ];
            "sharedir" !== e.mod && r.unshift({
                text: "共享至好友",
                tapFunc: "shareToWeixinGroup",
                icon: "icon-add-member"
            }), a.setData({
                bottomModalData: {
                    isShow: !0,
                    tapListItem: o,
                    title: o.server_filename,
                    buttons: r
                }
            });
        }, a.bindKeyInput = a.bindInputBlur = function(t) {
            var e = t.detail.value, i = s.validation.TextValidationCheck(e);
            a.setData({
                "dialogData.errorText": "legal" === i ? null : i,
                "dialogData.inputText": e
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
                "dialogData.errorText": s.validation.TextValidationCheck("")
            });
        }, a.rename = function(e) {
            wx.log.normal.modifiedShareDirName.send(), a.closeBottomModal();
            var i = a.data.bottomModalData.title, o = a.data.fileListTabData.list.filter(function(a) {
                return a.server_filename === i;
            });
            if (a.data.sharedirData && !a.data.sharedirData.dirMeta.is_owner && o[0] && o[0].oper_id !== wx.getStorageSync("uk")) wx.wetoast({
                content: "只能管理自己上传的文件哦",
                duration: 1500
            }); else {
                var s = "ios" === t.globalData.systemInfo.platform ? 250 : i.length;
                r.WeDialog.dialog({
                    title: a.data.sharedirData ? "修改共享名称" : "重命名",
                    selectionEnd: s,
                    value: i
                }), r.WeDialog.show();
            }
        }, a.dialogCancel = function() {
            r.WeDialog.dialog(), r.WeDialog.hide();
        }, a.dialogConfirm = function() {
            if (r.WeDialog.dialog(), r.WeDialog.dialogConfirm({
                isValidation: !0
            }), a.data.dialogData.errorText) a.setData({
                "dialogData.showErrorText": !0
            }); else {
                if (a.setData({
                    "dialogData.isShow": !1
                }), "新建文件夹" === a.data.dialogData.title) return void a.createDir();
                var t = a.data.bottomModalData.tapListItem, e = t.path, i = a.data.dialogData.inputText;
                o.fileOper.asyncRenameDir(e, i).then(function(e) {
                    if (0 == +e.data.errno && 0 == +e.data.task_errno) {
                        wx.wetoast({
                            content: "文件夹重命名成功",
                            duration: 3e3
                        });
                        for (var i = e.data.list[0], o = i.to.replace(a.data.fileListTabData.path, ""), r = a.data.fileListTabData.list, s = 0; s < r.length; s++) r[s].fs_id === t.fs_id && (r[s].server_filename = o.replace("/", ""), 
                        r[s].path = i.to, s = r.length, a.setData({
                            "fileListTabData.list": r
                        }));
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
        }, a.createDir = function() {
            var e = a.data.fileListTabData, i = "", r = "/" === e.path.substr(-1) ? "" : "/", s = e.path + r + a.data.dialogData.inputText;
            o.fileOper.createDir(s).then(function(o) {
                if (0 == +o.data.errno) {
                    wx.wetoast({
                        content: "新建文件夹成功",
                        duration: 50
                    });
                    var s = o.data, n = s.path.replace(e.path + r, ""), l = a.data.fileListTabData.list, d = {
                        category: 6,
                        dir_empty: 1,
                        empty: 0,
                        fs_id: s.fs_id,
                        path: s.path,
                        local_ctime: s.ctime,
                        local_mtime: s.mtime,
                        server_filename: n,
                        share: a.data.sharedirData ? 1 : 0,
                        size: "0B",
                        unlist: 0,
                        isdir: s.isdir
                    };
                    l.push(d), a.setData({
                        "fileListTabData.list": l
                    }), a.data.sharedirData ? (i = "/pages/netdisk_sharedir/sharedir?from=filelist", 
                    t.globalData.shareDirData.currentDirData.isRoot = !1, t.globalData.shareDirData.currentDirData.dirMeta = d) : i = "/pages/netdisk_dirdetail/dirdetail?path=" + encodeURIComponent(d.path) + "&mod=&isShare=" + d.share + "&isRoot=0&fid=" + d.fs_id + "&serverFilename=" + d.server_filename, 
                    wx.navigateTo({
                        url: i
                    });
                } else wx.wetoast({
                    content: "新建文件夹失败",
                    duration: 3e3
                });
            }).catch(function(a) {
                wx.wetoast({
                    content: "新建文件夹失败",
                    duration: 3e3
                });
            });
        }, a.deleteFiles = function() {
            wx.log.normal.list_delete.send(), a.closeBottomModal();
            var t = a.data.bottomModalData.tapListItem;
            o.fileOper.deleteFile(t).then(function() {
                var e = a.data.fileListTabData.list;
                a.setData({
                    "fileListTabData.list": e.filter(function(a) {
                        return a.fs_id !== t.fs_id;
                    })
                });
            }, function(a) {
                a && wx.showToast({
                    title: "删除失败",
                    icon: "none",
                    duration: 1e3
                });
            });
        }, a.shareToWeixinGroup = function() {
            wx.log.normal.normalBtnShareToClick.send(), a.closeBottomModal();
            var t = a.data.bottomModalData.tapListItem;
            if (1 != +t.share || t.is_root) {
                var e = wx.getStorageSync("uk"), i = t.fs_id, o = t.share, r = t.path, s = t.server_filename;
                wx.navigateTo({
                    url: "/pages/netdisk_sharesnapshots/sharesnapshots?&uk=" + e + "&fid=" + i + "&share=" + o + "&path=" + encodeURIComponent(r) + "&hasListData=false&serverFilename=" + s
                });
            } else wx.wetoast({
                content: "父目录已经共享，子目录无法共享",
                duration: 3e3
            });
        };
    },
    clearTab: function(a) {
        var t = a.data.fileListTabData, e = t.staticName, i = t.fileCategory, o = t.mod;
        a.setData({
            fileListTabData: {
                staticName: e,
                fileCategory: i,
                mod: o,
                list: [],
                isLoading: !0,
                hasMore: !0,
                path: "/",
                start: 0
            }
        });
    }
};