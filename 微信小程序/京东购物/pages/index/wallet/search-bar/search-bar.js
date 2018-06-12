var t = require("../../../../bases/component.js"), e = require("../../model.js"), a = require("../../utils.js"), n = new (require("../../../../common/logger.js"))("HMMMMMMMMM 京东优选 - 顶部搜索条");

new t({
    properties: {
        scrollTop: {
            type: Number,
            value: 0,
            observer: function(t, e) {
                this.setData({
                    cssModifier: t > 40 ? "scroll" : ""
                });
            }
        },
        loadOthers: {
            type: Boolean,
            observer: function(t) {
                t && this.getKey();
            }
        },
        shakePayload: {
            type: Object,
            observer: function(t) {
                t && t.showEntrance && this.showShakeEntrance(t.config);
            }
        }
    },
    data: {
        cssModifier: "",
        menuList: [],
        showMenu: !1,
        searchKey: ""
    },
    methods: {
        toggleMenu: function(t) {
            var e = this.data, a = e.showMenu, n = e.menuList;
            a = void 0 === t ? !a : t, n.length ? this.setData({
                showMenu: a
            }) : (this.data.showMenu = !0, this.loadChannelListData());
        },
        getKey: function() {
            var t = this;
            e.getSearchKey("191").then(function(e) {
                e && e.data && e.data.length && t.setData({
                    searchKey: e.data[0].searchname || ""
                });
            }).catch(function(t) {
                return console.log(t);
            });
        },
        loadChannelListData: function() {
            var t = this;
            this.biz.getPPMS(17311, {
                v: !1
            }).then(function(e) {
                n.log("loadChannelListData --\x3e", e);
                var s = [];
                e.forEach(function(e) {
                    a.checkTime(e.begin, e.end) && s.push({
                        name: e.urlName,
                        icon: t.utils.getImg(e.urlImg, 40),
                        url: e.url
                    });
                }), t.setData({
                    menuList: s,
                    showMenu: t.data.showMenu
                });
            }, function(e) {
                var n = e.message, s = e.code;
                t.triggerEvent("showToast", {
                    content: a.genErrMsg(n, s)
                });
            });
        },
        tapOnCateBtn: function(t) {
            this.toggleMenu();
        },
        tapOnMask: function(t) {
            this.toggleMenu(!1);
        },
        tapOnSearchBar: function() {
            var t = {
                ptag: "137889.1.2"
            };
            this.data.searchKey && (t.searchname = this.data.searchKey), this.$goto("/pages/search/list/list", t);
        },
        tapOnMenuItem: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            }), this.toggleMenu(!1);
        },
        noop: function() {},
        showShakeEntrance: function(t) {
            this.setData({
                shakeEntrance: {
                    image: this.utils.getImg(t.wxappSmallImg),
                    url: t.link + "?ptag=" + t.wallet_littleimg_ptag
                }
            });
        },
        navigate: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            });
        }
    }
});