function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function i() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], i = arguments[1], t = i.records;
    return i.isLogin ? o(t, e, i) : l(t);
}

function t() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], i = arguments[1], t = i.subscribes || [];
    return i.isLogin ? n(t, e, i) : u(t);
}

function r(e, i) {
    if (e) {
        var t = e.split(":"), r = t.length;
        if (i) switch (r) {
          case 3:
            return t[0] + "时" + t[1] + "分" + t[2] + "秒";

          case 2:
            return t[0] + "分" + t[1] + "秒";

          case 1:
            return t[0] + "秒";
        } else switch (r) {
          case 3:
            return t[0] + ":" + t[1] + ":" + t[2];

          case 2:
            return t[0] + ":" + t[1];

          case 1:
            return "" + t[0];
        }
    }
}

function a(e) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "qipuId";
    if (e && e.length > 1) {
        var t = {};
        return e = e.reduce(function(e, r) {
            return t[r[i]] || (t[r[i]] = e.push(r)), e;
        }, []);
    }
    return e;
}

function o(e, i, t) {
    var o = [];
    return e.forEach(function(e, i) {
        e.videoPlayTime = 1 * e.videoPlayTime == -1 ? 0 : 1 * e.videoPlayTime, e.videoName && (e.content = e.videoName, 
        o.push(e));
    }), o.forEach(function(e, i) {
        e.qipuId = e.id = e.tvId, e.aid = e.albumId, e.addtime *= 1e3, e.playTime = e.videoPlayTime, 
        e.isExclusive = e.exclusive;
        var t = m.default.time.formatSecondOmit(e.videoPlayTime);
        t = r(t, !0);
        var a = m.default.time.formatSecondOmit(e.videoDuration);
        a = r(a), e.showDuration = a, 0 < e.playTime && e.playTime < 60 ? e.playTime = "观看不足1分钟" : 0 === e.playTime || "0" === e.playTime || e.playTime >= e.videoDuration ? e.playTime = "已看完" : e.playTime = "已看" + t;
        var o = e.videoImageUrl.split(".");
        o[o.length - 2] = o[o.length - 2] + "_320_180", e.videoImageUrl = o.join("."), /qiyipic/i.test(e.videoImageUrlVertical) && (e.imgUrl = e.videoImageUrlVertical.replace(/_\d{2}_\d{3}\.(jpg|bmp|gif)/i, function(e, i) {
            return "_320_180." + i;
        }));
    }), (o = a(o)).slice(0, 9);
}

function n(e, i, t) {
    return e.forEach(function(e, i) {
        e.qipuId = e.id = e.tvId, e.aid = e.albumId, e.addtime *= 1e3, e.playTime = e.videoPlayTime, 
        e.isExclusive = e.exclusive;
        var t = m.default.time.formatSecondOmit(e.videoPlayTime);
        t = r(t, !0);
        var a = m.default.time.formatSecondOmit(e.videoDuration);
        a = r(a), e.showDuration = a;
        var o = e.videoImageUrl.split(".");
        o[o.length - 2] = o[o.length - 2] + "_320_180", e.videoImageUrl = o.join(".");
    }), a(e).slice(0, 9);
}

function u(e) {
    var i = [], t = [];
    return e.forEach(function(e, r) {
        e.playTime > 30 && e.date && e.content ? i.push(e) : t.push(e);
    }), t.forEach(function(e, i) {
        e && e.id && f.default.remove(e.id);
    }), i.forEach(function(e, i) {
        var t = m.default.time.formatSecondOmit(e.videoDuration);
        t = r(t), e.showDuration = t, e.showPlayTime = e.playTime;
        var a = e.imgUrl.split(".");
        a[a.length - 2] = a[a.length - 2] + "_320_180", e.imgUrl = a.join(".");
    }), i.slice(0, 9);
}

function l(e) {
    var i = [], t = [];
    return e.forEach(function(e, a) {
        var o = m.default.time.formatSecondOmit(e.duration);
        o = r(o), e.showDuration = o, e.playTime > 30 && e.date && e.content ? i.push(e) : t.push(e);
    }), t.forEach(function(e, i) {
        e && e.id && s.default.remove(e.id);
    }), i.forEach(function(e, i) {
        var t = e.duration - e.playTime;
        t = r(t = m.default.time.formatSecondOmit(t));
        var a = m.default.time.formatSecondOmit(e.playTime);
        a = r(a, !0), e.playTime < 60 ? e.playTime = "观看不足1分钟" : e.playTime >= e.duration ? e.playTime = "已看完" : e.playTime = "已看" + a, 
        e.showPlayTime = a;
    }), i.slice(0, 9);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var d = e(require("../../../components/load/loadReducers")), c = e(require("../../../components/login/loginReducers")), m = e(require("../../../common/utils/util")), s = e(require("../../../components/history/playRecordService")), f = e(require("../../../components/subscribe/playSubService"));

exports.default = {
    record: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
        switch (t.type) {
          case "SET":
            return i(e, t);

          default:
            return e;
        }
    },
    subscribes: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = arguments[1];
        switch (i.type) {
          case "SETSUBSCRIBE":
            return t(e, i);

          default:
            return e;
        }
    },
    load: d.default,
    loginInfo: c.default
};