require("../libs/promise.min");

var e = require("./utils.js"), t = 0;

wx.$.request.get("https://wq.jd.com/mcoss/servertime/getservertime", {
    callback: "cb"
}).then(function(e) {
    var r = e.body;
    0 == r.errCode && r.data && r.data.length && (t = new Date(r.data[0].serverTime) - Date.now());
}), module.exports = {
    getImg: e.getImg,
    querystring: e.querystring,
    throttle: e.throttle,
    debounce: e.debounce,
    decode: e.decode,
    isMobile: e.isMobile,
    getServerTime: function() {
        return Date.now() + t;
    },
    getUrlParam: e.getUrlParam,
    filterInTime: function(e, t) {
        if ("[object Array]" !== Object.prototype.toString.call(e)) return e;
        var r = {
            stime: "stime",
            etime: "etime",
            now: new Date().getTime()
        }, i = t || {};
        for (var n in i) r[n] && (r[n] = i[n]);
        var o = [];
        return e.forEach(function(e) {
            10 === String(e[r.stime]).length && (e[r.stime] = 1e3 * parseInt(e[r.stime])), 10 === String(e[r.etime]).length && (e[r.etime] = 1e3 * parseInt(e[r.etime]));
            var t = new Date(e[r.stime]).getTime(), i = new Date(e[r.etime]).getTime();
            t < r.now && i > r.now && o.push(e);
        }), o;
    }
};