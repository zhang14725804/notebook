function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var a = getApp();

a.createPage([ {
    methodOptions: {
        e_chat: {
            type: "goto"
        }
    },
    data: {
        pageType: "list",
        pageName: "rommate",
        userInfo: {},
        rommateList: [],
        hasMore: !0,
        params: {
            infoId: "",
            index: 1
        }
    },
    _onLoad: function(t) {
        this.data.params.infoId = t.infoId, this.getRommateList();
    },
    _onShow: function() {},
    lower: function(t) {
        var e = this.data.hasMore;
        e ? e && this.getRommateList() : a.toast("没有更多信息了", {
            duration: 1500
        });
    },
    getRommateList: function() {
        var e = this;
        a.toast("加载中", {
            duration: 1e3,
            icon: "loading"
        }), a.request(a.pathData.rommate.ROMMATE_LIST, this.data.params).then(function(o) {
            var r = o.error ? o.data : o;
            if (0 === r.code) {
                var n = o.data || [];
                n.length && (n.filter(function(t, a) {
                    t.pic = "https://pic" + (Math.floor(7 * Math.random()) + 1) + ".58cdn.com.cn" + t.pic;
                }), e.data.params.index++, e.setDataLazy({
                    rommateList: [].concat(t(e.data.rommateList), t(n))
                }));
            }
            1 === r.code && (e.data.hasMore = !1, a.toast("没有更多信息了", {
                duration: 1e3
            })), 2 === r.code && a.toast("网络错误", {
                duration: 1e3
            });
        });
    },
    $e_chat: a.throttle(1e3, function(t) {
        var a = t.currentTarget.dataset.userId;
        if (this.data.userInfo.userId) this.goToChat(a); else {
            var e = this;
            this.getUserInfo(function() {
                e.goToChat(a);
            });
        }
    }),
    goToChat: function(t) {
        t !== this.data.userInfo.userId ? a.eventHandle.emit("check-setting", function() {
            a.eventHandle.emit("goto-chat", {
                userId: t
            });
        }) : a.toast("无法与自己聊天哦", {
            duration: 1e3
        });
    },
    getUserInfo: function(t) {
        var e = this, o = a.storage.getSync(a.constData.PROFILE_KEY), r = a.storage.getSync(a.constData.PPU_KEY), n = r && r.match(/(?!=UID=)(\d+)(?!=&)/), s = n && n[0];
        o && s ? this.setUserInfo(o, s, t) : a.request("/user/profile").then(function(o) {
            if (!o.error) {
                if (!s) {
                    var r = a.storage.getSync(a.constData.PPU_KEY), n = r && r.match(/(?!=UID=)(\d+)(?!=&)/);
                    s = n && n[0];
                }
                e.setUserInfo(o.data, s, t);
            }
        });
    },
    setUserInfo: function(t, a, e) {
        var o = t;
        o.userId = parseInt(a), o.pic = "https://pic3.58cdn.com.cn" + o.pic, this.data.userInfo = o, 
        e && e();
    }
} ]);