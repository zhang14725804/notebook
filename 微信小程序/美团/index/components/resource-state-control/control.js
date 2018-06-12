var e = function() {
    function e(e, a) {
        var t = [], i = !0, s = !1, n = void 0;
        try {
            for (var r, o = e[Symbol.iterator](); !(i = (r = o.next()).done) && (t.push(r.value), 
            !a || t.length !== a); i = !0) ;
        } catch (e) {
            s = !0, n = e;
        } finally {
            try {
                !i && o.return && o.return();
            } finally {
                if (s) throw n;
            }
        }
        return t;
    }
    return function(a, t) {
        if (Array.isArray(a)) return a;
        if (Symbol.iterator in Object(a)) return e(a, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}();

Component({
    properties: {
        resources: {
            type: Object,
            value: null,
            observer: function(e) {
                this.init(e);
            }
        },
        asideHalf: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        maskData: null,
        maskShow: !0,
        asideDate: null,
        asideShow: !1,
        maskVaild: !1,
        maskIndex: 0,
        maskMap: {},
        asideMap: {},
        maskList: []
    },
    methods: {
        maskClose: function(e) {
            var a = e.detail || {}, t = a.maskName, i = a.needAwakeAside;
            this.setData({
                maskShow: !1
            });
            var s = Object.keys(this.data.maskMap), n = s.indexOf(t);
            if (i) {
                var r = this.data.maskMap[t].linkAside;
                r && this.updateAside(r);
            } else if (n >= 0 && n++ < s.length) {
                var o = s[n];
                this.data.maskMap[o];
                this.updateMask(o);
            }
            (-1 === n || !s.length || n >= s.length - 1) && this.setData({
                maskVaild: !1
            });
        },
        asideClose: function(e) {
            this.setData({
                asideShow: !1
            });
            e.detail;
            var a = (this.data.asideData || {}).linkMask;
            a && ((this.data.maskData || {}).name === a ? this.awakeMask(a) : this.updateMask(a));
        },
        awakeMask: function(e) {
            var a = this;
            this.setData({
                maskVaild: !0
            }), setTimeout(function() {
                a.setData({
                    maskShow: !0
                });
            }, 0);
        },
        init: function(e) {
            if (e && Object.keys(e).length) {
                var a = e = this.filterResources(e), t = a.mask, i = (a.aside, this.initResourceMap(e) || {}), s = i.maskResourceMap, n = i.asideResourceMap;
                n = this.filterAsideWidthInvaildMask(s, n);
                var r = this.filterEffectAside(t, n);
                this.setData({
                    maskMap: s,
                    asideMap: n,
                    maskVaild: Boolean(t.length)
                }), this.maskList = t, this.updateMask(t[0] && t[0].name), r && n[r] && !n[r].linkMask && this.updateAside(r);
            }
        },
        updateMask: function(e) {
            e && this.setData({
                maskShow: !0,
                maskData: this.data.maskMap[e] || null
            });
        },
        updateAside: function(e) {
            if (!this.data.asideShow) {
                var a = this.data.asideMap[e];
                a && this.setData({
                    asideData: a,
                    asideShow: !0
                });
            }
        },
        filterAsideWidthInvaildMask: function(e, a) {
            if (!a) return {};
            for (var t in a) {
                var i = a[t].linkMask;
                i && e && !e[i] && delete a[t];
            }
            return a;
        },
        filterEffectAside: function(e, a) {
            var t = "", i = !0, s = !1, n = void 0;
            try {
                for (var r, o = e[Symbol.iterator](); !(i = (r = o.next()).done); i = !0) {
                    var c = r.value, u = c.linkAside, l = c.name;
                    if (u) {
                        var d = a[u] || {};
                        d.linkMask === l && (t = d.linkMask);
                    }
                }
            } catch (e) {
                s = !0, n = e;
            } finally {
                try {
                    !i && o.return && o.return();
                } finally {
                    if (s) throw n;
                }
            }
            if (!t) {
                var h = Object.keys(a);
                t = h && h.length && h.pop();
            }
            return t;
        },
        filterResources: function(e) {
            var a = this, t = e || {}, i = t.mask, s = void 0 === i ? [] : i, n = t.aside, r = void 0 === n ? [] : n;
            return s = s.filter(function(e) {
                return a.checkMaskResource(e);
            }), r = r.filter(function(e) {
                return a.checkAsideResource(e);
            }), {
                mask: s,
                aside: r
            };
        },
        initResourceMap: function(e) {
            var a = e || {}, t = a.mask, i = void 0 === t ? [] : t, s = a.aside, n = void 0 === s ? [] : s, r = {};
            i.map(function(e) {
                e.name && (r[e.name] = e);
            });
            var o = {};
            return n.map(function(e) {
                e.name && (o[e.name] = e);
            }), {
                maskResourceMap: r,
                asideResourceMap: o
            };
        },
        filterEffectiveAside: function() {},
        checkResource: function(e) {
            return Boolean(e.name && e.vaild && e.imgSrc);
        },
        checkMaskResource: function(e) {
            return this.checkResource(e) && this.checkResourceShowPolicy(e) && Boolean(e.path || e.miniapp);
        },
        checkAsideResource: function(e) {
            this.checkResource(e);
            return !!Boolean(e.linkMask) || Boolean(e.path) && this.checkResourceShowPolicy(e);
        },
        checkResourceShowPolicy: function(e) {
            var a = this, t = e.openType || "always", i = e.name, s = {
                always: function(e) {
                    return !0;
                },
                day: function(e) {
                    var t = a.getShowPolicyStorge(e);
                    if (!t) return !0;
                    var i = t.date && t.date !== new Date().toLocaleDateString(), s = t.policy && "day" === t.policy;
                    return i || !s;
                },
                once: function(e) {
                    return !a.getShowPolicyStorge(e);
                }
            };
            return (s[t] || s.always)(i);
        },
        getShowPolicyStorge: function(a) {
            var t = wx.getStorageSync("indexResourceState");
            if (!t) return !1;
            var i = t[a] || "";
            if (!i) return null;
            var s = i.split("_"), n = e(s, 2), r = n[0], o = n[1];
            return r && o && {
                policy: r,
                date: o
            };
        }
    }
});