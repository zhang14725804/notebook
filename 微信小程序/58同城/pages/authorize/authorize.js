var e = getApp();

e.createPage({
    methodOptions: {
        e_back: {
            type: "back"
        },
        e_auth: {
            type: "auth"
        }
    },
    data: {
        pageType: "58wxauthorize",
        pageName: "58wxauthorize",
        getUserLogin: "",
        currentcid: e.globalData.cityId || "",
        isRefreshOnLoginBack: !0
    },
    pageInfoKeys: [ "currentcid" ],
    _onLoad: function(t) {
        e.storage.setSync("pagetype", ""), t.getUserLogin && this.setDataLazy(t);
    },
    $e_back: function() {
        wx.navigateBack({
            delta: 10
        });
    },
    $e_auth: function() {},
    getUserInfo: function(t) {
        var n = this, a = t.detail;
        if (console.log(a), e.hasUnionId()) return Promise.resolve({});
        e.eventHandle.emit("check-login", function() {
            a.iv ? ("yes" === n.data.getUserLogin ? e.login.getUserLogin.bind(e)(a) : (e.storage.removeSync(e.constData.STORAGE_USER_INFO_KEY), 
            e.login.userLogin.bind(e)()), "vendors/im/pages/sessions/sessions" === getCurrentPages()[0].route && a.iv ? (e.eventHandle.emit("init-session-tabbar"), 
            wx.switchTab({
                url: "/pages/index/index"
            })) : wx.navigateBack({
                delta: 1
            })) : e.alert("需要授权才能继续访问哦").then(function() {
                e.eventHandle.emit("check-setting");
            }), e.storage.setSync(e.constData.WX_GET_USER_INFO, !0), [ "pages/index/index", "pages/user/user", "vendors/im/pages/sessions/sessions" ].indexOf(getCurrentPages()[0].route) > -1 && e.eventHandle.emit("check-ppu");
        });
    }
});