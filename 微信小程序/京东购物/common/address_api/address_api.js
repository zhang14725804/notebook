function e(e, i) {
    this.success = e, this.fail = i;
}

function i(e) {
    for (var i = [], n = [], d = 0; d < e.length; d++) {
        var a = e[d];
        i.push(a.id), n.push(a.name);
    }
    return {
        idList: i,
        nameList: n
    };
}

function n(e) {
    e(null, t);
}

function d(i, n) {
    var d = "https://wq.jd.com/deal/recvaddr/getprovince?provinceid=" + i;
    a.default.get(d, [], new e(function(e) {
        n(null, e);
    }, function(e) {
        n("error");
    }));
}

var a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/http_json.js")), t = [ {
    name: "北京",
    id: 1
}, {
    name: "上海",
    id: 2
}, {
    name: "天津",
    id: 3
}, {
    name: "重庆",
    id: 4
}, {
    name: "河北",
    id: 5
}, {
    name: "山西",
    id: 6
}, {
    name: "河南",
    id: 7
}, {
    name: "辽宁",
    id: 8
}, {
    name: "吉林",
    id: 9
}, {
    name: "黑龙江",
    id: 10
}, {
    name: "内蒙古",
    id: 11
}, {
    name: "江苏",
    id: 12
}, {
    name: "山东",
    id: 13
}, {
    name: "安徽",
    id: 14
}, {
    name: "浙江",
    id: 15
}, {
    name: "福建",
    id: 16
}, {
    name: "湖北",
    id: 17
}, {
    name: "湖南",
    id: 18
}, {
    name: "广东",
    id: 19
}, {
    name: "广西",
    id: 20
}, {
    name: "江西",
    id: 21
}, {
    name: "四川",
    id: 22
}, {
    name: "海南",
    id: 23
}, {
    name: "贵州",
    id: 24
}, {
    name: "云南",
    id: 25
}, {
    name: "西藏",
    id: 26
}, {
    name: "陕西",
    id: 27
}, {
    name: "甘肃",
    id: 28
}, {
    name: "青海",
    id: 29
}, {
    name: "宁夏",
    id: 30
}, {
    name: "新疆",
    id: 31
}, {
    name: "台湾",
    id: 32
}, {
    name: "钓鱼岛",
    id: 84
}, {
    name: "港澳地区",
    id: 52993
}, {
    name: "海外",
    id: 53283
} ], r = {}, s = {}, u = {}, m = !0;

module.exports = {
    getProvinceList: function(e) {
        n(function(i, n) {
            for (var d = [], a = [], t = n.length - 1; t >= 0; t--) {
                var r = n[t];
                (53283 != r.id || m) && (d.splice(0, 0, r.id), a.splice(0, 0, r.name));
            }
            e(i, {
                idList: d,
                nameList: a
            });
        });
    },
    getCityList: function(e, i) {
        r.hasOwnProperty(e) ? i(null, r[e]) : d(e, function(n, d) {
            -1 == d.errCode && (d = {});
            var a = [], t = [], m = [], o = [];
            for (var f in d) {
                var c = d[f];
                if (a.push(~~f), "string" == typeof c) if (53283 != e) t.push(c); else {
                    var l = c.split("_");
                    t.push(l[0]), m.push(l[1]), o.push(l[2]);
                } else {
                    if (53283 != e) t.push(c[0]); else {
                        var p = c[0].split("_");
                        t.push(p[0]), m.push(p[1]), o.push(p[2]);
                    }
                    var h = [], v = [], L = c[1];
                    for (var g in L) {
                        var j = L[g];
                        if (h.push(~~g), "string" == typeof j) v.push(j); else {
                            v.push(j[0]);
                            var y = [], w = [], C = j[1];
                            for (var _ in C) y.push(~~_), w.push(C[_]);
                            u[g] = {
                                idList: y,
                                nameList: w
                            };
                        }
                    }
                    s[f] = {
                        idList: h,
                        nameList: v
                    };
                }
            }
            r[e] = 53283 != e ? {
                idList: a,
                nameList: t
            } : {
                idList: a,
                nameList: t,
                areaCodeList: m,
                nameCodeList: o
            }, i(n, r[e]);
        });
    },
    getDistrictList: function(e, n, d) {
        s.hasOwnProperty(n) ? d(null, s[n]) : d(null, i([]));
    },
    getTownList: function(e, n, d, a) {
        0 != d && u.hasOwnProperty(d) ? a(null, u[d]) : a(null, i([]));
    },
    getUserDefaultDeliveryAddress: function(e) {
        var i = "https://wq.jd.com/deal/recvaddr/getrecvaddrV3?r=" + Math.round(2147483647 * Math.random()) + "&adid=0&reg=1&type=1";
        a.default.get(i, {}, {
            success: function(i) {
                0 == i.retCode && i.jdaddrid && i.jdaddrname && require("../user_info.js").updateAddress({
                    jdaddrid: i.jdaddrid,
                    jdaddrname: i.jdaddrname
                }), "function" == typeof e && e(i.retCode || 0, i);
            },
            fail: function(i) {
                "function" == typeof e && e(-1, i);
            }
        });
    },
    setDisplayHwAddr: function(e) {
        m = e;
    }
};