!function() {
    require("./../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 52 ], {
    343: function() {
        Component({
            properties: {
                goods: Object,
                title: String,
                description: String,
                price: String,
                oldPrice: String,
                salesNum: null,
                storeName: String,
                thumbUrl: String,
                url: String,
                mode: {
                    type: Number,
                    value: 1
                },
                titleLine: {
                    type: Number,
                    value: 2
                },
                showMessage: {
                    type: Boolean,
                    value: !0
                },
                openType: {
                    type: String,
                    value: "navigateTo"
                }
            },
            methods: {
                onTapItem: function() {
                    var e = this;
                    wx[this.data.openType]({
                        url: this.data.url,
                        complete: function() {
                            e.triggerEvent("tapCallback", e.data);
                        }
                    });
                }
            }
        });
    }
}, [ 343 ]);