module.exports = {
    getCustomerinfo: function() {
        var t = wx.getStorageSync("extuserid"), e = wx.getStorageSync("customerinfo");
        return t || e;
    },
    getExtuserid: function() {
        return wx.getStorageSync("shopId");
    }
};