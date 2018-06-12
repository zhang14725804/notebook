function e(e, t) {
    var i = null;
    t && (i = 0), e.setData({
        commitBtnBottom: i
    });
}

function t(e, i, a, n, s) {
    (0, l.getDocumentUr)(e).then(function(l) {
        if ("PROCESSING" === l.data.status && a < 2) return a += 1, void setTimeout(function() {
            t(e, i, a, n, s);
        }, 2e3);
        if ("HITNDB" !== l.data.status) wx.hideLoading(), wx.showModal({
            title: "",
            showCancel: !1,
            content: "文档已在后台转码中，请稍后再试",
            confirmColor: "#3888ff"
        }); else {
            wx.showLoading({
                title: "文档加载中",
                mask: !0
            });
            var o = i + "&method=newview&ndb_key=" + l.data.ndb_key + "&region=" + l.data.region;
            wx.downloadFile({
                url: o,
                success: function(e) {
                    var t = e.tempFilePath;
                    wx.hideLoading(), s ? wx.showModal({
                        title: "",
                        content: "因小程序限制，较大文档仅能查看前10页，更多内容请在百度网盘App内查看",
                        showCancel: !1,
                        success: function() {
                            wx.openDocument({
                                filePath: t
                            });
                        },
                        confirmColor: "#3888ff"
                    }) : wx.openDocument({
                        filePath: t
                    });
                },
                fail: function(e) {
                    wx.hideLoading(), -1 !== e.errMsg.indexOf("exceed max file size") ? wx.showModal({
                        title: "",
                        showCancel: !1,
                        content: "因小程序限制，较大的文档请在百度网盘App内查看",
                        confirmColor: "#3888ff"
                    }) : wx.wetoast({
                        content: "文档加载出错，请重试",
                        duration: 2e3
                    });
                }
            });
        }
    });
}

function i(e, i) {
    if (3 === e.category) {
        var a = [], l = (i.data.fileListTabData.list.filter(function(e) {
            if (3 === e.category) return a.push((0, n.getOriginImgUrl)(e.thumbs.url3)), e;
        }), (0, n.getOriginImgUrl)(e.thumbs.url3));
        wx.log.file.previewImg.send(), wx.previewImage({
            current: l,
            urls: a
        });
    } else if (4 === e.category) {
        wx.log.file.previewDocument.send();
        var s = e.lodocpreview.replace(/http\:\/\/pcsdata.baidu.com/, "https://pcsdata.baidu.com"), o = "", r = !1;
        e.originSize < 10485760 ? (o = s + "&method=newinfo", r = !1) : (o = s + "&method=newinfo&part_index=0", 
        r = !0);
        wx.showLoading({
            title: "文档转码中",
            mask: !0
        }), t(o, s, 0, i, r);
    } else wx.log.file.previewOthers.send(), wx.wetoast({
        content: "请在百度网盘客户端预览",
        duration: 1200
    });
}

var a = require("../../netdisk_utils/common.js"), n = require("../../netdisk_utils/calculate.js"), l = require("../../netdiisk_requestapi/getDocumentUrl.js"), s = getApp(), o = wx.ENV.CONF.BATCH_EDIT_LIMITED_COUNT;

module.exports = {
    fileHandlersInit: function(t, n) {
        t.handleFileTouchS = function(e) {
            var i = e.currentTarget.dataset.index, a = t.data.fileListTabData.list;
            a[i].fileItemStyle = "background: #F9F9FA", t.setData({
                "fileListTabData.list": a
            });
        }, t.handleFileTouchE = function(e) {
            var i = e.currentTarget.dataset.index, a = t.data.fileListTabData.list;
            a[i].fileItemStyle = "", t.setData({
                "fileListTabData.list": a
            });
        }, t.handleLongPress = function(e) {
            wx.log.normal.longtab_batch.send(), (0, a.checkPagesLimit)() || t.batchEdit && t.batchEdit();
        }, t.handleFileClick = function(e) {
            var l = t.data.selectList || [];
            if (wx.log.normal.visitnormalDir.send(), l.length > 0 || "batchEdit" === n) t.handleFileSelect(e); else if (!(0, 
            a.checkPagesLimit)()) {
                var o = "", r = e.currentTarget.dataset.index, d = t.data.fileListTabData.list[r], c = 1 === d.isdir;
                if ("select" === n) o = "/pages/netdisk_upload/upload?path=" + encodeURIComponent(d.path) + "&mod=" + n; else if ("sharedir" === n) o = "/pages/netdisk_sharedir/sharedir?from=filelist", 
                c && (s.globalData.shareDirData.currentDirData.isRoot = !1, s.globalData.shareDirData.currentDirData.dirMeta = d); else {
                    var f = d.is_root || 0;
                    o = "/pages/netdisk_dirdetail/dirdetail?path=" + encodeURIComponent(d.path) + "&mod=" + n + "&isShare=" + d.share + "&isRoot=" + f + "&fid=" + d.fs_id + "&serverFilename=" + d.server_filename;
                }
                c || "select" !== n ? c ? wx.navigateTo({
                    url: o
                }) : i(d, t) : t.handleFileSelect(e);
            }
        }, "select" !== n && "batchEdit" !== n || (t.handleFileSelect = function(i) {
            var a = i.currentTarget.dataset.index, l = t.data, s = l.fileListTabData, r = l.selectList, d = void 0 === r ? [] : r, c = s.list, f = c[a], u = !f.isSelect;
            if (u && d.length >= o) wx.wetoast({
                content: "最多仅能对" + o + "个文件进行操作",
                duration: 1200
            }); else {
                var h = {
                    "fileListTabData.list": c,
                    selectList: d = (f.isSelect = u) ? d.concat(f) : d.filter(function(e) {
                        return e.fs_id !== f.fs_id;
                    })
                }, g = d.length;
                "select" === n ? e(t, g > 0) : (h.isSelectedAll = g === c.length || g === o, h.selectedCount = g), 
                t.setData(h);
            }
        });
    }
};