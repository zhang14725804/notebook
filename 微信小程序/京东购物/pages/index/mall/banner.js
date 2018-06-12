function r(r) {
    if (!n.vkGreyScale(r)) return e.resolve([]);
    var u = [ 10468, 9236 ], o = [];
    return a.getCpcData(u, o).then(function(r) {
        var e = r[u[0]], a = r[u[1]], n = [], o = [];
        for (var i in e) n.push(i);
        for (var s in a) o.push(s);
        var c = [], f = [], l = [];
        n.forEach(function(r) {
            "27547" == r && c.push(e[r][0]);
        }), o.forEach(function(r, e) {
            0 == e ? f.push(a[r][0]) : 1 == e && l.push(a[r][0]);
        });
        var g = [], h = [], m = [];
        return c.forEach(function(r) {
            r && g.push({
                image: t.getImg(r.material, 690, 192),
                url: r.sUrl + "&ptag=138067.11.6"
            });
        }), f.forEach(function(r) {
            r && h.push({
                image: t.getImg(r.material, 690, 192),
                url: r.sUrl + "&ptag=138067.20.7"
            });
        }), l.forEach(function(r) {
            r && m.push({
                image: t.getImg(r.material, 690, 192),
                url: r.sUrl + "&ptag=138067.13.2"
            });
        }), {
            firstData: g,
            featuredData: h,
            selectedData: m
        };
    }).catch(function(r) {
        return console.log("getCpcData error", r);
    });
}

var e = require("../../../libs/promise.min.js"), t = require("../../../common/utils.js"), a = require("../model.js"), n = require("../utils.js");

module.exports = {
    getBannerData: function(t) {
        return e.resolve(t).then(function(e) {
            var t = e.focusVKRange;
            return e.adVKRange, r(t).then(function(r) {
                return {
                    firstData: r.firstData,
                    featuredData: r.featuredData,
                    selectedData: r.selectedData
                };
            }).catch(function(r) {
                return console.log("getBannerData error", r);
            });
        });
    }
};