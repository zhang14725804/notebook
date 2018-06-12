var e = require("../../../../bases/component.js"), t = require("../../model.js");

new e({
    properties: {
        scrollTop: {
            type: Number,
            value: 0,
            observer: function(e, t) {
                this.setData({
                    cssModifier: e > 40 ? "scroll" : ""
                });
            }
        },
        loadOthers: {
            type: Boolean,
            observer: function(e) {
                e && this.getKey();
            }
        },
        shakePayload: {
            type: Object,
            observer: function(e) {
                e && e.showEntrance && this.showShakeEntrance(e.config);
            }
        }
    },
    data: {
        cssModifier: "",
        searchKey: ""
    },
    methods: {
        getKey: function() {
            var e = this;
            t.getSearchKey("191").then(function(t) {
                t && t.data && t.data.length && e.setData({
                    searchKey: t.data[0].searchname || ""
                });
            }).catch(function(e) {
                return console.log(e);
            });
        },
        tapOnSearchBar: function() {
            var e = {
                ptag: "138067.2.2"
            };
            this.data.searchKey && (e.searchname = this.data.searchKey), this.$goto("/pages/search/list/list", e);
        },
        showShakeEntrance: function(e) {
            this.setData({
                shakeEntrance: {
                    image: this.utils.getImg(e.wxappSmallImg),
                    url: e.link + "?ptag=" + e.mall_littleimg_ptag
                }
            });
        },
        navigate: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        }
    }
});