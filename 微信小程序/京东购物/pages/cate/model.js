function r(r) {
    var e = {};
    if (!r || !r.length) return e;
    var t = !0, o = !1, n = void 0;
    try {
        for (var i, a = r[Symbol.iterator](); !(t = (i = a.next()).done); t = !0) {
            var s = i.value;
            if (s && s.groupid) {
                var u = {};
                e[s.groupid] = u;
                var c = s.locations;
                if (c && c.length) {
                    var d = !0, l = !1, f = void 0;
                    try {
                        for (var g, m = c[Symbol.iterator](); !(d = (g = m.next()).done); d = !0) {
                            var v = g.value;
                            if (v) {
                                var p = v.plans;
                                p && p.length ? u[v.locationid] = p : u[v.locationid] = [];
                            }
                        }
                    } catch (r) {
                        l = !0, f = r;
                    } finally {
                        try {
                            !d && m.return && m.return();
                        } finally {
                            if (l) throw f;
                        }
                    }
                }
            }
        }
    } catch (r) {
        o = !0, n = r;
    } finally {
        try {
            !t && a.return && a.return();
        } finally {
            if (o) throw n;
        }
    }
    return e;
}

var e = require("../../libs/promise.min.js"), t = require("../../common/utils.js"), o = require("../../common/biz.js"), n = require("../../common/fe_report/usability.js"), i = 441, a = 7;

module.exports = {
    getCateData: function() {
        return new e(function(r, e) {
            wx.$.request.get({
                url: "https://wq.360buyimg.com/data/coss/keyword/project/mpjsmpv1117.jsonp",
                speedPointId: 2,
                expire: "12h"
            }).then(function(o) {
                var s = o.body, u = s.errCode, c = s.keywordAreas, d = c && Array.isArray(c) && c.length;
                0 == u && d ? r(c) : e(t.genErrMsg("数据异常，请稍候再试", u)), n.umpBiz({
                    bizid: i,
                    operation: a,
                    result: ~~u,
                    message: ""
                });
            }, function(r) {
                var o = r.code, s = r.message;
                e(t.genErrMsg(s, o)), n.umpBiz({
                    bizid: i,
                    operation: a,
                    result: ~~o,
                    message: s
                });
            });
        });
    },
    getCpcData: function(t, o) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
        return new e(function(e, i) {
            var a = t.join("|"), s = o.map(function(r) {
                return r + ":" + (n[r] || 1);
            }).join(",");
            wx.$.request.get({
                url: "https://wqcoss.jd.com/mcoss/focusbi/show_new",
                data: {
                    gids: a,
                    pcs: s
                }
            }).then(function(t) {
                var o = t.body;
                0 == o.errCode ? e(r(o.list || [])) : i({
                    code: o.errCode,
                    message: o.msg
                });
            }, function(r) {
                i(r);
            });
        });
    },
    getBlockConfig: function() {
        var r = getApp(), t = "", n = "";
        return r && 1019 != r.scene ? e.resolve({
            areaId: t,
            keywordId: n
        }) : new e(function(r, e) {
            o.getPPMS(34262).then(function(e) {
                e.forEach(function(r) {
                    t += r.areaId + ",", n += r.keywordId + ",";
                }), r({
                    areaId: t,
                    keywordId: n
                });
            }).catch(function(e) {
                r({
                    areaId: t,
                    keywordId: n
                });
            });
        });
    }
};