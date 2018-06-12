function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../actions/index")), a = e(require("../../../common/utils/util")), i = e(require("../../../common/user/user")), o = e(require("../../../common/login/constant")), r = require("../../../common/form/form");

exports.default = {
    showShare: function() {
        var e = this;
        if (!wx.canIUse || !wx.canIUse("button.open-type.share")) {
            clearTimeout(this.showShare.time), this.store.dispatch(t.default.showShare()), this.showShare.time = setTimeout(function() {
                e.store.dispatch(t.default.hideShare());
            }, 1e3);
        }
    },
    switchRate: function(e) {
        this.store.dispatch(t.default.switchRate());
    },
    switchCollectForm: function(e) {
        var t = e.detail.formId, a = e.currentTarget.dataset.rseat || "";
        (0, r.collectFormIdMuti)(t, a);
    },
    textRate: function(e) {
        var a = e.currentTarget.dataset.rate, i = this.store.getState().videoControl.rate;
        this.store.dispatch(t.default.setRate(a)), this.switchRateVideo(a, i);
    },
    switchRateVideo: function(e, t) {
        var a = this;
        e !== t && (this.player.pause(), this.playVideo(this.store.getState().playInfo, !1, !0).then(function() {
            var e = a.currentTime;
            a.player.seek(e), a.seek.firstPlay = !1;
        }));
    },
    collectAlbum: function(e, t, r, s, n) {
        var u = i.default.isLogin() ? i.default.getAuthcookie() : "", c = i.default.isLogin() ? "" : i.default.getAnonymousUid(), d = i.default.isLogin() ? a.default.md5(u) : c, l = {
            authcookie: u,
            ckuid: c,
            subType: e,
            subKey: t,
            agent_type: o.default.agenttype,
            channelId: r,
            antiCsrf: n ? d : ""
        };
        return new Promise(function(e, t) {
            wx.request({
                url: s,
                data: l,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(a) {
                    var i = a.data;
                    i && "A00000" == i.code ? e(i) : t(i);
                },
                fail: function(e) {
                    t(e);
                }
            });
        });
    }
};