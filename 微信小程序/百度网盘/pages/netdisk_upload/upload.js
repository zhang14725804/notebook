var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../netdisk_templates/file_list/fileList.js")), a = require("../../netdisk_utils/upload.js"), e = getApp();

Page({
    data: {
        systemInfo: e.globalData.systemInfo,
        selectList: [],
        commitBtnBottom: "-120rpx"
    },
    localUpload: function() {
        wx.chooseImage({
            count: 9,
            sizeType: [ "original" ],
            sourceType: [ "album" ],
            success: function(t) {
                var o = t.tempFilePaths;
                e.globalData.uploadList = o, (0, a.backToDesPathWithData)({
                    isUpload: "true",
                    uploadMod: "local"
                });
            }
        });
    },
    onLoad: function(a) {
        var o = this;
        this.setData({
            systemInfo: e.globalData.systemInfo
        }), t.default.fileListInit(e, this, a.mod), t.default.getFileListData(e, this, decodeURIComponent(a.path)).then(function(t) {
            o.setData({
                "fileListTabData.uploadPath": a.uploadPath
            });
        });
    },
    commitUpload: function() {
        e.globalData.uploadList = this.data.selectList, (0, a.backToDesPathWithData)({
            isUpload: "true",
            uploadMod: "cloud"
        });
    }
});