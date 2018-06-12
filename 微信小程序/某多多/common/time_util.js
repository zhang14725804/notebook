Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../storage/ram_manager")), t = {
    formatTime: function(e, t) {
        t = t || "yyyy/MM/dd hh:mm:ss", "number" != typeof e && "string" != typeof e || (e = parseInt(e, 10), 
        e = new Date(1e3 * e));
        var r = {
            "M+": e.getMonth() + 1,
            "d+": e.getDate(),
            "h+": e.getHours(),
            "m+": e.getMinutes(),
            "s+": e.getSeconds(),
            "q+": Math.floor((e.getMonth() + 3) / 3),
            S: e.getMilliseconds()
        };
        /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var n in r) new RegExp("(" + n + ")").test(t) && (t = t.replace(RegExp.$1, 1 === RegExp.$1.length ? r[n] : ("00" + r[n]).substr(("" + r[n]).length)));
        return t;
    },
    transferToTime: function(e, t) {
        t = t || {};
        var r = Math.floor(e / 1e3), n = Math.floor(r / 3600), o = n;
        if (t.onlyHour) return n;
        n < 10 && (n = "0" + n);
        var a = r % 3600, i = Math.floor(a / 60), s = i;
        i < 10 && (i = "0" + i);
        var g = a % 60, u = g;
        return g < 10 && (g = "0" + g), t.removeHours ? [ i, g ].join(":") : t.needMs ? [ n, i, g, Math.floor(e % 1e3) / 100 ].join(":") : t.needObj ? {
            intHours: o,
            intMinutes: s,
            intSeconds: u,
            hours: n,
            minutes: i,
            seconds: g
        } : [ n, i, g ].join(":");
    },
    getPackagedTimeFromTimeBucket: function(e, t) {
        var r = function(e) {
            return (e = e.toString()).length < 2 && (e = "0" + e), e;
        }, n = Math.floor(e / 1e3), o = Math.floor(n / 60), a = Math.floor(o / 60), i = Math.floor(a / 24);
        return i %= 365, a %= 24, o %= 60, n %= 60, (t = (t || "").toUpperCase()).indexOf("D") >= 0 && (i = r(i)), 
        t.indexOf("H") >= 0 && (a = r(a)), t.indexOf("M") >= 0 && (o = r(o)), t.indexOf("S") >= 0 && (n = r(n)), 
        {
            days: i.toString(),
            hours: a.toString(),
            minutes: o.toString(),
            seconds: n.toString()
        };
    },
    getTimeMaterialFromTimePoint: function(e) {
        e = parseInt(e, 10) || 0;
        var t = new Date(1e3 * e);
        return {
            year: t.getFullYear().toString(),
            month: (t.getMonth() + 1).toString(),
            date: t.getDate().toString(),
            hours: t.getHours().toString(),
            minutes: t.getMinutes().toString(),
            seconds: t.getSeconds().toString(),
            weekDay: t.getDay().toString()
        };
    },
    timeSpan: function(e, t) {
        var r = Math.max(parseInt(t, 10) - parseInt(e, 10), 0);
        return r >= 86400 ? Math.floor(r / 86400) + "天" : r >= 3600 ? Math.floor(r / 3600) + "小时" : r >= 60 ? Math.floor(r / 60) + "分钟" : r + "秒";
    },
    getTodayTime: function(t) {
        var r = parseInt(Date.now() + e.default.timeDiff), n = parseInt(new Date(r).setHours(0, 0, 0, 0) / 1e3);
        return t && t.getTomorrow ? n + 86400 : t && t.getAfterTomorrow ? n + 172800 : t && t.getBigAfterTomorrow ? n + 259200 : n;
    },
    checkTimeDay: function(e) {
        var r = t.getTodayTime(), n = r - 86400, o = r + 86400, a = o + 86400;
        return e < n ? 0 : n <= e && e < r ? 1 : r <= e && e < o ? 2 : o <= e && e < a ? 3 : a <= e && e < a + 86400 ? 4 : e >= a + 86400 ? -1 : void 0;
    },
    isNextDay: function(e) {
        var t = new Date(e).getDate(), r = new Date(e).getMonth(), n = new Date().getDate(), o = new Date().getMonth();
        return o > r || o === r && n > t;
    }
};

exports.default = t;