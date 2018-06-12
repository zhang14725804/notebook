function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
    if (Array.isArray(e)) {
        for (var a = 0, t = Array(e.length); a < e.length; a++) t[a] = e[a];
        return t;
    }
    return Array.from(e);
}

var t = Object.assign || function(e) {
    for (var a = 1; a < arguments.length; a++) {
        var t = arguments[a];
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    }
    return e;
}, r = e(require("../../utils/api.js")), c = e(require("../../libs/lodash.core.min.js")), d = getApp();

Page({
    data: {
        route: "pages/category/category",
        piwikSource: "",
        categorys: {
            0: {
                id: 1,
                value: "手机",
                checked: !0
            },
            1: {
                id: 6,
                value: "平板电脑",
                checked: !1
            },
            2: {
                id: 5,
                value: "笔记本",
                checked: !1
            },
            3: {
                id: 22,
                value: "摄影摄像",
                checked: !1
            },
            4: {
                id: 3,
                value: "智能数码",
                checked: !1
            }
        },
        categoryId: 1,
        scroll_left: 0,
        brands: [],
        products: [],
        timestamp: 0,
        inputData: [],
        searchmodelProducts: {},
        searchbarfocus: !1,
        searchmodel: !1,
        searchbar_inputvalue: "",
        icon_clear: "../../resource/images/category/icon-clear.png",
        track: {
            scene: "",
            from: "",
            category: ""
        }
    },
    onLoad: function(e) {
        var a = this, t = "" == e.categoryId ? a.data.categoryId : e.categoryId, r = a.data.categorys, d = "";
        switch (e && e.from && (d = e.from), this.setData({
            "track.scene": getApp().globalData.scene,
            "track.from": d
        }), c.default.forEach(r, function(e) {
            e.checked && (e.checked = !e.checked), e.id === parseInt(t) && (e.checked = !e.checked);
        }), parseInt(t)) {
          case 3:
            a.setData({
                scroll_left: 99,
                "track.category": "智能数码"
            });
            break;

          case 1:
            a.setData({
                "track.category": "手机"
            });
            break;

          case 6:
            a.setData({
                "track.category": "\b平板"
            });
            break;

          case 5:
            a.setData({
                "track.category": "笔记本"
            });
            break;

          case 22:
            a.setData({
                "track.category": "\b摄影摄像"
            });
        }
        a.setData({
            categorys: r,
            categoryId: e.categoryId ? parseInt(e.categoryId) : a.data.categoryId
        }), a.tapCategory(a.data.categoryId);
    },
    getCurrentDeviceInfo: function() {
        return new Promise(function(e, a) {
            wx.getSystemInfo({
                success: function(t) {
                    t ? e(t) : a(null);
                },
                fail: function() {
                    a(null);
                }
            });
        }).then(function(e) {
            return new Promise(function(a, c) {
                if (e && e.model) {
                    var o = e.model;
                    /^.*<.*iphone.*>/i.test(o) && (o = o.split("<")[1].split(">")[0]), d.fetch(r.default.fetchMobileType, {
                        model: o
                    }, function(e, o) {
                        if (e) c(); else if (o && o.data && o.data.idProduct) {
                            var n = o.data.idProduct;
                            d.fetch(r.default.fetchProduct, {
                                productId: n
                            }, function(e, r) {
                                e ? c() : r && r.data ? a(t({}, r.data, {
                                    isMyOwn: !0,
                                    imgUrl: r.data.imgUrl ? decodeURIComponent(r.data.imgUrl) : "http://static.aihuishou.com/image?file="
                                })) : c();
                            });
                        } else c();
                    });
                } else c();
            });
        }).catch(function(e) {
            return null;
        });
    },
    searchProduct: function(e) {
        var a = this;
        d.fetchHideToast(r.default.searchProducts, {
            keyword: e,
            pageSize: 500
        }, function(e, t) {
            if (0 != t.code) return !1;
            for (var r = t.data, c = 0, d = r.length; c < d; c++) r[c].checked = c <= 10, r[c].imgUrl && r[c].imgUrl.length && (r[c].imgUrl = encodeURIComponent(r[c].imgUrl)), 
            r[c].pageIndex = 1;
            a.setData({
                searchmodelProducts: r
            });
        });
    },
    tapCategory: function(e) {
        var a = this;
        a.productsData = {}, a.lastIndex = 0, a.curId = "", a.curValue = "", a.curIndex = -1, 
        a.data.categoryId = e, d.fetch(r.default.fetchBrands, {
            categoryId: a.data.categoryId
        }, function(e, t) {
            if (0 !== t.code) return !1;
            for (var r = t.data, c = 0, d = t.data.length; c < d; c++) r[c].checked = !1, r[c].pageIndex = 0;
            var o = [ {
                id: -1,
                name: "全部",
                imgUrl: "",
                checked: !1,
                pageIndex: 0
            } ].concat(r);
            console.log(o), a.setData({
                brands: o
            }), a.curId = a.data.brands[0].id, a.curValue = a.data.brands[0].name, a.curIndex = 0, 
            a.getProductItems(a.curId, a.curValue, !0, 0);
        });
    },
    getProductItems: function(e, t, c, o) {
        function n() {
            u[s.lastIndex].checked = !1, u[o].checked = !0, s.lastIndex = o;
        }
        var s = this, i = [], u = s.data.brands;
        if (s.productsData[e] && c) i = s.productsData[e], n(), s.setData({
            brands: u,
            products: i
        }); else {
            c || ++u[o].pageIndex;
            var l = {};
            l = -1 != e ? {
                categoryId: s.data.categoryId,
                brandId: e,
                keyWord: t,
                pageIndex: u[o].pageIndex,
                pageSize: 15
            } : {
                categoryId: s.data.categoryId,
                keyWord: t,
                pageIndex: u[o].pageIndex,
                pageSize: 15
            }, -1 == e && 1 == s.data.categoryId && c ? Promise.all([ s.getCurrentDeviceInfo(), new Promise(function(a, t) {
                d.fetch(r.default.searchProducts, l, function(t, r) {
                    if (0 === r.code) {
                        if ((i = r.data).length) for (var c = i.length - 1; c >= 0; --c) i[c].imgUrl && i[c].imgUrl.length && (i[c].imgUrl = encodeURIComponent(i[c].imgUrl));
                        s.productsData[e] = i, n(), s.setData({
                            brands: u
                        }), a(i);
                    } else a([]);
                });
            }) ]).then(function(t) {
                var r = t[0] ? [ t[0] ].concat(a(t[1])) : t[1], c = r[0] || {};
                r = r.filter(function(e, a) {
                    return 0 === a || e.id != c.id;
                }), s.setData({
                    products: r
                }), s.productsData[e] = r;
            }) : d.fetch(52 == e && 1 == s.data.categoryId ? r.default.searchhotProducts : r.default.searchProducts, l, function(a, t) {
                if (0 !== t.code) return !1;
                if ((i = t.data).length) for (var r = i.length - 1; r >= 0; --r) i[r].imgUrl && i[r].imgUrl.length && (i[r].imgUrl = encodeURIComponent(i[r].imgUrl));
                if (c) s.productsData[e] = i, n(), s.setData({
                    brands: u,
                    products: i
                }); else {
                    var d = s.productsData[e] && s.productsData[e][0] || {};
                    s.productsData[e] = s.productsData[e].concat(i).filter(function(e, a) {
                        return 0 === a || e.id != d.id;
                    }), s.setData({
                        products: s.productsData[e]
                    });
                }
            });
        }
    },
    tapBrandItem: function(e) {
        var a = e.currentTarget.dataset, t = this;
        a.id && a.index > -1 && a.value && (t.curId = a.id, t.curValue = a.value, t.curIndex = a.index, 
        t.getProductItems(a.id, a.value, !0, a.index));
    },
    handleTapClickThis: function() {
        this._piwik("miniapp/categoryPage", "searchprice2", "basicInfo"), d.aldstat.sendEvent("品牌机型列表页-查查价格按钮", {
            "页面来源": "品牌机型列表页"
        });
    },
    tapcategorysItem: function(e) {
        var a = this, t = e.currentTarget.dataset, r = a.data.categorys;
        c.default.forEach(r, function(e) {
            e.checked && (e.checked = !e.checked), e.id === t.id && (a.data.categoryId = e.id, 
            e.checked = !e.checked);
        }), 3 == a.data.categoryId ? a.setData({
            scroll_left: 99
        }) : 1 == a.data.categoryId && a.setData({
            scroll_left: 0
        }), a.tapCategory(a.data.categoryId), a.setData({
            categoryId: a.data.categoryId,
            categorys: r
        });
    },
    getMoreProducts: function() {
        var e = this;
        e.getProductItems(e.curId, e.curValue, !1, e.curIndex);
    },
    input_searchbar_onfocus: function() {},
    toggleSearchModel: function() {
        var e = this;
        e.searchProduct(""), e.setData({
            searchbarfocus: !e.data.searchbarfocus,
            searchmodel: !e.data.searchmodel
        });
    },
    searchbar_input: function(e) {
        var a = this, t = e.detail.value;
        a.data.brand;
        a.searchProduct(t);
    },
    searchbar_clear: function(e) {
        var a = this;
        a.setData({
            searchbar_inputvalue: ""
        }), a.searchProduct("");
    },
    get_productsDetails: function(e) {
        var a = this, t = a.data.searchmodelProducts, r = 0, c = 0;
        if (!new RegExp("^[一-龥_a-zA-Z0-9\\s]+$").test(e) && "" != e) return t;
        for (var d = 0, o = t.length; d < o; d++) t[d].checked && (t[d].checked = !1, t[d].pageIndex = 0), 
        t[d].name.toUpperCase().search("^((?!" + e.toUpperCase() + ").)*$") && "" != e && (c++, 
        t[d].checked = !0, a.bindchangeState = !0, c > 10 * r && r++, t[d].pageIndex = r);
        return t;
    }
});