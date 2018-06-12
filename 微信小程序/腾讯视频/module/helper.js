function t(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), r = e.getMonth() + 1, o = e.getDate(), i = e.getHours(), u = e.getMinutes(), p = e.getSeconds();
        return [ n, r, o ].map(t).join("/") + " " + [ i, u, p ].map(t).join(":");
    },
    formatNum: function(t) {
        if (!t) return 0;
        var e = (t += "").split(""), n = (e.shift(), "");
        return t < 1e4 ? t : t >= 1e4 && t < 1e8 ? (t = parseInt(t / 1e3) + "", e = t.split(""), 
        n = e.pop(), e.join("") + "." + (n || "") + "万") : t >= 1e8 ? (t = parseInt(t / 1e7) + "", 
        e = t.split(""), n = e.pop(), e.join("") + "." + (n || "") + "亿") : void 0;
    }
};