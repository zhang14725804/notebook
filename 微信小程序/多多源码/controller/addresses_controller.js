function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("../configs/api")), t = e(require("../common/request")), o = e(require("../common/data_util")), d = e(require("../storage/regions_storage")), s = e(require("../models/address")), i = e(require("../storage/ram_manager")), a = {
    regionsDatas: null,
    getAddressesInfo: function(e) {
        var d = t.default.apiRequest("GET", r.default.addresses);
        return d.then(function(r) {
            if (r && o.default.isArray(r)) {
                var t = [];
                r.forEach(function(e) {
                    var r = new s.default(e);
                    t.push(r);
                }), t = o.default.objectArrayDuplicateRemove(t, "addressId"), "function" == typeof e && e(t);
            }
        }, function(r) {
            "function" == typeof e && e({
                errorCode: r.error_code,
                errorMsg: r.error_msg
            });
        }), d;
    },
    setDefaultAddress: function(e, o) {
        var d = r.default.setDefaultAddress + "/" + e.addressId;
        e.provinceId && e.cityId && e.districtId ? t.default.apiRequest("POST", d).then(function(e) {
            !0 === e.result ? o && o({
                success: !0
            }) : o && o({
                errorCode: 41428,
                errorMsg: "设置失败"
            });
        }).catch(function(e) {
            o && o({
                errorCode: e.error_code,
                errorMsg: e.error_msg
            });
        }) : o({
            errorCode: 41428,
            errorMsg: "非法地址"
        });
    },
    modifyAddress: function(e, d) {
        var s = r.default.modifyAddress + "/" + e.addressId;
        if (e.provinceId && e.cityId && e.districtId) {
            var i = {
                name: e.name,
                mobile: o.default.formatMobile(e.mobile),
                province_id: e.provinceId,
                city_id: e.cityId,
                district_id: e.districtId,
                address: e.address
            }, a = this;
            t.default.apiRequest("POST", s, i).then(function(r) {
                !0 === r.result ? a.getAddressDetail(e.addressId, function(e) {
                    e.errorCode ? d && d({
                        errorCode: r.error_code,
                        errorMsg: r.error_msg
                    }) : d && d(e);
                }) : d && d({
                    errorCode: 41428,
                    errorMsg: "接口出错了"
                });
            }).catch(function(e) {
                d && d({
                    errorCode: e.error_code,
                    errorMsg: e.error_msg
                });
            });
        } else d({
            errorCode: 41428,
            errorMsg: "非法地址"
        });
    },
    getAddressDetail: function(e, o) {
        var d = r.default.address + "/" + e;
        t.default.apiRequest("GET", d).then(function(e) {
            o && o(new s.default(e));
        }, function(e) {
            o && o({
                errorCode: e.error_code,
                errorMsg: e.error_msg
            });
        });
    },
    createAddress: function(e, d) {
        var s = r.default.address;
        if (e.addressId && (s += "/" + e.addressId), e.provinceId && e.cityId && e.districtId) {
            var i = {
                name: e.name,
                mobile: o.default.formatMobile(e.mobile),
                province_id: e.provinceId,
                city_id: e.cityId,
                district_id: e.districtId,
                address: e.address,
                is_default: e.isDefaultAddress ? "1" : ""
            }, a = this;
            t.default.apiRequest("POST", s, i).then(function(r) {
                var t = r.address_id || e.addressId;
                a.getAddressDetail(t, function(e) {
                    e.errorCode ? d && d({
                        errorCode: r.error_code,
                        errorMsg: r.error_msg
                    }) : d && d(e);
                });
            }, function(e) {
                d && d({
                    errorCode: e.error_code,
                    errorMsg: e.error_msg
                });
            });
        }
    },
    fetchRegionsJsonData: function(e) {
        var o = d.default.getRegionsLastUpdated(), s = r.default.regionsJson + "/" + (null == o ? 0 : o);
        t.default.apiRequest("GET", s, null, !0).then(function(r) {
            r && r.regions && r.regions.length && d.default.saveRegionsData(r), "function" == typeof e && e();
        }, function(r) {
            "function" == typeof e && (e(), i.default.CPPage.$showToast(r.error_msg));
        });
    },
    getRegions: function() {
        return this.regionsDatas || (this.regionsDatas = (d.default.getRegionsData() || {}).regions), 
        this.regionsDatas;
    }
};

exports.default = a;