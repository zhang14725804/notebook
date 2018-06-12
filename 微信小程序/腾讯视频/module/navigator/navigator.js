function e(e, i, a) {
    if (!n) return n = !0, clearTimeout(t), t = setTimeout(function() {
        n = !1;
    }, 2e3), r.emit("navigateTo", i.url), wx[e].apply(wx, a);
}

var t, n, i = require("../message"), r = module.exports = new i();

r.on("page:ready", function() {
    setTimeout(function() {
        clearTimeout(t), n = !1;
    }, 100);
}), r.navigateTo = function(t) {
    return e("navigateTo", t, arguments);
}, r.redirectTo = function(t) {
    return e("redirectTo", t, arguments);
}, r.switchTab = function(t) {
    return e("switchTab", t, arguments);
}, r.navigateBack = function() {
    return wx.navigateBack.apply(wx, arguments);
}, r.preLoad = function(e) {
    r.emit("preLoad", e);
};