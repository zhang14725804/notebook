var e = {}, t = wx.getSystemInfoSync().windowHeight;

module.exports = function(i, n, o, c) {
    var l = n.top, r = n.bottom, g = n.name + ":" + n.id, s = t;
    if (n.clientHeight && (s = n.clientHeight < 0 ? s + n.clientHeight : n.clientHeight), 
    console.log(g, l, r, i, i + s), l >= i && r <= i + s) {
        if (e[g]) return;
        e[g] = !0, o(n.id);
    } else {
        if (!e[g]) return;
        e[g] = !1, c && c(n.id);
    }
};