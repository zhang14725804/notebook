function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../netdisk_templates/file_list/fileList.js")), e = require("../../netdiisk_requestapi/getShareDirDetail.js"), i = require("../../netdiisk_requestapi/getSurlInfo.js"), s = require("../../netdiisk_requestapi/acceptShareDir.js"), l = require("../../netdiisk_requestapi/weixinGroup.js"), r = a(require("../../netdisk_utils/calculate.js")), d = a(require("../../netdisk_utils/upload.js")), o = a(require("../../netdisk_templates/topTip/topTip.js")), n = require("../../netdisk_utils/common.js"), u = require("../../netdisk_templates/dialog/dialog.js"), h = a(require("./shareUtils.js")), f = getApp(), c = wx.ENV, D = (c.bgForwardName, 
c.staticName), p = c.version, g = "";

Page({
    data: {
        systemInfo: f.globalData.systemInfo,
        sharedirData: {
            isRoot: null,
            dirMeta: null,
            memberNum: null,
            avator: [],
            uname: [],
            fileName: null,
            updateTime: null,
            path: null
        },
        bottomModalData: {
            isShow: !1,
            tapListItem: null,
            buttons: []
        },
        fileListTabData: {
            isLoading: !0,
            list: [],
            fileCategory: null,
            staticName: null,
            mod: "sharedir"
        },
        tipData: {
            status: "none",
            entryStatus: "exit"
        },
        uploadData: {},
        dialogData: {
            isShow: !1,
            className: null,
            titleClassName: null,
            title: null,
            selectionEnd: null,
            placeholder: null,
            errorText: null,
            showExampleText: !0,
            exampleText: null,
            value: null,
            defaultText: null,
            inputText: null
        }
    },
    onLoad: function(a) {
        var e = this;
        this.pageName = "sharedir", this.setData({
            systemInfo: f.globalData.systemInfo
        }), f.globalData.shareDirData.currentDirData.dirMeta.path && (g = f.globalData.shareDirData.currentDirData.dirMeta.path);
        var i = f.globalData.shareDirData.currentDirData.dirMeta.server_filename;
        i && wx.setNavigationBarTitle({
            title: i
        }), h.default.pathHandlers(f, this, a, t.default), t.default.showTab(this, f), wx.setPageData("sharedir", function(a) {
            return e.setData(a);
        });
    },
    checkFreshName: function() {
        var a = f.globalData.shareDirData, t = a ? a.currentDirData : "", e = this.data.sharedirData, i = e.path, s = "/" === i.substr(-1) ? i.substring(0, i.length - 1) : i;
        if (a && t) {
            if (t.olddirPath === s) {
                var l = t.dirMeta;
                l && l.server_filename !== e.fileName && (this.data.sharedirData.fileName = l.server_filename, 
                this.data.sharedirData.path = l.path, this.setData({
                    sharedirData: this.data.sharedirData
                }));
            }
            if (t.dirListPath === s) {
                this.data.fileListTabData.list;
                this.setData({
                    fileListTabData: this.data.fileListTabData
                });
            }
        }
    },
    onShow: function() {
        this.data.sharedirData && this.data.sharedirData.path && this.checkFreshName(), 
        "true" === this.data.uploadData.isUpload && ("cloud" === this.data.uploadData.uploadMod && this.cloudUpload(), 
        "local" === this.data.uploadData.uploadMod && this.localUpload());
        var a = this.data.sharedirData, t = a.isRoot, e = a.dirMeta;
        t && e && (f.globalData.shareDirData.currentDirData.isRoot = t, f.globalData.shareDirData.currentDirData.dirMeta = e, 
        g = e.path);
    },
    handleTapBottomModalItem: function(a) {
        var t = a.currentTarget.dataset.tapfunc;
        t && this[t].call(this);
    },
    deallocalUploadState: function(a) {
        var t = this, e = 0, i = 0;
        a.forEach(function(a) {
            a.then(function(a) {
                200 === a.statusCode ? e++ : i++, o.default.setStatusLocal(t, e, i), e + i === f.globalData.uploadList.length && (wx.log.share.shareDetailAddFileLocaluploadSuccess.send(), 
                d.default.clearUploadList(t), t.getFileList());
            }, function() {
                o.default.setStatusLocal(t, e, i), e + i === f.globalData.uploadList.length && (d.default.clearUploadList(t), 
                t.getFileList());
            });
        });
    },
    localUpload: function() {
        if (wx.log.share.shareDetailAddFileLocaluploadBtn.send(), o.default.setStatusUpload(this), 
        g.includes("<share>")) d.default.getShareLocalUploadPromiseList(g).then(this.deallocalUploadState); else {
            var a = d.default.getLocalUploadPromiseList(g);
            this.deallocalUploadState(a);
        }
    },
    cloudUpload: function() {
        var a = this;
        wx.log.share.shareDetailAddFileClounduploadBtn.send();
        var t = f.globalData.uploadList.map(function(a) {
            return {
                path: a.path,
                dest: g,
                newname: a.server_filename
            };
        });
        o.default.setStatusUpload(this), d.default.cloudUpload(t, this).then(function(t) {
            if (t && 0 === t.data.errno) {
                var e = t.data.taskid;
                a.checkStatus(e);
            }
            a.data.uploadData.isUpload = "false";
        }, function(t) {
            o.default.setStatusErr(a);
        });
    },
    checkStatus: function(a) {
        var t = this;
        d.default.checkUploadStatus(a, this).then(function(e) {
            if ("success" === e.data.status) wx.log.share.shareDetailAddFileClounduploadSuccess.send(), 
            o.default.setStatusSucc(t), f.globalData.uploadList.length > 0 && d.default.clearUploadList(t), 
            t.getFileList(); else if ("failed" === e.data.status) {
                if (-30 === e.data.errno) {
                    var i = f.globalData.uploadList.length - e.data.total, s = e.data.total;
                    o.default.setStatusHasFail(t, i, s);
                } else o.default.setStatusErr(t, e.data.errno);
                f.globalData.uploadList.length > 0 && d.default.clearUploadList(t);
            } else setTimeout(function() {
                t.checkStatus(a, t);
            }, 1e3);
        }, function(a) {
            o.default.setStatusErr(t), f.globalData.uploadList.length > 0 && d.default.clearUploadList(t);
        });
    },
    getFileList: function() {
        t.default.fileListInit(f, this, "sharedir"), t.default.getFileListData(f, this, g);
    },
    onShareAppMessage: function(a) {
        if (wx.showShareMenu({
            withShareTicket: !0
        }), "menu" === a.from) return wx.log.share.shareDirDetailShareClick.send(), {
            title: "邀请您加入网盘小程序",
            path: "pages/netdisk_index/index",
            imageUrl: D + "/mini-program/images/bg_forward.png?v=" + p
        };
    },
    handleSurl: function(a) {
        var t = this;
        (0, i.getSurlInfo)(a).then(function(a) {
            0 != +a.data.errno || 0 !== a.data.status && 3 != a.data.status ? wx.redirectTo({
                url: "/pages/netdisk_index/index"
            }) : t.joinSharedir({
                uk: a.data.uk,
                fid: a.data.fid
            });
        });
    },
    joinSharedir: function(a) {
        var t = this, e = function(e) {
            0 == +e.data.errno || 18214 == +e.data.errno || 18215 == +e.data.errno ? t.getDirDetail({
                uk: a.uk,
                fid: a.fid
            }) : wx.redirectTo({
                url: "/pages/netdisk_index/index"
            });
        };
        wx.log.share.joinShareSuccess.send(), a.uk && a.fid && a.tt && a.invitor && a.sign ? (0, 
        s.acceptShareDir)({
            fid: a.fid,
            tt: a.tt,
            uk: a.uk,
            invitor: a.invitor,
            sign: a.sign
        }).then(e) : a.uk && a.fid && l.weixinGroup.v2joinShareDir(a.uk, a.fid).then(e);
    },
    getDirDetail: function(a) {
        var i = this, s = {};
        a.uk && a.fid ? s = {
            uk: a.uk,
            fid: a.fid
        } : a.surl && (s = {
            s: a.surl
        }), (0, e.getShareDirDetail)(s).then(function(a) {
            a && 0 != +a.data.errno && wx.redirectTo({
                url: "/pages/netdisk_index/index"
            }), f.globalData.shareDirData.currentDirData = {
                isRoot: !0,
                isWeixin: a.data.is_wx,
                publicMeta: {
                    avator: a.data.avator,
                    uname: a.data.uname,
                    memberNum: a.data.group_num,
                    shareinfo: {
                        fid: a.data.fid,
                        tt: a.data.tt,
                        uk: a.data.uk,
                        invitor: a.data.invitor,
                        sign: a.data.sign
                    }
                },
                dirMeta: a.data
            }, g = a.data.path, i.data.sharedirData = {
                isRoot: !0,
                dirMeta: a.data,
                memberNum: a.data.group_num,
                avator: a.data.avator,
                uname: a.data.uname,
                fileName: a.data.server_filename,
                updateTime: r.default.formatTime(new Date(1e3 * a.data.server_mtime)),
                path: a.data.path
            }, wx.setNavigationBarTitle({
                title: a.data.server_filename
            }), i.setData({
                sharedirData: i.data.sharedirData
            }), t.default.fileListInit(f, i, "sharedir"), t.default.getFileListData(f, i, a.data.path);
        });
    },
    closeBottomModal: function(a) {
        this.data.bottomModalData.isShow = !1, this.setData({
            bottomModalData: this.data.bottomModalData
        });
    },
    sharedirAddFile: function() {
        wx.log.share.shareDetailAddFileBtn.send(), f.globalData.uploadDesIndex = getCurrentPages().length - 1, 
        wx.navigateTo({
            url: "/pages/netdisk_upload/upload?path=/&mod=select&uploadPath=" + g
        });
    },
    sharedirSetting: function() {
        wx.log.share.shareDetailSettingBtn.send(), wx.navigateTo({
            url: "/pages/netdisk_setshare/setshare"
        });
    },
    sharedirAddPeople: function(a) {
        wx.log.share.shareDirDetailAddMemberClick.send();
        var t = this.data.sharedirData.dirMeta, e = t.uk, i = t.fid, s = t.server_filename, l = t.path, r = t.share;
        wx.navigateTo({
            url: "/pages/netdisk_sharesnapshots/sharesnapshots?&uk=" + e + "&fid=" + i + "&share=" + r + "&hasListData=false&serverFilename=" + s + "&path=" + encodeURIComponent(l)
        });
    },
    createNewFolder: function(a) {
        wx.log.share.createNewDir.send(), u.WeDialog.dialog({
            title: "新建文件夹",
            placeholder: "请输入文件夹名称"
        }), u.WeDialog.show();
    },
    dialogCancel: function(a) {
        u.WeDialog.dialog(), u.WeDialog.hide();
    },
    dialogConfirm: function(a) {
        u.WeDialog.dialog(), u.WeDialog.dialogConfirm({
            isValidation: !0
        });
    },
    batchEdit: function() {
        wx.log.share.batch_click.send();
        var a = this.data.sharedirData.dirMeta.is_owner;
        wx.setPageData("sharedir", this.data), (0, n.checkPagesLimit)(this), wx.navigateTo({
            url: "/pages/netdisk_batchEdit/batchEdit?from=sharedir&isOwner=" + a
        });
    }
});