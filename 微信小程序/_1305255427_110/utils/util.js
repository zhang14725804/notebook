function t(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

var r = require("../libs/coordtransform-master/index.js"), n = {
    isArray: function(t) {
        return "[object Array]" === Object.prototype.toString.call(t);
    },
    randomArrIndex: function(t, r) {
        if (this.isArray(t) && t.length) {
            if ((!r || r > t.length) && (r = t.lenght), 1 == t.length) return [ 1 ];
            for (var n = [], e = [], a = void 0, o = 0; o < t.length; o++) n[o] = o;
            for (var i = t.length, h = r; h > 0; i--, h--) a = Math.floor(Math.random() * i), 
            e.push(n[a]), n.splice(a, 1);
            return e;
        }
        return [];
    },
    isArrValueEqual: function(t, r) {
        if (t.length === r.length) {
            for (var n = 0, e = t.length; n < e; n++) if (t[n] !== r[n]) return !1;
            return !0;
        }
        return !1;
    }
}, e = {
    get: function(t) {
        if (t = "ab_" + t, !wx.getStorageSync(t)) {
            var r = Math.random() > .5 ? "B" : "A";
            return wx.setStorageSync(t, r), r;
        }
        return wx.getStorageSync(t);
    },
    close: function(t, r) {
        wx.setStorageSync("ab_" + t, r);
    }
};

module.exports = {
    formatTime: function(r) {
        var n = r.getFullYear(), e = r.getMonth() + 1, a = r.getDate(), o = r.getHours(), i = r.getMinutes(), h = r.getSeconds();
        return [ n, e, a ].map(t).join("/") + " " + [ o, i, h ].map(t).join(":");
    },
    bd09togcj02: function(t, r) {
        var n = 52.35987755982988, e = t - .0065, a = r - .006, o = Math.sqrt(e * e + a * a) - 2e-5 * Math.sin(a * n), i = Math.atan2(a, e) - 3e-6 * Math.cos(e * n);
        return [ o * Math.cos(i), o * Math.sin(i) ];
    },
    getDistance: function(t, r, n, e) {
        var a = t * Math.PI / 180, o = n * Math.PI / 180, i = a - o, h = r * Math.PI / 180 - e * Math.PI / 180, u = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(i / 2), 2) + Math.cos(a) * Math.cos(o) * Math.pow(Math.sin(h / 2), 2)));
        return u *= 6378.137, u = Math.round(1e4 * u) / 1e4;
    },
    util: n,
    ABTEST: e,
    coordtransform: r
};