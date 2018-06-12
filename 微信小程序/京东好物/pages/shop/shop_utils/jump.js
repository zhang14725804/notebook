function e(e) {
    if (console.log("跳转商品详情页面"), e) {
        e.indexOf("http") >= 0 && (e = (e = (e = e.split("?")[0]).split("#")[0]).substring(e.lastIndexOf("/") + 1, e.length - 5));
        var o = getCurrentPages();
        e && (1 === o.length ? wx.navigateTo({
            url: "/pages/product/product?wareId=" + e
        }) : wx.redirectTo({
            url: "/pages/product/product?wareId=" + e
        }));
    }
}

function o(e, o) {
    console.log("跳转商品单品列表"), e && wx.navigateTo({
        url: "/pages/shopRcmd/shopRcmd?key=" + e + "&moduletype=PORMOTION&name=" + o
    });
}

function t(e) {
    if (console.log("跳通天塔"), e) {
        var o = e;
        o = (o = (o = o.split("?")[0]).split("#")[0]).substring(o.indexOf("active") + 7, o.indexOf("index") - 1), 
        wx.navigateTo({
            url: "/pages/BabelHome/BabelHome?activityId=" + o
        });
    }
}

function i(e) {
    if (console.log("跳JShop活动页"), e) {
        var o = e;
        o = (o = (o = o.split("?")[0]).split("#")[0]).substring(o.lastIndexOf("/") + 1, o.length - 5), 
        wx.navigateTo({
            url: "/pages/jshopHtml/jshopHtml?appId=" + o
        });
    }
}

function a(e) {
    if (console.log("跳独立领劵页"), e) {
        var o = e;
        (o = o.split("?")).length >= 2 && wx.navigateTo({
            url: "/pages/coupon/getCoupon/getCoupon?" + o[1]
        });
    }
}

getApp();

var n = require("./thirdTemplateJump.js");

module.exports = {
    clickActivity: function(n) {
        if (n) switch (n.configType) {
          case 1:
            o(n.key, n.name);
            break;

          case 4:
            var p = n.redirectUrl;
            p.indexOf("item.m.jd.com") > 0 || p.indexOf("item.jd.com") > 0 ? e(p) : p.indexOf("sale.jd.com") > 0 ? i(p) : p.indexOf("pro.m.jd.com") > 0 || p.indexOf("h5.m.jd.com") > 0 ? t(p) : p.indexOf("coupon.m.jd.com") > 0 && a(p);
            break;

          case 3:
            var c = n.cid;
            wx.navigateTo({
                url: "/pages/shopSearch/shopSearch?cateId=" + c
            });
            break;

          case 8:
            e(n.productId);
        }
    },
    templateClick: function(e) {
        n.thirdTemplateJump(e);
    },
    jumpToSkuDetail: e,
    jumpToSkuList: o,
    jumpToBabelHome: t,
    jumpToJShopHome: i
};