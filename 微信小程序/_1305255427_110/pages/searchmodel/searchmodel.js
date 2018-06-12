function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../libs/lodash.core.min.js"));

var t = e(require("../../utils/api.js")), a = getApp();

Page({
    data: {
        inputData: [],
        products: {},
        tracking: {
            scene: "",
            from: ""
        }
    },
    onLoad: function(e) {
        var r = this, n = "";
        e && e.from && (n = e.from), this.setData({
            "tracking.scene": getApp().globalData.scene,
            "tracking.from": n
        }), a.fetch(t.default.searchhotProducts, {
            categoryId: 1,
            pageSize: 600
        }, function(e, t) {
            if (0 != t.code) return !1;
            for (var a = t.data, n = 0, c = a.length; n < c; n++) a[n].checked = n <= 10, a[n].imgUrl && a[n].imgUrl.length && (a[n].imgUrl = encodeURIComponent(a[n].imgUrl)), 
            a[n].pageIndex = 1;
            r.setData({
                products: a
            });
        });
    },
    nav_navigateBack_click: function(e) {
        wx.navigateBack({
            delta: 1
        });
    },
    searchbar_input: function(e) {
        var t = this, a = e.detail.value, r = t.data.brand;
        r = t.get_productsDetails(a), t.setData({
            products: r
        });
    },
    get_productsDetails: function(e) {
        var t = this, a = t.data.products, r = 0, n = 0;
        if (!new RegExp("^[一-龥_a-zA-Z0-9\\s]+$").test(e) && "" != e) return a;
        for (var c = 0, i = a.length; c < i; c++) a[c].checked && (a[c].checked = !1, a[c].pageIndex = 0), 
        a[c].name.toUpperCase().search("^((?!" + e.toUpperCase() + ").)*$") && "" != e && (n++, 
        a[c].checked = !0, t.bindchangeState = !0, n > 10 * r && r++, a[c].pageIndex = r);
        return a;
    }
});