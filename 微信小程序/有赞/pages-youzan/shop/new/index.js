var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(t) {
    function e(n) {
        if (a[n]) return a[n].exports;
        var o = global.installedModules[n] = a[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
    }
    t = Object.assign(require("../../../commons.js").modules, t);
    var a = {};
    a = global.installedModules = global.installedModules || {}, e.m = t, e.c = a, e.d = function(t, a, n) {
        e.o(t, a) || Object.defineProperty(t, a, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var a = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(a, "a", a), a;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 321);
}({
    321: function(e, a, n) {
        function o(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100, a = arguments[2], n = arguments[3];
            return Object.keys(t).reduce(function(o, r) {
                return parseInt(a / e, 10) === parseInt(r / e, 10) && ("object" === c(t[r]) ? o.push(d({}, t[r], {
                    parentId: a,
                    parentIndex: n
                })) : o.push({
                    id: r,
                    name: t[r],
                    parentId: a,
                    parentIndex: n
                })), o;
            }, []);
        }
        function r(t, e) {
            return t.map(function(t) {
                var a = {};
                return e.forEach(function(e) {
                    a[e] = t[e];
                }), a;
            });
        }
        var s, i = function(t, e) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return function(t, e) {
                var a = [], n = !0, o = !1, r = void 0;
                try {
                    for (var s, i = t[Symbol.iterator](); !(n = (s = i.next()).done) && (a.push(s.value), 
                    !e || a.length !== e); n = !0) ;
                } catch (t) {
                    o = !0, r = t;
                } finally {
                    try {
                        !n && i.return && i.return();
                    } finally {
                        if (o) throw r;
                    }
                }
                return a;
            }(t, e);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }, d = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var a = arguments[e];
                for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
            }
            return t;
        }, c = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        }, u = (s = n(0)) && s.__esModule ? s : {
            default: s
        }, l = n(1), p = n(4), f = getApp(), h = {
            data: {
                addressMap: [],
                teamCategory: []
            },
            onShow: function() {
                p.page.show();
            },
            onLoad: function() {
                this.fetchCategory(), this.fetchAddressMap();
            },
            teamCategoryChange: function(t) {
                var e = this.data.teamCategory[t.detail.value || 0];
                this.setData({
                    business: e
                });
            },
            bindMultiPickerChange: function(t) {
                var e = i(t.detail.value, 3), a = e[0], n = void 0 === a ? 0 : a, o = e[1], r = void 0 === o ? 0 : o, s = e[2], d = void 0 === s ? 0 : s, c = this.data.addressMap, u = c[0][n], l = c[1][r], p = c[2][d];
                this.setData({
                    province: u,
                    city: l,
                    county: p
                });
            },
            bindMultiPickerColumnChange: function(t) {
                var e = t.detail, a = e.column, n = void 0 === a ? 0 : a, o = e.value, s = void 0 === o ? 0 : o;
                if (0 === n) {
                    var i = this.addressMap[s];
                    this.data.addressMap[1] = r(i.city, [ "id", "name", "parentIndex" ]), this.data.addressMap[2] = i.city[0].county;
                }
                if (1 === n) {
                    var d = this.data.addressMap[1][s].parentIndex, c = this.addressMap[d];
                    this.data.addressMap[2] = c.city[s].county;
                }
                this.setData({
                    addressMap: this.data.addressMap
                });
            },
            redirectToWebView: function(t) {
                var e = t.target.dataset, a = e.title, n = e.src;
                wx.navigateTo({
                    url: "/pages/common/webview-page/index?title=" + a + "&src=" + encodeURIComponent(n)
                });
            },
            submitInputValue: function() {
                var t = this, e = this.data, a = e.shopName, n = e.business, o = e.address, r = void 0 === o ? "" : o, s = e.province, i = e.city, d = e.county, c = f.globalData.token.mobile;
                return !a || a.length < 1 || a.length > 15 ? this.showZanToast("请输入1到15位店铺名称") : n ? s && i && d ? r ? void f.carmen({
                    api: "youzan.ebiz.mallshop.weapp.shop/1.0.0/create",
                    data: {
                        shopName: a,
                        business: n.id,
                        province: s.name,
                        city: i.name,
                        area: d.name,
                        countyId: d.id,
                        address: r,
                        mobile: c
                    },
                    method: "POST",
                    config: {
                        skipKdtId: !0,
                        skipShopInfo: !0
                    },
                    success: function(e) {
                        p.track({
                            fm: "click",
                            ei: "create_shop_success",
                            en: "创建店铺成功",
                            create_kdt_id: e.kdt_id
                        }), f.logger && f.logger.log({
                            fm: "click",
                            ei: "create_shop_success",
                            en: "创建店铺成功",
                            create_kdt_id: e.kdt_id
                        }), e.success ? (f.globalData.isCreatedShop = !0, wx.switchTab({
                            url: "/pages-youzan/shop/status/index"
                        })) : t.showZanToast(e.message || "创建店铺失败");
                    },
                    fail: function(e) {
                        t.showZanToast(e.msg || "创建店铺失败");
                    }
                }) : this.showZanToast("请填写门店地址") : this.showZanToast("请选择店铺所在区域") : this.showZanToast("请选择行业类目");
            },
            fetchCategory: function() {
                var t = this;
                f.carmen({
                    api: "kdtpartner.account.team.category/1.0.0/get",
                    method: "GET",
                    config: {
                        skipKdtId: !0,
                        skipShopInfo: !0
                    },
                    success: function(e) {
                        t.setData({
                            teamCategory: e
                        });
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                });
            },
            fetchAddressMap: function() {
                var t = this;
                f.carmen({
                    api: "kdt.address.map/1.0.0/get",
                    method: "GET",
                    config: {
                        skipKdtId: !0,
                        skipShopInfo: !0
                    },
                    success: function(e) {
                        return t.parserAddressMap(e.data);
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                });
            }
        };
        h.parserAddressMap = function(t) {
            var e = i(t, 3), a = e[0], n = e[1], s = e[2], d = function(t, e) {
                return Object.keys(t).reduce(function(a, n, r) {
                    var s = {
                        id: n,
                        name: t[n]
                    };
                    return s.county = o(e, 100, n, r), a[n] = s, a;
                }, {});
            }(n.Citys, s.County);
            this.addressMap = function(t, e) {
                return Object.keys(t).map(function(a, n) {
                    var r = {
                        id: a,
                        name: t[a]
                    };
                    return r.city = o(e, 1e4, a, n), r;
                });
            }(a.Province, d);
            var c = [ r(this.addressMap, [ "id", "name", "parentIndex" ]), r(this.addressMap[0].city, [ "id", "name", "parentIndex" ]), this.addressMap[0].city[0].county ];
            this.setData({
                addressMap: c
            });
        }, h.handleZanFieldChange = function(t) {
            var e = t.componentId, a = t.detail;
            this.data[e] = a.value;
        }, (0, u.default)(h, l.Field, l.Toast);
    }
});