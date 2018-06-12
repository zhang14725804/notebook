function t(t) {
    for (var i = [ "", "K", "M", "G", "T" ], e = 0; t > 1024; ) t = Math.floor(t / 1024), 
    e++;
    return t + i[e];
}

var i = require("../lib/player-vip-text"), e = require("../../../module/request/request"), a = wx.getSystemInfoSync().system.match(/android/i);

module.exports = {
    data: [ "videoContext", "isvip", "network", "detail", "getinforaw", "autoplay" ],
    controller: function(r, o) {
        var l = o.isvip, n = o.detail, p = o.network, s = o.getinforaw, u = o.autoplay, f = n.tryPlayTime ? Math.floor(n.tryPlayTime / 60) : 0, y = s.fl.fi.filter(function(t) {
            return +t.sl;
        })[0].fs, m = s.vl.vi[0].ch, v = null;
        v = 8 != n.payStatus && +m < 1 ? s.preview ? "stop" : "limit" : "playing", "wifi" != p && "limit" != v && (v = "stop"), 
        u && "limit" != v && (v = "playing"), "playing" == v && r.start(), r.emit("plugin-layer", v, {
            preview: 8 != n.payStatus && +m < 1 ? s.preview : 0,
            posterImage: n.poster.imageUrl,
            fileSize: t(y),
            vipText: i(l, a, n.payStatus),
            btnText: "试看" + f + "分钟",
            iswifi: "wifi" == p,
            isvip: l
        }), "4g" == p && e.get("https://vv.video.qq.com/checktime?otype=json").then(function(t) {
            t.data && t.data.pos && -1 != t.data.pos.indexOf("联通") && r.emit("plugin-layer", null, {
                unicom: !0
            });
        });
    }
};