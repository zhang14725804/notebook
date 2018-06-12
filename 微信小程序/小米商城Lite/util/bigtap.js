function t(t) {
    var a = Math.floor(t / 1e3), o = Math.floor(a / 3600), n = e(Math.floor((a - 3600 * o) / 60)), s = e(a - 3600 * o - 60 * n);
    return o ? "还有 " + o + "小时" + n + "分" + s + "秒 开始" : "还有 " + n + "分" + s + "秒 开始";
}

function e(t) {
    return t < 10 ? "0" + t : t;
}

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = null, n = (require("./tracker.js"), "https://tp.hd.mi.com"), s = 0, r = 0, i = 0, u = 0, d = {
    getTimestamp: function() {
        return new Promise(function(t, e) {
            wx.request({
                url: n + "/gettimestamp",
                data: {},
                header: {
                    "content-type": "application/json"
                },
                success: function(e) {
                    if (e && e.data) {
                        var a = e.data.match(/\d+/);
                        t(a ? {
                            timestamp: 1e3 * a[0]
                        } : {
                            timestamp: new Date().getTime()
                        });
                    } else t({
                        timestamp: new Date().getTime()
                    });
                },
                fail: function(e) {
                    t({
                        timestamp: new Date().getTime()
                    });
                }
            });
        });
    },
    getHDInfo: function(t) {
        return new Promise(function(e, s) {
            t.storage ? wx.request({
                url: n + "/hdinfo/cn",
                data: {
                    storage: t.storage,
                    m: 8,
                    source: t.source,
                    start: t.start || ""
                },
                header: {
                    "content-type": "application/json",
                    cookie: "userId=" + (o.storageData.userId || o.storageData.vid)
                },
                success: function(o) {
                    var n = null, s = null;
                    if (o && o.data && (o.data = o.data.replace(/^hdinfo\(/, "").replace(/\)$/, ""), 
                    s = (n = JSON.parse(o.data)).status), "object" == (void 0 === s ? "undefined" : a(s))) for (var r in s) if (s.hasOwnProperty(r) && r == t.goodsID) return void e({
                        hdstatus: s[r].hdstatus,
                        salt: s[r].salt,
                        startTime: 1e3 * s[r].starttime,
                        systemTime: 1e3 * n.stime,
                        status: s
                    });
                    e({
                        hdstatus: 3,
                        salt: ""
                    });
                },
                fail: function(t) {
                    e({
                        hdstatus: 3,
                        salt: ""
                    });
                }
            }) : s();
        });
    },
    getDeliveryInfo: function(t) {
        return new Promise(function(e, n) {
            var s = {}, r = null;
            t.addressID ? (s.address_id = t.addressID, s.product_id = t.goodsID, s.item_id = "") : t.lat && t.lng && t.adcode && (s.lat = t.lat, 
            s.lng = t.lng, s.adcode = t.adcode, s.product_id = t.goodsID, s.item_id = ""), o.request("product/deliverySearch", s, function(o, s) {
                var i = 0;
                if (s) n(s); else {
                    if (o && 0 == o.code && "object" == a(o.data) && "object" == a(o.data.datas)) {
                        var u = o.data.datas;
                        r = o.data.address || o.data.regions;
                        for (var d in u) if (u.hasOwnProperty(d) && d == t.goodsID) {
                            i = u[d].mihome_id;
                            break;
                        }
                    }
                    e({
                        storage: i,
                        address: r
                    });
                }
            }, !1, !0);
        });
    },
    rush: function(t) {
        var e = function t(e, r) {
            wx.request({
                url: n + "/hdget/cn",
                data: {
                    product: e.goodsID,
                    m: 8,
                    addcart: e.num,
                    jsonpcallback: "hdcontrol",
                    source: e.source
                },
                header: {
                    "content-type": "application/json",
                    cookie: "userId=" + (o.storageData.userId || o.storageData.vid)
                },
                success: function(o) {
                    var n = null, i = null, u = 0;
                    if (o && o.header && 500 == o.header.status) r(null); else if (o && o.data) {
                        if (o.data = o.data.replace(/^hdcontrol\(/, "").replace(/\)$/, ""), "object" == (void 0 === (n = JSON.parse(o.data)) ? "undefined" : a(n)) && (u = 1e3 * n.d22a51, 
                        "object" == (void 0 === (i = n.status) ? "undefined" : a(i)))) {
                            for (var d in i) if (i.hasOwnProperty(d) && d == e.goodsID) {
                                if (i[d].hdurl) return void r({
                                    hdstatus: i[d].hdstatus,
                                    hdurl: i[d].hdurl
                                });
                                if (2 != i[d].hdstatus) return void r({
                                    hdstatus: i[d].hdstatus,
                                    hdurl: ""
                                });
                                break;
                            }
                            s = setTimeout(function(a) {
                                t(e, r);
                            }, u);
                        }
                    } else r(null);
                },
                fail: function(t) {
                    r(null);
                }
            });
        };
        return new Promise(function(a, o) {
            e(t, function(t) {
                t ? a(t) : o();
            });
        });
    },
    stopRushing: function() {
        s && (clearTimeout(s), s = 0);
    },
    countDown: function(t) {
        r && (clearTimeout(r), r = 0), u = t.startTime, i = t.startTime - t.systemTime, 
        t.callback && t.callback(i), this._countDown(t.callback);
    },
    _countDown: function(e) {
        var a = this;
        i <= 0 ? e(0) : (e(t(i)), i % 59 == 0 ? this.getTimestamp().then(function(t) {
            i = u - t.timestamp, r = setTimeout(function() {
                i -= 1e3, a._countDown(e);
            }, 1e3);
        }).catch(function(t) {
            r = setTimeout(function() {
                i -= 1e3, a._countDown(e);
            }, 1e3);
        }) : r = setTimeout(function() {
            i -= 1e3, a._countDown(e);
        }, 1e3));
    }
};

module.exports = function(t) {
    return o = t, d;
};