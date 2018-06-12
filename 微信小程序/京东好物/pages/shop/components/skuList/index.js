var e = require("../../../../utils/keplerReport.js").init();

Component({
    properties: {
        promoRule: {
            type: Object,
            value: "",
            observer: function(e, t) {}
        },
        promList: {
            type: Array,
            value: [],
            observer: function(e, t) {}
        },
        skuParam: {
            type: Object,
            value: "",
            observer: function(e, t) {}
        },
        skuType: {
            type: String,
            value: "",
            observer: function(e, t) {}
        },
        skuList: {
            type: Array,
            value: [],
            observer: function(e, t) {}
        }
    },
    data: {},
    methods: {
        click: function(t) {
            var r = "", a = "";
            switch (this.data.skuType) {
              case "1002":
                a = "KMiniAppShop_AllGoodsProductid";
                var o = this.data.skuParam.sort;
                0 === parseInt(o) ? r = "推荐" : 1 === parseInt(o) ? r = "销量" : 2 === parseInt(o) || 3 === parseInt(o) ? r = "价格" : 5 === parseInt(o) && (r = "新品");
                break;

              case "1003":
                a = "KMiniAppShop_PromotionProductid", r = "热销";
                break;

              case "1004":
                a = "KMiniAppShop_PromotionProductid";
                var p = this.data.skuParam.promoId;
                (this.data.promList || []).map(function(e, t) {
                    e.promoId === p && (r = e.name);
                });
                break;

              case "1005":
                a = "KMiniAppShop_NewProductid";
                t.currentTarget.dataset.date;
                r = "" + this.formatDateTime(t.currentTarget.dataset.date);
                break;

              case "1007":
                a = "KMiniAppShop_PingouProductid";
            }
            var i = t.currentTarget.dataset.item.wareId;
            if (e.set({
                pageId: "KeplerMiniAppShopHome"
            }), "1007" == this.data.skuType) {
                var s = t.currentTarget.dataset.item.SkuInf[0].ulSkuId;
                e.click({
                    eid: a,
                    elevel: "",
                    eparam: s,
                    pname: "/pages/shop/shop",
                    pparam: "",
                    target: "../ftproduct/ftproduct?ulSkuId=" + s,
                    event: "click"
                }), wx.navigateTo({
                    url: "../ftproduct/ftproduct?ulSkuId=" + s
                });
            } else console.log(234), e.click({
                eid: a,
                elevel: "",
                eparam: r + "_" + i,
                pname: "/pages/shop/shop",
                pparam: "",
                target: "../product/product?wareId=" + i,
                event: "click"
            }), wx.navigateTo({
                url: "../product/product?wareId=" + i
            });
        },
        tipsClick: function() {
            var e = this.data.promoRule;
            e.promRuleOpen = !e.promRuleOpen, this.setData({
                promoRule: e
            });
        },
        formatDateTime: function(e) {
            var t = new Date();
            t.setTime(e);
            var r = t.getFullYear(), a = t.getMonth() + 1;
            a = a < 10 ? "0" + a : a;
            var o = t.getDate();
            o = o < 10 ? "0" + o : o;
            var p = t.getHours();
            return p = p < 10 ? "0" + p : p, r + "年" + a + "月" + o + "日";
        }
    }
});