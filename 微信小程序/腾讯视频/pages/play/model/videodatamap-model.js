function e(e) {
    return function(t) {
        for (var n = [], r = 0; r < t.length; r++) {
            var i = t[r];
            2 == i.videoShowFlags && e || (1 != i.videoShowFlags || e) && n.push(i);
        }
        return n;
    };
}

function t(e) {
    return e.map(function(e) {
        return {
            vid: e.vid,
            title: e.title,
            poster: {
                firstLine: e.poster.firstLine,
                markLabelMap: n(e.poster.markLabelList),
                playCount: e.poster.playCount,
                imageUrl: e.poster.imageUrl
            }
        };
    });
}

function n() {
    var e = {};
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function(t) {
        e[t.position] = {
            primeText: t.primeText,
            markImageUrl: t.markImageUrl && t.markImageUrl.replace("http:", "https:")
        };
    }), e;
}

var r = require("../../../module/message"), i = require("../../../module/request/request"), o = require("../../../module/fns");

module.exports = function(n, a) {
    function u() {
        return {
            videoList: t(d),
            uiType: a.uiType,
            updateDetail: a.updateDetail,
            count: a.isAllData ? a.videoList.length : a.cacheItemsCount,
            uiLocate: p
        };
    }
    var l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, s = new r(), c = e(l.isvip), f = n, d = c(a.videoList), g = a.pageContext, h = a.isAllData, p = 0;
    return {
        findIndex: function(e) {
            for (var t = 0; t < d.length; t++) if (d[t].vid == e) return {
                index: t,
                item: d[t]
            };
            return null;
        },
        locate: function(e) {
            p = e == d.length - 1 ? d.length - 3 : 0 == e ? 0 : e - 1, s.emit("change", u());
        },
        findNext: function(e) {
            return d[e + 1];
        },
        onChange: function(e, t) {
            return s.on("change", e, t), !t && e(u()), this;
        },
        nextPage: o.lock(function(e, t) {
            var n = this;
            return h ? (e(), !1) : i.vaccess("detail_video_list", {
                dataKey: f,
                pageContext: g
            }).then(function(e) {
                if (0 != e.errCode) throw new Error(e);
                return d = g ? d.concat(c(e.videoList)) : c(e.videoList), h = !e.hasNextPage, e.pageContext;
            }).catch(function(e) {
                h = !0;
            }).then(function(r) {
                if (g = r, e(), t && !h) return n.nextPage(!0);
                s.emit("change", u());
            });
        })
    };
};