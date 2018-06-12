var e = require("../../module/page"), i = require("../../module/login");

e("user", {
    data: {
        pageName: "user",
        user: {
            loginType: "",
            name: "",
            avatar: "",
            isVip: !1,
            vipLevel: "",
            vipEndTime: ""
        },
        response: {
            system: "",
            loading: !0,
            error: !1,
            errorTitle: "",
            errorText: ""
        },
        text: wx.getSystemInfoSync().screenWidth < 360 ? {
            vip: "我的VIP",
            notvip: "开通VIP",
            vipcard: "赠送VIP卡"
        } : {
            vip: "我的VIP会员",
            notvip: "开通VIP会员",
            vipcard: "赠送VIP会员卡"
        }
    },
    comps: [ require("../../comps/history/index.js")(), require("../../comps/playlist/index.js")(), require("../../comps/actionmodal/index.js")() ],
    onPreload: function() {
        var e = this;
        i.getUserInfo(function(i, o) {
            !i && o.vuser && o.vuser.ddwVuser && (e.preloadHistory(), e.preloadPlaylist());
        });
    },
    onLoad: function() {
        var e = this, o = wx.getSystemInfoSync().system.match(/ios/i);
        o && this.setData({
            "response.system": "iOS"
        }), this.setData({
            showCard: !o && wx.canIUse("navigateToMiniProgram")
        }), i.onLoginChange(function() {
            e.getUserInfo();
            try {
                e.refreshHistroy();
            } finally {
                e.refreshPlayList();
            }
        });
    },
    onShow: function() {
        this.getUserInfo();
    },
    onHide: function() {
        this.hideActionModal();
    },
    getUserInfo: function() {
        var e = this;
        i.getUserInfo(function(o, r) {
            function n(i) {
                e.setData({
                    "response.loading": !1,
                    "response.error": !0,
                    "response.errorTitle": "登陆失败 (" + i + ")",
                    "response.errorText": "我们正在紧张地修复"
                });
            }
            console.log("@@user info:", r), console.log("@@user info error:", o), !o && r.vuser && r.vuser.ddwVuser ? (i.getLoginInfo(function(i, o) {
                if (console.log("#{getLoginInfo}", o), i) return n(i);
                e.setData({
                    "response.loading": !1,
                    "response.error": !1,
                    "user.loginType": o.type,
                    "user.isVip": r.isVip,
                    "user.name": o.nickName ? o.nickName : "你好",
                    "user.avatar": o.avatarUrl ? o.avatarUrl : "http://i.gtimg.cn/qqlive/images/20161208/avatar.png"
                });
            }, !0), i.getVipInfo(function(i, o) {
                if (console.log("#{User VIP INFO}", o), o) {
                    var n = new Date(1e3 * o.ldEndTime), s = "";
                    n > new Date() && (s = n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate()), 
                    e.setData({
                        "user.isVip": r.isVip,
                        "user.vipLevel": o.iVipLevel,
                        "user.vipEndTime": s
                    });
                }
            })) : n(o);
        });
    },
    onRefresh: function() {
        this.setData({
            "response.error": !1,
            "response.loading": !0
        }), i.clearCache(), this.getUserInfo(), this._fetchHistory(!0), this._fetchPlaylist(!0);
    },
    onTapCard: function() {
        wx.navigateToMiniProgram({
            appId: "wx040b7318c9e1a48d"
        });
    },
    goToVIP: function() {
        this.data.response.system.indexOf("iOS") > -1 ? this.$route("vipflow") : this.$route("vip?aid=V0$$4:3");
    },
    onTapAvatar: function() {
        this.showActionModal();
    },
    onActionModalConfirm: function() {
        "wx" == this.data.user.loginType ? i.qqLogin() : i.refreshLogin(null, !1, "wx"), 
        this.hideActionModal();
    }
});