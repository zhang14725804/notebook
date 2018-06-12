Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./navigation")), o = {
    gd: "goods_id"
}, r = {
    route: function(o) {
        if (o) {
            var r = decodeURIComponent(o);
            if (r) {
                var t = r.split("_");
                if (t[0] && "p1001" === t[0] && t[1]) {
                    var d = "/pages/goods/goods?goods_id=" + t[1];
                    e.default.forward(d);
                }
            }
        }
    },
    sceneMap: function(e) {
        var r = {}, t = decodeURIComponent(e).split("&");
        for (var d in t) if (t[d]) {
            var i = t[d].split("=");
            i.length > 0 && (o[i[0]] ? r[o[i[0]]] = i[1] : r[i[0]] = i[1]);
        }
        return r;
    }
};

exports.default = r;