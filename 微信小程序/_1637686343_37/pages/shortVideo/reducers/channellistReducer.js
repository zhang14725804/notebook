function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

function e() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1], t = n && n.videolist || [];
    return t.forEach(function(n, t) {
        n.tvId == e.tvId && (n = Object.assign(n, e.options));
    }), Object.assign({}, n, {
        videos: {
            videolist: t
        }
    });
}

function t() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1], t = n && n.videolist || [], r = e.params.action || "", a = e.deleteCounts;
    return 1 == r ? t = t.concat(e.videolist) : 2 == r && (a && t.splice(-a), t = e.videolist.concat(t)), 
    t = s(t), Object.assign({}, n, {
        pageNum: e.pageNum,
        totalCounts: t.length,
        videolist: t,
        isEmpty: e.isEmpty
    });
}

function r() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1], t = [];
    return e.flag || (t = n && n.videolist || []).forEach(function(n, e) {
        n.showVideo = !1;
    }), Object.assign({}, n, {
        pageNum: e.pageNum,
        videolist: t
    });
}

function a(n, e) {
    var t = l.default.channels;
    "result" == e.page && (t = l.default.resultChannels);
    var r = l.default.channelMap;
    t.forEach(function(n) {
        for (var e in r) if (e == n.cid) {
            n.channelId = r[e];
            break;
        }
    });
    var a = i(t, e.channelId), u = {
        channelTabs: t,
        channelTabIndex: a,
        curChannel: t[a] || {}
    };
    return Object.assign({}, n, u);
}

function i(n, e) {
    return n.findIndex(function(n) {
        return n.channelId == e;
    });
}

function u(n, e) {
    var t = n.channelTabs.filter(function(n, t) {
        return t == e.channelTabIndex;
    }), r = {
        channelTabIndex: e.channelTabIndex,
        curChannel: t[0]
    };
    return Object.assign({}, n, r);
}

function c(n, e) {
    return e.options || {};
}

function o(n, e) {
    var t = e.params || {};
    return Object.assign({}, n, t);
}

function s(n) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "tvId";
    if (n && n.length > 1) {
        var t = {};
        return n = n.reduce(function(n, r) {
            return t[r[e]] || (t[r[e]] = n.push(r)), n;
        }, []);
    }
    return n;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.channelInfos = function() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
    switch (e.type) {
      case "SET":
        return a(n, e);

      case "SWITCH_CHANNEL":
        return u(n, e);

      default:
        return n;
    }
}, exports.videos = function() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = arguments[1];
    switch (a.type) {
      case "LOAD_VIDEOS":
        return t(n, a);

      case "RESET_VIDEOS":
        return r(n, a);

      case "CHANGE_CUR_VIDEO":
        return e(n, a);

      default:
        return n;
    }
}, exports.searchConditions = function() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
    switch (e.type) {
      case "INIT_CONDITION":
        return c(0, e);

      case "CHANGECONDITION":
        return o(n, e);

      default:
        return n;
    }
};

n(require("../../../common/utils/util"));

var l = n(require("../common/config"));