function e(r) {
    var a = e;
    if (Array.isArray(r)) for (var s = r.length, i = 0; i < s; i++) "object" === t(r[i]) && a(r[i]); else if ("object" === (void 0 === r ? "undefined" : t(r)) && null !== r) for (var n in r) r.hasOwnProperty(n) && ("productId" === n && (a.elements[r[n]] ? a.elements[r[n]].push(r) : a.elements[r[n]] = [ r ]), 
    "object" === t(r[n]) && a(r[n]));
    return a.elements;
}

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = require("util.js"), a = getApp();

module.exports = {
    tapNavigate: function(e) {
        var t = e.currentTarget.dataset, r = t.url, a = t.open;
        if (void 0 !== r && "" != r) {
            var s = {
                url: r
            };
            "redirect" == a ? wx.redirectTo(s) : "switchTab" == a ? wx.switchTab(s) : "navigateBack" == a ? wx.navigateBack() : wx.navigateTo(s);
        }
    },
    tapAddCart: function(e) {
        var t = e.target.dataset.param.split(","), s = {
            product_id: t[0],
            sku: t[1] || "",
            consumption: 1
        };
        a.request("cart/add", s, function(e, t) {
            if (t) if (2003009 == t.code) r.showTips(t.desc, "/pages/checkout/index"); else {
                var a = t.desc || "网络开小差了了~请稍后再试";
                r.showError(a);
            } else wx.navigateTo({
                url: "/pages/checkout/index"
            });
        });
    },
    tapDraw: function(e) {
        r.showLoading();
        var t = e.target.dataset.param;
        a.request("draw/draw", {
            code: t
        }, function(e, t) {
            r.hideLoading(), t ? r.showError(t.desc || "服务异常请稍后再试,或下载小米商城APP") : r.showError(e.data);
        });
    },
    tapThanksgiving2017: function(e) {
        r.showLoading(), a.request("thanksgiving2017/draw", {}, function(e, t) {
            r.hideLoading(), t ? r.showError(t.desc || "服务异常请稍后再试,或下载小米商城APP") : r.showError("恭喜您获得 " + e.data.PrizeName);
        });
    },
    filterElementsWhichHavePropertyPrice: function(t) {
        return e.elements = {}, e(t);
    },
    rebuildElements: function(e, t) {
        return new Promise(function(r, s) {
            a.request("product/priceInfo", {
                ids: e.join(",")
            }, function(e, a) {
                if (a) s({
                    err: a
                }); else {
                    var i = e.data;
                    for (var n in i) !function(e) {
                        if (i.hasOwnProperty(e) && (t[e].forEach(function(t) {
                            /p2/.test(t.class) && i[e].market_price ? (i[e].is_multi_price ? (t.value = i[e].market_price.replace(/起(s+)?$/, ""), 
                            t.class += " p2_qi") : t.value = i[e].market_price.replace(/起(s+)?$/, ""), t.class = t.class.replace(/(s+)?p_hidden/g, "")) : /p1/.test(t.class) && i[e].price && (i[e].is_multi_price ? (t.value = i[e].price.replace(/起(s+)?$/, ""), 
                            t.class += " p1_qi") : t.value = i[e].price.replace(/起(s+)?$/, ""), t.class = t.class.replace(/(s+)?p_hidden/g, ""));
                        }), t[e].length >= 2 && t[e].length % 2 == 0)) for (var r = 0; r < t[e].length; r++) /p1/.test(t[e][r].class) && /p2/.test(t[e][r + 1].class) && parseInt(t[e][r].value, 10) === parseInt(t[e][r + 1].value, 10) && (/p_hidden/.test(t[e][r + 1].class) || (t[e][r + 1].class += " p_hidden")), 
                        r++;
                    }(n);
                    r(t);
                }
            });
        });
    }
};