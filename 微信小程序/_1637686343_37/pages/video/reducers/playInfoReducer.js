function e(e, t) {
    if (e.subType = (0, o.getSubType)(e), e = Object.assign(e), e.pageUrl = e.videoUrl, 
    t && t.videos) {
        var i = t.videos[0];
        e.vt = i ? i.vt : "";
    }
    if (e.mainActors && (e.mainActors = r.default.string.slice(e.mainActors, 0, 6, ",")), 
    e.tags && (e.tags = r.default.string.slice(e.tags, 0, 6, ",")), e.directors && (e.directors = r.default.string.slice(e.directors, 0, 1, ",")), 
    e.score && (e.score = parseFloat(e.score).toFixed(1)), "movie" == e.subType) {
        var n = e.period || "";
        e.period && e.period.length >= 4 && (e.period = "" + n.slice(0, 4)), e.tags = r.default.string.slice(e.tags, 0, 3, ",");
    }
    if ("single" == e.subType) {
        var u = e.period || "";
        e.period && e.period.length >= 8 && (e.period = u.slice(0, 4) + "-" + u.slice(4, 6) + "-" + u.slice(6, 8));
    }
    return e.issueTime && e.issueTime.length > 10 && (e.issueTime = e.issueTime.substring(0, 10)), 
    e.playCountCN = r.default.numToChinaNum(e.playCount), e.pd = e.order, e = s(e);
}

function s(e) {
    return "source" !== e.subType ? e : (e.tags = t(e.tags, 3), e.hosts = t(e.hosts, 3), 
    e.guests = t(e.guests, 6), e);
}

function t() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", s = arguments[1];
    return e.split(",").slice(0, s).join(",");
}

function i(e, s) {
    var t = (0, o.getSubType)(s.playInfo) || "";
    return s.playInfo.subType = t, Object.assign({}, {
        playCountCN: e.playCountCN
    }, s.playInfo, {
        aid: 1 == s.playInfo.type ? s.playInfo.aid : s.playInfo.qipuId
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "INIT":
        return e(t.playInfo, t.videoList) || s;

      case "SET_PLAY_INFO":
        return i(s, t);

      case "EDIT_PLAY_INFO":
        return Object.assign({}, s, t.playInfo);

      default:
        return s;
    }
};

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/utils/util")), o = require("../common/commonService");