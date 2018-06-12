var r = require("./localStorage.js"), e = (require("./utils.js"), {}), t = {};

e.addUrlParams = function(r) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    t[r] = e;
}, e.getUrlParams = function(r, e) {
    var a = t[r];
    return e && delete t[r], a;
}, e.onLoadSet = function(t) {
    var a = e.getUrlParams(t), l = a && a.wdref || "";
    l && r.set("wdref", l);
}, e.backSet = function(e) {
    e && e.url && r.set("wdref", e.url);
}, module.exports = e;