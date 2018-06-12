var e = require("../../../../bases/component"), s = require("../../../../common/user_info");

new e({
    properties: {
        adid: String,
        areaid: String,
        addressList: Array,
        showAddressLayerFlag: {
            type: Boolean,
            value: !1,
            observer: "observeFlagChange"
        },
        isShowAddressLayer: Boolean
    },
    methods: {
        switchAddress: function(e) {
            var d = e.currentTarget.dataset, t = d.adid, a = d.idx, r = this.data.addressList[a];
            this.setData({
                adid: t
            }), r && s.updateAddress({
                addressId: r.adid,
                areaId: [ r.provinceId, r.cityId, r.countyId, r.townId ].join("_"),
                areaName: [ r.provinceName, r.cityName, r.countyName, r.townName ].join("_"),
                addressName: r.addrfull,
                coordinate: [ r.type, r.longitude, r.latitude ].join(",")
            }), this.triggerEvent("switchAddress", t), this.closeAddress(), this.$report("DETAIL_ADDRESS_LAYER_ITEM");
        },
        closeAddress: function(e) {
            this.triggerEvent("closeAddress");
        },
        gotoSelectNewAddress: function() {
            var e = this.data.areaid;
            this.$goto("/pages/item/subPackages/address/address", {
                addr_id_str: e
            }, "navigateToByForce"), this.closeAddress();
        },
        observeFlagChange: function(e) {
            var s = this.data.addressList;
            e ? s && s.length ? this.setData({
                isShowAddressLayer: !0
            }) : this.gotoSelectNewAddress() : this.setData({
                isShowAddressLayer: !1
            });
        }
    }
});