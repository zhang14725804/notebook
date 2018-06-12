function e(e, r, t) {
    return r in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}

function r(e) {
    if (Array.isArray(e)) {
        for (var r = 0, t = Array(e.length); r < e.length; r++) t[r] = e[r];
        return t;
    }
    return Array.from(e);
}

var t = require("../../../../bases/component.js"), n = require("../../../../libs/promise.min.js"), a = require("../../../../common/utils.js"), i = require("../../model.js");

new t({
    properties: {
        videoConfig: {
            type: Object,
            observer: function(e) {
                this.init(e);
            }
        }
    },
    data: {
        showModule: !0,
        title: "",
        moreDesc: "",
        entries: []
    },
    methods: {
        init: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.getCPCData().then(function(r) {
                var n = r.map(function(r) {
                    var t = "";
                    if (r.sUrl) {
                        var n = /shareid=(\d+)(?:&|$)/.exec(r.sUrl);
                        n && n[1] && (t = n[1]);
                    }
                    var i = r.sUrl.split("?"), o = a.querystr(i[1]);
                    o.query.ptag = "138067.11.8";
                    var u = a.querystr(o.query), s = i[0] + "?" + u + "#" + o.hash;
                    return {
                        title: r.materialdesc,
                        gif: e.utils.getImg(r.materialext1),
                        image: e.utils.getImg(r.material),
                        url: s,
                        shareid: t
                    };
                });
                return e.setData({
                    title: t.title,
                    moreDesc: t.moreDesc,
                    moreUrl: t.moreUrl,
                    showModule: !0,
                    entries: n
                }), {
                    shareids: n.map(function(e) {
                        return e.shareid;
                    }),
                    showCount: t.showCount
                };
            }).then(function(t) {
                var a = t.shareids;
                if (t.showCount) {
                    var o = !0, u = !1, s = void 0;
                    try {
                        for (var l, c = a[Symbol.iterator](); !(o = (l = c.next()).done); o = !0) if (!l.value) return;
                    } catch (e) {
                        u = !0, s = e;
                    } finally {
                        try {
                            !o && c.return && c.return();
                        } finally {
                            if (u) throw s;
                        }
                    }
                    for (var h = []; a.length > 12; ) h.push(i.getActiveFeeds(a.splice(0, 12)));
                    return h.push(i.getActiveFeeds(a)), n.all(h).then(function(e) {
                        var t = [];
                        return e.forEach(function(e) {
                            return t.push.apply(t, r(e));
                        }), t;
                    }).then(function(r) {
                        var t = e.data.entries;
                        t.forEach(function(e) {
                            r.some(function(r) {
                                if (e.shareid === r.shareid && r.playnum) {
                                    var t = r.playnum, n = "";
                                    return t < 1e3 && (n = t), t >= 1e3 && t < 1e5 && (n = Math.floor(t / 1e3) / 10 + "万"), 
                                    t >= 1e5 && (n = Math.floor(t / 1e4) + "万"), e.count = n, !0;
                                }
                            });
                        }), e.setData({
                            entries: t
                        });
                    }).catch(function(e) {
                        return console.log(e);
                    });
                }
            }).catch(function(r) {
                return e.setData({
                    showModule: !1
                });
            });
        },
        getCPCData: function() {
            return i.getCpcData([ 10457 ], [ 27497 ], e({}, 27497, 10), new Date()).then(function(e) {
                return !e[10457] || !e[10457][27497] || e[10457][27497].length < 4 ? n.reject({
                    message: "Fetch cpc data error!"
                }) : e[10457][27497];
            });
        },
        goToH5: function(e) {
            var r = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: r
            });
        }
    }
});