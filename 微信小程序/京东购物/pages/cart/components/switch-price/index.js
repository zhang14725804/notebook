var e = require("../../../../bases/component.js"), s = (new (require("../../../../common/logger.js"))("购物车-PLUS价格切换"), 
{
    show: !1,
    price: "",
    plus_price: "",
    isPlusPrice: ""
});

new e({
    properties: {
        options: {
            type: Object,
            value: s,
            observer: "onOptionsChange"
        }
    },
    data: {
        show: !0
    },
    attached: function() {},
    methods: {
        onOptionsChange: function(e) {
            e = e || s, this.setData(e.show ? {
                show: e.show,
                price: e.price,
                plus_price: e.plus_price,
                isPlusPrice: e.isPlusPrice,
                itemId: e.itemId,
                sku: e.sku
            } : {
                show: !1
            });
        },
        select: function(e) {
            var s = e.currentTarget.dataset, t = s.checked, i = s.name;
            t || (this.setData({
                isPlusPrice: "plus" === i ? 1 : 0
            }), this.triggerEvent("select", e));
        },
        close: function(e) {
            this.triggerEvent("close", e);
        }
    }
});