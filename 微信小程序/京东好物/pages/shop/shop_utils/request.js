function t(t) {
    var e = {
        shopId: wx.getStorageSync("shopID")
    }, o = JSON.stringify(Object.assign(e, t)), i = wx.getStorageSync("jdlogin_pt_key"), n = new Object();
    return n.body = o, n.pt_key = i, n.screen = r.globalData.systemInfo.windowWidth * r.globalData.systemInfo.pixelRatio + "*" + r.globalData.systemInfo.windowHeight * r.globalData.systemInfo.pixelRatio, 
    n.client = "wx", n.clientVersion = "6.6.5", n.source = "jd-jing", n;
}

function e(e, o, i, n) {
    var r = t(o), e = e;
    wx.request({
        url: e,
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: r,
        success: function(t) {
            var e = t.data.code;
            0 === e || "0" === e ? i && i(t.data) : n && n();
        },
        fail: function(t) {
            n && n();
        },
        complete: function(t) {}
    });
}

function o(t, e, o, i) {
    var n = e.shopId || "", r = e.pageIdx || "", s = e.pagesize || "";
    if ("" == r) t = t + '?body={"shopId":' + n + "}"; else var t = t + '?body={"shopId":' + n + ',"pageIndex":' + r + ',"pageSize":' + s + "}";
    wx.request({
        url: t,
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        method: "post",
        success: function(t) {
            var e = t.data.code;
            0 === e || "0" === e ? o && o(t.data) : i && i();
        },
        fail: function(t) {
            i && i();
        },
        complete: function(t) {}
    });
}

function i(t) {
    function e(t, e) {
        return o(t.jdPrice) ? (t.preJDPrice = t && t.jdPrice && t.jdPrice.toString().split(".")[0], 
        t.sufJDPrice = t && t.jdPrice && t.jdPrice.toString().split(".")[1], t.isJDPrice = t && t.jdPrice && !0) : t.isJDPrice = t && t.jdPrice && !1, 
        t;
    }
    function o(t) {
        return !!/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(t);
    }
    if (!t) return [];
    if (!t.length) return !1;
    var i = [];
    return t.map(function(t, o) {
        i.push(e(t));
    }), i;
}

function n(t) {
    function e(t, e) {
        var o = t.SkuInf[0];
        return o.prestrPromoPrice = o && o.strPromoPrice && o.strPromoPrice.toString().split(".")[0], 
        o.sufstrPromoPrice = o && o.strPromoPrice && o.strPromoPrice.toString().split(".")[1], 
        t;
    }
    return t.pingouList.map(function(t, o) {
        e(t);
    }), t;
}

var r = getApp(), s = (require("../../../utils/shop_util.js").getShopConfigure().configure.shopID, 
r.globalRequestUrl + "/shopwechat/shophomesoa/getShopHomeData"), a = r.globalRequestUrl + "/shopwechat/shophomesoa/searchWare", c = r.globalRequestUrl + "/shopwechat/shophomesoa/getShopHotWares", u = r.globalRequestUrl + "/shopwechat/shophomesoa/getShopPromotionWareList", p = r.globalRequestUrl + "/shopwechat/shophomesoa/getShopPromotionTypes", l = r.globalRequestUrl + "/shopwechat/shophomesoa/newWareList", f = r.globalRequestUrl + "/shopwechat/shophomesoa/getShopActivityPage", h = r.globalFbUrl + "/index/getPingouLstInfo";

module.exports = {
    getShopHomeData: function(t, o) {
        e(s, {}, function(e) {
            e ? t && t(e.result) : o && o();
        }, function(t) {
            o && o();
        });
    },
    searchWare: function(t, o, n) {
        e(a, t, function(t) {
            var e = t.result, n = e && e.wareInfo || [], r = e.pageIdx, s = e.totalPage, a = !0, c = e.hasNext;
            r >= s && (a = !1), o && o(i(n), a && c);
        }, function(t) {
            n && n();
        });
    },
    getShopHotWares: function(t, o, n) {
        e(c, t, function(t) {
            var e = t.result || [], n = !0;
            t.pageIdx >= t.totalPage && (n = !1), o && o(i(e), n);
        }, function(t) {
            n && n();
        });
    },
    newWareList: function(t, o, n) {
        e(l, t, function(t) {
            var e = t.result, n = e.result || [], r = e.pageIdx, s = e.totalPage, a = e.hasNext, c = !0;
            r >= s && (c = !1), n.map(function(t, e) {
                t.wareList = i(t.wareList);
            }), o && o(n, c && a && n);
        }, function(t) {
            n && n();
        });
    },
    getShopActivityPage: function(t, o, i) {
        e(f, t, function(t) {
            var e = t.activity, i = !(!e || 20 !== e.length);
            o && o(e, i);
        }, function(t) {
            i && i();
        });
    },
    getShopPromotionTypes: function(t, o) {
        e(p, {}, function(e) {
            var i = e.result;
            if (i) {
                var n = i.promList || [];
                t(n);
            } else o && o();
        }, function(t) {
            o && o();
        });
    },
    getShopPromotionWareList: function(t, o, n) {
        e(u, t, function(t) {
            if (t) if (t.otherMap && 10 === t.type) r = !(!(s = t.otherMap.promList) || 20 !== s.length), 
            o && o(i(s), r); else if (!t.wareList || 4 !== t.type && 1 !== t.type) if (t.suitList && 6 === t.type) {
                var e = t.suitList, r = !(!e || 20 !== e.length);
                e.map(function(t, e) {
                    t.preJDPrice = t && t.suitPrice && t.suitPrice.toString().split(".")[0], t.sufJDPrice = t && t.suitPrice && t.suitPrice.toString().split(".")[1], 
                    t.open = !0;
                }), o && o(e, r);
            } else o && o([], !1); else {
                var s = t.wareList, r = !(!s || 20 !== s.length);
                o && o(i(s), r);
            } else n();
        }, function(t) {
            n && n();
        });
    },
    getFightBuy: function(t, e, i) {
        o(h, t, function(t) {
            var o = t.result || [];
            e && e(n(o));
        }, function(t) {
            i && i(t);
        });
    }
};