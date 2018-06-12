!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 36 ], {
    307: function(t, e, s) {
        var a, i, d = getApp(), n = !1, c = s(107), o = s(3), r = "", l = "", u = "", h = "", y = !1, g = [], f = "", A = [];
        Page(o({}, c, {
            data: {
                addressList: [],
                localAddress: "杭州市",
                isAddressList: !0,
                selectCityCode: "",
                selectCityName: "",
                isFirstLocation: !1,
                kdtId: ""
            },
            onLoad: function(t) {
                var e = t.kdtId;
                this.setData({
                    kdtId: e
                }), "undefined" != t.id && (f = t.id, this.data.selectCityName = t.cityName, this.data.selectCityCode = t.cityCode);
            },
            onReady: function() {
                n = !1;
            },
            onShow: function() {
                var t = getCurrentPages(), e = t[t.length - 1];
                void 0 == e.data.cityModel ? "" == this.data.selectCityCode ? this.getLocation() : (this.data.isFirstLocation = !0, 
                r = this.data.selectCityCode, l = this.data.selectCityName, this.getLocation(), 
                n = !0, this.setData({
                    localAddress: this.data.selectCityName
                })) : (this.data.isFirstLocation = !0, r = e.data.cityModel.code, l = e.data.cityModel.name, 
                this.getLocation(), n = !0, this.setData({
                    localAddress: e.data.cityModel.name
                }));
            },
            onHide: function() {},
            onUnload: function() {},
            onPullDownRefresh: function() {},
            onReachBottom: function() {},
            onShareAppMessage: function() {},
            radioChange: function() {},
            getLocation: function() {
                var t = this;
                wx.getLocation({
                    type: "gcj02",
                    success: function(e) {
                        u = e.latitude, h = e.longitude, t.getCityName(e.longitude, e.latitude, "2");
                    },
                    fail: function() {
                        t.getAdreessDetail(0, 0, "", "", t.data.kdtId), t.setData({
                            localAddress: "全国"
                        });
                    }
                });
            },
            getCityName: function(t, e, s) {
                var c = this;
                d.carmen({
                    api: "youzan.delivery.regps/1.0.0/get",
                    query: {
                        lng: t,
                        lat: e,
                        gps_type: s
                    },
                    success: function(s) {
                        c.data.isFirstLocation || c.setData({
                            localAddress: s.city
                        }), a = s.city, i = s.adCode, 1 == c.data.isFirstLocation ? s.city == l ? (n = !1, 
                        c.getAdreessDetail(t, e, "", s.adCode, c.data.kdtId)) : (c.getAdressDetailByCityCode(r), 
                        c.data.isFirstLocation = !1) : c.getAdreessDetail(t, e, "", s.adCode, c.data.kdtId);
                    },
                    complete: function() {}
                });
            },
            getAdreessDetail: function(t, e, s, a, i) {
                var n, c = this;
                d.carmen({
                    api: "/weapp.wsc.selffetch/1.0.0/getlistbylatandlng",
                    query: (n = {
                        lng: t,
                        lat: e,
                        keyword: s
                    }, n.keyword = s, n.city_code = a, n.kdt_id = i, n),
                    success: function(t) {
                        c.dealGetAdressData(t);
                    },
                    complete: function() {}
                });
            },
            getAdressDetailByCityCode: function(t) {
                var e = this;
                d.carmen({
                    api: "weapp.wsc.selffetch/1.0.0/getlistbycitycode",
                    query: {
                        city_code: t
                    },
                    success: function(t) {
                        e.dealGetAdressData(t);
                    },
                    complete: function() {}
                });
            },
            dealGetAdressData: function(t) {
                A = [];
                var e = t.list;
                A = e, g = [];
                for (var s = 0; s < e.length; s++) {
                    var a = e[s], i = !1;
                    a.id == f && (i = !0);
                    var d;
                    d = n ? "，" + a.tel : 1e3 < a.distance ? "，约" + (a.distance / 1e3).toFixed(1) + "km" : "，约" + a.distance + "m";
                    var c = {
                        index: s,
                        topAdress: a.name + d,
                        detailAdress: "地址：" + a.province + a.city + a.area + a.address,
                        isChecked: i
                    };
                    g.push(c);
                }
                0 == g.length && wx.showToast({
                    title: "暂无数据"
                }), y ? this.setData({
                    searchAddressList: g
                }) : this.setData({
                    addressList: g
                });
            },
            selectCity: function() {
                wx.navigateTo({
                    url: "./selectCity?city=" + a + "&cityCode=" + i + "&kdtId=" + this.data.kdtId
                });
            },
            searchAction: function() {
                this.setData({
                    isAddressList: !1,
                    searchAddressList: []
                });
            },
            _searchCancel: function() {
                y = !1, this.setData({
                    isAddressList: !0
                });
            },
            searchDone: function(t) {
                y = !0, n ? this.getAdressDetailByCityCode(r) : this.getAdreessDetail(h, u, t.value, this.data.kdtId);
            },
            selectAdressCitySearch: function(t) {
                for (var e = [], s = t.currentTarget.dataset.index, a = 0; a < g.length; a++) {
                    var i = g[a], d = {
                        topAdress: i.topAdress,
                        index: i.index,
                        detailAdress: i.detailAdress,
                        isChecked: s == a
                    };
                    e.push(d);
                }
                this.setData({
                    searchAddressList: e
                }), wx.setStorageSync("selectDetailModel", A[s]), y = !1, wx.navigateBack({
                    delta: 1
                });
            },
            selectAdressCityBack: function(t) {
                for (var e = [], s = t.currentTarget.dataset.index, a = 0; a < g.length; a++) {
                    var i = g[a], d = {
                        topAdress: i.topAdress,
                        index: i.index,
                        detailAdress: i.detailAdress,
                        isChecked: s == a
                    };
                    e.push(d);
                }
                wx.setStorageSync("selectDetailModel", A[s]), y = !1, this.setData({
                    addressList: e
                }), wx.navigateBack({
                    delta: 1
                });
            }
        }));
    }
}, [ 307 ]);