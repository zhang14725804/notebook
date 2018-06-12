function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../netdisk_templates/file_list/fileList.js")), e = t(require("../../netdisk_utils/upload.js")), l = t(require("../../netdisk_templates/topTip/topTip.js")), i = require("../../netdisk_utils/common.js"), s = wx.ENV, o = s.staticName, n = s.version, d = getApp(), r = "";

Page({
    data: {
        systemInfo: null,
        bottomModalData: {
            isShow: !1,
            tapListItem: null,
            buttons: []
        },
        fileListTabData: {
            list: [],
            fileCategory: null,
            staticName: null,
            mod: null
        },
        tipData: {
            status: "none"
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
        },
        currentFileItem: {
            fid: "",
            isShare: null,
            isRoot: null,
            path: "",
            serverFilename: ""
        }
    },
    onLoad: function(t) {
        var e = this;
        this.data.currentFileItem = {
            fid: t.fid,
            isShare: +t.isShare,
            isRoot: +t.isRoot,
            path: decodeURIComponent(t.path),
            serverFilename: t.serverFilename
        }, wx.setNavigationBarTitle({
            title: this.data.currentFileItem.serverFilename
        }), this.setData({
            systemInfo: d.globalData.systemInfo,
            currentFileItem: this.data.currentFileItem
        }), a.default.fileListInit(d, this, t.mod), a.default.getFileListData(d, this, decodeURIComponent(t.path)), 
        a.default.showTab(this, d), wx.setPageData("dirdetail", function(t) {
            return e.setData(t);
        });
    },
    onShow: function() {
        "true" === this.data.uploadData.isUpload && ("cloud" === this.data.uploadData.uploadMod && this.cloudUpload(), 
        "local" === this.data.uploadData.uploadMod && this.localUpload());
    },
    handleTapBottomModalItem: function(t) {
        var a = t.currentTarget.dataset.tapfunc;
        a && this[a].call(this);
    },
    handleShareSonShareToWx: function() {
        wx.wetoast({
            content: "父目录已经共享，子目录无法共享",
            duration: 3e3
        });
    },
    closeBottomModal: function(t) {
        this.data.bottomModalData.isShow = !1, this.setData({
            bottomModalData: this.data.bottomModalData
        });
    },
    dirAddFiles: function(t) {
        r = this.data.currentFileItem.path;
        var a = getCurrentPages();
        d.globalData.uploadDesIndex = a.length - 1, wx.log.normal.normalDirDetailAddFileBtnClick.send(), 
        (0, i.checkPagesLimit)(this), wx.navigateTo({
            url: "/pages/netdisk_upload/upload?path=/&mod=select&uploadPath=" + r
        });
    },
    createNewFolder: function() {
        wx.log.normal.createNewDir.send(), this.setData({
            dialogData: {
                isShow: !0,
                errorText: null,
                showErrorText: !1,
                value: "",
                defaultText: "",
                inputText: "",
                selectionEnd: "",
                className: "",
                titleClassName: "",
                title: "新建文件夹",
                placeholder: "请输入文件夹名称",
                showExampleText: !1,
                exampleText: ""
            }
        });
    },
    batchEdit: function() {
        wx.log.normal.batch_click.send(), wx.setPageData("dirdetail", this.data), (0, i.checkPagesLimit)(this), 
        wx.navigateTo({
            url: "/pages/netdisk_batchEdit/batchEdit?from=dirdetail"
        });
    },
    localUpload: function() {
        var t = this, a = 0, i = 0, s = e.default.getLocalUploadPromiseList(r);
        wx.log.normal.normalDirDetailAddFileLocalupload.send(), l.default.setStatusUpload(this), 
        s.forEach(function(s) {
            s.then(function(s) {
                200 === s.statusCode ? a++ : i++, l.default.setStatusLocal(t, a, i), a + i === d.globalData.uploadList.length && (wx.log.normal.normalDirDetailAddFileLocaluploadSuccess.send(), 
                e.default.clearUploadList(t), t.getFileList());
            }, function(s) {
                i++, l.default.setStatusLocal(t, a, i), a + i === d.globalData.uploadList.length && (e.default.clearUploadList(t), 
                t.getFileList());
            });
        });
    },
    cloudUpload: function() {
        var t = this;
        wx.log.normal.normalDirDetailAddFileCloundupload.send();
        var a = d.globalData.uploadList.map(function(t) {
            return {
                path: t.path,
                dest: r,
                newname: t.server_filename
            };
        });
        l.default.setStatusUpload(this), e.default.cloudUpload(a, this).then(function(a) {
            if (a && 0 === a.data.errno) {
                var e = a.data.taskid;
                t.checkStatus(e);
            }
            t.data.uploadData.isUpload = "false";
        }, function(a) {
            l.default.setStatusErr(t);
        });
    },
    checkStatus: function(t) {
        var a = this;
        e.default.checkUploadStatus(t, this).then(function(i) {
            if ("success" === i.data.status) wx.log.normal.normalDirDetailAddFileClounduploadSuccess.send(), 
            l.default.setStatusSucc(a), d.globalData.uploadList.length > 0 && e.default.clearUploadList(a), 
            a.getFileList(); else if ("failed" === i.data.status) {
                if (-30 === i.data.errno) {
                    var s = d.globalData.uploadList.length - i.data.total, o = i.data.total;
                    l.default.setStatusHasFail(a, s, o);
                } else l.default.setStatusErr(a, i.data.errno);
                d.globalData.uploadList.length > 0 && e.default.clearUploadList(a);
            } else setTimeout(function() {
                a.checkStatus(t, a);
            }, 1e3);
        }, function(t) {
            l.default.setStatusErr(a), d.globalData.uploadList.length > 0 && e.default.clearUploadList(a);
        });
    },
    getFileList: function() {
        a.default.fileListInit(d, this, "list"), a.default.getFileListData(d, this, r);
    },
    shareSnapshoot: function() {
        wx.log.normal.normalDirDetailShareToClick.send();
        var t = wx.getStorageSync("uk"), a = this.data.currentFileItem, e = a.isShare, l = a.fid, i = a.serverFilename, s = a.path;
        wx.navigateTo({
            url: "/pages/netdisk_sharesnapshots/sharesnapshots?&uk=" + t + "&fid=" + l + "&share=" + e + "&hasListData=false&serverFilename=" + i + "&path=" + encodeURIComponent(s)
        });
    },
    onShareAppMessage: function(t) {
        t.target && t.target.dataset || t.currentTarget && t.currentTarget.dataset;
        if (wx.showShareMenu({
            withShareTicket: !0
        }), "menu" === t.from) return wx.log.normal.normalDirDetailShare.send(), {
            title: "邀请您加入网盘小程序",
            path: "pages/netdisk_index/index",
            imageUrl: o + "/mini-program/images/bg_forward.png?v=" + n
        };
    }
});