!function() {
    require("./../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 51 ], {
    344: function() {
        Component({
            options: {
                multipleSlots: !0
            },
            properties: {
                logo: String,
                name: String,
                actionText: String,
                actionUrl: String,
                logoWidth: {
                    type: String,
                    value: "86rpx"
                },
                logoHeight: {
                    type: String,
                    value: "86rpx"
                },
                actionCollection: {
                    type: Boolean,
                    value: !1
                },
                is_collection: {
                    type: Boolean,
                    value: !1
                }
            },
            methods: {
                onActionTextClick: function() {
                    this.triggerEvent("action");
                }
            }
        });
    }
}, [ 344 ]);