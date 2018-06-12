var e = require("./utils.js"), r = {}, n = {
    "/pages/seckill/index/index": {
        pr: 25,
        next: [ "/pages/seckill/category/category", "/pages/seckill/brand/brand", "/pages/seckill/detail/detail", "/pages/seckill/cate/cate" ]
    },
    "/pages/brand/index": {
        pr: 51,
        next: [ "/pages/h5/index" ]
    },
    "/pages/pingou/index/index": {
        pr: 4,
        next: [ "/pages/pingou/tuan99/tuan99", "/pages/pingou/ziying/ziying", "/pages/pingou/my/my" ]
    }
};

r.addPr = function(r, a) {
    var i = e.getPageUrl().route, t = n["/" + i];
    t && -1 != t.next.findIndex(function(e) {
        return e == r;
    }) && (a.pr = t.pr);
}, r.addPrToH5 = function(r, n) {
    if (!n) return r;
    var a = r.match(/([^?]*)\??(.*)/), i = e.querystr(a[2] || "");
    return i.query.pr = conf.pr, a[1] + "?" + e.querystr(i.query) + (i.hash ? "#" + i.hash : "");
}, module.exports = r;