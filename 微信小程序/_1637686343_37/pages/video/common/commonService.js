Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getSubType = function(e) {
    var i = e.isFeatureFilm, r = e.videoType, t = e.cid, u = e.contentType, o = e.sourceId;
    return i ? 1 == r ? "album" : 2 == r ? "source" : 1 == t || 4 == t ? "movie" : "single" : 3 != u || o ? 3 == u && o ? "source" : "single" : "album";
}, exports.isSeriesOnly = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return void 0 !== e.isFeatureFilm && 0 != e.isFeatureFilm && "undefiend" != typeof e.cid && 2 == e.cid;
};