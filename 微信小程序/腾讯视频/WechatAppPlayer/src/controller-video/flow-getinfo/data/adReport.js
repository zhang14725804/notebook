function r(r) {
    var e = r.indexOf("?"), t = new Object(), o = r;
    if (e >= 0) for (var i, n = (o = o.substr(e + 1)).split("&"), l = 0; l < n.length; l++) (i = n[l].split("=")).length > 1 ? t[i[0]] = i[1] : t[i[0]] = "null";
    return t;
}

var e = require("../../../lib/message"), t = (require("../../../module/cache"), 
new e());

(module.exports = {
    updateUrlParam: function(e, t) {
        try {
            var o = r(e), i = e, n = !0;
            if (-1 != e.indexOf("?")) {
                i = e.substring(0, e.indexOf("?"));
                var l;
                for (l in t) o[l] = t[l];
                for (l in o) n ? (n = !1, i += "?" + l + "=" + o[l]) : i += "&" + l + "=" + o[l];
            }
        } catch (r) {
            i = "";
        }
        return i;
    },
    reportDp3: function(r, e, t, o, i, n, l, s) {
        console.log("开始dp3上报");
        var c = "https://dp3.qq.com/stdlog/?bid=weixin&step=" + r + "&merged=" + o + "&errorcode=" + i + "&trycount=" + n + "&openid=" + l;
        c = this.updateUrlParam(c, s);
        try {
            this.pingUrl(c);
        } catch (r) {
            console.log("dp3上报失败");
        }
    },
    reportWisdomPoint: function(r, e, t, o) {
        console.log("开始智慧点上报");
        var i = "https://t.l.qq.com?t=s&actid=" + r;
        i += "&oid=" + e + "&mid=" + t + "&locid=" + o;
        try {
            this.pingUrl(i);
        } catch (r) {}
    },
    pingUrl: function(r, e, o, i) {
        console.log("ping上报地址：" + r);
        var n = new Date().getTime();
        r = this.updateUrlParam(r, {
            reportTime: n
        }), t.emit("report", {
            reportUrl: r
        }), console.log("用message抛出上报事件");
    }
}).reporter = t;