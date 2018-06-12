function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var s = e(require("../../controller/addresses_controller")), d = e(require("../../common/data_util")), t = e(require("../../components/edit_address/edit_address.js")), a = e(require("../../common/system_info")), r = e(require("../../common/url_util")), i = e(require("../../common/navigation")), o = e(require("../../common/util")), n = e(require("../../configs/api")), l = e(require("../../common/request")), u = e(require("../../models/address")), c = require("../../common/index"), h = e(require("../../components/quick_entry_forward_index/quick_entry_forward_index")), f = e(require("../../libs/co/we-index")), g = e(require("../../libs/regenerator-runtime/runtime")), A = require("../../common/message"), p = {
    addressListData: null,
    allowedRegions: [],
    notAllowRegions: [],
    differAmountRegions: [],
    goodsId: null,
    skuId: null,
    usedAddressId: null,
    defaultAddressIndex: -1,
    oprationLocked: !1,
    editAddressModule: null,
    data: {
        visible: !1,
        showWechatChooseAddr: !!wx.chooseAddress,
        addressList: [],
        showUseBtn: !1,
        addressData: {
            editAddressWindowVisible: !1
        },
        isIpx: a.default.getIpxJudgment()
    },
    setDefaultAddress: function(e) {
        var t = this, a = e.currentTarget.dataset, r = void 0;
        if (a && null != a.index && (r = parseInt(e.currentTarget.dataset.index)), null != r && this.addressListData) {
            var i = this.data.addressList[r];
            i && d.default.checkIndexByKey(this.addressListData, i.addressId, "addressId") !== this.defaultAddressIndex && (this.$showLoading(), 
            s.default.setDefaultAddress(i, function(e) {
                if (t.$hideLoading(), e.errorCode) {
                    var s = e.errorMsg || "";
                    t.$showToast(s);
                } else {
                    i.isDefaultAddress = !0;
                    var a = i.addressId;
                    if (t.addressListData && a) {
                        var r = d.default.checkIndexByKey(t.addressListData, a, "addressId");
                        null != r && r !== t.defaultAddressIndex && t.updateDefaultAddress(r);
                    }
                }
            }));
        }
    },
    dispatchDataToOrderCheckoutAddress: function() {
        var e = this.data.addressList || [];
        A.Message.emit(A.KEYS.ORDERCHECKOUT_CHOOSE_ADDRESS, e);
    },
    dealWithChooseAddress: function(e) {
        if (this.$urlQueryObj.chooseFromAcivity) {
            if (!e) return;
            A.Message.emit(A.KEYS.GOLDEN_EGGS_CHOOSE_ADDRESS, e);
        } else {
            if (!e) return;
            if (!this.usedAddressId || [ "NOT_ALLOWED", "DIFFER_AMOUNT" ].indexOf(e.deliveryType) >= 0) return;
        }
        for (var s = this.data.addressList, d = 0; d < s.length; d++) s[d] && (s[d].addressId == this.usedAddressId && (s[d].isUsing = !1), 
        s[d].addressId == e.addressId && (s[d].isUsing = !0));
        this.usedAddressId = e.addressId, this.setData({
            addressList: s
        }), i.default.back();
    },
    chooseAddress: function(e) {
        var s = void 0;
        e && e.currentTarget && e.currentTarget.dataset && (s = parseInt(e.currentTarget.dataset.index)), 
        e && e.detail && e.detail.target && (s = parseInt(e.detail.target.dataset.index)), 
        s >= 0 && s < this.data.addressList.length && this.dealWithChooseAddress(this.data.addressList[s]);
    },
    editAddress: function(e) {
        var s = parseInt(e.currentTarget.dataset.index), d = this.data.addressList;
        s >= 0 && s < d.length && this.loadEditAddressModule(d[s], {
            windowTitle: "编辑地址"
        });
    },
    execDeleteAddress: function(e) {
        var s = this;
        if (null != this.deleteItemIndex) {
            var d = this.deleteItemIndex;
            if (!this.oprationLocked) {
                this.oprationLocked = !0, this.$showLoading();
                var t = this.data.addressList, a = null;
                if (t.length > 1) {
                    var i = t[(d + 1) % t.length];
                    i && (a = i.addressId);
                }
                var o = this.data.addressList[d], u = n.default.deleteAddress + "/" + o.addressId;
                o && o.isDefaultAddress && a && (u += "?" + r.default.buildQuery({
                    default_id: a
                })), l.default.apiRequest("POST", u).then(function(d) {
                    var t = {
                        defaultAddressId: d.default_id,
                        deletedAddressId: o.addressId
                    };
                    s.processDeleteAddress(t), e && e();
                }, function(d) {
                    var t = {
                        errorCode: d.error_code,
                        errorMsg: d.error_msg
                    };
                    s.processDeleteAddress(t), e && e();
                });
            }
        }
    },
    deleteAddress: function(e) {
        var s = this, d = parseInt(e.currentTarget.dataset.index);
        this.deleteItemIndex = d, this.$showModal({
            title: "",
            content: "确定要删除该地址吗？",
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {
                e.confirm && s.execDeleteAddress();
            }
        });
        var t = {
            op: "click",
            page_element: "del_btn"
        };
        (0, c.TrackingRecord)(t);
    },
    updateDefaultAddress: function(e) {
        if (this.addressListData && void 0 != e && e >= 0 && e < this.addressListData.length) {
            if (this.defaultAddressIndex >= 0) {
                var s = this.addressListData[this.defaultAddressIndex];
                s && (s.isDefaultAddress = !1);
            }
            var d = this.addressListData[e];
            if (d) {
                d.isDefaultAddress = !0;
                var t = this.dealWithAddressesData(this.addressListData, {
                    setDefaultTop: !0
                });
                this.setData({
                    addressList: t
                });
            }
        }
    },
    processDeleteAddress: function(e) {
        if (this.$hideLoading(), e.errorCode) {
            var s = e.errorMsg || "";
            this.$showToast(s);
        } else {
            var t = e.defaultAddressId, a = e.deletedAddressId, r = d.default.checkIndexByKey(this.addressListData, t, "addressId");
            if (null != r && r !== this.defaultAddressIndex && this.updateDefaultAddress(r), 
            a) {
                var i = d.default.checkIndexByKey(this.addressListData, a, "addressId");
                this.addressListData.splice(i, 1), this.setData({
                    addressList: this.dealWithAddressesData(this.addressListData)
                });
            }
            this.oprationLocked = !1;
        }
    },
    loadEditAddressModule: function(e, d) {
        var t = this;
        t.$showLoading(), s.default.fetchRegionsJsonData(function() {
            t.execAddressWindowLoad(e, d);
        });
    },
    execAddressWindowLoad: function(e, t) {
        var a = this, r = s.default.getRegions();
        if (r) {
            if (e && !this.editAddressModule.checkAddress(e, r)) return this.$hideLoading(), 
            void this.$showModal({
                title: "提示",
                content: "监测到该地址在国家地址库有更新，无法继续使用，请重新添加。",
                showCancel: !1,
                confirmText: "添加地址",
                success: function(s) {
                    if (s.confirm) {
                        var d = a.data.addressList.indexOf(e);
                        a.deleteItemIndex = d, a.execDeleteAddress(function() {
                            a.loadEditAddressModule(null, {
                                windowTitle: "添加收货新地址"
                            });
                        });
                    }
                }
            });
            var i = this;
            (0, f.default)(g.default.mark(function s() {
                var a, n;
                return g.default.wrap(function(s) {
                    for (;;) switch (s.prev = s.next) {
                      case 0:
                        return a = !1, s.next = 3, c.User.authorize("scope.userLocation", function() {
                            (0, c.TrackingRecord)({
                                op: "impr",
                                page_section: "auth_prompt",
                                refer_page_element: "add_address",
                                page_el_sn: 99615
                            }), a = !0;
                        });

                      case 3:
                        n = s.sent, i.editAddressModule.hasLocationAuth = n, a && i.authorizedClickTracking(n, "add_address"), 
                        i.editAddressModule.load(e, function() {
                            i.editAddressModule.show(), i.$hideLoading();
                        }, function(e) {
                            if (i.editAddressModule.hide(), e) if (Object.keys(d.default.checkByKey(i.addressListData, e.addressId, "addressId")).length > 0) try {
                                var s = d.default.checkIndexByKey(i.addressListData, e.addressId, "addressId");
                                i.addressListData[s] = e, i.setData({
                                    addressList: i.dealWithAddressesData(i.addressListData)
                                });
                            } catch (e) {
                                console.error(e);
                            } else i.addressListData || (i.addressListData = []), i.addressListData.push(e), 
                            i.setData({
                                addressList: i.dealWithAddressesData(i.addressListData, {
                                    setDefaultTop: !0
                                })
                            }), i.dealWithChooseAddress(e);
                        }, {
                            setDataFunc: function(e) {
                                var s = {};
                                for (var d in e) s["addressData." + d] = e[d];
                                i.setData(s);
                            },
                            getDataFunc: function() {
                                return i.data.addressData;
                            },
                            addRootFunc: o.default.bind(i.componentsAddRootFunc, i),
                            windowTitle: t.windowTitle,
                            regionsDatas: r,
                            data: i.data
                        });

                      case 7:
                      case "end":
                        return s.stop();
                    }
                }, s, this);
            }));
        }
    },
    commonAddAddress: function(e) {
        this.loadEditAddressModule(null, {
            windowTitle: "添加收货新地址"
        }), (0, c.TrackingRecord)({
            op: "click",
            page_element: "add_address"
        }), this.$uploadFormId(e, !0);
    },
    authorizedClickTracking: function(e, s) {
        (0, c.TrackingRecord)({
            op: "click",
            page_section: "auth_prompt",
            page_element: e ? "approve" : "refuse",
            page_el_sn: e ? 99899 : 99898,
            refer_page_element: s
        });
    },
    wechatAddAddress: function(e) {
        var s = this;
        if (this.data.showWechatChooseAddr) {
            var t = function() {
                wx.chooseAddress({
                    success: function(e) {
                        if (null != e.nationalCode && null != e.detailInfo && null != e.userName && null != e.telNumber) {
                            var t = {
                                national_code: e.nationalCode,
                                address: e.detailInfo,
                                name: e.userName,
                                mobile: e.telNumber,
                                is_default: 0
                            }, a = n.default.weixinAddress;
                            s.$showLoading(), l.default.apiRequest("POST", a, t).then(function(e) {
                                s.$hideLoading();
                                var t = new u.default(e);
                                s.addressListData || (s.addressListData = []), d.default.isArray(s.addressListData) && s.addressListData.push(t), 
                                s.setData({
                                    addressList: s.dealWithAddressesData(s.addressListData, {
                                        setDefaultTop: !0
                                    })
                                }), s.dealWithChooseAddress(t);
                            }, function(e) {
                                s.$hideLoading(), s.$showToast(e.error_msg);
                            });
                        } else s.$showToast("地址信息不完整，无法导入");
                    }
                });
            };
            (0, f.default)(g.default.mark(function e() {
                var d, a;
                return g.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return d = !1, e.next = 3, c.User.authorize("scope.address", function() {
                            (0, c.TrackingRecord)({
                                op: "impr",
                                page_section: "auth_prompt",
                                refer_page_element: "wechat_add_address",
                                page_el_sn: 99615
                            }), d = !0;
                        });

                      case 3:
                        (a = e.sent) ? t() : c.User.showAuthorizeModelDialog("scope.address"), d && s.authorizedClickTracking(a, "wechat_add_address");

                      case 6:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
        } else s.$showToast("您的版本暂不支持，请升级到更高版本~");
        (0, c.TrackingRecord)({
            op: "click",
            page_element: "wechat_add_address"
        }), s.$uploadFormId(e, !0);
    },
    dealWithAddressesData: function(e, s) {
        var d = this, t = this;
        if (e.map(function(e, s) {
            return e.isDefaultAddress ? (d.defaultAddressIndex = s, e.defaultText = "已设为默认") : e.defaultText = "设为默认", 
            e.isUsing = e.addressId.toString() == d.usedAddressId, t.setDeliveryType(e), e;
        }), 0 != this.defaultAddressIndex && s && s.setDefaultTop) {
            var a = e[this.defaultAddressIndex];
            e[this.defaultAddressIndex] = e[0], e[0] = a, this.defaultAddressIndex = 0;
        }
        for (var r = 1; r < e.length; r++) for (var i = r + 1; i < e.length; i++) if (parseInt(e[i].addressId) > parseInt(e[r].addressId)) {
            var o = e[i];
            e[i] = e[r], e[r] = o;
        }
        return e;
    },
    setDeliveryType: function(e) {
        if (this.$urlQueryObj.chooseFromAcivity) e.deliveryType = "SUPPORT_USE"; else if (this.usedAddressId) {
            var s = e.provinceId + "";
            this.notAllowRegions.indexOf(s) >= 0 ? e.deliveryType = "NOT_ALLOWED" : this.differAmountRegions.indexOf(s) >= 0 ? e.deliveryType = "DIFFER_AMOUNT" : this.allowedRegions.indexOf(s) >= 0 ? e.deliveryType = "SUPPORT_USE" : e.deliveryType = "NOT_ALLOWED";
        }
    },
    processAddressesInfo: function(e) {
        if (wx.stopPullDownRefresh(), this.$hideLoading(), this.setData({
            visible: !0
        }), e.errorCode) {
            var s = e.errorMsg || "";
            this.$showToast(s);
        } else e && d.default.isArray(e) && e.length > 0 && (this.addressListData = this.dealWithAddressesData(e, {
            setDefaultTop: !0
        }), this.setData({
            addressList: this.addressListData
        }));
    },
    loadAddresses: function() {
        var e = this;
        s.default.getAddressesInfo(function(s) {
            e.processAddressesInfo(s);
        });
    },
    dealWithUrlParams: function() {
        var e = this.$urlQueryObj || {};
        this.goodsId = e.goods_id, this.skuId = e.sku_id, this.usedAddressId = e.sel_address_id, 
        this.usedAddressId && (e.allowed_regions && (this.allowedRegions = e.allowed_regions.split(",")), 
        e.not_allow_region && (this.notAllowRegions = e.not_allow_region.split(",")), e.differ_amount_regions && (this.differAmountRegions = e.differ_amount_regions.split(","))), 
        this.setData({
            showUseBtn: !!this.usedAddressId
        }), this.$urlQueryObj.chooseFromAcivity && this.setData({
            showUseBtn: !0
        });
    },
    componentsAddRootFunc: function(e, s) {
        e && "function" == typeof s && (this[e] = s);
    },
    loadPage: function() {
        this.addressListData = null, this.oprationLocked = !1, this.editAddressModule = new t.default(), 
        this.dealWithUrlParams(), this.$showLoading(), this.loadAddresses(), s.default.fetchRegionsJsonData();
    },
    onUnload: function() {
        this.dispatchDataToOrderCheckoutAddress();
    },
    onLoad: function() {
        this.pvTracking(), this.loadPage();
        var e = this;
        e.quickEntryControl = new h.default({
            page: e,
            ns: "quickEntryControl"
        });
    },
    pvTracking: function() {
        var e = {
            op: "pv",
            page_url: "pages/addresses/addresses"
        };
        (0, c.TrackingRecord)(e);
    },
    onPageScroll: function() {}
};

(0, c.PddPage)(p, {
    pageName: "addresses",
    pageSn: 10005,
    notUseCommonPV: !0
});