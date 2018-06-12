var e = require("./onLaunch.js");

module.exports = {
    getShopConfigure: function() {
        var n = e.getExtConfig(), r = new Object();
        return r.client = "apple", r.appClientVersion = "5.7.0", r.configure = n, r;
    }
};