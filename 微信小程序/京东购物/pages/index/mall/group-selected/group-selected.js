function t(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var e = require("../../../../bases/component.js"), o = require("../../../../libs/promise.min.js"), r = require("../common-behavior.js"), n = require("../../model.js"), i = require("../../utils.js");

new e({
    behaviors: [ r ],
    data: {
        firstItem: {},
        items: [],
        keywords: [],
        coupon: ""
    },
    methods: {
        refresh: function() {
            this.loadEntryData();
        },
        loadEntryData: function() {
            var t = this;
            this.getEntryData().then(function(e) {
                var r = e.items, n = e.firstItem;
                t.setData({
                    items: r,
                    firstItem: n
                }), o.all([ t.getLogoData(n.gid, n.locationid), t.getKeywordData(n.ruleid), t.getCouponData(n.id) ]).then(function(e) {
                    var o = e[0].entries, r = e[1].entries, i = e[2].coupon_discount;
                    o.forEach(function(t) {
                        t.url = n.logoUrl + "&gid=" + n.gid + "&locationid=" + n.locationid + "&shopid=" + t.shopId;
                    }), r.forEach(function(t) {
                        t.url = n.keywordUrl + "&wordid=" + t.wordid;
                    });
                    var u = o.concat(r);
                    u.splice(3), t.setData({
                        keywords: u,
                        coupon: i || ""
                    });
                }).catch(function(t) {
                    return console.log("selected data error", t);
                });
            }).catch(function(t) {
                return console.log("selected error", t);
            });
        },
        getEntryData: function() {
            var t = this;
            return n.getEntryData(295, 11).then(function(e) {
                var o = [], r = {};
                return e.forEach(function(e, n) {
                    if (0 == n) {
                        var i = [];
                        e.list.forEach(function(e, o) {
                            var n = e.url, u = t.utils.getUrlParam("ptag", n), a = u.split(".")[2];
                            i.push({
                                cover: t.utils.getImg(e.img, 200),
                                url: n.replace(u, u.replace(a, Number(a) + 3))
                            }), i.splice(2), 0 == o && (r.titleUrl = n, r.couponUrl = n.replace(u, u.replace(a, Number(a) + 1)), 
                            r.logoUrl = n.replace(u, u.replace(a, Number(a) + 2)), r.keywordUrl = n.replace(u, u.replace(a, Number(a) + 4)));
                        }), r.title = e.martname, r.des = e.list[0].content, r.images = i, r.id = e.id, 
                        r.ruleid = e.ext1, r.gid = e.ext2.split("+")[0], r.locationid = e.ext2.split("+")[1];
                    } else {
                        var u = [];
                        e.list.forEach(function(e) {
                            u.push({
                                cover: t.utils.getImg(e.img, 148),
                                url: e.url
                            });
                        }), u.splice(2), o.push({
                            title: e.martname,
                            des: e.list[0].content,
                            images: u
                        });
                    }
                }), {
                    firstItem: r,
                    items: o
                };
            });
        },
        getLogoData: function(e, o) {
            var r = this, i = [];
            return e && o ? n.getCpcData([ e ], [ o ], t({}, o, 3)).then(function(t) {
                return t[e] && t[e][o].forEach(function(t) {
                    "" == !t.material && i.push({
                        image: r.utils.getImg(t.material, 120, 60),
                        shopId: t.materialdesc
                    });
                }), {
                    entries: i
                };
            }).catch(function(t) {
                return console.log("selected getLogoData error", t);
            }) : {
                entries: i
            };
        },
        getKeywordData: function(t) {
            var e = [];
            return t ? n.getKeywordData(t, 1, 3).then(function(t) {
                return t.list.forEach(function(t) {
                    "" == !t.keyword && e.push({
                        text: t.keyword,
                        wordid: t.wordid
                    });
                }), {
                    entries: e
                };
            }).catch(function(t) {
                return console.log("selected getKeywordData error", t);
            }) : {
                entries: e
            };
        },
        getCouponData: function(t) {
            return this.biz.getPPMS(31232).then(function(e) {
                var o = [ 0, 6408, 6415, 6401, 6413, 6414, 6416, 6411, 6409, 6410, 6404, 6403, 6396, 6399, 6400, 6397, 6405, 6412, 6402, 6406, 6398, 0, 6803, 6804 ], r = [];
                e.filter(function(t) {
                    return i.checkTime(t.begtime, t.endtime);
                }).forEach(function(e) {
                    e.couponList.forEach(function(e) {
                        e.itemType = "coupon";
                        for (var n = e.ConstraintTime.split("-"), u = e.relatedMuseum.split(";"), a = !1, c = 0; c < u.length; c++) if (o[u[c]] == t) {
                            a = !0;
                            break;
                        }
                        a && i.checkTime(n[0], n[1]) && (1 == e.couponKind || 0 == e.couponKind) && r.push(e);
                    }), e.freeCouponList.forEach(function(e) {
                        e.itemType = "freeCoupon";
                        for (var n = e.relatedMuseum.split(";"), u = !1, a = 0; a < n.length; a++) if (o[n[a]] == t) {
                            u = !0;
                            break;
                        }
                        u && i.checkTime(e.couponBeginTime, e.couponEndTime) && (1 == e.couponKind || 0 == e.couponKind) && r.push(e);
                    });
                });
                var n = [], u = [], a = [], c = [];
                r.forEach(function(t) {
                    if ("coupon" == t.itemType) {
                        var e = t.DiscountQuota.split(",");
                        t.discount = e[0], t.quota = e[1];
                    }
                    t.agio = t.discount / t.quota, 0 == t.couponType ? n.push(t) : 2 == t.couponType ? u.push(t) : 1 == t.couponType && (0 == t.couponKind ? c.push(t) : 1 == t.couponKind && a.push(t));
                });
                var s = n.sort(function(t, e) {
                    return e.discount - t.discount;
                })[0], l = u[0], d = a.sort(function(t, e) {
                    return e.agio - t.agio;
                })[0], p = c.sort(function(t, e) {
                    return e.agio - t.agio;
                })[0], f = s || l || d || p || {}, g = void 0;
                return f.discount && (g = "￥" + f.discount), {
                    coupon_discount: g
                };
            });
        },
        gotoUrl: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            });
        }
    }
});