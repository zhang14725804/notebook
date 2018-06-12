require("./netdisk_config/netdiskConfig.js"), require("./netdisk_config/actionsConfig.js"), 
require("./netdisk_config/page.js"), require("./netdisk_templates/toast/toast.js");

var t = require("./netdisk_utils/wxApiToPromise.js"), e = require("./netdisk_utils/common.js");

App({
    globalData: {
        userWxInfo: null,
        userBdInfo: null,
        getWxInfoFn: null,
        systemInfo: null,
        appOnshowData: null,
        hasWxAuthor: !0,
        uploadList: [],
        uploadDesIndex: 0,
        shareDirData: {
            currentDirData: {
                isRoot: null,
                publicMeta: {},
                dirMeta: {}
            }
        },
        hasBdAuthor: !1,
        errTimes: 0,
        isLogining: !1,
        formIdList: [],
        createSharing: !1,
        firstVisit: !0
    },
    onLaunch: function(e) {
        var i = this;
        this.globalData.getWxInfoFn = (0, t.getUserWxInfo)();
        var n = wx.getStorageSync("userInfo");
        n && (this.globalData.hasBdAuthor = !0, this.globalData.userBdInfo = n), null != this.globalData.userWxInfo && (this.globalData.hasWxAuthor = !0), 
        (0, t.wxApiToPromise)("getSystemInfo").then(function(t) {
            t.screenHeightRpx = t.screenHeight * (750 / t.screenWidth), t.screenWidthRpx = 750, 
            t.windowHeightRpx = t.windowHeight * (750 / t.screenWidth), t.windowWidthRpx = t.windowWidth * (750 / t.screenWidth), 
            i.globalData.systemInfo = t;
        });
    },
    onShow: function(t) {
        (0, e.reportSceneAction)(this.globalData.appOnshowData = t);
    },
    onHide: function() {
        (0, e.uploadFormId)();
    }
});