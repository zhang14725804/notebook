var t = function() {
    function t(t, a) {
        var i = [], e = !0, n = !1, r = void 0;
        try {
            for (var o, s = t[Symbol.iterator](); !(e = (o = s.next()).done) && (i.push(o.value), 
            !a || i.length !== a); e = !0) ;
        } catch (t) {
            n = !0, r = t;
        } finally {
            try {
                !e && s.return && s.return();
            } finally {
                if (n) throw r;
            }
        }
        return i;
    }
    return function(a, i) {
        if (Array.isArray(a)) return a;
        if (Symbol.iterator in Object(a)) return t(a, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}();

Component({
    properties: {
        asideData: {
            type: Object,
            value: null,
            observer: function(t) {
                t && this.initAside(t);
            }
        },
        asideShow: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                this.data.asideData && (t ? this.show() : this.hidden());
            }
        },
        showHalf: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                this.data.asideData && (t ? this.half() : this.show());
            }
        }
    },
    data: {
        animationClass: "hidden",
        aside: !0,
        right: "-100"
    },
    methods: {
        show: function() {
            this.setData({
                animationClass: "show",
                right: 0
            });
        },
        hidden: function() {
            this.setData({
                animationClass: "hidden",
                right: -this.data.asideData.width
            });
        },
        half: function() {
            this.setData({
                animationClass: "half",
                right: -this.data.asideData.halfHiddenWidth
            });
        },
        initAside: function(t) {
            if (!this.checkAside(t)) return this.setData({
                asideShow: !1
            }), !1;
            this.initAsideSize(t);
        },
        initAsideSize: function(t) {
            t.width || (t.width = 100), t.halfShowWidth || (t.halfShowWidth = Number(t.width) / 2), 
            t.toBottom || (t.toBottom = 200), t.halfHiddenWidth = t.width - t.halfShowWidth;
        },
        initLxData: function(t) {
            var a = t.track;
            if (a) {
                var i = this.data.trackData, e = this.getUser();
                for (var n in a) {
                    var r = {};
                    r.bid = a[n].bid;
                    var o = a[n].val_lab;
                    for (var s in e) e[s] && o[s] && (o[s] = e[s]);
                    r.val_lab = o, i[n] = r;
                }
            }
        },
        lxTrack: function(t) {
            var a = {
                clickTrack: "moduleClick",
                viewTrack: "moduleView"
            }, i = this.data.trackData[t], e = a[t];
            i && i.bid && e && lx[e](i.bid, i.val_lab);
        },
        getUser: function() {
            var t = getApp().$user;
            return {
                token: t.token,
                userId: t.userId,
                openId: t.openId
            };
        },
        checkAside: function(t) {
            return Boolean(t.name && t.vaild && t.imgSrc) && this.checkResourceShowPolicy(t);
        },
        preventD: function() {
            return !1;
        },
        imgClick: function() {
            var t = this.data.asideData.name;
            this.data.asideData.linkMask ? this.asideClose(t) : this.data.asideData.path && this.jump(this.data.asideData.path);
        },
        jump: function(t) {
            t && wx.navigateTo({
                url: t
            });
        },
        asideClose: function(t) {
            this.triggerEvent("asideClose", {
                asideName: t
            });
        },
        checkResourceShowPolicy: function(t) {
            var a = this, i = t.openType || "always", e = t.type;
            return (0, {
                always: function(t) {
                    return !0;
                },
                day: function(t) {
                    var i = a.getShowPolicyStorge(t);
                    if (!i) return !0;
                    var e = i.date && i.date !== new Date().toLocaleDateString(), n = i.policy && "day" === i.policy;
                    return e || !n;
                },
                once: function(t) {
                    return !a.getShowPolicyStorge(t);
                }
            }[i])(e);
        },
        getShowPolicyStorge: function(a) {
            var i = wx.getStorageSync("indexResourceState");
            if (!i) return !1;
            var e = i.name.split("_"), n = t(e, 2), r = n[0], o = n[1];
            return r && o && {
                policy: r,
                date: o
            };
        }
    }
});