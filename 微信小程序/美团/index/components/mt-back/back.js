Component({
    properties: {
        icon: {
            type: String,
            value: "../../imgs/home/ic-home-2.png"
        },
        text: {
            type: String,
            value: "美团首页"
        },
        url: {
            type: String,
            value: "/index/pages/mt/mt"
        }
    },
    data: {
        showPendant: !1
    },
    attached: function() {
        getCurrentPages && 1 == getCurrentPages().length && this.setData({
            showPendant: !0
        });
    }
});