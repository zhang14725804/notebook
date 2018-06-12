function e() {}

function n(e) {
    d.onLoginEnd(function() {
        d.getLoginInfo(function(n, t) {
            t && (t && "qq" == t.type ? (g = y + "_" + t.uin, l = v + "_" + t.uin) : (g = y, 
            l = v)), e && e();
        });
    });
}

function t(e) {
    n(e);
}

function r(e) {
    var n = wx.getStorageSync(l) || [], t = n.map(function(e) {
        return e.cid + "_" + e.vid;
    });
    return Array.isArray(e) || (e = [ e ]), e.forEach(function(e) {
        var r = e.cid + "_" + e.vid, o = t.indexOf(r);
        -1 === o ? n.push(e) : n[o] = e;
    }), n;
}

function o() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n = "adExtend|adKey|adType|configstrs|debugInfo|imageUiType|posterExpansion|rating|replaceKey|replaceType|reportKey|reportParams|style".split("|");
    e.forEach(function(e) {
        for (var t = {}, r = Object.keys(e.poster), o = 0, i = r.length; o < i; o++) -1 === n.indexOf(r[o]) && (t[r[o]] = e.poster[r[o]]);
        e.poster = t;
    });
}

function i(e, n, t) {
    f.vaccess("history_list", e).then(function(e) {
        if (!e || 0 != e.errCode) throw e;
        o(e.recordList), n && n(e), console.log("#{History} Success", g, e), wx.setStorageSync(g, e);
    }).catch(function() {
        var e = wx.getStorageSync(g);
        console.log("#{History} Error", g, e), n && n(e);
    });
}

function c() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n = arguments[1], t = arguments[2];
    f.vaccess("history_add", {
        uploadList: e
    }).then(function(e) {
        if (e && 0 == e.errCode) {
            var r = e.recordList && e.recordList[0], o = wx.getStorageSync(g);
            o && o.recordList.length > 0 && (o.recordList.forEach(function(e, n, t) {
                e.recordId === r.recordId && (o.recordList[n] = r);
            }), wx.setStorageSync(g, o), wx.removeStorageSync(l)), n && n(e);
        } else t && t(e);
    }, function(e) {
        t(e);
    });
}

function s(e, n, t, r) {
    f.vaccess("history_del", {
        recordIdList: e,
        isDeleteAll: n
    }).then(function(o) {
        if (o && 0 == o.errCode) {
            if (n) wx.removeStorageSync(g); else {
                var i = wx.getStorageSync(g);
                if (i && i.recordList.length > 0) {
                    var c = i.recordList.filter(function(n) {
                        return -1 === e.indexOf(n.recordId);
                    });
                    i.recordList = c;
                }
                wx.setStorageSync(g, i);
            }
            t && t(o);
        } else r && r(o);
    }, function(e) {
        r(e);
    });
}

var a, f = require("../../request/request"), u = require("../../es6-promise"), d = require("../../login"), g = "history_list", l = "history_to_add", y = g, v = l;

d.onLoginChange(function() {
    return function() {
        n();
    };
}), n(), module.exports = {
    list: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
            pageContext: "",
            dataVersion: 0
        }, r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return (a || u.resolve()).catch(function() {}).then(function() {
            return new u(function(o, c) {
                t(function() {
                    if (r) e(), i(n, o); else {
                        var t = wx.getStorageSync(g);
                        t && t.recordList ? (e(), o(t)) : (e(), i(n, o));
                    }
                });
            });
        });
    },
    del: function(n) {
        var r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (n instanceof Array) {
            if (n.length > 0) return new u(function(o, i) {
                e(), t(function() {
                    s(n, r, o, i);
                });
            });
        } else t(function() {
            n.vid ? i({
                pageContext: "",
                dataVersion: 0
            }, function(e) {
                var t = (e.recordList || []).filter(function(e) {
                    return e.vid === n.vid;
                });
                t.length > 0 && s([ t[0].recordId ]);
            }) : s([ n.recordId ]);
        });
    },
    add: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return new u(0 === n.length ? function(e, n) {
            n({
                errCode: 0,
                errMsg: "empty"
            });
        } : function(o, i) {
            e(JSON.stringify(n)), t(function() {
                var e = r(n);
                wx.setStorageSync(l, e), o({
                    errCode: 0,
                    data: e
                });
            });
        });
    },
    sync: function() {
        return a = new u(function(n, r) {
            t(function() {
                var t = wx.getStorageSync(l);
                t && t.length > 0 ? (e(JSON.stringify(t)), c(t, n, r)) : n && n();
            });
        });
    }
};