var o = getApp(), t = o.storage.getSync(o.constData.PROFILE_KEY);

o.createPage({
    methodOptions: {
        e_goToResumeList: {
            type: "goto"
        },
        e_goToApplyList: {
            type: "goto"
        },
        e_logout: {
            type: "goto"
        },
        e_goToSubscription: {
            type: "goto"
        },
        e_goToIM: {
            type: "goto"
        },
        e_goToCollect: {
            type: "goto"
        }
    },
    data: {
        pageName: "user",
        pageType: "user",
        pic: "",
        name: "",
        loading: !t,
        unLogin: !0
    },
    loginChange: function() {
        console.log("用户中心头像变化"), o.storage.removeSync(o.constData.PROFILE_KEY), this.initData();
    },
    _onLoad: function(t) {
        t.goToLogin;
        o.getPPU() || this.setDataLazy({
            name: "点此登录"
        }), o.eventHandle.offOn("passport-login-success", this.loginChange);
    },
    initData: function() {
        var t = this;
        return o.getPPU() ? o.userData.getProfile().then(function(e) {
            var n = e.pic, i = e.name;
            t.setDataLazy({
                name: i || "点此登录",
                unLogin: !i,
                pic: n ? "url(" + o.pathData.CDN_PIC + n + ")" : n || ""
            });
        }) : Promise.resolve();
    },
    $e_goToResumeList: function(t) {
        if (this.data.unLogin) return this.goToLogin();
        o.goto("/pages/user/resume/resume", !0);
    },
    $e_goToApplyList: function(t) {
        if (this.data.unLogin) return this.goToLogin();
        o.goto("/pages/user/apply/apply", !0);
    },
    $e_goToSubscription: function(t) {
        if (this.data.unLogin) return this.goToLogin();
        o.goto("/pages/subscription/subscription", !0);
    },
    $e_goToIM: function(o) {
        if (this.data.unLogin) return this.goToLogin();
        wx.switchTab({
            url: "/vendors/im/pages/sessions/sessions"
        });
    },
    $e_goToCollect: function(t) {
        if (this.data.unLogin) return this.goToLogin();
        o.goto("/pages/user/collect/collect", !0);
    },
    goToLogin: function() {
        o.eventHandle.emit("check-setting", function() {
            o.eventHandle.emit("check-ppu");
        });
    },
    $e_login: function() {
        this.data.unLogin && this.goToLogin();
    },
    $e_logout: function() {
        var t = this;
        o.eventHandle.emit("logout", function() {
            o.storage.removeSync(o.constData.PROFILE_KEY), o.storage.removeSync(o.constData.USER_TOKEN), 
            t.setDataLazy({
                name: "点此登录",
                pic: null,
                unLogin: !0
            }), console.log("用户退出登录成功"), o.eventHandle.emit("logout-success");
        });
    }
});