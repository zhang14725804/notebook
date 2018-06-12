var e = require("../../../../bases/component.js"), o = require("../common-behavior.js"), t = require("../../model.js"), n = require("../../../../common/cookie-v2/cookie").getCookie;

new e({
    behaviors: [ o ],
    data: {
        entries: []
    },
    methods: {
        refresh: function() {
            this.loadEntryData();
        },
        loadEntryData: function() {
            var e = this, o = n("pin") || "", i = n("open_id") || 0;
            o && (i = ""), t.getShopRecommend(o, i).then(function(o) {
                var t = [], n = [];
                (o.composite_info.data || []).forEach(function(i, s) {
                    var r = "".logo, u = "".name, a = "".spu, c = [], p = [];
                    o.shop_info.forEach(function(o) {
                        o.shopid == i.itemid && (r = e.utils.getImg(o.logo, 120, 40), u = o.name);
                    }), o.spu_name.forEach(function(e) {
                        e.spu == i.spu && (a = e.spu);
                    }), i.subsku.forEach(function(t) {
                        p.push(t.sku), o.sku_img.forEach(function(o) {
                            o.sku == t.sku && (c.push(e.utils.getImg(o.imgUrl, 148)), c.splice(2));
                        });
                    }), n.push(i.spu + "_" + p.join(",")), t.push({
                        url: "https://wqs.jd.com/hawaii/729/dest/release/index.shtml?ptag=138067.15." + (11 + s) + "#type=spu&id=" + a,
                        clk: i.clk,
                        logo: r,
                        name: u,
                        images: c
                    });
                }), e.setData({
                    entries: t
                }), wx.$.request.get({
                    url: "https:" + o.composite_info.impr.replace("CATE_ID_SKU_LIST", n.join(";")),
                    priority: "REPORT",
                    dataType: "text"
                }).then(function(e) {
                    e.body, e.header;
                }, function(e) {
                    console.log(e);
                });
            }).catch(function(e) {
                return console.log("shop error", e);
            });
        },
        gotoUrl: function(e) {
            var o = e.currentTarget.dataset, t = o.url, n = o.clk;
            wx.$.request.get({
                url: "https:" + n,
                priority: "REPORT",
                dataType: "text"
            }).then(function(e) {
                e.body, e.header;
            }, function(e) {
                console.log(e);
            }), this.$goto("/pages/h5/index", {
                url: t
            });
        }
    }
});