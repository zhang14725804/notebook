var e = function() {
    function e(e, t) {
        var n = [], i = !0, a = !1, r = void 0;
        try {
            for (var o, s = e[Symbol.iterator](); !(i = (o = s.next()).done) && (n.push(o.value), 
            !t || n.length !== t); i = !0) ;
        } catch (e) {
            a = !0, r = e;
        } finally {
            try {
                !i && s.return && s.return();
            } finally {
                if (a) throw r;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), t = require("../../../../bases/component.js"), n = require("../common-behavior.js"), i = require("../../../../libs/promise.min.js"), a = require("../../../../common/localStorage.js"), r = require("../../utils.js");

new t({
    behaviors: [ n ],
    properties: {
        channelConfig: {
            type: Object,
            observer: function(e) {
                this.ppmsPromiseResolve && this.ppmsPromiseResolve(e);
            }
        },
        birthConfig: {
            type: Object,
            observer: function(e) {
                var t = this;
                if (!e.bannerImg) return this.getBirthBannerResolve({});
                a.get("index_birth_icon_decorated", null).then(function(n) {
                    t.getBirthBannerResolve && (n ? t.getBirthBannerResolve({}) : t.getBirthBannerResolve(e));
                });
            }
        }
    },
    data: {
        entries: []
    },
    attached: function() {
        var e = this;
        getApp().event.on("updateCustomChannels", function() {
            a.get("customChannels", []).then(function(t) {
                return e.handleData(t, e.ppmsDataCache, e.configCache, e.birthConfigCache);
            });
        });
    },
    detached: function() {
        getApp().event.off("updateCustomChannels");
    },
    methods: {
        refresh: function() {
            var t = this;
            i.all([ a.get("customChannels", []), this.biz.getPPMS(33542), this.getPPMSConfig(), this.getBirthBanner() ]).then(function(n) {
                var i = e(n, 4), a = i[0], r = i[1], o = i[2], s = i[3];
                return t.handleData(a, r, o, s);
            }).catch(function(e) {
                e.code, e.message;
                t.triggerEvent("componentLoad", t.is);
            });
        },
        handleData: function(e, t, n, i) {
            var o = this, s = [], c = [], p = void 0;
            this.ppmsDataCache = t, this.configCache = n, this.birthConfigCache = i, t.forEach(function(t) {
                -1 == t.link.indexOf("wallet_special.shtml") && "定制频道" != t.title || !r.checkTime(t.begin, t.end) ? r.checkTime(t.begin, t.end) && (-1 != e.findIndex(function(e) {
                    return e == t.title;
                }) ? s.push(o.processData(t)) : c.push(o.processData(t))) : p = o.processData(t);
            }), p || (p = this.getDefaultCustomPageEntrance());
            var h = 4 - (s = s.slice(0, 4)).length;
            h > 0 && c.sort(function(e, t) {
                return e.id - t.id > 0 ? 1 : -1;
            });
            var u = s.concat(c.slice(0, h)).concat([ p ]), g = null, l = null;
            i.iconImg && (n.image = i.iconImg, n.type = "cover", a.set("index_birth_icon_decorated", "true", {
                expire: "1d"
            })), n.image && (g = this.utils.getImg(n.image), n.fc && 7 == n.fc.length && "#" == n.fc[0] && (l = n.fc), 
            "cover" === n.type && (u.forEach(function(e) {
                e.image = "";
            }), n.icon && n.iconPos && (u[n.iconPos].coverImage = this.utils.getImg(n.icon, 72)))), 
            this.setData({
                entries: u,
                bg: g,
                fc: l
            }, function() {
                return o.triggerEvent("componentLoad", o.is);
            });
        },
        processData: function(e) {
            var t = {
                name: e.title,
                image: this.utils.getImg(e.image, 72),
                id: e.id
            };
            return r.greyScale(e.percentage) ? e.wxappPath ? (t.wxappPath = e.wxappPath, t.wxappRd = e.wxappRD) : e.link2 ? t.url = e.link2 : e.appID && e.appPath && (t.appID = e.appID, 
            t.appPath = e.appPath, t.appRd = e.appRD) : t.url = e.link, t;
        },
        tapOnItem: function(e) {
            var t = e.currentTarget.dataset, n = t.url, i = t.index, a = t.appId, o = t.appPath, s = t.appRd, c = t.wxappPath, p = t.wxappRd;
            i < 4 ? c ? this.$goto(c, {
                ptag: p || ""
            }) : a && o ? (wx.navigateToMiniProgram({
                appId: a,
                path: o
            }), s && r.report(s)) : this.$goto("/pages/h5/index", {
                url: n
            }) : this.$goto("/pages/index/subpack/special/special", {
                ptag: this.utils.getUrlParam("ptag", n)
            });
        },
        getPPMSConfig: function() {
            var e = this, t = new i(function(t, n) {
                e.ppmsPromiseResolve = t;
            });
            return setTimeout(function() {
                1 != t._state && e.ppmsPromiseResolve({});
            }, 5e3), t;
        },
        getBirthBanner: function() {
            var e = this;
            return new i(function(t) {
                e.getBirthBannerResolve = t;
            });
        },
        getDefaultCustomPageEntrance: function() {
            return {
                name: "定制频道",
                image: this.utils.getImg("//img11.360buyimg.com/jdphoto/jfs/t10291/320/1738108667/1725/9706ea17/59e5b42eN6530aacf.png", 80),
                url: ""
            };
        }
    }
});