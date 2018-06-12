function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    e.downloadable_platforms && e.downloadable_platforms.indexOf("15");
    var t = e.video_lib_meta, i = [], r = [];
    if ("iqiyi" == e.siteId || "iqiyi" != e.siteId && t) i = e.director ? e.director.split(";") : [], 
    r = e.star ? e.star.split(";") : [], e.title = e.albumTitle || t && t.title || "", 
    e.albumImg = e.albumImg || e.albumVImage || e.albumHImage || t.poster || ""; else if (t) {
        var o = t.director || [];
        o && o.forEach(function(e) {
            i.push(e.name);
        });
        var a = t.actor || t.host || "";
        a && a.forEach(function(e) {
            r.push(e.name);
        }), e.title = t.title || "", e.albumImg = t.poster;
    }
    i.length ? (i = i.splice(0, 6), e.directorShow = i.join(" ")) : e.directorShow = "", 
    r.length ? (r = r.splice(0, 6), e.actorShow = r.join(" ")) : e.actorShow = "", e.directorList = i, 
    e.actorList = r;
}

e(require("bindBase")), e(require("bindUtil"));

var i = 0;

e(require("../searchBind")).default.component("other", {
    create: function() {
        i = 0;
    },
    beforeBindCallBack: function(e, r) {
        return e.index = ++i, [ "relate", 101, 3 ].indexOf(e.videoDocType) < 0 && t(e), 
        e;
    }
});