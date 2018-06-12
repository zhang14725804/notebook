!function(e) {
    function t(n) {
        if (a[n]) return a[n].exports;
        var i = global.installedModules[n] = a[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, t), i.l = !0, i.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e);
    var a = {};
    a = global.installedModules = global.installedModules || {}, t.m = e, t.c = a, t.d = function(e, a, n) {
        t.o(e, a) || Object.defineProperty(e, a, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var a = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(a, "a", a), a;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 175);
}({
    175: function(e, t, a) {
        a(18);
        var n = a(10), i = a(47), r = getApp();
        Page({
            data: {
                hasUserInfo: !1,
                name: "",
                disableMobile: !0,
                mobile: "",
                weixin: "",
                sexIndex: -1,
                slectedSex: !1,
                sexArray: [ "请选择", "男", "女" ],
                slectedBirth: !1,
                birthday: "1990-01-01",
                edit_data: {
                    provinceIndex: 0,
                    cityIndex: 0,
                    countyIndex: 0,
                    selectedValue: 0
                },
                area: {}
            },
            onLoad: function(e) {
                var t = this;
                this.request = n(r), r.fetchAreaMapData(function(e) {
                    var a = i.formatAreaData(0, e);
                    t.setData({
                        area_origin: e,
                        area: a
                    });
                }), wx.showLoading({
                    title: "努力加载中"
                }), this.request({
                    path: "/wscscrm/scrm/customer/get.json"
                }).then(function(e) {
                    if (wx.hideLoading(), e) {
                        var a = 0;
                        switch (e.profile.gender) {
                          case "FEMALE":
                            a = 2;
                            break;

                          case "MALE":
                            a = 1;
                            break;

                          default:
                            a = 0;
                        }
                        var n = r.getMobile() || "", o = e.profile.birthday.split(" ")[0];
                        t.setData({
                            hasUserInfo: !0,
                            name: e.name,
                            mobile: n,
                            weixin: e.profile.weixin,
                            sexIndex: a,
                            slectedSex: !0,
                            slectedBirth: !!o,
                            birthday: o
                        }), setTimeout(function() {
                            var a = e.profile.area_code || 0, n = i.formatAreaData(a, t.data.area_origin), r = i.findSelectedAddressIndex(a, n), o = {
                                provinceIndex: r.provinceIndex,
                                cityIndex: r.cityIndex,
                                countyIndex: r.countyIndex,
                                selectedValue: a
                            };
                            t.setData({
                                edit_data: o,
                                area: n
                            });
                        }, 200);
                    }
                }).catch(function(e) {
                    console.log(e);
                });
            },
            onAreaChange: function(e) {
                var t = e.detail.value || 0, a = e.currentTarget.dataset.type, n = this.data.edit_data, r = this.data.area[a][t].code;
                if (n[a + "Index"] != t) {
                    var o = i.formatAreaData(r, this.data.area_origin), s = n.provinceIndex || 0, d = n.cityIndex || 0, c = n.countyIndex || 0;
                    switch (a) {
                      case "province":
                        s = t, n.province = o.province[s].text, d = 0, c = 0, n.area_code = void 0;
                        break;

                      case "city":
                        d = t, n.city = o.city[d].text, c = 0, n.area_code = void 0;
                        break;

                      case "county":
                        c = t, n.county = o.county[c].text, n.area_code = o.county[c].code;
                    }
                    n = Object.assign({}, n, {
                        provinceIndex: s,
                        cityIndex: d,
                        countyIndex: c,
                        selectedValue: r
                    }), this.setData({
                        edit_data: n,
                        area: o
                    });
                }
            },
            saveUserInfo: function() {
                var e = "OTHER";
                switch (+this.data.sexIndex) {
                  case 1:
                    e = "MALE";
                    break;

                  case 2:
                    e = "FEMALE";
                    break;

                  default:
                    e = "OTHER";
                }
                this.request({
                    path: "/wscscrm/scrm/customer/update.json",
                    method: "post",
                    data: {
                        type: this.data.hasUserInfo ? "update" : "create",
                        customer: {
                            name: this.data.name,
                            mobile: this.data.mobile,
                            gender: e,
                            birthday: this.data.slectedBirth ? this.data.birthday : "",
                            weixin: this.data.weixin,
                            areaCode: +this.data.edit_data.area_code
                        }
                    }
                }).then(function(e) {
                    wx.navigateBack();
                }).catch(function(e) {
                    console.log(e);
                });
            },
            onNameInputBlur: function(e) {
                var t = e.detail.value;
                this.setData({
                    name: t
                });
            },
            onMobileInputBlur: function(e) {
                var t = e.detail.value;
                this.setData({
                    mobile: t
                });
            },
            onWeixinInputBlur: function(e) {
                var t = e.detail.value;
                this.setData({
                    weixin: t
                });
            },
            bindSexPickerChange: function(e) {
                console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
                    slectedSex: !0,
                    sexIndex: e.detail.value
                });
            },
            bindDatePickerChange: function(e) {
                this.setData({
                    slectedBirth: !0,
                    birthday: e.detail.value
                });
            },
            bindRegionChange: function(e) {
                this.setData({
                    slectedRegion: !0,
                    region: e.detail.value
                });
            }
        });
    }
});