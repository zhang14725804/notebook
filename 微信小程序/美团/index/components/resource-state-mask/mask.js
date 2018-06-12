var t = function() {
    function t(t, a) {
        var e = [], i = !0, n = !1, o = void 0;
        try {
            for (var r, s = t[Symbol.iterator](); !(i = (r = s.next()).done) && (e.push(r.value), 
            !a || e.length !== a); i = !0) ;
        } catch (t) {
            n = !0, o = t;
        } finally {
            try {
                !i && s.return && s.return();
            } finally {
                if (n) throw o;
            }
        }
        return e;
    }
    return function(a, e) {
        if (Array.isArray(a)) return a;
        if (Symbol.iterator in Object(a)) return t(a, e);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), a = require("../../../utils/lx.js"), e = require("../../../config.js");

Component({
    properties: {
        maskShow: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                this.data.canUse && (t ? this.show() : this.hidden());
            }
        },
        maskData: {
            type: Object,
            value: null,
            observer: function(t) {
                this.initMask(t);
            }
        },
        maskVaild: {
            type: Boolean,
            value: !0,
            observer: function(t) {
                this.data.canUse = t;
            }
        }
    },
    data: {
        animationClass: "show",
        show: !1,
        canUse: !0,
        needAwakeAside: !1,
        trackData: {}
    },
    methods: {
        initMask: function(t) {
            if (!this.checkMask(t)) return !1;
            var a = this.checkIsLinkAside(t);
            this.handleShowPolicy(t, a) && (this.setShowPolicy(), this.initBackground(t), this.initLxData(t), 
            this.lxTrack("viewTrack"));
        },
        checkIsLinkAside: function(t) {
            return Boolean(t.linkAside);
        },
        checkMask: function(t) {
            return Boolean(t.name && t.vaild && t.imgSrc);
        },
        initBackground: function(t) {
            var a = (t.background || {}).color, e = void 0 === a ? "rgba(0, 0, 0, 0)" : a;
            this.setData({
                background: {
                    bgColor: e
                }
            });
        },
        handleShowPolicy: function(t, a) {
            var e = this, i = t.openType || "always", n = t.name, o = (0, {
                always: function(t) {
                    return {};
                },
                day: function(t) {
                    var a = e.getShowPolicy(t);
                    if (!a) return {};
                    var i = a.date && a.date !== new Date().toLocaleDateString(), n = a.policy && "day" === a.policy;
                    return {
                        needAwakeAside: !n || i,
                        canUse: !n || i
                    };
                },
                firstMask: function(t) {
                    var a = e.getShowPolicy(t);
                    return a ? {
                        needAwakeAside: !(a.date && a.date !== new Date().toLocaleDateString()),
                        callback: function() {
                            e.hidden(!0);
                        }
                    } : {};
                },
                aside: function(t) {
                    return {
                        callback: function() {
                            e.hidden(!0);
                        }
                    };
                },
                once: function(t) {
                    var a = e.getShowPolicyStorge(t);
                    return {
                        needAwakeAside: !a,
                        canUse: !a
                    };
                }
            }[i])(n), r = {
                canUse: Boolean(o.canUse || !0),
                needAwakeAside: Boolean(a && (o.needAwakeAside || !0))
            };
            return this.setData(r), o.callback && o.callback(), r.canUse;
        },
        initLxData: function(t) {
            var a = t.track;
            if (a) {
                var e = this.data.trackData, i = this.getUser();
                for (var n in a) {
                    var o = {};
                    o.bid = a[n].bid;
                    var r = a[n].val_lab;
                    if (i.token) for (var s in i) i[s] && r[s] && (r[s] = i[s]);
                    o.val_lab = r, e[n] = o;
                }
            }
        },
        imgClick: function() {
            this.lxTrack("clickTrack");
            var t = this.data.maskData, a = t.type, i = t.path, n = t.miniapp, o = void 0 === n ? {} : n;
            if ("miniapp" === a) try {
                wx.canIUse("navigateToMiniProgram") && wx.navigateToMiniProgram({
                    appId: e[o.id] || o.appid,
                    path: o.path,
                    extraData: o.extraData || {},
                    success: function(t) {
                        console.log("跳转至小程序成功===>", t);
                    },
                    fail: function(t) {
                        console.log("跳转至小程序失败===>", t);
                    }
                });
            } catch (t) {
                console.log(t), wx.showModal({
                    title: "提示信息",
                    content: "微信版本太低，请下载最新版查看该服务。",
                    showCancel: !1
                });
            } else wx.navigateTo({
                url: i
            });
            this.close();
        },
        close: function(t) {
            this.lxTrack("closeTrack"), this.hidden();
        },
        lxTrack: function(t) {
            var e = {
                clickTrack: "moduleClick",
                closeTrack: "moduleClick",
                viewTrack: "moduleView"
            }, i = this.data.trackData[t], n = e[t];
            i && i.bid && n && a[n](i.bid, i.val_lab);
        },
        show: function() {
            var t = this;
            this.setData({
                show: !0
            }), setTimeout(function() {
                t.setData({
                    animationClass: "show"
                });
            }, 0);
        },
        hidden: function(t) {
            var a = this;
            if (t) a.setData({
                show: !1,
                animationClass: "narrow"
            }), a.triggerMaskClose(); else {
                Number(this.data.maskData.animationDuration);
                this.setData({
                    animationClass: "narrow"
                });
            }
        },
        transitionEnd: function() {
            this.data.show && "show" !== this.data.animationClass && (this.setData({
                show: !1
            }), this.triggerMaskClose());
        },
        triggerMaskClose: function(t) {
            var a = {
                maskName: this.data.maskData.name,
                needAwakeAside: this.data.needAwakeAside
            };
            this.triggerEvent("maskClose", a);
        },
        getUser: function() {
            var t = (getApp() || {}).$user;
            return {
                token: t.token,
                userId: t.userId,
                openId: t.openId
            };
        },
        preventD: function() {
            return !1;
        },
        setShowPolicy: function() {
            var t = this.data.maskData, a = t.openType, e = void 0 === a ? "always" : a, i = t.name, n = e + "_" + new Date().toLocaleDateString(), o = this.getShowPolicyStorge() || {};
            o[i] = n, this.setShowPolicyStorge(o);
        },
        getShowPolicy: function(a) {
            var e = this.getShowPolicyStorge();
            if (!e) return !1;
            var i = e[a] || "";
            if (!i) return null;
            var n = i.split("_"), o = t(n, 2), r = o[0], s = o[1];
            return r && s && {
                policy: r,
                date: s
            };
        },
        setShowPolicyStorge: function(t) {
            wx.setStorage({
                key: "indexResourceState",
                data: t
            });
        },
        getShowPolicyStorge: function(t) {
            return wx.getStorageSync("indexResourceState");
        }
    }
});