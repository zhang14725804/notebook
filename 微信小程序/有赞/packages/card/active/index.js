!function(e) {
    function a(n) {
        if (t[n]) return t[n].exports;
        var i = global.installedModules[n] = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, a), i.l = !0, i.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e);
    var t = {};
    t = global.installedModules = global.installedModules || {}, a.m = e, a.c = t, a.d = function(e, t, n) {
        a.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, a.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, a.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return a.d(t, "a", t), t;
    }, a.o = function(e, a) {
        return Object.prototype.hasOwnProperty.call(e, a);
    }, a.p = "", a(a.s = 176);
}({
    176: function(e, a, t) {
        var n, i = (n = t(0)) && n.__esModule ? n : {
            default: n
        }, s = t(18), d = t(47), o = t(10), r = getApp();
        (0, i.default)({
            data: {
                alias: "",
                cardNo: "",
                name: "",
                disableMobile: !0,
                mobile: "",
                weixin: "",
                sexIndex: 0,
                slectedSex: !1,
                sexArray: [ "请选择", "男", "女" ],
                slectedBirth: !1,
                birthday: "1990-01-01",
                address: {},
                userInfo: {},
                edit_data: {
                    provinceIndex: 0,
                    cityIndex: 0,
                    countyIndex: 0,
                    selectedValue: 0
                },
                area: {}
            },
            onLoad: function(e) {
                var a = this, t = e.card_no, n = e.alias;
                this.request = o(r), this.setData({
                    cardNo: t,
                    alias: n
                });
                var i = new Promise(function(e) {
                    r.fetchAreaMapData(function(t) {
                        var n = d.formatAreaData(0, t);
                        a.setData({
                            area_origin: t,
                            area: n
                        }), e();
                    });
                }), s = this.request({
                    path: "/wscscrm/scrm/customer/get.json"
                });
                wx.showLoading({
                    title: "努力加载中"
                }), Promise.all([ i, s ]).then(function(e) {
                    wx.hideLoading();
                    var t = e[1];
                    if (t) {
                        var n = 0;
                        switch (t.profile.gender) {
                          case "FEMALE":
                            n = 2;
                            break;

                          case "MALE":
                            n = 1;
                            break;

                          default:
                            n = 0;
                        }
                        var i = t.profile.birthday.split(" ")[0], s = t.profile.address || {}, o = r.getMobile() || "";
                        a.setData({
                            hasUserInfo: !0,
                            name: t.name,
                            mobile: o,
                            weixin: t.profile.weixin,
                            sexIndex: n,
                            slectedSex: !0,
                            slectedBirth: !!i,
                            birthday: i,
                            address: {
                                area_code: s.areaCode,
                                address_detail: s.address,
                                postal_code: s.zip,
                                user_name: s.name,
                                tel: s.mobile
                            }
                        });
                        var c = t.profile.area_code || 0, l = d.formatAreaData(c, a.data.area_origin), u = d.findSelectedAddressIndex(c, l), h = {
                            provinceIndex: u.provinceIndex,
                            cityIndex: u.cityIndex,
                            countyIndex: u.countyIndex,
                            selectedValue: c
                        };
                        a.setData({
                            edit_data: h,
                            area: l
                        });
                    } else console.log("加载数据出错");
                }).catch(function(e) {
                    console.log(e);
                }), r.getUserInfo(function(e) {
                    a.setData({
                        userInfo: e.userInfo
                    }), r.updateYouzanUserInfo(e.userInfo);
                });
            },
            onAreaChange: function(e) {
                var a = e.detail.value || 0, t = e.currentTarget.dataset.type, n = this.data.edit_data, i = this.data.area[t][a].code;
                if (n[t + "Index"] != a) {
                    var s = d.formatAreaData(i, this.data.area_origin), o = n.provinceIndex || 0, r = n.cityIndex || 0, c = n.countyIndex || 0;
                    switch (t) {
                      case "province":
                        o = a, n.province = s.province[o].text, r = 0, c = 0, n.area_code = void 0;
                        break;

                      case "city":
                        r = a, n.city = s.city[r].text, c = 0, n.area_code = void 0;
                        break;

                      case "county":
                        c = a, n.county = s.county[c].text, n.area_code = s.county[c].code;
                    }
                    n = Object.assign({}, n, {
                        provinceIndex: o,
                        cityIndex: r,
                        countyIndex: c,
                        selectedValue: i
                    }), this.setData({
                        edit_data: n,
                        area: s
                    });
                }
            },
            activeCard: function() {
                var e = this, a = "OTHER";
                switch (+this.data.sexIndex) {
                  case 1:
                    a = "MALE";
                    break;

                  case 2:
                    a = "FEMALE";
                    break;

                  default:
                    a = "OTHER";
                }
                wx.showLoading({
                    title: "努力加载中"
                }), this.request({
                    path: "/wscscrm/scrm/membercard/activate.json",
                    method: "post",
                    data: {
                        cardNo: this.data.cardNo,
                        customerInfo: {
                            name: this.data.name,
                            profile: {
                                areaCode: this.data.edit_data.area_code || this.data.edit_data.selectedValue,
                                gender: a,
                                birthday: this.data.slectedBirth ? this.data.birthday : "",
                                weixin: this.data.weixin,
                                address: this.data.address.user_name ? {
                                    areaCode: this.data.address.area_code,
                                    address: this.data.address.address_detail,
                                    zip: this.data.address.postal_code,
                                    name: this.data.address.user_name,
                                    mobile: this.data.address.tel
                                } : null
                            }
                        }
                    }
                }).then(function(a) {
                    wx.hideLoading(), wx.reLaunch({
                        url: "/packages/card/result/index?alias=" + e.data.alias + "&from=active"
                    });
                }).catch(function(e) {
                    console.log(e);
                });
            },
            onNameInputBlur: function(e) {
                var a = e.detail.value;
                this.setData({
                    name: a
                });
            },
            onMobileInputBlur: function(e) {
                var a = e.detail.value;
                this.setData({
                    mobile: a
                });
            },
            onWeixinInputBlur: function(e) {
                var a = e.detail.value;
                this.setData({
                    weixin: a
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
            },
            onAddressTap: function() {
                var e = this;
                s("scope.address").then(function() {
                    wx.chooseAddress({
                        success: function(a) {
                            console.log(a);
                            var t = {
                                address_detail: a.detailInfo,
                                id: 0,
                                area_code: a.nationalCode,
                                city: a.cityName,
                                county: a.countyName,
                                postal_code: a.postalCode,
                                province: a.provinceName,
                                tel: a.telNumber,
                                user_name: a.userName
                            };
                            e.setData({
                                address: t
                            });
                        },
                        fail: function(e) {
                            console.log(e);
                        }
                    });
                }).catch(function() {
                    e.showZanToast("请允许使用通讯地址后重试"), setTimeout(function() {
                        wx.openSetting();
                    }, 1e3);
                });
            }
        });
    }
});