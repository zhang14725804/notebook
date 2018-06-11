function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function s(e, s) {
    if (!(e instanceof s)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, s) {
        for (var t = 0; t < s.length; t++) {
            var a = s[t];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(s, t, a) {
        return t && e(s.prototype, t), a && e(s, a), s;
    };
}(), a = e(require("../../common/data_util")), i = e(require("../../constants/addresses")), d = e(require("../../configs/api")), n = e(require("../../common/request")), r = e(require("../../common/util")), o = e(require("../../storage/ram_manager")), u = e(require("../../libs/co/we-index")), l = e(require("../../libs/regenerator-runtime/runtime")), c = require("../../common/message"), h = {
    Default: "查看配送说明"
}, f = {
    Default: "当前地址不在配送范围内"
}, g = {
    Default: "(无法配送至该地址)"
}, v = function() {
    function e() {
        s(this, e), this.addresses = null, this.selectedAddressId = null, this.address = null, 
        this.saleRegions = [], this.setDataFunc = null, this.getDataFunc = null, this.addRootFunc = null, 
        this.addressSelectdispachId = null, this.trackingFunc = null;
    }
    return t(e, [ {
        key: "updateOrderAddress",
        value: function(e) {
            e ? (this.address = e, e && e.addressId && (null == this.address.canReceived && (this.address.canReceived = this.saleRegions.length <= 0 || this.saleRegions.indexOf(this.address.provinceId + "") >= 0), 
            this.address.notAllowedNotice = f.Default, this.address.notAllowedArrow = h.Default, 
            this.address.cantReceiveHint = g.Default), this.address.getPostage = !0, this.setData({
                addressInfo: this.address
            }), this.address.getPostage = !1) : this.setData({
                addressInfo: {
                    addressId: 0,
                    provinceId: 0,
                    name: "",
                    mobile: "",
                    province: "",
                    city: "",
                    district: "",
                    addressType: "",
                    address: "",
                    canReceived: !0,
                    notAllowedNotice: f.Default,
                    notAllowedArrow: h.Default,
                    cantReceiveHint: g.Default
                }
            });
        }
    }, {
        key: "initComponentData",
        value: function() {
            this.setData({
                showWechatAddAddress: !!wx.chooseAddress,
                addressInfo: {
                    addressId: 0,
                    provinceId: 0,
                    name: "",
                    mobile: "",
                    province: "",
                    city: "",
                    district: "",
                    addressType: "",
                    address: "",
                    canReceived: !0,
                    notAllowedNotice: f.Default,
                    notAllowedArrow: h.Default,
                    cantReceiveHint: g.Default
                },
                regionVisible: !1,
                saleRegionTips: [ "", "" ],
                notAllowedNotice: f.Default,
                notAllowedArrow: h.Default,
                cantReceiveHint: g.Default,
                regionTipsShow: !1,
                showLoading: !1
            }), this.setSelectedAddress(this.addresses, this.selectedAddressId);
        }
    }, {
        key: "updateModel",
        value: function(e) {
            var s = void 0;
            e && (this.address = e), this.address && this.address.addressId && (s = {
                addressId: this.address.addressId,
                provinceId: this.address.provinceId,
                name: this.address.name,
                mobile: this.address.mobile,
                province: this.address.province,
                city: this.address.city,
                district: this.address.district,
                address: this.address.address,
                canReceived: this.saleRegions.length <= 0 || this.saleRegions.indexOf(this.address.provinceId + "") >= 0 || this.isVirtualGoods
            }), s && this.setData({
                addressInfo: s
            });
        }
    }, {
        key: "setSelectedAddress",
        value: function(e, s) {
            if (a.default.isArray(e)) {
                var t = -1, i = -1;
                if (e.length <= 0) this.address = null; else {
                    for (var d = 0; d < e.length; d++) {
                        var n = e[d];
                        if ((n.addressId || "").toString() === s) return i = d, void this.updateModel(n);
                        n.isDefaultAddress && (t = d);
                    }
                    i < 0 && t >= 0 && this.updateModel(e[t]);
                }
            }
        }
    }, {
        key: "showRegionTips",
        value: function() {
            0 === this.getData().saleRegionTips[0].length ? this.setSaleRegionsInfo() : this.setData({
                regionTipsShow: !0
            });
        }
    }, {
        key: "hideRegionTips",
        value: function() {
            this.setData({
                regionTipsShow: !1
            });
        }
    }, {
        key: "editAddress",
        value: function(e) {
            c.Message.on(c.KEYS.ORDERCHECKOUT_CHOOSE_ADDRESS, r.default.bind(this.selectAddress, this), !0);
            var s = this;
            (0, u.default)(l.default.mark(function t() {
                var a;
                return l.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        o.default.CPPage.$forward("addresses", {
                            sel_address_id: s.address.addressId,
                            allowed_regions: s.saleRegions
                        }), a = "change_address", "cancel_pay_prompt" === e.currentTarget.dataset.refer && (a = "alt_add"), 
                        "function" == typeof s.trackingFunc && s.trackingFunc(a);

                      case 4:
                      case "end":
                        return t.stop();
                    }
                }, t, this);
            }));
        }
    }, {
        key: "selectAddress",
        value: function(e) {
            for (var s = this, t = e || [], a = void 0, i = void 0, r = 0; r < t.length; r++) {
                var u = t[r];
                u.isUsing && (i = u), u.isDefaultAddress && (a = u);
            }
            var l = this.getData();
            if (l && l.disableUserAction) {
                var h = {
                    order_sn: s.orderSn,
                    address_id: i.addressId
                };
                n.default.apiRequest("POST", d.default.updateOrderAddress, h).then(function() {
                    var e = i || a;
                    s.updateOrderAddress(e), c.Message.off(c.KEYS.ORDERCHECKOUT_CHOOSE_ADDRESS);
                }).catch(function() {
                    o.default.CPPage.$showToast("运费变动，该地址暂不支持修改，请重新下单");
                });
            } else {
                var f = i || a;
                this.updateOrderAddress(f), c.Message.off(c.KEYS.ORDERCHECKOUT_CHOOSE_ADDRESS);
            }
        }
    }, {
        key: "loadProvince",
        value: function() {
            var e = d.default.regions + "/" + i.default.Region.China;
            return n.default.apiRequest("GET", e);
        }
    }, {
        key: "setSaleRegionsInfo",
        value: function() {
            var e = this;
            e.setData({
                showLoading: !0,
                loadingNeedBg: !0
            });
            var s = e.saleRegions, t = void 0;
            if (e.getDataFunc) {
                var a = e.getDataFunc();
                a.addressInfo && (t = a.addressInfo.addressId);
            }
            if (!(!t || t <= 0 || s.length < 1 || s[0].toString() === i.default.Region.China)) {
                var d = [], n = [];
                e.loadProvince().then(function(t) {
                    for (var a = 0; a < t.length; a++) {
                        var i = t[a];
                        s.indexOf(i.region_id + "") >= 0 ? n.push(i.region_name) : d.push(i.region_name);
                    }
                    var r = "";
                    0 === n.length || d.length <= n.length ? r = [ "该商品部分地区暂不支持配送", "（港澳台、" + d.join("、") + "）" ] : (0 === d.length || n.length <= d.length) && (r = [ "该商品目前仅支持配送至", n.join("、") + "区域" ]), 
                    e.setData({
                        saleRegionTips: r,
                        regionTipsShow: !0,
                        showLoading: !1,
                        loadingNeedBg: !1
                    });
                });
            }
        }
    }, {
        key: "setData",
        value: function(e) {
            "function" == typeof this.setDataFunc && this.setDataFunc(e);
        }
    }, {
        key: "getData",
        value: function() {
            return "function" == typeof this.getDataFunc ? this.getDataFunc() : {};
        }
    }, {
        key: "addFunc",
        value: function(e, s) {
            "function" == typeof this.addRootFunc && this.addRootFunc(e, r.default.bind(s, this));
        }
    }, {
        key: "load",
        value: function(e, s, t, a, i) {
            i = i || {}, this.isVirtualGoods = e, this.addresses = s, this.selectedAddressId = t, 
            this.saleRegions = a, this.setDataFunc = i.setDataFunc, this.getDataFunc = i.getDataFunc, 
            this.addRootFunc = i.addRootFunc, this.initComponentData(i), this.addFunc("editAddress", this.editAddress), 
            this.addFunc("hideRegionTips", this.hideRegionTips), this.addFunc("showRegionTips", this.showRegionTips);
        }
    }, {
        key: "setTrackingFunc",
        value: function(e) {
            this.trackingFunc = e;
        }
    } ]), e;
}();

exports.default = v;