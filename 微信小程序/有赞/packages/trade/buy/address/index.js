!function(t) {
    function e(n) {
        if (a[n]) return a[n].exports;
        var i = global.installedModules[n] = a[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
    }
    t = Object.assign(require("../../../../commons.js").modules, t);
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
    }, e.p = "", e(e.s = 155);
}({
    153: function(t, e, a) {
        var n = a(5), i = function(t, e, a) {
            var i = [];
            return a && i.push({
                text: a,
                code: t
            }), n(e, function(e, a) {
                t && 0 !== a.indexOf(t) || i.push({
                    text: e,
                    code: a
                });
            }), i;
        };
        t.exports = {
            formatAreaData: function(t, e) {
                var a = {}, n = t.toString().slice(0, 2) || -1, d = t.toString().slice(0, 4) || -1;
                return a.province = i(0, e.province, "省份"), a.city = i(n, e.city, "城市"), a.county = i(d, e.county, "区县"), 
                a;
            }
        };
    },
    154: function(t, e, a) {
        var n = getApp(), i = a(12).gcjToBaidu;
        t.exports = {
            save: function(t, e, a) {
                n.carmen({
                    api: "account.address/1.0.0/modifyById",
                    data: Object.assign({
                        community: ""
                    }, t),
                    success: function(t) {
                        e(t);
                    },
                    fail: function(t) {
                        a && a(t);
                    }
                });
            },
            add: function(t, e, a) {
                n.carmen({
                    api: "account.address/1.0.0/add",
                    data: Object.assign({
                        id: "",
                        community: ""
                    }, t),
                    success: function(t) {
                        e(t);
                    },
                    fail: function(t) {
                        a && a(t);
                    }
                });
            },
            getAddressList: function(t, e) {
                n.carmen({
                    api: "account.address/1.0.0/get",
                    data: {
                        type: 1
                    },
                    success: function(e) {
                        t(e);
                    },
                    fail: function(t) {
                        e && e(t);
                    }
                });
            },
            removeAddress: function(t, e, a) {
                n.carmen({
                    api: "account.address/1.0.0/removeById",
                    data: {
                        id: t
                    },
                    success: function(t) {
                        e(t);
                    },
                    fail: function() {
                        a && a();
                    }
                });
            },
            queryGeo: function(t, e, a, d) {
                n.carmen({
                    api: "youzan.logistics.geo/1.0.0/get",
                    data: {
                        city: t,
                        address: e
                    },
                    method: "GET",
                    success: function(t) {
                        var e = t.lat, n = t.lng, d = i(n, e);
                        a({
                            lat: d.lat,
                            lon: d.lng
                        });
                    },
                    fail: function(t) {
                        d && d(t);
                    }
                });
            }
        };
    },
    155: function(t, e, a) {
        function n(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e.default = t, e;
        }
        var i, d = (i = a(0)) && i.__esModule ? i : {
            default: i
        }, s = n(a(154)), o = n(a(153)), c = n(a(30)), r = n(a(1)), u = getApp();
        (0, d.default)(r.Toast, {
            data: {
                fetching: !0,
                selected: {},
                list: [],
                status: "list",
                edit_data: {},
                area_origin: {},
                area: {}
            },
            onLoad: function(t) {
                var e = this, a = u.db.get(t.address) || {};
                u.fetchAreaMapData(function(t) {
                    var a = o.formatAreaData(0, t);
                    e.setData({
                        area_origin: t,
                        area: a
                    });
                }), this.setData({
                    selected: a
                }), this.fetchAddressList();
            },
            onShow: function() {
                this.setData({
                    copyright: u.globalData.copyright
                });
            },
            onAddressItemClick: function(t) {
                var e = this, a = t.currentTarget.dataset.addressid, n = this.data.list.find(function(t) {
                    return t.id == a;
                });
                n && (n.lat && n.lon ? (this.changeSelectedAddress(n), wx.navigateBack()) : (wx.showToast({
                    title: "数据提交中",
                    icon: "loading",
                    duration: 1e4
                }), s.queryGeo(n.city, "" + n.province + n.city + n.county + n.address_detail, function(t) {
                    var a = t.lat, i = t.lon;
                    n.lon = i, n.lat = a, s.save(n, function(t) {
                        var a = e.data.list;
                        if (wx.hideToast(), 1 == t) {
                            var i = a.findIndex(function(t) {
                                return t.id == n.id;
                            });
                            i > -1 && (a[i] = n), e.setData({
                                list: a,
                                edit_data: {},
                                status: "list"
                            }), e.changeSelectedAddress(n), wx.navigateBack();
                        }
                    }, function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        wx.hideToast(), e.showZanToast(t.msg || "请选择其他地址或新增地址");
                    });
                }, function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    wx.hideToast(), e.showZanToast(t.msg || "请选择其他地址或新增地址");
                })));
            },
            onEditClick: function(t) {
                var e = t.currentTarget.dataset.id, a = this.data.list.find(function(t) {
                    return t.id == e;
                }), n = a.area_code || 0, i = o.formatAreaData(n, this.data.area_origin), d = this.findSelectedAddressIndex(n, i), s = d.provinceIndex, c = d.cityIndex, r = d.countyIndex;
                a = Object.assign({}, a, {
                    provinceIndex: s,
                    cityIndex: c,
                    countyIndex: r,
                    selectedValue: n
                }), this.setData({
                    edit_data: a,
                    status: "edit",
                    area: i
                });
            },
            onAddClick: function() {
                var t = {}, e = o.formatAreaData(0, this.data.area_origin);
                t = Object.assign({}, t, {
                    provinceIndex: 0,
                    cityIndex: 0,
                    countyIndex: 0,
                    selectedValue: 0
                }), this.setData({
                    edit_data: t,
                    area: e,
                    status: "add"
                });
            },
            onAddressBack: function() {
                this.setData({
                    status: "list",
                    edit_data: {}
                });
            },
            onAddressSave: function() {
                var t = this, e = this.data.edit_data, a = this.data.status, n = {
                    id: e.id || "",
                    user_name: e.user_name || "",
                    tel: e.tel,
                    area_code: e.area_code || 0,
                    address_detail: e.address_detail || "",
                    postal_code: e.postal_code || "",
                    province: e.province || "",
                    city: e.city || "",
                    county: e.county || ""
                };
                this.validateAddress(n) || (wx.showToast({
                    title: "地址数据提交中",
                    icon: "loading",
                    duration: 1e4
                }), s.queryGeo(n.city, "" + n.province + n.city + n.county + n.address_detail, function(i) {
                    var d = i.lat, o = i.lon;
                    n.lon = o, n.lat = d, ("edit" == a ? s.save : s.add)(n, function(i) {
                        var d = t.data.list;
                        if (wx.hideToast(), "edit" == a) {
                            if (1 != i) return;
                            var s = d.findIndex(function(t) {
                                return t.id == e.id;
                            });
                            s > -1 && (d[s] = n), t.data.selected.id == e.id && t.changeSelectedAddress(e);
                        } else n.id = i, d.push(n);
                        t.setData({
                            list: d,
                            edit_data: {},
                            status: "list"
                        });
                    }, function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        wx.hideToast();
                        var n = "edit" == a ? "编辑地址失败" : "新增地址失败";
                        t.showZanToast(e.msg || n);
                    });
                }, function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    wx.hideToast();
                    var n = "edit" == a ? "编辑地址失败" : "新增地址失败";
                    t.showZanToast(e.msg || n);
                }));
            },
            onAddressDelete: function() {
                var t = this;
                wx.showModal({
                    title: "友情提示",
                    content: "确定要删除这个地址么?",
                    success: function(e) {
                        if (e.confirm) {
                            wx.showToast({
                                title: "删除中",
                                icon: "loading",
                                duration: 1e4
                            });
                            var a = t.data.edit_data;
                            s.removeAddress(a.id, function() {
                                wx.hideToast();
                                var e = t.data.list, n = e.findIndex(function(t) {
                                    return t.id == a.id;
                                });
                                e.splice(n, 1), t.data.selected.id == a.id && t.changeSelectedAddress({}), t.setData({
                                    list: e,
                                    status: "list"
                                });
                            }, function() {
                                wx.hideToast(), t.showZanToast("删除地址失败, 请稍后重试~");
                            });
                        }
                    }
                });
            },
            onInputChange: function(t) {
                var e = t.currentTarget.dataset.type, a = t.detail.value || "", n = this.data.edit_data;
                n[e] = a, this.setData({
                    edit_data: n
                });
            },
            onAreaChange: function(t) {
                var e = t.detail.value || 0, a = t.currentTarget.dataset.type, n = this.data.edit_data, i = this.data.area[a][e].code;
                if (n[a + "Index"] != e) {
                    var d = o.formatAreaData(i, this.data.area_origin), s = n.provinceIndex || 0, c = n.cityIndex || 0, r = n.countyIndex || 0;
                    switch (a) {
                      case "province":
                        s = e, n.province = d.province[s].text, c = 0, r = 0, n.area_code = void 0;
                        break;

                      case "city":
                        c = e, n.city = d.city[c].text, r = 0, n.area_code = void 0;
                        break;

                      case "county":
                        r = e, n.county = d.county[r].text, n.area_code = d.county[r].code;
                    }
                    n = Object.assign({}, n, {
                        provinceIndex: s,
                        cityIndex: c,
                        countyIndex: r,
                        selectedValue: i
                    }), this.setData({
                        edit_data: n,
                        area: d
                    });
                }
            },
            fetchAddressList: function() {
                var t = this;
                wx.showToast({
                    title: "地址获取中",
                    icon: "loading",
                    duration: 1e4
                }), s.getAddressList(function(e) {
                    wx.hideToast(), t.setData({
                        list: e,
                        fetching: !1
                    }), 0 == e.length && t.onAddClick();
                }, function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    t.showZanToast(e.msg || "地址列表获取失败");
                });
            },
            changeSelectedAddress: function(t) {
                u.trigger("order-address-change", t);
            },
            findSelectedAddressIndex: function(t, e) {
                var a = t.toString().slice(0, 2) + "0000", n = t.toString().slice(0, 4) + "00", i = 0, d = 0, s = 0;
                return t ? {
                    provinceIndex: i = e.province.findIndex(function(t) {
                        return t.code == a;
                    }),
                    cityIndex: d = e.city.findIndex(function(t) {
                        return t.code == n;
                    }),
                    countyIndex: s = e.county.findIndex(function(e) {
                        return e.code == t;
                    })
                } : {
                    provinceIndex: i,
                    cityIndex: d,
                    countyIndex: s
                };
            },
            validateAddress: function(t) {
                return t.user_name ? t.tel ? t.area_code ? t.address_detail ? c.phone(t.tel) || c.chinaMobile(t.tel) ? void 0 : (this.showZanToast("请填写正确的联系电话"), 
                {
                    type: "error",
                    field: "tel"
                }) : (this.showZanToast("请填写详细地址"), {
                    type: "empty",
                    field: "address_detail"
                }) : (this.showZanToast("请选择收货地区"), {
                    type: "empty",
                    field: "area_code"
                }) : (this.showZanToast("请填写联系电话"), {
                    type: "empty",
                    field: "tel"
                }) : (this.showZanToast("请填写收货人姓名"), {
                    type: "empty",
                    field: "user_name"
                });
            }
        });
    }
});