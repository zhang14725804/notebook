function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = require("../../netdisk_utils/wxApiToPromise.js"), a = require("../../netdisk_utils/logicUtils.js"), n = t(require("../../netdisk_templates/share_list/shareList.js")), o = t(require("../../netdisk_templates/file_list/fileList.js")), s = require("../../netdisk_templates/userCenter/userCenter.js"), i = require("../../netdiisk_requestapi/fileOper.js"), l = getApp();

Page({
    data: {
        userWxInfo: null,
        systemInfo: null,
        hasWxUserInfo: l.globalData.hasWxAuthor,
        hasBdUserInfo: l.globalData.hasBdAuthor,
        currentTab: 0,
        bottomModalData: {
            isShow: !1,
            tapListItem: null,
            buttons: []
        },
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
        shareListTabData: {
            isLoading: !0,
            shareToWeixin: null,
            start: 0,
            hasMore: null,
            list: []
        },
        fileListTabData: {
            list: [],
            fileCategory: null,
            staticName: null,
            mod: null,
            isLoading: !0,
            hasMore: !0,
            path: "/",
            start: 0
        },
        onLoadData: {},
        userCenter: {
            avatar: "",
            name: "",
            memberType: "",
            quotaSize: {},
            quotaUsageRate: "",
            uk: ""
        },
        modelData: {
            showCancel: !1,
            cancelText: "取消",
            confirmText: "前往授权",
            content: "需要授权微信账户才能正常使用哦",
            title: "",
            isShow: !1
        }
    },
    onLoad: function(t) {
        var n = this;
        this.data.onLoadData = t, wx.getSetting({
            success: function(t) {
                !0 !== t.authSetting["scope.userInfo"] && (l.globalData.hasWxAuthor = !1, n.setData({
                    hasWxUserInfo: !1
                }));
            }
        }), l.globalData.getWxInfoFn.then(function(t) {
            wx.log.author.userInfoFirstSuccess.send(), l.globalData.userWxInfo = t.userInfo, 
            l.globalData.hasWxAuthor = !0, n.data.userWxInfo = t.userInfo, n.data.hasWxUserInfo = !0, 
            n.setData({
                hasWxUserInfo: !0
            }), (0, a.checkBdAuthor)();
        }, function(t) {
            console.log("--getWxInfoError--", t), (0, a.confirmAuthor)(n);
        }), wx.getStorageSync("userInfo") && this.setData({
            hasBdUserInfo: !0
        }), l.globalData.systemInfo ? this.setData({
            systemInfo: l.globalData.systemInfo
        }) : (0, e.wxApiToPromise)("getSystemInfo").then(function(t) {
            t.screenHeightRpx = t.screenHeight * (750 / t.screenWidth), t.screenWidthRpx = 750, 
            t.windowHeightRpx = t.windowHeight * (750 / t.screenWidth), t.windowWidthRpx = t.windowWidth * (750 / t.screenWidth), 
            n.setData({
                systemInfo: t
            });
        }), o.default.fileListInit(l, this, "list");
    },
    onShow: function(t) {
        var e = wx.getStorageSync("userInfo"), o = wx.getStorageSync("lsk");
        if (t && !0 === t && (0, a.checkBdAuthor)(), e && o && l.globalData.userBdInfo && 0 === this.data.currentTab) {
            n.default.clearTab(this, l), n.default.showTab(this, l);
            var r = wx.getStorageSync("uk"), u = wx.getStorageSync("newDirTemData");
            r || (0, s.setUserCenterInfo)(l, this), !u || this.data.dialogData.isShow || l.globalData.createSharing || i.fileOper.deleteFile(u.path).then(function() {
                wx.log.index.deleteTemDir.send(), wx.removeStorageSync("newDirTemData");
            });
        }
        e && !l.globalData.userBdInfo && l.globalData.userWxInfo && (l.globalData.userBdInfo = e, 
        this.data.hasBdUserInfo = !0, this.setData({
            hasBdUserInfo: !0
        }), (0, a.checkBdAuthor)(), console.log("请求 server-login2", l.globalData));
    },
    onShareAppMessage: function() {},
    onReady: function() {},
    switchNav: function(t) {
        if (this.data.currentTab == t.target.dataset.current) return !1;
        this.setData({
            currentTab: t.target.dataset.current
        });
    },
    changeTab: function(t) {
        this.setData({
            currentTab: t.detail.current
        }), 1 === t.detail.current ? (n.default.clearTab(this, l), o.default.getFileListData(l, this, "/", !0), 
        o.default.showTab(this, l), wx.log.index.navTab1.send()) : 0 === t.detail.current ? (o.default.clearTab(this, l), 
        n.default.showTab(this, l), wx.log.index.navTab0.send()) : 2 === t.detail.current && (wx.log.index.navTab2.send(), 
        (0, s.setUserCenterInfo)(l, this));
    },
    onHide: function(t) {
        n.default.clearTab(this, l);
    },
    handleTapBottomModalItem: function(t) {
        var e = t.currentTarget.dataset.tapfunc;
        e && this[e].call(this);
    },
    closeBottomModal: function(t) {
        this.data.bottomModalData.isShow = !1, this.setData({
            bottomModalData: this.data.bottomModalData
        });
    },
    goLogin: function() {
        l.globalData.firstVisit || (wx.log.index.goLogin.send(), wx.navigateTo({
            url: "/pages/pass_login/login"
        }));
    },
    goLogingTouchS: function() {
        this.setData({
            noLogingBtnStyle: "opacity: 0.6;"
        });
    },
    goLogingTouchE: function() {
        this.setData({
            noLogingBtnStyle: ""
        });
    },
    createShareTouchS: function() {
        this.setData({
            createShareBtnStyle: "opacity: 0.6;"
        });
    },
    createShareTouchE: function() {
        this.setData({
            createShareBtnStyle: ""
        });
    },
    contactTouchS: function() {
        this.setData({
            "userCenter.contactTouchStyle": "background: #F9F9FA"
        });
    },
    contactTouchE: function() {
        this.setData({
            "userCenter.contactTouchStyle": ""
        });
    },
    contactClick: function() {
        wx.log.index.connectBtnClick.send();
    },
    myModelCallback: function(t) {
        var e = this, n = t.detail.detail, o = n.errMsg, s = n.userInfo;
        -1 !== o.indexOf("ok") && (wx.log.author.userInfoSetSuccess.send(), l.globalData.userWxInfo = s, 
        l.globalData.hasWxAuthor = !0, e.data.userWxInfo = s, e.setData({
            hasWxUserInfo: !0,
            "modelData.isShow": !1
        }), (0, a.checkBdAuthor)());
    }
});