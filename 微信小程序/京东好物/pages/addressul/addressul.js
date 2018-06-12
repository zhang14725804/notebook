var e = require("../../utils/util.js"), s = require("../../utils/keplerReport.js").init(), r = getApp();

Page({
    data: {
        pDir: "/kwxp",
        screenHeight: 0,
        screenWidth: 0,
        name: "mjs",
        addressList: [],
        chooseAddressFlag: 0
    },
    onLoad: function(e) {
        var r = this;
        wx.getSystemInfo({
            success: function(e) {
                r.setData({
                    screenHeight: e.windowHeight,
                    screenWidth: e.windowWidth
                });
            }
        }), s.set({
            urlParam: e,
            title: "收货地址",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        var d = this;
        e.request({
            url: r.globalRequestUrl + d.data.pDir + "/norder/address.json",
            success: d.addressulDate.bind(d),
            fail: function(s) {
                e.reportErr(encodeURIComponent("结算页地址列表首屏数据请求失败：") + s.errMsg);
            }
        }), s.pv();
    },
    addressulDate: function(e) {
        this.setData({
            addressList: e.addressList
        });
    },
    chooseAddress: function(s) {
        var d = this;
        e.request({
            url: r.globalRequestUrl + d.data.pDir + "/norder/updateOrderAddressTouch.json?addressId=" + s.currentTarget.id,
            success: function() {
                0 == d.data.chooseAddressFlag && wx.navigateBack(), d.data.chooseAddressFlag++;
            },
            fail: function(s) {
                e.reportErr(encodeURIComponent("结算页地址列表选择地址请求失败：") + s.errMsg);
            }
        });
    },
    newAddress: function(r) {
        try {
            var d = this;
            s.click({
                eid: "MNeworderAddress_AddAddress",
                elevel: "",
                ename: "",
                eparam: "",
                event: r
            }), d.data.addressList && d.data.addressList.length >= 20 ? wx.showModal({
                content: "您的地址已达20条，请删除部分当前地址后再建",
                showCancel: !1
            }) : wx.redirectTo({
                url: "../address/address?addressId=0&addressType=add"
            });
        } catch (s) {
            e.reportErr(encodeURIComponent("结算页地址列表新增地址按钮点击事件报错") + s.message);
        }
    },
    editAddress: function(e) {
        s.click({
            eid: "MNeworderAddress_EditAddress",
            elevel: "",
            ename: "",
            eparam: "",
            event: e
        });
    }
});