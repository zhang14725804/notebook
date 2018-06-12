var e = require("../../utils/util.js"), a = require("../../utils/keplerReport.js").init(), t = require("../../utils/message_push.js"), r = getApp();

Page({
    data: {
        pDir: "/kwxp",
        arrProvince: [],
        arrCity: [],
        arrArea: [],
        arrTown: [],
        arrSelected: [],
        addressResult: [],
        defaultFlag: 0,
        addressType: "",
        chooseAddressFlag: 0,
        myOldMobile: "",
        address: {
            id: "",
            name: "",
            where: "",
            mobile: "",
            provinceNameIgnore: "",
            cityNameIgnore: "",
            areaNameIgnore: "",
            townNameIngore: "",
            idProvince: 0,
            idCity: 0,
            idTown: 0,
            idArea: 0,
            oldMobile: ""
        },
        arrDisable: [ !1, !0, !0, !0 ],
        isHasTown: !1,
        addressIndex: 1,
        requestCacheObj: {}
    },
    onLoad: function(t) {
        var s = this;
        s.setData({
            addressType: t.addressType
        }), t.addressType && "add" == t.addressType ? (wx.setNavigationBarTitle({
            title: "新建收货地址"
        }), e.request({
            url: r.globalRequestUrl + s.data.pDir + "/norder/selectProvince.action",
            success: function(e) {
                e && s.setData({
                    arrProvince: e.addressList
                });
            },
            fail: function(a) {
                e.reportErr(encodeURIComponent("新建地址，四级地址选择首次数据onload请求省份地址数据异常，具体信息：") + a.errMsg);
            }
        })) : (wx.setNavigationBarTitle({
            title: "编辑收货地址"
        }), e.request({
            url: r.globalRequestUrl + s.data.pDir + "/norder/editAddress.json?addressId=" + t.addressId + "&defaultFlag=0",
            success: function(e) {
                var a = s.assembleFourLevel(e.address);
                s.setData({
                    address: e.address,
                    myOldMobile: e.address.mobile,
                    arrSelected: a.address
                }), s.editAddressRequest();
            },
            fail: function(a) {
                e.reportErr(encodeURIComponent("结算页编辑地址页首屏数据请求失败：") + a.errMsg);
            }
        })), s.setData({
            defaultFlag: t.defaultFlag
        }), a.set({
            urlParam: t,
            title: "编辑收货地址",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        a.pv();
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
    },
    getRequestUrl: function(e) {
        var a = {}, t = this.data.arrSelected;
        if (a.curRegionId = t[e - 1].regionId, e > 1) {
            var s = t[e - 2].regionId;
            a.url = r.globalRequestUrl + this.data.pDir + "/norder/select" + this.getDistrictType(e) + ".action?id" + this.getDistrictType(e - 1) + "=" + s;
        } else a.url = r.globalRequestUrl + this.data.pDir + "/norder/select" + this.getDistrictType(e) + ".action";
        return a;
    },
    requestDataHandle: function(a) {
        var t = this, r = this.data.addressIndex, s = this.data.arrSelected.length, d = this.getSeledIndex(a.addressList, this.data.requestCacheObj.curRegionId), i = {};
        if (i["arr" + this.getDistrictType(r)] = a.addressList, i[this.getDistrictType(r).toLowerCase() + "Index"] = d, 
        r < s && r++, i.addressIndex = r, i.requestCacheObj = this.getRequestUrl(r), this.setData(i), 
        r <= s) return e.promiseRequest({
            url: t.data.requestCacheObj.url
        });
    },
    editAddressRequest: function() {
        var a = this, t = this.data.arrSelected.length, r = {};
        r.requestCacheObj = this.getRequestUrl(this.data.addressIndex), r.arrDisable = [ !1, !1, !1, !1 ], 
        4 == t && (r.isHasTown = !0), a.setData(r), e.promiseRequest({
            url: a.data.requestCacheObj.url
        }).then(function(e) {
            return a.requestDataHandle(e);
        }).then(function(e) {
            return a.requestDataHandle(e);
        }).then(function(e) {
            return a.requestDataHandle(e);
        }).then(function(e) {
            return a.requestDataHandle(e);
        }).catch(function(a) {
            e.reportErr(encodeURIComponent("四级地址选择editAddressRequest串行数据请求request异常，具体信息：") + a.errMsg);
        });
    },
    getSeledIndex: function(e, a) {
        var t;
        return e.forEach(function(e, r) {
            a == e.id && (t = r);
        }), t;
    },
    changeAddress: function(e) {
        var a = parseInt(e.currentTarget.dataset.type), t = {};
        t[this.getDistrictType(a).toLowerCase() + "Index"] = e.detail.value, t.address = this.data.address, 
        t.address["id" + this.getDistrictType(a)] = this.data["arr" + this.getDistrictType(a)][e.detail.value].id, 
        this.resetChoice(e, a), this.setData(t), this.dealWithList(e, a);
    },
    dealWithList: function(a, t) {
        var s = this, d = s.data["arr" + s.getDistrictType(t)][a.detail.value].id, i = r.globalRequestUrl + s.data.pDir + "/norder/select" + s.getDistrictType(t + 1) + ".action?id" + s.getDistrictType(t) + "=" + d;
        e.request({
            url: i,
            success: function(e) {
                if (e && e.addressList.length > 0) {
                    var a = {};
                    a["arr" + s.getDistrictType(t + 1)] = e.addressList, a.arrDisable = s.data.arrDisable, 
                    a.arrDisable[t] = !1, t + 1 >= 4 && (a.isHasTown = !0), s.setData(a);
                }
            },
            fail: function(a) {
                e.reportErr(encodeURIComponent("四级地址选择dealWithList数据请求request异常，具体信息：") + a.errMsg);
            }
        });
    },
    resetChoice: function(e, a) {
        for (var t = {}, r = a; r <= 4; r++) t[this.getDistrictType(r).toLowerCase() + "Index"] = null, 
        t.arrDisable = this.data.arrDisable, t.arrDisable[r] = !0;
        this.data.isHasTown && a < 4 && (t.isHasTown = !1), this.setData(t);
    },
    assembleFourLevel: function(e) {
        var a = {};
        return a.address = [], e.idProvince && e.provinceNameIgnore && a.address.push({
            regionId: e.idProvince,
            title: e.provinceNameIgnore
        }), e.idCity && e.cityNameIgnore && a.address.push({
            regionId: e.idCity,
            title: e.cityNameIgnore
        }), e.idArea && e.areaNameIgnore && a.address.push({
            regionId: e.idArea,
            title: e.areaNameIgnore
        }), e.idTown && e.townNameIngore && a.address.push({
            regionId: e.idTown,
            title: e.townNameIngore
        }), a;
    },
    formSubmit: function(s) {
        var d = this, i = new RegExp("^([一-﨩]|[-]|[a-zA-Z0-9])*$"), n = new RegExp("^(\\d{7}|\\d{10}|\\d{11})$"), o = new RegExp("[^\\u4E00-\\u9FA5#A-Za-z0-9_( )（）《》-， -]+"), l = new RegExp("\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]");
        d.data.address.mobile, d.data.address.phone;
        a.click({
            eid: "MNeworderNewAddress_Save",
            elevel: "",
            ename: "",
            eparam: "",
            event: ""
        }), e.request({
            url: r.globalRequestUrl + d.data.pDir + "/norder/validateMobile.action?mobile=" + s.detail.value.userphone,
            success: function(a) {
                var u = !1;
                if (u = d.data.isHasTown ? null != d.data.provinceIndex && null != d.data.cityIndex && null != d.data.areaIndex && null != d.data.townIndex : null != d.data.provinceIndex && null != d.data.cityIndex && null != d.data.areaIndex, 
                !s.detail.value.username) return wx.showModal({
                    content: "请先完善您的收货人信息",
                    showCancel: !1
                }), !1;
                if (l.test(s.detail.value.username) || o.test(s.detail.value.username)) return wx.showModal({
                    content: "您的收货人信息有误",
                    showCancel: !1
                }), !1;
                if (!s.detail.value.userphone) return wx.showModal({
                    content: "请先完善您的电话信息",
                    showCancel: !1
                }), !1;
                if (!u) return wx.showModal({
                    content: "请先完善您的所在地区",
                    showCancel: !1
                }), !1;
                if (!s.detail.value.useraddress) return wx.showModal({
                    content: "请先完善您的详细地址",
                    showCancel: !1
                }), !1;
                if (!i.test(s.detail.value.username)) return wx.showModal({
                    content: "您的收货人信息输入有误",
                    showCancel: !1
                }), !1;
                if (l.test(s.detail.value.useraddress)) return wx.showModal({
                    content: "您的详细地址输入有误",
                    showCancel: !1
                }), !1;
                if (o.test(s.detail.value.useraddress)) return wx.showModal({
                    content: "您的详细地址输入有误",
                    showCancel: !1
                }), !1;
                if (!n.test(s.detail.value.userphone.trim()) && s.detail.value.userphone.trim() != d.data.myOldMobile.trim() || !a.Flag && s.detail.value.userphone.trim() != d.data.myOldMobile.trim()) return wx.showModal({
                    content: "您的手机号输入有误",
                    showCancel: !1
                }), !1;
                var c = "";
                c = "add" == d.data.addressType ? r.globalRequestUrl + d.data.pDir + "/norder/addOrUpdateAddress.action?address.id=0&address.name=" + encodeURIComponent(s.detail.value.username) + "&address.mobile=" + s.detail.value.userphone + "&address.idProvince=" + d.data.address.idProvince + "&address.idCity=" + d.data.address.idCity + "&address.idArea=" + d.data.address.idArea + "&address.idTown=" + d.data.address.idTown + "&address.where=" + encodeURIComponent(s.detail.value.useraddress) + "&address.oldMobile=" + d.data.address.mobile + "&addressType=add" : r.globalRequestUrl + d.data.pDir + "/norder/addOrUpdateAddress.action?address.id=" + d.data.address.id + "&address.name=" + encodeURIComponent(s.detail.value.username) + "&address.mobile=" + s.detail.value.userphone + "&address.idProvince=" + d.data.address.idProvince + "&address.idCity=" + d.data.address.idCity + "&address.idArea=" + d.data.address.idArea + "&address.idTown=" + d.data.address.idTown + "&address.where=" + encodeURIComponent(s.detail.value.useraddress) + "&address.oldMobile=" + d.data.address.mobile + "&addressId=" + d.data.address.id, 
                e.request({
                    url: c,
                    success: function() {
                        0 == d.data.chooseAddressFlag && (t.messagePush({
                            formId: s.detail.formId,
                            times: 1,
                            type: 30007
                        }), wx.navigateBack()), d.data.chooseAddressFlag++;
                    },
                    fail: function(a) {
                        e.reportErr(encodeURIComponent("结算页编辑地址点击保存并使用按钮请求失败：") + a.errMsg);
                    }
                });
            },
            fail: function(a) {
                e.reportErr(encodeURIComponent("结算页编辑地址点击保存按钮后验证手机号请求失败：") + a.errMsg);
            }
        });
    },
    delete: function(t) {
        var s = this;
        a.click({
            eid: "MNeworderNewAddress_Delete",
            elevel: "",
            ename: "",
            eparam: "",
            event: t
        }), e.request({
            url: r.globalRequestUrl + s.data.pDir + "/norder/delAddress.json?addressId=" + s.data.address.id + "&addressFrom=del",
            success: function() {
                wx.redirectTo({
                    url: "../addressul/addressul"
                });
            },
            fail: function(a) {
                e.reportErr(encodeURIComponent("结算页编辑地址删除按钮请求失败：") + a.errMsg);
            }
        });
    },
    saveName: function(e) {
        this.data.address.name = e.detail.value;
    },
    saveWhere: function(e) {
        this.data.address.where = e.detail.value;
    },
    saveMobile: function(e) {
        this.data.address.mobile = e.detail.value;
    }
});