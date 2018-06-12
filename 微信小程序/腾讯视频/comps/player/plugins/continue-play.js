var e, t = require("../../../module/globalData"), o = require("../../../module/dataset/history/index"), i = wx.getSystemInfoSync().system.match(/ios/i);

switch (wx.getSystemInfoSync().platform) {
  case "devtools":
    e = i ? 5 : 3;
    break;

  case "android":
    e = 3;
    break;

  case "ios":
    e = 5;
    break;

  case "ipad":
    e = 4;
}

module.exports = {
    data: [ "videoContext", "pageQuery", "history", "detail", "vid" ],
    controller: function(i, a) {
        function r(t) {
            l.isNoStroeWatchedHistory || o.add({
                cid: p || "",
                vid: c || "",
                lid: "",
                poster: null,
                strTime: Math.floor(t),
                uiDate: Math.floor(Date.now() / 1e3),
                iHD: 0,
                playFrom: e,
                seriesText: "",
                reportParam: "",
                isAutoPlay: !0,
                recordType: 0,
                fromCtx: "",
                totalTime: "",
                totalWatchTime: 0,
                showLocation: 1
            });
        }
        var s = a.videoContext, d = a.pageQuery, n = a.history, l = a.detail, c = a.vid, p = d.cid || l.cid || l.parentId, m = !!t.get("notSkipHeadTail");
        console.log("history-------------got", n);
        var u;
        isNaN(+d.seek) ? n > 0 ? u = n : !m && l.skipStart && (u = +l.skipStart) : (u = d.seek, 
        delete d.seek), u && i.on("videostart", function() {
            s.seek(u);
        }, !0);
        var y = 0, k = 0;
        i.on("videotimeupdate", function(e, t) {
            m || (t && l.skipEnd && e - y < 5 && y < t - l.skipEnd && e > t - l.skipEnd && i.emit("statechange", "ended"), 
            y = e), 20 == k++ && (k = 0, r(e));
        }), n || r(0);
    }
};