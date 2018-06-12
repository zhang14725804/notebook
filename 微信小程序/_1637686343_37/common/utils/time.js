Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.formatSecond = function(e) {
    var t = Math.floor(e / 3600), r = Math.floor(e % 3600 / 60), o = Math.floor(e % 60);
    return t = t >= 10 ? t : "0" + t, r = r >= 10 ? r : "0" + r, o = o >= 10 ? o : "0" + o, 
    [ t, r, o ].join(":");
}, exports.formatSecondOmit = function(e) {
    var t = this.formatSecond(e);
    return this.secondOmit(t);
}, exports.secondOmit = function(e) {
    return e && "00:" === e.substring(0, 3) ? e.substring(3) : e;
}, exports.format = function(e, t) {
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
    for (var o in r) new RegExp("(" + o + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? r[o] : ("00" + r[o]).substr(("" + r[o]).length)));
    return t;
}, exports.createTimeTip = function(e, t) {
    /Invalid /gi.test(new Date(e)) && (e = e.replace(/-/g, "/")), e = new Date(e), /Invalid /gi.test(new Date(t)) && (t = t.replace(/-/g, "/"));
    var r = ((t = new Date(t)) - e) / 1e3;
    return e ? r < 10 ? "刚刚" : r < 60 ? r + "秒前" : r < 3600 ? Math.floor(r / 60) + "分钟前" : r < 7200 ? "一小时前" : e.getDay() === t.getDay() && r < 86400 ? $.date.format(e, "H点mm分") : (e.getDay() + 1) % 7 === t.getDay() && r < 172800 ? "昨天" : (e.getDay() + 2) % 7 === t.getDay() && r < 259200 ? "前天" : new Date().getFullYear() === e.getFullYear() ? $.date.format(e, "M月d日") : $.date.format(e, "yyyy年M月d日") : "";
}, exports.countdownFormat = function(e, t) {
    var r = e + t - new Date().getTime(), o = Math.floor(r / 1e3 % 60), a = Math.floor(r / 1e3 / 60 % 60), n = Math.floor(r / 36e5 % 24);
    return {
        total: r,
        days: Math.floor(r / 864e5),
        hours: n,
        minutes: a < 10 ? "0" + a : a,
        seconds: o < 10 ? "0" + o : o
    };
};