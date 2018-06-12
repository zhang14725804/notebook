new (require("../../../../bases/component.js"))({
    properties: {
        bannerData: {
            type: Array
        }
    },
    data: {
        swiperIdx: 0
    },
    methods: {
        onSwiperChange: function(e) {
            this.setData({
                swiperIdx: e.detail.current
            });
        },
        gotoUrl: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        }
    }
});