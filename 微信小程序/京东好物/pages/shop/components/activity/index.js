var e = require("../../../../utils/keplerReport.js").init(), t = require("./model.js");

Component({
    properties: {
        activityList: {
            type: Array,
            value: [],
            observer: function(e, t) {
                console.log(e), console.log(t);
            }
        }
    },
    data: {
        list: t.getShopActivityPage()
    },
    methods: {
        clickSku: function(t) {
            console.log(t);
            var p = t.currentTarget.dataset.wareid, r = t.currentTarget.dataset.activitytype;
            e.set({
                pageId: "KeplerMiniAppShopHome"
            }), e.click({
                eid: "KMiniAppShop_ShopDynamic",
                elevel: "",
                eparam: "" + r,
                pname: "/pages/shop/shop",
                pparam: "",
                target: "../product/product?wareId=" + p,
                event: "clickSku"
            }), wx.navigateTo({
                url: "../product/product?wareId=" + p
            });
        },
        subjectUrl: function(t) {
            var p = t.currentTarget.dataset.murl;
            p && p.indexOf("sale.jd.com") > 0 && (p = (p = p.split("?")[0]).substring(p.lastIndexOf("/") + 1, p.length - 5), 
            e.set({
                pageId: "KeplerMiniAppShopHome"
            }), e.click({
                eid: "KMiniAppShop_ShopDynamic",
                elevel: "",
                eparam: "3",
                pname: "/pages/shop/shop",
                pparam: "",
                target: "../jshopHtml/jshopHtml?appId=" + p,
                event: "subjectUrl"
            }), wx.navigateTo({
                url: "../jshopHtml/jshopHtml?appId=" + p
            }));
        },
        bigPicPreview: function(t) {
            console.log(t), e.set({
                pageId: "KeplerMiniAppShopHome"
            }), e.click({
                eid: "KMiniAppShop_ShopDynamic",
                elevel: "",
                eparam: "16",
                pname: "/pages/shop/shop",
                pparam: "",
                target: "",
                event: "bigPicPreview"
            });
            var p = t.currentTarget.dataset.currenturl, r = [];
            (t.currentTarget.dataset.list || []).map(function(e, t) {
                r.push(e.imgUrl);
            }), wx.previewImage({
                current: p,
                urls: r
            });
        }
    }
});