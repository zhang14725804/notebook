var e = require("./module/reporter/index"), t = require("./controller-video/index"), o = require("./controller-live/index"), n = require("./util/platform-config").APP_NAME, r = module.exports = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = r.from, a = void 0 === r.autoplay || r.autoplay, d = r.defn || "", f = void 0 !== r.noad && !!r.noad, p = r.chid || void 0, c = "function" == typeof r.getReportParam ? r.getReportParam : "function" == typeof r.getLoginData ? function(e) {
        r.getLoginData(function(t, o) {
            o.hc_openid = o.openid, delete o.openid, e(t, o);
        });
    } : function(e) {
        return e();
    }, u = e.vid;
    "string" == typeof e && (u = e);
    var l, v = e.cid || "", s = e.sid, g = e.pid;
    return l = u ? t({
        vid: u,
        cid: v,
        from: i,
        chid: p,
        defn: d,
        noad: f
    }, {
        onBeforeGetinfo: r.onBeforeGetinfo,
        getReportParam: function(e) {
            c(function(t, o) {
                o && (o.appname = n[i]), e(t, o);
            });
        }
    }) : o({
        sid: s,
        pid: g,
        from: i,
        defn: d,
        noad: f
    }, {
        getReportParam: function(e) {
            c(function(t, o) {
                o && (o.appname = n[i]), e(t, o);
            });
        }
    }), a && l.start(), l;
};

r.on = function(t) {
    "report" == t && (e.off("report"), e.on.apply(e, arguments));
}, r.release = e.release, r.saveState = e.saveState, r.restoreState = e.restoreState, 
r.checkState = e.checkState;