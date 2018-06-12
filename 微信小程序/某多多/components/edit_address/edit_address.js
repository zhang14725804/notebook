function i(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}

function e(i, e) {
    if (!(i instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function i(i, e) {
        for (var t = 0; t < e.length; t++) {
            var s = e[t];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(i, s.key, s);
        }
    }
    return function(e, t, s) {
        return t && i(e.prototype, t), s && i(e, s), e;
    };
}(), s = i(require("../../common/data_util")), d = i(require("../../common/object_util")), a = i(require("../../controller/addresses_controller")), r = i(require("../../common/util")), n = i(require("../../storage/ram_manager")), o = require("../../common/index"), c = (i(require("../../libs/co/we-index")), 
i(require("../../libs/regenerator-runtime/runtime")), !1), h = function() {
    function i() {
        e(this, i), this.nearbyPOIs = [], this.lastValidProviceIndex = 0, this.lastValidCityIndex = 0, 
        this.lastValidDistrictIndex = 0, this.lastValidProvinceId = 0, this.lastValidCityId = 0, 
        this.lastValidDistrictId = 0;
    }
    return t(i, [ {
        key: "initComponentData",
        value: function() {
            var i = this;
            this.setData({
                isNameError: !1,
                isMobileError: !1,
                isAddressDetailError: !1,
                inputName: (i.curAddress || {}).name || "",
                inputMobile: (i.curAddress || {}).mobile || "",
                inputAddressDetail: (i.curAddress || {}).address || "",
                provinceIndex: 1,
                cityIndex: 1,
                districtIndex: 1,
                loadingVisible: !1,
                windowTitle: i.windowTitle,
                toastData: {
                    toastMessage: ""
                },
                disabled: !0,
                districtAddress: "",
                alreadyChooseDistrict: !!i.curAddress,
                becomeFocus: !1,
                showLocationBtn: !1
            }), this.addFunc("hideEditAddressModule", this.hideEditAddressModule), this.addFunc("saveEditModuleAddress", this.saveEditModuleAddress), 
            this.addFunc("removeEditModuleError", this.removeEditModuleError), this.addFunc("showRegionsPicker", this.showRegionsPicker), 
            this.addFunc("confirmRegionsPicker", this.confirmRegionsPicker), this.addFunc("cancelRegionsPicker", this.cancelRegionsPicker), 
            this.addFunc("hideRegionsPicker", this.hideRegionsPicker), this.addFunc("bindChange", this.bindChange), 
            this.addFunc("bindNameChange", this.bindNameChange), this.addFunc("bindNameChange", this.bindNameChange), 
            this.addFunc("bindMobileChange", this.bindMobileChange), this.addFunc("bindAddressChange", this.bindAddressChange), 
            this.addFunc("bindAddressBlurCheck", this.bindAddressBlurCheck), this.addFunc("didClickLocationBtn", this.didClickLocationBtn), 
            this.addFunc("hideAllPicker", this.hideAllPicker), this.addFunc("didChoosePOI", this.didChoosePOI), 
            this.updateRegionsPicker("111");
            var e = this.getData();
            this.inputName = e.inputName, this.inputMobile = e.inputMobile, this.inputAddress = e.inputAddressDetail, 
            this.imprTime = 0, this.isAuto = !1, this.isEdit = !1, this.setDistrictAddress(), 
            this.setDisableIfNeed(), this.locateUser();
        }
    }, {
        key: "locateUser",
        value: function() {
            var i = this;
            i.hasLocationAuth && wx.getLocation({
                success: function(e) {
                    var t = e.latitude, s = e.longitude;
                    o.Request.apiRequest("GET", "api/galen/huygens/location/decoder", {
                        lat: t,
                        lng: s,
                        coord_type: 1
                    }).then(function(e) {
                        i.nearbyPOIs = e && e.data, i.processNearbyPOIs();
                    }).catch(function(i) {
                        console.error(i);
                    });
                }
            });
        }
    }, {
        key: "processNearbyPOIs",
        value: function() {
            if (this.nearbyPOIs && !(this.nearbyPOIs.length <= 0)) {
                for (var i = [], e = 0; e < this.nearbyPOIs.length; e++) {
                    var t = this.nearbyPOIs[e];
                    t.thumb_address && t.address ? i.push(t) : t.thumb_address && !t.address ? (t.address = t.thumb_address, 
                    i.push(t)) : !t.thumb_address && t.address && (t.thumb_address = t.address, i.push(t));
                }
                this.nearbyPOIs = i, this.setData({
                    nearbyPOIs: this.nearbyPOIs,
                    showLocationBtn: !0
                });
                var s = this.nearbyPOIs[0];
                this.curAddress || (this.provinceId = s.province_id, this.cityId = s.city_id, this.districtId = s.district_id, 
                this.lastValidProvinceId = this.provinceId, this.lastValidCityId = this.cityId, 
                this.lastValidDistrictId = this.districtId, this.updateRegionsPicker("111", {
                    from: "location"
                }), this.setData({
                    alreadyChooseDistrict: !0
                }), this.setDistrictAddress());
            }
        }
    }, {
        key: "didChoosePOI",
        value: function(i) {
            if (i && i.currentTarget && i.currentTarget.dataset) {
                var e = i.currentTarget.dataset.index || 0, t = this.nearbyPOIs && this.nearbyPOIs[e];
                if (t) {
                    t.province_id == this.provinceId && t.city_id == this.cityId && t.district_id == this.districtId || n.default.CPPage.$showToast("省市区信息已同步修改", {
                        topValueInFixedPositon: "30%"
                    }), this.provinceId = t.province_id, this.cityId = t.city_id, this.districtId = t.district_id, 
                    this.updateRegionsPicker("111"), this.hideAddressPicker(), this.setData({
                        alreadyChooseDistrict: !0,
                        inputAddressDetail: t.thumb_address
                    }), this.inputAddress = t.thumb_address, this.setDistrictAddress(), this.isAuto = !0;
                    var s = {
                        op: "click",
                        page_section: "address_popup",
                        page_element: "select_geo",
                        page_el_sn: "99894"
                    };
                    this.curAddress && (s.addressId = this.curAddress.addressId), (0, o.TrackingRecord)(s);
                }
            }
            this.setDisableIfNeed();
        }
    }, {
        key: "didClickLocationBtn",
        value: function() {
            this.hideRegionsPicker(), this.setData({
                addressSelectVisible: !0,
                becomeFocus: !1
            });
            var i = {
                op: "click",
                page_section: "address_popup",
                page_element: "rev_geo",
                page_el_sn: "99895"
            };
            this.curAddress && (i.addressId = this.curAddress.addressId), (0, o.TrackingRecord)(i);
        }
    }, {
        key: "hideAddressPicker",
        value: function() {
            this.setData({
                addressSelectVisible: !1
            });
        }
    }, {
        key: "addFunc",
        value: function(i, e) {
            "function" == typeof this.addRootFunc && this.addRootFunc(i, r.default.bind(e, this));
        }
    }, {
        key: "bindNameChange",
        value: function(i) {
            var e = i.detail.value;
            this.inputName = e, this.setDisableIfNeed();
        }
    }, {
        key: "bindMobileChange",
        value: function(i) {
            var e = i.detail.value;
            this.inputMobile = e, this.setDisableIfNeed();
        }
    }, {
        key: "bindAddressChange",
        value: function(i) {
            var e = i.detail.value;
            this.inputAddress = e, this.setDisableIfNeed(), this.isEdit = !0, this.checkAddressDetail(i);
        }
    }, {
        key: "bindChange",
        value: function(i) {
            var e = i.detail.value || [], t = parseInt(e[0], 10), s = parseInt(e[1], 10), d = parseInt(e[2], 10);
            t != this.getData().provinceIndex ? this.updateRegionsPicker("011", {
                provinceIndex: t,
                cityIndex: 0,
                districtIndex: 0
            }) : s != this.getData().cityIndex ? this.updateRegionsPicker("001", {
                provinceIndex: t,
                cityIndex: s,
                districtIndex: 0
            }) : d != this.getData().districtIndex && this.updateRegionsPicker("000", {
                provinceIndex: t,
                cityIndex: s,
                districtIndex: d
            });
        }
    }, {
        key: "hideAllPicker",
        value: function() {
            this.hideRegionsPicker(), this.hideAddressPicker();
        }
    }, {
        key: "hideRegionsPicker",
        value: function() {
            var i = this.getData();
            i.regionsSelectVisible && (this.setData({
                regionsSelectVisible: !1
            }), i.provinceIndex > 0 && i.cityIndex > 0 && i.districtIndex > 0 ? (this.setData({
                alreadyChooseDistrict: !0
            }), this.setDistrictAddress(), this.lastValidProviceIndex = i.provinceIndex, this.lastValidCityIndex = i.cityIndex, 
            this.lastValidDistrictIndex = i.districtIndex, this.lastValidProvinceId = this.provinceId, 
            this.lastValidCityId = this.cityId, this.lastValidDistrictId = this.districtId) : this.setBackAddressInfo());
        }
    }, {
        key: "cancelRegionsPicker",
        value: function() {
            this.setData({
                regionsSelectVisible: !1
            }), this.setBackAddressInfo();
        }
    }, {
        key: "setBackAddressInfo",
        value: function() {
            this.setData({
                provinceIndex: this.lastValidProviceIndex,
                cityIndex: this.lastValidCityIndex,
                districtIndex: this.lastValidDistrictIndex
            }), this.provinceId = this.lastValidProvinceId, this.cityId = this.lastValidCityId, 
            this.districtId = this.lastValidDistrictId;
        }
    }, {
        key: "confirmRegionsPicker",
        value: function() {
            this.verfiyAddress(!0) && (this.hideAllPicker(), this.setDisableIfNeed());
        }
    }, {
        key: "setDistrictAddress",
        value: function() {
            var i = void 0, e = this.getData();
            i = e.alreadyChooseDistrict ? e.provinces[e.provinceIndex].regionName + e.cities[e.cityIndex].regionName + e.districts[e.districtIndex].regionName : "地区信息（请选择）", 
            this.setData({
                districtAddress: i
            });
        }
    }, {
        key: "showRegionsPicker",
        value: function() {
            this.setData({
                regionsSelectVisible: !0,
                becomeFocus: !1,
                addressSelectVisible: !1
            }), this.updateRegionsPicker("111");
        }
    }, {
        key: "regionIdInRegionsIndex",
        value: function(i, e) {
            if (null == e) return -1;
            for (var t = 0; t < e.length; ++t) if (e[t].regionId == i) return t;
            return -1;
        }
    }, {
        key: "show",
        value: function() {
            this.setData({
                editAddressWindowVisible: !0
            }), c = !1, this.isAuto = !1, this.isEdit = !1, this.imprTime = Date.now();
            var i = {
                op: "impr",
                page_section: "address_popup",
                page_el_sn: "99614"
            };
            this.curAddress && (i.address_id = this.curAddress.addressId), (0, o.TrackingRecord)(i);
        }
    }, {
        key: "hide",
        value: function() {
            this.setData({
                editAddressWindowVisible: !1
            }), this.hideAllPicker();
        }
    }, {
        key: "setDisableIfNeed",
        value: function() {
            var i = !(this.inputName && this.inputMobile && this.inputAddress && this.getData().alreadyChooseDistrict);
            this.setData({
                disabled: i
            });
        }
    }, {
        key: "verifyAddressInfoValid",
        value: function() {
            return this.verifyName() && this.verifyMobile() && this.verfiyAddress();
        }
    }, {
        key: "verifyName",
        value: function() {
            var i = this.getData().inputName, e = n.default.CPPage;
            return i.length <= 0 ? (e.$showToast("收货人的名字不能为空", {
                topValueInFixedPositon: "30%"
            }), !1) : !(s.default.getStringCharLength(i) > 16) || (e.$showToast("名字不能超过8个字", {
                topValueInFixedPositon: "30%"
            }), this.setData({
                isNameError: !0
            }), !1);
        }
    }, {
        key: "verifyMobile",
        value: function() {
            var i = this.getData().inputMobile, e = n.default.CPPage;
            if (i.length <= 0) return e.$showToast("收货人的电话不能为空", {
                topValueInFixedPositon: "30%"
            }), !1;
            for (var t = i.replace(/\s|-/g, ""), s = "", d = 0; d < t.length; d++) t.charCodeAt(d) < 255 && (s += t.substr(d, 1));
            return !!r.default.checkTel(s) || (e.$showToast("请输入正确的手机号", {
                topValueInFixedPositon: "30%"
            }), this.setData({
                isMobileError: !0
            }), !1);
        }
    }, {
        key: "verfiyAddress",
        value: function(i) {
            var e = n.default.CPPage;
            if (!this.provinceId) return e.$showToast("请先选择省份", {
                topValueInFixedPositon: "30%"
            }), !1;
            if (!this.cityId) return e.$showToast("请先选择城市", {
                topValueInFixedPositon: "30%"
            }), !1;
            if (!this.districtId) return e.$showToast("请选择地区", {
                topValueInFixedPositon: "30%"
            }), !1;
            if (!i) {
                var t = this.getData().inputAddressDetail;
                if (t.length <= 0) return e.$showToast("详细地址不能为空", {
                    topValueInFixedPositon: "30%"
                }), !1;
                if (t.match(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g)) return e.$showToast("详细地址中不能包含表情符", {
                    topValueInFixedPositon: "30%"
                }), !1;
                if (s.default.getStringCharLength(t) > 100) return e.$showToast("地址填写过长", {
                    topValueInFixedPositon: "30%"
                }), this.setData({
                    isAddressDetailError: !0
                }), !1;
                if (/^[0-9]*$/.test(t)) return e.$showToast("详细地址不能全为数字", {
                    topValueInFixedPositon: "30%"
                }), this.setData({
                    isAddressDetailError: !0
                }), !1;
            }
            return !0;
        }
    }, {
        key: "btnClickTracking",
        value: function(i, e) {
            var t = {
                op: "click",
                page_section: "address_popup",
                page_element: i,
                time_length: Math.abs(Date.now() - this.imprTime)
            };
            this.curAddress && (t.address_id = this.curAddress.addressId), e && (t = d.default.assign(t, e)), 
            (0, o.TrackingRecord)(t);
        }
    }, {
        key: "hideEditAddressModule",
        value: function(i) {
            this.hide(), this.btnClickTracking("close_btn"), n.default.CPPage.$uploadFormId(i, !0);
        }
    }, {
        key: "saveEditModuleAddress",
        value: function(i) {
            if (!c) {
                var e = this;
                if (this.setData({
                    inputAddressDetail: this.inputAddress,
                    inputMobile: this.inputMobile,
                    inputName: this.inputName
                }), this.verifyAddressInfoValid()) {
                    this.setData({
                        loadingVisible: !0,
                        becomeFocus: !1
                    });
                    var t = {
                        name: this.getData().inputName,
                        mobile: this.getData().inputMobile,
                        provinceId: this.provinceId,
                        cityId: this.cityId,
                        districtId: this.districtId,
                        address: this.getData().inputAddressDetail
                    };
                    c = !0, this.curAddress ? (t.isDefaultAddress = this.curAddress.isDefaultAddress, 
                    t.addressId = this.curAddress.addressId, a.default.modifyAddress(t, function(i) {
                        e.setData({
                            loadingVisible: !1
                        }), i.errorCode ? n.default.CPPage.$showToast(i.errorMsg, {
                            topValueInFixedPositon: "30%"
                        }) : e.saveAddressCallback && e.saveAddressCallback(i);
                    })) : a.default.createAddress(t, function(i) {
                        e.setData({
                            loadingVisible: !1
                        }), i.errorCode ? n.default.CPPage.$showToast(i.errorMsg, {
                            topValueInFixedPositon: "30%"
                        }) : e.saveAddressCallback && e.saveAddressCallback(i);
                    });
                    var s = 0;
                    this.isAuto && this.isEdit ? s = 2 : this.isAuto && !this.isEdit && (s = 1), this.btnClickTracking("save_btn", {
                        auto_add: s,
                        page_el_sn: "99897"
                    });
                }
                n.default.CPPage.$uploadFormId(i, !0);
            }
        }
    }, {
        key: "removeEditModuleError",
        value: function(i) {
            var e = i.currentTarget.id;
            switch (this.hideAllPicker(), e) {
              case "name":
                this.getData().isNameError && this.setData({
                    isNameError: !1
                });
                break;

              case "mobile":
                this.setData({
                    isMobileError: !1
                });
                break;

              case "addressDetail":
                this.setData({
                    isAddressDetailError: !1
                });
            }
        }
    }, {
        key: "formatRegions",
        value: function(i) {
            var e = [];
            return i.forEach(function(i) {
                e.push({
                    regionId: i.id,
                    regionName: i.region_name
                });
            }), e;
        }
    }, {
        key: "getData",
        value: function() {
            return "function" == typeof this.getDataFunc ? this.getDataFunc() : {};
        }
    }, {
        key: "setData",
        value: function(i) {
            "function" == typeof this.setDataFunc && this.setDataFunc(i);
        }
    }, {
        key: "updateRegionsPicker",
        value: function(i, e) {
            e = e || {};
            var t = "111" === i;
            i = i ? i.split("") : [ 1, 1, 1 ];
            var s = {}, d = this.getData().provinceIndex, a = this.getData().cityIndex, r = this.getData().districtIndex;
            if (isNaN(e.provinceIndex) || (d = e.provinceIndex), isNaN(e.cityIndex) || (a = e.cityIndex), 
            isNaN(e.districtIndex) || (r = e.districtIndex), "1" == i[0]) {
                var n = this.getData().provinces || [];
                n.length <= 0 && (n = [ {
                    regionName: "选择省份"
                } ].concat(this.formatRegions(this.regionsDatas || []))), this.provinceId && t && (d = this.regionIdInRegionsIndex(this.provinceId, n)), 
                s.provinces = n;
            }
            if ("1" == i[1]) {
                var o = [ {
                    regionName: "选择城市"
                } ];
                if (this.regionsDatas.length >= d && d >= 1) {
                    var c = this.regionsDatas[d - 1].children;
                    o = o.concat(this.formatRegions(c || []));
                }
                this.cityId && t && (a = this.regionIdInRegionsIndex(this.cityId, o)), s.cities = o;
            }
            if ("1" == i[2]) {
                var h = [ {
                    regionName: "选择地区"
                } ];
                if (this.regionsDatas.length >= d && d >= 1 && a >= 1) {
                    var l = (this.regionsDatas[d - 1].children[a - 1] || {}).children;
                    h = h.concat(this.formatRegions(l || []));
                }
                this.districtId && t && (r = this.regionIdInRegionsIndex(this.districtId, h)), s.districts = h;
            }
            s.provinceIndex = d, s.cityIndex = a, s.districtIndex = r, this.setData(s);
            var u = this;
            setTimeout(function() {
                u.setData(s);
            }, 500);
            var I = this.getData().provinces || [], g = this.getData().cities || [], v = this.getData().districts || [];
            this.provinceId = (I[d] || {}).regionId, this.cityId = (g[a] || {}).regionId, this.districtId = (v[r] || {}).regionId, 
            "location" == e.from && d > 0 && a > 0 && r > 0 && (this.lastValidProviceIndex = d, 
            this.lastValidCityIndex = a, this.lastValidDistrictIndex = r);
        }
    }, {
        key: "load",
        value: function(i, e, t, s) {
            var d = this;
            i ? (this.curAddress = i, this.provinceId = i.provinceId, this.cityId = i.cityId, 
            this.districtId = i.districtId) : (this.curAddress = null, this.provinceId = null, 
            this.cityId = null, this.districtId = null), this.data = s.data, this.setDataFunc = s.setDataFunc, 
            this.getDataFunc = s.getDataFunc, this.addRootFunc = s.addRootFunc, this.windowTitle = s.windowTitle || "", 
            this.regionsDatas = s.regionsDatas || [], this.loadCallback = e, this.saveAddressCallback = t, 
            this.initComponentData(), setTimeout(function() {
                d.loadCallback();
            }, 100);
        }
    }, {
        key: "checkAddress",
        value: function(i, e) {
            var t = i.provinceId, s = i.cityId, d = i.districtId, a = this.formatRegions(e || []), r = this.regionIdInRegionsIndex(t, a);
            if (r < 0) return !1;
            var n = e[r].children, o = this.formatRegions(n || []), c = this.regionIdInRegionsIndex(s, o);
            if (c < 0) return !1;
            var h = e[r].children[c].children, l = this.formatRegions(h || []);
            return !(this.regionIdInRegionsIndex(d, l) < 0);
        }
    }, {
        key: "bindAddressBlurCheck",
        value: function(i) {
            this.checkAddressDetail(i);
        }
    }, {
        key: "checkAddressDetail",
        value: function(i) {
            var e = i.detail.value;
            return s.default.getStringCharLength(e) > 100 ? (this.setData({
                isAddressDetailError: !0
            }), !1) : (this.setData({
                isAddressDetailError: !1
            }), !0);
        }
    } ]), i;
}();

exports.default = h;