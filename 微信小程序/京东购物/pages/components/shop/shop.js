var t = require("../../../bases/component"), a = require("../../item/api"), e = require("../../item/detail/detail_api"), o = require("../../../common/fe_helper"), n = getApp();

new t({
    properties: {
        venderId: String,
        skuId: String,
        category: Array,
        shopFlag: String,
        favStatus: Boolean,
        wxSearchFlag: Boolean
    },
    data: {
        venderId: "",
        favStatus: !1,
        shopInfo: {}
    },
    ready: function() {
        var t = this, s = this.data.venderId, h = this;
        s && (a.getVenderInfo(s).then(function(a) {
            a.shopName && t.setData({
                shopInfo: a
            });
        }).catch(function(t) {}), e.shopCheckFav(s).then(function(a) {
            t.setData({
                favStatus: a
            }), n.event.emit("favStatusLoaded", a);
        }).catch(function(t) {})), n.event.on("toggleFavStatus", function(t) {
            "component" != t && h.setData({
                favStatus: !h.data.favStatus
            });
        }), this.favShop = o.throttle(this.favShop, 1e3);
    },
    methods: {
        gotoShop: function(t) {
            var a = t.currentTarget.dataset.type;
            if (!this.data.wxSearchFlag) {
                if (a) switch (a) {
                  case "fans":
                    this.$report("DETAIL_SHOP_FANS");
                    break;

                  case "all":
                    this.$report("DETAIL_SHOP_ALL");
                    break;

                  default:
                    this.$report("DETAIL_GOTO_SHOP");
                }
                var e = this.data.shopInfo.venderId, o = this.data, n = o.skuId, s = o.category;
                if (e) {
                    var h = "";
                    h = s ? "https://wqshop.jd.com/mshop/gethomepage?venderid=" + e + "#/index?recItem=" + n + "_" + s[0] + "_" + s[1] + "_" + s[2] : "https://wqshop.jd.com/mshop/gethomepage?venderid=" + e, 
                    this.$goto("/pages/h5/index", {
                        url: h
                    });
                }
            }
        },
        favShop: function(t) {
            var a = t.currentTarget.dataset.type, e = this.data.venderId;
            "add" == a ? (this.$report("DETAIL_SHOP_FAV"), this.addFavShop(e)) : (this.$report("DETAIL_SHOP_UNFAV"), 
            this.delFavShop(e));
        },
        addFavShop: function(t) {
            var a = this;
            e.shopAddFav(t).then(function(t) {
                t ? (a.toast.show({
                    content: "收藏成功",
                    icon: a.toast.ICON.SUCCESS
                }), a.setData({
                    favStatus: t
                }), n.event.emit("toggleFavStatus", "component")) : a.toast.show({
                    content: "网络错误，请稍后重试",
                    icon: a.toast.ICON.SUCCESS
                });
            }).catch(function(t) {
                a.toast.show({
                    content: "网络错误，请稍后重试",
                    icon: a.toast.ICON.SUCCESS
                });
            });
        },
        delFavShop: function(t) {
            var a = this;
            e.shopDelFav(t).then(function(t) {
                t ? a.toast.show({
                    content: "网络错误，请稍后重试",
                    icon: a.toast.ICON.SUCCESS
                }) : (a.toast.show({
                    content: "取消收藏成功",
                    icon: a.toast.ICON.SUCCESS
                }), n.event.emit("toggleFavStatus", "component"), a.setData({
                    favStatus: t
                }));
            }).catch(function(t) {
                a.toast.show({
                    content: "网络错误，请稍后重试",
                    icon: a.toast.ICON.SUCCESS
                });
            });
        },
        changeFavShop: function(t) {
            this.triggerEvent("changeFavShop", this.data.favStatus);
        }
    }
});