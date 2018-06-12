function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

var t = function() {
    function e(e, t) {
        var r = [], n = !0, o = !1, i = void 0;
        try {
            for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (r.push(a.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            o = !0, i = e;
        } finally {
            try {
                !n && s.return && s.return();
            } finally {
                if (o) throw i;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), r = require("../../components_618/constant"), n = require("../../../../bases/component.js"), o = require("../../../../common/cookie-v2/cookie.js").getCookie, i = require("../common-behavior.js"), a = require("../../../../libs/promise.min.js"), s = require("../../model.js"), c = require("../../utils.js");

new n({
    behaviors: [ i ],
    properties: {
        iconConfig: {
            type: "Object",
            observer: function(e) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(e);
            }
        },
        freshmenData: {
            type: Object,
            observer: function(e) {
                var t = void 0;
                t = 1 == e.isnew, this.getFreshmenDataResolve && this.getFreshmenDataResolve(t);
            }
        }
    },
    data: {
        entries: [],
        hideModule: !1,
        decorated: !1
    },
    methods: {
        refresh: function() {
            var n = this;
            c.checkTime(r.SALE_BEGIN, r.SALE_END) ? this.setData({
                decorated: !0
            }) : this.data.decorated && this.setData({
                decorated: !1
            }), a.all([ this.getPPMSData(), this.getFreshmenData() ]).then(function(e) {
                var r = t(e, 2), o = r[0], i = r[1];
                if (!(o && o.static && o.user && o.category)) return a.reject();
                var s = n.processNormal(o.static[0]), c = n.processUser(o.user[0], i), u = o.themeConfig, l = "", h = "", g = !1;
                return u && (u.entrysBG || u.entrysBgImg || u.entrysColor) && (u.entrysBG && (g = !0), 
                l = n.utils.getImg(u.entrysBG || u.entrysBgImg) || "", h = u.entrysColor || ""), 
                a.all([ n.getFloorSort(o.category[0]), a.resolve(s), a.resolve(c), a.resolve({
                    bg: l,
                    textColor: h,
                    hideIcons: g
                }) ]);
            }).then(function(r) {
                var i = t(r, 4), s = i[0], c = s.category, u = s.backup, l = i[1], h = i[2], g = i[3], f = [].concat(e(l), e(h), e(c), e(u));
                if ((f = f.slice(0, 9)).push({
                    name: "全部频道",
                    imgUrl: "http://img11.360buyimg.com/jdphoto/s72x72_jfs/t5464/343/153957419/1893/b053bdb7/58f9ac43N7784d188.png",
                    jumpUrl: "https://wqs.jd.com/portal/wx/category_indexv5.shtml?ptag=138067.7.1"
                }), f.forEach(function(e) {
                    e.imgUrl = n.utils.getImg(e.imgUrl);
                    var t = e.vkJumpUrl, r = e.vk;
                    if (t && r) {
                        var i = o("visitkey"), a = parseInt(i.slice(-2)) + 1, s = parseInt(r);
                        (100 === s || s > 0 && s <= 100 && a <= s) && (e.jumpUrl = t);
                    }
                }), !f.length) return a.reject();
                n.setData({
                    entries: f,
                    bg: g.bg,
                    textColor: g.textColor,
                    hideIcons: g.hideIcons,
                    hideModule: !1
                }, function() {
                    return n.triggerEvent("componentLoad", n.is);
                });
            }).catch(function(e) {
                n.setData({
                    hideModule: !0
                }), n.triggerEvent("componentLoad", n.is);
            });
        },
        getPPMSData: function() {
            var e = this;
            return new a(function(t, r) {
                e.getPPMSDataResolve = t;
            });
        },
        getFreshmenData: function() {
            var e = this;
            return new a(function(t) {
                e.getFreshmenDataResolve = t;
            });
        },
        getFloorSort: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.pid, r = e.items, n = parseInt(e.pc);
            return isNaN(n) || n < 0 || !t || !r.length ? a.resolve({
                category: [],
                backup: []
            }) : s.getFloorSort(t).then(function(e) {
                var r = [];
                return e.some(function(e) {
                    if (e.proid == t) return r = e.floor, !0;
                }), r.map(function(e) {
                    return e.floorid;
                });
            }).then(function(e) {
                var t = [];
                return e.forEach(function(e) {
                    r.some(function(r) {
                        if (r.fid == e && c.checkTime(r.begin, r.end)) return t.push(r), !0;
                    });
                }), {
                    category: t.splice(0, n),
                    backup: t
                };
            }).catch(function(e) {
                return {
                    category: [],
                    backup: []
                };
            });
        },
        processNormal: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.items, r = parseInt(e.pc), n = [];
            return n = t.filter(function(e) {
                if (c.checkTime(e.begin, e.end)) return !0;
            }), !isNaN(r) && r >= 0 && (n = n.slice(0, r)), n;
        },
        processUser: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], r = e.items, n = parseInt(e.pc), o = [];
            return o = r.filter(function(e) {
                return !!c.checkTime(e.begin, e.end) && (!(!t || "1" != e.level) || (!t && "1" != e.level || void 0));
            }), !isNaN(n) && n >= 0 && (o = o.slice(0, n)), o;
        },
        tapOnItem: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        }
    }
});