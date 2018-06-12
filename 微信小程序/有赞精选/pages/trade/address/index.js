!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 39 ], {
    289: function(t, e, a) {
        function d(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var i = d(a(2)), n = d(a(1)), s = getApp(), o = a(290), r = a(291), c = a(0), u = a(108), l = a(3), f = a(8);
        (0, n.default)(l(f.Toast, {
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
                var e = s.db.get(t.address) || {};
                "usercenter" == t.source ? wx.setNavigationBarTitle({
                    title: "管理收货地址"
                }) : wx.setNavigationBarTitle({
                    title: "选择收货地址"
                }), this.setData({
                    selected: e
                });
            },
            onShow: function() {
                var t = this;
                c.page.show(), s.fetchAreaMapData(function(e) {
                    t.setData({
                        area_origin: e
                    });
                }), this.fetchAddressList(), this.setData({
                    copyright: s.globalData.copyright
                });
            },
            onAddressItemClick: function(t) {
                var e = t.currentTarget.dataset.addressid, a = this.data.list.find(function(t) {
                    return t.id == e;
                });
                a && (this.changeSelectedAddress(a), wx.navigateBack());
            },
            onEditClick: function(t) {
                var e = t.currentTarget.dataset.id, a = this.data.list.find(function(t) {
                    return t.id == e;
                }), d = a.area_code || 0, n = r.formatAreaData(d, this.data.area_origin), s = this.findSelectedAddressIndex(d, n), o = s.provinceIndex, c = s.cityIndex, u = s.countyIndex;
                a = (0, i.default)({}, a, {
                    provinceIndex: o,
                    cityIndex: c,
                    countyIndex: u,
                    selectedValue: d
                }), this.setData({
                    edit_data: a,
                    status: "edit",
                    area: n
                });
            },
            onAddClick: function() {
                var t = {}, e = r.formatAreaData(0, this.data.area_origin);
                t = (0, i.default)({}, t, {
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
                var t = this;
                setTimeout(function() {
                    var e = t.data.edit_data, a = t.data.status, d = {
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
                    t.validateAddress(d) || (wx.showToast({
                        title: "地址数据提交中",
                        icon: "loading",
                        duration: 1e4
                    }), ("edit" == a ? o.save : o.add)(d, function(i) {
                        var n = t.data.list;
                        if (wx.hideToast(), "edit" == a) {
                            if (1 != i) return;
                            var s = n.findIndex(function(t) {
                                return t.id == e.id;
                            });
                            -1 < s && (n[s] = d), t.data.selected.id == e.id && t.changeSelectedAddress(e);
                        } else d.id = i, n.push(d);
                        t.setData({
                            list: n,
                            edit_data: {},
                            status: "list"
                        });
                    }, function(e) {
                        wx.hideToast();
                        var d = "edit" == a ? "编辑地址失败" : "新增地址失败";
                        t.showZanToast(e.msg || d);
                    }));
                }, 100);
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
                            o.removeAddress(a.id, function() {
                                wx.hideToast();
                                var e = t.data.list, d = e.findIndex(function(t) {
                                    return t.id == a.id;
                                });
                                e.splice(d, 1), t.data.selected.id == a.id && t.changeSelectedAddress({}), t.setData({
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
                var e = t.currentTarget.dataset.type, a = t.detail.value || "", d = this.data.edit_data;
                d[e] = a, this.setData({
                    edit_data: d
                });
            },
            onAreaChange: function(t) {
                var e = t.detail.value || 0, a = t.currentTarget.dataset.type, d = this.data.edit_data, n = this.data.area[a][e].code;
                if (d[a + "Index"] != e) {
                    var s = r.formatAreaData(n, this.data.area_origin), o = d.provinceIndex || 0, c = d.cityIndex || 0, u = d.countyIndex || 0;
                    switch (a) {
                      case "province":
                        o = e, d.province = s.province[o].text, c = 0, u = 0, d.area_code = void 0;
                        break;

                      case "city":
                        c = e, d.city = s.city[c].text, u = 0, d.area_code = void 0;
                        break;

                      case "county":
                        u = e, d.county = s.county[u].text, d.area_code = s.county[u].code;
                    }
                    d = (0, i.default)({}, d, {
                        provinceIndex: o,
                        cityIndex: c,
                        countyIndex: u,
                        selectedValue: n
                    }), this.setData({
                        edit_data: d,
                        area: s
                    });
                }
            },
            fetchAddressList: function() {
                var t = this;
                wx.showToast({
                    title: "地址获取中",
                    icon: "loading",
                    duration: 1e4
                }), o.getAddressList(function(e) {
                    wx.hideToast(), t.setData({
                        list: e,
                        fetching: !1
                    }), 0 == e.length && t.onAddClick();
                }, function(e) {
                    t.showZanToast(e.msg || "地址列表获取失败");
                });
            },
            changeSelectedAddress: function(t) {
                s.trigger("order-address-change", t);
            },
            findSelectedAddressIndex: function(t, e) {
                var a = t.toString().slice(0, 2) + "0000", d = t.toString().slice(0, 4) + "00", i = 0, n = 0, s = 0;
                return t ? (i = e.province.findIndex(function(t) {
                    return t.code == a;
                }), n = e.city.findIndex(function(t) {
                    return t.code == d;
                }), s = e.county.findIndex(function(e) {
                    return e.code == t;
                }), {
                    provinceIndex: i,
                    cityIndex: n,
                    countyIndex: s
                }) : {
                    provinceIndex: i,
                    cityIndex: n,
                    countyIndex: s
                };
            },
            validateAddress: function(t) {
                return t.user_name ? t.tel ? t.area_code ? t.address_detail ? u.phone(t.tel) || u.mobile(t.tel) ? void 0 : (this.showZanToast("请填写正确的联系电话"), 
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
        }));
    }
}, [ 289 ]);