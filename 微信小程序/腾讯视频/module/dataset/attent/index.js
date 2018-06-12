function t(t, e, n) {
    d.push({
        playlist: t,
        data: e
    }), n && (d = []);
}

function e() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n = JSON.stringify(e).length, r = new Date(), o = /adExtend|adKey|adType|configstrs|debugInfo|imageUiType|posterExpansion|rating|replaceKey|replaceType|reportKey|reportParams|style/;
    e.forEach(function(t) {
        for (var e = {}, n = Object.keys(t.poster), r = 0, a = n.length; r < a; r++) o.test(n[r]) || (e[n[r]] = t.poster[n[r]]);
        t.poster = e;
    });
    var a = new Date() - r, i = JSON.stringify(e).length;
    t("data length", e.length), t("before filter size", n / 1e3 + "Kb"), t("after filter size", i / 1e3 + "Kb"), 
    t("filter rate", Math.round((n - i) / n * 100) + "%"), t("filter time", a + "ms");
}

function n(n, r, o) {
    i.vaccess("attent_list", n).then(function(n) {
        if (n && 0 == n.errCode) {
            n.poster = e(n.VideoAttentInfoList), r && r(n), t("before storage size", wx.getStorageInfoSync().currentSize + "Kb");
            try {
                wx.setStorageSync(c, n), wx.setStorageSync(f, new Date()), t("after storage size", wx.getStorageInfoSync().currentSize + "Kb", !0);
            } catch (t) {}
        } else try {
            var n = wx.getStorageSync(c);
        } catch (t) {
            o && o(t);
        }
    }, function(t) {
        try {
            var e = wx.getStorageSync(c);
            r && r(e);
        } catch (t) {
            o && o(t);
        }
    });
}

function r(t, e, n) {
    i.vaccess("attent_modify", t).then(function(t) {
        t && 0 == t.errCode ? (t.attentItemList ? a(t.attentItemList, "del") : wx.removeStorageSync(c), 
        e(t)) : n(t);
    }, function(t) {
        n(t);
    });
}

function o(t, e, n) {
    i.vaccess("attent_modify", t).then(function(t) {
        t && 0 == t.errCode ? (a(t.attentItemList, "add"), e(t)) : n(t);
    }, function(t) {
        n(t);
    });
}

function a() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = arguments[1], n = wx.getStorageSync(c), r = n && n.VideoAttentInfoList || [], o = r.map(function(t) {
        return t.attentKey;
    });
    t.forEach(function(t) {
        var n = o.indexOf(t.attentKey);
        "del" === e && n > -1 ? r.splice(n, 1) : "add" === e && (-1 === n ? r.unshift(t) : r[n] = t);
    }), n.VideoAttentInfoList = r, wx.setStorageSync(c, n);
}

var i = require("../../request/request"), s = require("../../es6-promise"), c = "attent_list", f = "attent_list_request_time";

module.exports = {
    list: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
            dataVersion: 0
        }, e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return new s(function(r, o) {
            if (e) n(t, r, o); else try {
                var a = wx.getStorageSync(f), i = wx.getStorageSync(c), s = new Date();
                console.log(a), void 0 !== a && (s - a) / 1e3 > 120 ? i && null != i.VideoAttentInfoList ? (r(i), 
                n(data)) : n(data, r, o) : null != i && null != i.VideoAttentInfoList && 0 !== i.VideoAttentInfoList.length ? r(i) : n(data, r, o);
            } catch (e) {
                n(t, r, o);
            }
        });
    },
    del: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return new s(0 == t.length ? function(t, e) {
            e({
                errCode: -1,
                errMsg: "attent array to delete is empty"
            });
        } : function(e, n) {
            Array.isArray(t) || (t = [ t ]), r({
                attentKeyList: t || [],
                option: 2
            }, e, n);
        });
    },
    add: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return new s(0 === t.length ? function(t, e) {
            e({
                errCode: -1,
                errMsg: "attent array to add is empty"
            });
        } : function(e, n) {
            Array.isArray(t) || (t = [ t ]), o({
                attentKeyList: t || [],
                option: 1
            }, e, n);
        });
    }
};

var d = [];