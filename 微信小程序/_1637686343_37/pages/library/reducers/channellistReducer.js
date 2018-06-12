function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

function e() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1], t = n && n.videolist || [];
    return e.videolist.map(function(n, t) {
        return delete n.pageUrl, n.pageNum = e.pageNum, n.isBill && (n.isCoupon = n.isBill), 
        n;
    }), t = t.concat(e.videolist), Object.assign({}, n, {
        pageNum: e.pageNum,
        videolist: t,
        isFinal: e.isFinal,
        isEmpty: e.isEmpty
    });
}

function t() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, t = (arguments[2], 
    arguments[3]), a = s.default.channels, i = s.default.channelMap, o = s.default.modes, u = s.default.conditions;
    a.forEach(function(t) {
        if (Array.isArray(t.modes)) {
            t.modes.forEach(function(n, e) {
                o.forEach(function(r) {
                    r.id == n && (t.modes[e] = r);
                });
            });
            for (var r in i) if (r == t.cid) {
                t.channelId = i[r];
                break;
            }
            "ZONG_YI" == t.cid ? t.issource = !0 : t.issource = !1;
            var a = t.modes;
            t.modes = {
                modelist: a,
                modeTabIndex: n
            };
            for (var c in u) t.cid == c && (t.tags = u[c]);
            t.tags.forEach(function(n, t) {
                n.tabIndex = e;
            });
        }
    });
    var c = r(a, t.channelId);
    return {
        channelTabs: a,
        channelTabIndex: c,
        curChannel: a[c] || {}
    };
}

function r(n, e) {
    return n.findIndex(function(n) {
        return n.channelId == e;
    });
}

function a(n, e) {
    var t = n.channelTabs.filter(function(n, t) {
        return t == e.channelTabIndex;
    }), r = {
        channelTabIndex: e.channelTabIndex,
        curChannel: t[0]
    };
    return Object.assign({}, n, r);
}

function i(n, e) {
    return n.curChannel && (n.curChannel.modes.modeTabIndex = e.modeIndex || 0), n;
}

function o(n, e) {
    return n.curChannel.tags.map(function(n, t) {
        n.tag == e.tag && (n.tabIndex = e.tabIndex);
    }), n;
}

function u(n, e) {
    return e.options || {};
}

function c(n, e) {
    var t = e.params || {};
    return Object.assign({}, n, t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.channelInfos = function() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
    switch (e.type) {
      case "SET":
        return Object.assign({}, n, t(0, 0, n, e));

      case "SWITCH_CHANNEL":
        return a(n, e);

      case "SWITCH_MODE":
        return i(n, e);

      case "SWITCH_TAG":
        return o(n, e);

      default:
        return n;
    }
}, exports.videos = function() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "LOAD_VIDEOS":
        return e(n, t);

      case "RESET_VIDEOS":
        return Object.assign({}, n, {
            pageNum: t.pageNum,
            videolist: t.videolist
        });

      default:
        return n;
    }
}, exports.searchConditions = function() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
    switch (e.type) {
      case "INIT_CONDITION":
        return u(0, e);

      case "CHANGECONDITION":
        return c(n, e);

      default:
        return n;
    }
};

n(require("../../../common/utils/util"));

var s = n(require("../common/config"));