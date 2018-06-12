var o = require("../../../utils/MFollow.js");

module.exports = {
    trackOrderFn: function(t, e, n) {
        wx.getStorage({
            key: t,
            success: function(t) {
                t.data.unionid && o.generateClickLog({
                    unionId: t.data.unionid,
                    url: "pages/product/product",
                    sku: e,
                    that: n
                });
            },
            fail: function() {
                console.log("没有" + t);
            }
        });
    }
};