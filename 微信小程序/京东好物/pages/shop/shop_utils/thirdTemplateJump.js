function e(e) {
    if (!e) return !1;
    var o = e.detail, a = e.item, t = e.key;
    o && "object" === (void 0 === o ? "undefined" : s(o)) ? p(o) : o && "string" == typeof o ? i(o) : a && "object" === (void 0 === a ? "undefined" : s(a)) ? p(a) : a && "string" == typeof a ? i(a) : t && "object" === (void 0 === t ? "undefined" : s(t)) ? p(t) : t && "string" == typeof t && i(t);
}

function p(p) {
    p.configDataType || 0 === p.configDataType ? o(p) : p.skuId ? t(p.skuId) : e(p);
}

function o(e) {
    if (e) {
        switch (e.configDataType) {
          case 0:
            break;

          case 1:
            var p = e.configDataValue && e.configDataValue.skuIds;
            if ("string" == typeof p && 1 === p.split(",").length) return void t(p);
            i(e.key, e.configDataValue && e.configDataValue.title);
            break;

          case 2:
            break;

          case 3:
            n(e.configDataValue && e.configDataValue.cid);
            break;

          case 4:
            c(e.configDataValue && e.configDataValue.activityId);
            break;

          case 5:
          case 6:
            break;

          case 7:
            var o = e.configDataValue && e.configDataValue.linkUrl;
            o && (o.indexOf("coupon.m.jd.com") >= 0 ? a(o) : r(o));
        }
    }
}

function a(e) {
    if (console.log("跳独立领劵页"), e) {
        var p = e;
        (p = p.split("?")).length >= 2 && (u.set({
            pageId: "KeplerMiniAppShopHome"
        }), u.click({
            eid: "KMiniAppShop_Activityid",
            elevel: "",
            eparam: "1",
            pname: "/pages/shop/shop",
            pparam: "",
            target: '/pages/coupon/getCoupon/getCoupon?" + appid[1]',
            event: "jumpToJShopHome"
        }), wx.navigateTo({
            url: "/pages/coupon/getCoupon/getCoupon?" + p[1]
        }));
    }
}

function t(e) {
    e && (u.set({
        pageId: "KeplerMiniAppShopHome"
    }), u.click({
        eid: "KMiniAppShop_Productid",
        elevel: "",
        eparam: "" + e,
        pname: "/pages/shop/shop",
        pparam: "",
        target: "/pages/product/product?wareId=" + e,
        event: "jumpToSkuDetail"
    }), 1 === getCurrentPages().length ? wx.navigateTo({
        url: "/pages/product/product?wareId=" + e
    }) : wx.redirectTo({
        url: "/pages/product/product?wareId=" + e
    }));
}

function i(e, p) {
    e && (u.set({
        pageId: "KeplerMiniAppShopHome"
    }), u.click({
        eid: "KMiniAppShop_Activityid",
        elevel: "",
        eparam: "0",
        pname: "/pages/shop/shop",
        pparam: "",
        target: "/pages/shopRcmd/shopRcmd?key=" + e + "&moduletype=PORMOTION&template=1&name=" + p,
        event: "jumpToSkuList"
    }), wx.navigateTo({
        url: "/pages/shopRcmd/shopRcmd?key=" + e + "&moduletype=PORMOTION&template=1&name=" + p
    }));
}

function n(e) {
    e && (u.set({
        pageId: "KeplerMiniAppShopHome"
    }), u.click({
        eid: "KMiniAppShop_Activityid",
        elevel: "",
        eparam: "0",
        pname: "/pages/shop/shop",
        pparam: "",
        target: "/pages/shopSearch/shopSearch?cateId=" + e,
        event: "jumpToShopSearch"
    }), wx.navigateTo({
        url: "/pages/shopSearch/shopSearch?cateId=" + e
    }));
}

function c(e) {
    e && (u.set({
        pageId: "KeplerMiniAppShopHome"
    }), u.click({
        eid: "KMiniAppShop_Activityid",
        elevel: "",
        eparam: "1",
        pname: "/pages/shop/shop",
        pparam: "",
        target: "/pages/jshopHtml/jshopHtml?appId=" + e,
        event: "jumpToJShopHome"
    }), wx.navigateTo({
        url: "/pages/jshopHtml/jshopHtml?appId=" + e
    }));
}

function r(e) {
    e && (e = e + "?wxAppName=Kepler&wxAppId=" + l.getExtConfig().appid + "&siteId=WXAPP-JA2016-1", 
    u.set({
        pageId: "KeplerMiniAppShopHome"
    }), u.click({
        eid: "KMiniAppShop_Activityid",
        elevel: "",
        eparam: "1",
        pname: "/pages/shop/shop",
        pparam: "",
        target: "/pages/activityH5/activityH5?redirectUrl=" + encodeURIComponent(e),
        event: "jumpToWebView"
    }), wx.navigateTo({
        url: "/pages/activityH5/activityH5?redirectUrl=" + encodeURIComponent(e)
    }));
}

var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, l = (getApp(), require("../../../utils/onLaunch.js")), u = require("../../../utils/keplerReport.js").init();

module.exports = {
    thirdTemplateJump: function(p) {
        console.log("第三方模板跳转"), console.log(p), e(p);
    }
};