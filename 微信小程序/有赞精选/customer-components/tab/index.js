!function() {
    require("./../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 50 ], {
    342: function() {
        Component({
            properties: {
                scroll: {
                    type: Boolean,
                    value: !1
                },
                fixed: {
                    type: Boolean,
                    value: !1
                },
                height: {
                    type: Number,
                    value: 0
                },
                minWidth: {
                    type: Number,
                    value: 80
                },
                list: {
                    type: Array,
                    value: []
                },
                selectedId: {
                    type: [ String, Number ],
                    value: ""
                },
                needBorder: {
                    type: Boolean,
                    value: !0
                }
            },
            methods: {
                _handleZanTabChange: function(e) {
                    var t = e.currentTarget.dataset.itemId;
                    this.setData({
                        selectedId: t
                    }), console.info("[zan:tab:change] selectedId:", t), this.triggerEvent("tabchange", {
                        selectedId: t
                    });
                }
            }
        });
    }
}, [ 342 ]);