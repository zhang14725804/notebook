Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = {
    Cent: 100,
    Yuan: 1
}, r = {
    price: function(r, e) {
        r = parseFloat(r, 10) || 0, (e = e || t.Yuan) === t.Cent && (r /= 100);
        var n = (r = r.toString()).indexOf(".");
        if (n >= 0) {
            for (var a = (r = r.slice(0, n + 3)).length - 1; "0" === r.charAt(a) && a > 0; ) a--;
            "." === (r = r.slice(0, a + 1)).charAt(r.length - 1) && (r = r.slice(0, r.length - 1));
        }
        return r;
    },
    goodsNameWithPrice: function(t, r, e) {
        return e ? t : r + "元 " + t;
    },
    sales: function(t) {
        if ((t = parseInt(t, 10) || 0) < 9999) return t.toString();
        if (t <= 99999) {
            var r = parseInt(t / 1e3, 10);
            return r % 10 ? parseInt(r / 10, 10) + "." + r % 10 + "万" : parseInt(r / 10, 10) + "万";
        }
        return parseInt(t / 1e4, 10).toString() + "万";
    },
    timeSpan: function(t, r) {
        var e = Math.max(parseInt(r, 10) - parseInt(t, 10), 0);
        return e >= 86400 ? Math.floor(e / 86400) + "天" : e >= 3600 ? Math.floor(e / 3600) + "小时" : e >= 60 ? Math.floor(e / 60) + "分钟" : e + "秒";
    },
    getDiscount: function(t, r) {
        if (!t || !r) return 0;
        var e = Math.floor(t / r * 100) / 10;
        return e % 1 == 0 && 0 !== e && (e = e.toFixed(1)), e;
    },
    numberSeparator: function(t) {
        for (var r = "", e = (t = t.toString()).length - 1; e >= 0; e--) r = t[e] + r, (t.length - 1 - e) % 3 == 2 && 0 !== e && (r = "," + r);
        return r;
    }
};

exports.default = r;