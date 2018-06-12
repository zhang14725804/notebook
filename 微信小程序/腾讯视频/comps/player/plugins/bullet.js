var e = require("../lib/bullet-engine"), t = require("../../../module/globalData");

module.exports = {
    data: [ "videoContext", "detail" ],
    controller: function(n, a) {
        var o = a.videoContext, i = a.detail, u = i.DMContentKey && i.DMContentKey.match(/targetid=(\d*)/), d = null, l = !!t.get("useDanmuBeta");
        l && i.isHaveDM && u && u[1] && (d = e(u[1], function(e) {
            o.sendDanmu({
                text: e.content,
                color: "#fff"
            });
        }), n.on("videotimeupdate", function(e) {
            d && d.timeupdate(e);
        })), n.emit("plugin-danmu-data", {
            DMIsOpen: i.DMIsOpen,
            useDanmu: l
        });
    }
};