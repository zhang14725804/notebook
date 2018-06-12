!function(t) {
    function e(i) {
        if (s[i]) return s[i].exports;
        var a = global.installedModules[i] = s[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(a.exports, a, a.exports, e), a.l = !0, a.exports;
    }
    t = Object.assign(require("../../../../commons.js").modules, t);
    var s = {};
    s = global.installedModules = global.installedModules || {}, e.m = t, e.c = s, e.d = function(t, s, i) {
        e.o(t, s) || Object.defineProperty(t, s, {
            configurable: !1,
            enumerable: !0,
            get: i
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var s = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(s, "a", s), s;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 205);
}({
    205: function(t, e, s) {
        var i, a = (i = s(0)) && i.__esModule ? i : {
            default: i
        }, c = s(1), n = s(48), d = getApp(), r = [];
        (0, a.default)(n, c.Toast, {
            data: {
                addressList: [],
                localAddress: "杭州市",
                isAddressList: !0,
                selectCityCode: "",
                selectCityName: "",
                isFirstLocation: !1
            },
            onShow: function() {
                this.setData({
                    localAddress: this.__query__.cityName || "选择城市"
                });
                var t = this.data.cityModel || {}, e = t.name, s = t.code;
                if (s) return this.fetchListByCityCode(s), this.setData({
                    localAddress: e
                });
                if (r.length && +this.__query__.id) {
                    var i = this.checkListHasId(this.__query__.id, r);
                    Array.isArray(i) ? this.setData({
                        addressList: i,
                        searching: !1
                    }) : this.fetchListByCityCode(this.__query__.cityCode);
                } else this.fetchListByLocation();
            },
            onHide: function() {
                this.setData({
                    cityModel: {}
                });
            },
            checkListHasId: function(t, e) {
                var s = !1;
                return e = e.map(function(e) {
                    return e.isChecked = e.id === +t, e.isChecked && !s && (s = !0), e;
                }), s ? e : s;
            },
            fetchListByLocation: function() {
                var t = this;
                wx.getLocation({
                    success: function(e) {
                        t.fetchCityCodeByLnglat(e.longitude, e.latitude, 1);
                    },
                    fail: function() {
                        t.showToast("获取地址信息失败"), t.fetchAddressList(0, 0, "", ""), t.setData({
                            localAddress: "全国"
                        });
                    }
                });
            },
            fetchCityCodeByLnglat: function(t, e, s) {
                var i = this;
                d.carmen({
                    api: "youzan.delivery.regps/1.0.0/get",
                    query: {
                        lng: t,
                        lat: e,
                        gps_type: s
                    },
                    success: function(s) {
                        var a = s.adCode, c = s.city;
                        i.fetchAddressList(t, e, "", a), i.setData({
                            localAddress: c,
                            cityCode: a,
                            lng: t,
                            lat: e
                        });
                    },
                    complete: function() {}
                });
            },
            fetchAddressList: function(t, e, s) {
                var i = this, a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
                d.carmen({
                    api: "/weapp.wsc.selffetch/1.0.0/getlistbylatandlng",
                    query: {
                        lng: t,
                        lat: e,
                        keyword: s,
                        city_code: a
                    },
                    success: function(t) {
                        var e = i.formatListData(t.list);
                        if (s) return i.setData({
                            searchAddressList: e
                        });
                        r = e, i.setData({
                            addressList: r
                        });
                    }
                });
            },
            fetchListByCityCode: function() {
                var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                d.carmen({
                    api: "weapp.wsc.selffetch/1.0.0/getlistbycitycode",
                    query: {
                        city_code: e
                    },
                    success: function(e) {
                        r = t.formatListData(e.list), t.setData({
                            addressList: r
                        });
                    }
                });
            },
            formatListData: function(t) {
                var e = this;
                return t.map(function(t) {
                    return t.id === +e.__query__.id && (t.isChecked = !0), t.distance > 1e3 ? t.distance = (t.distance / 1e3).toFixed(1) + "km" : t.distance > 100 ? t.distance += "m" : t.distance < 100 && t.distance > 0 ? t.distance = "<100m" : t.distance = void 0, 
                    t.detail = t.province + t.city + t.area + t.address, t;
                });
            },
            selectCity: function() {
                wx.navigateTo({
                    url: "./selectCity?city=" + this.data.localAddress + "&cityCode=" + this.data.cityCode
                });
            },
            searchAction: function() {
                this.setData({
                    searching: !0
                });
            },
            _searchCancel: function() {
                this.setData({
                    searching: !1,
                    addressList: r
                });
            },
            searchDone: function(t) {
                this.fetchAddressList(0, 0, t.value);
            },
            selectAddressAndBack: function(t) {
                var e = t.currentTarget.dataset.id, s = (this.data.searching ? this.data.searchAddressList : this.data.addressList).filter(function(t) {
                    return t.id === +e;
                });
                console.log(s), wx.setStorageSync("selectDetailModel", s[0]), wx.navigateBack({
                    delta: 1
                });
            }
        });
    }
});