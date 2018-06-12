var e = require("../../utils/util.js"), r = require("../../utils/keplerReport.js").init(), t = getApp();

Page({
    data: {
        pDir: "/kwxp",
        scrollTop: 0,
        arrHeader: [],
        arrProvince: [],
        arrCity: [],
        arrArea: [],
        arrTown: [],
        arrDisplay: [ "block", "none", "none", "none" ],
        windowWidth: 0,
        windowHeight: 0,
        targetHeight: 0,
        multiOffset: 0,
        arrChooseValue: [],
        isEditAddress: !1,
        fromPage: ""
    },
    onLoad: function(a) {
        var s = this;
        s.setData({
            fromPage: a.from
        }), wx.getStorage({
            key: s.data.fromPage + "_chooseaddress",
            success: function(e) {
                var r = e.data.addressResult.address;
                r && r.length && (r[r.length - 1].isCurrent = "current", s.setData({
                    arrHeader: r,
                    scrollTop: 1e-5 * Math.random(),
                    isEditAddress: !0
                }), s.toGenerateDisplayAddress());
            },
            fail: function() {
                e.request({
                    url: t.globalRequestUrl + s.data.pDir + "/norder/selectProvince.action",
                    success: function(e) {
                        e && s.setData({
                            arrProvince: e.addressList,
                            scrollTop: 1e-5 * Math.random(),
                            arrHeader: [ {
                                title: "请选择",
                                isCurrent: "current"
                            } ]
                        });
                    },
                    fail: function(r) {
                        e.reportErr(encodeURIComponent("四级地址选择首次数据onload请求request异常，具体信息：") + r.errMsg);
                    }
                });
            }
        }), wx.getSystemInfo({
            success: function(e) {
                s.setData({
                    windowWidth: e.windowWidth,
                    windowHeight: e.windowHeight
                });
            }
        }), r.set({
            urlParam: a,
            title: "地址选择",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        r.pv();
    },
    resetChoice: function(r) {
        var a = this, s = a.data.arrHeader[0].regionId;
        e.request({
            url: t.globalRequestUrl + a.data.pDir + "/norder/selectProvince.action",
            success: function(e) {
                if (e) {
                    var r = a.setDefaultSeled(e.addressList, s);
                    a.setData({
                        arrProvince: r,
                        scrollTop: 1e-5 * Math.random(),
                        arrHeader: [ {
                            title: "请选择",
                            isCurrent: "current"
                        } ],
                        multiOffset: 0,
                        arrDisplay: [ "block", "none", "none", "none" ]
                    });
                }
            },
            fail: function(r) {
                e.reportErr(encodeURIComponent("四级地址选择resetChoice数据请求request异常，具体信息：") + r.errMsg);
            }
        });
    },
    setDefaultSeled: function(e, r) {
        return e.forEach(function(e) {
            e.seled = "", r == e.id && (e.seled = "seled");
        }), e;
    },
    getSpecificList: function(r) {
        for (var a = this, s = r.currentTarget, n = parseInt(s.dataset.regiontype), i = a.data.arrHeader, o = t.globalRequestUrl + a.data.pDir + "/norder/select" + a.getDistrictType(n) + ".action", d = i[n - 1].regionId; i.length > n; ) i.pop();
        i[i.length - 1].isCurrent = "current", n > 1 && (o += "?id" + a.getDistrictType(n - 1) + "=" + i[n - 2].regionId), 
        e.request({
            url: o,
            success: function(e) {
                var r = a.setDefaultSeled(e.addressList, d), t = {};
                t["arr" + a.getDistrictType(n)] = r, t.multiOffset = 1 - n, t.arrDisplay = [ "none", "none", "none", "none" ], 
                t.arrDisplay[n - 1] = "block", t.arrHeader = i, t.scrollTop = 1e-5 * Math.random(), 
                a.setData(t);
            },
            fail: function(r) {
                e.reportErr(encodeURIComponent("四级地址选择getSpecificList数据请求request异常，具体信息：") + r.errMsg);
            }
        });
    },
    dealWithList: function(r) {
        var a = this, s = r.currentTarget, n = r.target, i = parseInt(s.dataset.type), o = n.dataset.id, d = n.dataset.val, c = n.dataset.index;
        a.data["arr" + a.getDistrictType(i)][c].seled = "seled";
        var l = t.globalRequestUrl + a.data.pDir + "/norder/select" + a.getDistrictType(i + 1) + ".action?id" + a.getDistrictType(i) + "=" + n.dataset.id;
        if (i >= 4) return a.closeAddress(i, d, o), !1;
        e.request({
            url: l,
            success: function(e) {
                if (e) if (e.addressList.length) {
                    var r = a.data.arrHeader;
                    r[i - 1].title = d, r[i - 1].regionId = o, r[i - 1].isCurrent = "", "请选择" != r[r.length - 1].title && r.push({
                        title: "请选择",
                        isCurrent: "current"
                    });
                    var t = {};
                    t["arr" + a.getDistrictType(i + 1)] = e.addressList, t.multiOffset = -i, t.arrDisplay = [ "none", "none", "none", "none" ], 
                    t.arrDisplay[i] = "block", t.arrHeader = r, t.scrollTop = 1e-5 * Math.random(), 
                    a.setData(t);
                } else a.closeAddress(i, d, o);
            },
            fail: function(r) {
                e.reportErr(encodeURIComponent("四级地址选择dealWithList数据请求request异常，具体信息：") + r.errMsg);
            }
        });
    },
    closeAddress: function(e, r, t) {
        var a = this.data.arrHeader;
        a[e - 1].title = r, a[e - 1].regionId = t, a[e - 1].isCurrent = "";
        this.setData({
            arrHeader: a
        });
        var s = {};
        s.address = this.data.arrHeader;
        var n = this.data.fromPage + "_chooseaddress";
        wx.setStorage({
            key: n,
            data: {
                addressResult: s
            },
            success: function() {
                wx.navigateBack();
            },
            fail: function() {
                console.log("chooseaddress error ");
            }
        });
    },
    toGenerateDisplayAddress: function() {
        var r = this, a = r.data.arrHeader, s = a.length, n = a[s - 2].regionId, i = a[s - 1].regionId, o = t.globalRequestUrl + r.data.pDir + "/norder/select" + r.getDistrictType(s) + ".action?id" + r.getDistrictType(s - 1) + "=" + n;
        e.request({
            url: o,
            success: function(e) {
                if (e) {
                    var t = r.setDefaultSeled(e.addressList, i), a = {};
                    a["arr" + r.getDistrictType(s)] = t, a.multiOffset = 1 - s, a.arrDisplay = [ "none", "none", "none", "none" ], 
                    a.arrDisplay[s - 1] = "block", a.scrollTop = 1e-5 * Math.random(), r.setData(a);
                }
            },
            fail: function(r) {
                e.reportErr(encodeURIComponent("四级地址选择toGenerateDisplayAddress数据请求request异常，具体信息：") + r.errMsg);
            }
        });
    },
    getDistrictType: function(e) {
        switch (e) {
          case 1:
            return "Province";

          case 2:
            return "City";

          case 3:
            return "Area";

          case 4:
            return "Town";

          default:
            return "";
        }
    }
});