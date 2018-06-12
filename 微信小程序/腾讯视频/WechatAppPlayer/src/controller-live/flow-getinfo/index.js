var e = require("../../util/platform-config").APP_PLATFORM, i = require("../../../lib-inject").request, r = require("../../module/cache"), t = require("../../lib/algorithm/qvsec"), o = require("../../lib/algorithm/fillTimeStamp"), n = r.get("tvp_guid");

n || (n = Math.random().toString(16).substring(2), r.set("tvp_guid", n)), module.exports = function(r, u, m, d) {
    var l = o(), q = t["v4138" == m ? "$xxzb" : "$xxzbf"](e[m], r, 1, 1, l), s = "";
    return q && (s = "encver=" + ("v4138" == m ? "201" : "301") + "&_qv_rmtv2=" + q), 
    i("https://info.zb.video.qq.com/?host=qq.com&cmd=2&qq=0&guid=" + n + "&appVer=7&stream=2&ip=&system=1&sdtfrom=" + e[m] + "&livepid=" + u + "&cnlid=" + r + "&_rnd=" + l + "&" + s + (d ? "&defn=" + d + "&fntick=" + Date.now() : ""), {
        needlogin: !0
    });
};