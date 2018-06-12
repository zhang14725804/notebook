new (require("../../../../bases/component"))({
    properties: {
        coupons: Array,
        showCouponLayerFlag: Boolean
    },
    methods: {
        closeCoupon: function() {
            this.triggerEvent("closeCoupon");
        },
        drawCoupon: function(o) {
            this.triggerEvent("drawCoupon", o);
        }
    }
});