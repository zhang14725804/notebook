var e = require("../../../bases/component"), t = require("../../../common/cookie-v2/cookie.js");

new e({
    properties: {
        address: String,
        info: Object,
        serviceQueryStr: String,
        isOffline: Boolean,
        shopDetail: Object
    },
    ready: function() {
        getApp().event.on("updateChoseShop", this.render.bind(this)), this.render();
    },
    methods: {
        render: function() {
            var e = t.getCookie("choseShop");
            if (e) {
                var o = t.getCookie("choseShopId").split("----");
                if (o && o[1] === this.properties.info.skuId && e) {
                    var r = e.split("----"), i = {
                        addr: r[0],
                        name: r[1],
                        phone: r[2]
                    };
                    this.setData({
                        shopDetail: i
                    });
                }
            }
        },
        switchAddress: function(e) {
            this.$report("VIEW_FOLD_wADDR"), this.triggerEvent("showAddressLayer");
        },
        navigateTo: function(e) {
            var t = e.currentTarget.dataset, o = t.url, r = t.type;
            this.$goto(o, "navigateToByForce"), "service" == r && this.$report("DETAIL_SERVICE");
        },
        chooseShop: function() {
            this.triggerEvent("chooseShop");
        },
        makePhone: function(e) {
            var t = e.currentTarget.dataset.phone;
            wx.makePhoneCall({
                phoneNumber: t
            });
        }
    }
});