var t = getApp();

Component({
    properties: {
        datas: {
            type: Object,
            value: {}
        },
        visible: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        proActive: "热门城市",
        childs: []
    },
    methods: {
        onClose: function() {
            this.triggerEvent("close", null), this.setData({
                visible: !1
            });
        },
        onTapProvince: function(t) {
            var a = t.currentTarget.dataset;
            this.setData({
                proActive: a.name
            }), a.data && this.setData({
                childs: a.data.Childs
            });
        },
        onTapCity: function(a) {
            var e = a.currentTarget.dataset;
            if (e.isnow && !t.globalData.location.longitude) return this.triggerEvent("changeCity", {
                hasId: !1,
                data: "全国"
            }), this.setData({
                visible: !1
            });
            e.data ? this.triggerEvent("changeCity", {
                hasId: !0,
                data: e.data
            }) : this.triggerEvent("changeCity", {
                hasId: !1,
                data: "全国"
            }), this.setData({
                visible: !1
            });
        }
    }
});