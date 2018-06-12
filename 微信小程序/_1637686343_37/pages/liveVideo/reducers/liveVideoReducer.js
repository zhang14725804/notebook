function t(t) {
    if (t.programInfo) {
        var e = t.programInfo, i = r.default.time.format(new Date(e.startTime), "yyyy-MM-dd hh:mm");
        t.programInfo.startTimeFormat = i, t.programInfo.subscribeStatus = !1, t.programInfo.disabled = !1;
    }
    return t.hot_lives && (t.hot_lives = t.hot_lives.filter(function(t, e) {
        return t.subscribeStatus = !1, t.startTimeFormat = r.default.time.format(new Date(t.startTime), "yyyy-MM-dd hh:mm"), 
        t.disabled = !1, "LIVE_TYPE" == t.playStatus || "WAITING" == t.playStatus;
    })), t;
}

function e(t, e) {
    var r = t.programInfo, i = t.hot_lives;
    if (r.id == e.qipuId) return "CHANGE_SUBSCRIBE" == e.type && (r.subscribeStatus = e.subscribeSatus), 
    "CHANGE_BUTTON" == e.type && (r.disabled = e.disabled), Object.assign({}, t, {
        programInfo: r
    });
    var s = i.map(function(t, r) {
        return t.id == e.qipuId && ("CHANGE_SUBSCRIBE" == e.type && (t.subscribeStatus = e.subscribeSatus), 
        "CHANGE_BUTTON" == e.type && (t.disabled = e.disabled)), t;
    });
    return Object.assign({}, t, {
        hot_lives: s
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.liveVideoInit = function() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = arguments[1];
    switch (i.type) {
      case "INIT_DATA":
        return t(i.liveInitVideo);

      case "CHANGE_SUBSCRIBE":
      case "CHANGE_BUTTON":
        return e(r, i);

      default:
        return r;
    }
};

var r = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../common/utils/util"));