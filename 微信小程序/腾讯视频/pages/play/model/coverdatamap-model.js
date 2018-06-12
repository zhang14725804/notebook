function e(e) {
    for (var r = 0; r < e.length; r++) {
        var n = e[r];
        e[r] = {
            cid: n.cid,
            poster: {
                firstLine: n.poster.firstLine,
                secondLine: n.poster.secondLine,
                markLabelMap: t(n.poster.markLabelList),
                playCount: n.poster.playCount,
                imageUrl: n.poster.imageUrl
            }
        };
    }
    return e;
}

function t() {
    var e = {};
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function(t) {
        e[t.position] = {
            primeText: t.primeText,
            markImageUrl: t.markImageUrl
        };
    }), e;
}

var r = require("../../../module/message"), n = require("../../../module/request/request"), i = require("../../../module/fns");

module.exports = function(t, o) {
    function a() {
        return {
            coverList: d,
            uiType: o.uiType
        };
    }
    var u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, c = new r(), s = t, d = e(o.coverList), l = o.pageContext, f = o.isAllData;
    return {
        findIndex: function(e) {
            for (var t = 0; t < d.length; t++) if (d[t].vid == e) return {
                index: t,
                item: d[t]
            };
            return null;
        },
        findNext: function(e) {
            return d[e + 1];
        },
        onChange: function(e) {
            return c.on("change", e), e(a()), this;
        },
        nextPage: i.lock(function(t, r) {
            var i = this;
            if (!f) return n.vaccess("detail_cover_list", {
                dataKey: s,
                pageContext: l,
                cid: u.cid || "",
                dataType: u.dataType || "",
                vid: u.vid || "",
                lid: u.lid || ""
            }).then(function(t) {
                if (0 != t.errCode) throw new Error(t);
                return d = l ? d.concat(e(t.coverList)) : e(t.coverList), f = !t.hasNextPage && t.pageContext, 
                t.pageContext;
            }).catch(function(e) {
                f = !0;
            }).then(function(e) {
                if (l = e, t(), r && !f) return i.nextPage(!0);
                c.emit("change", a());
            });
        })
    };
};