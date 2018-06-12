(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d), f = getApp();
    module.exports = {
        setApp: function() {
            f = getApp();
        },
        getStockInfo: null,
        queryStockInfo: function(a, b) {
            this.getStockInfo = new Promise(function(c, d) {
                f.wx.request({
                    url: f.CGI_PREFIX + "stockinfo.fcgi",
                    data: {
                        scode: a,
                        markets: b,
                        needfive: 1,
                        needquote: 1,
                        needfollow: 1
                    },
                    success: function(a) {
                        c(a);
                    },
                    fail: function(a) {
                        d(a);
                    }
                });
            });
        },
        getPrimary: null,
        queryPrimary: function(a, b) {
            this.getPrimary = new Promise(function(c, d) {
                f.wx.request({
                    url: f.CGI_PREFIX + "stockinfo.fcgi",
                    data: {
                        type: 1,
                        markets: b,
                        scode: a
                    },
                    success: function(a) {
                        c(a);
                    },
                    fail: function(a) {
                        d(a);
                    }
                });
            });
        },
        getUserStock: null,
        queryUserStock: function(a) {
            this.getUserStock = new Promise(function(b, c) {
                a.request({
                    url: "/cgi-bin/userstock.fcgi",
                    data: {
                        action: 1,
                        new_price: 1,
                        is_hold: 1,
                        get_market: 1,
                        outputtype: 3
                    },
                    success: function(a) {
                        b(a);
                    },
                    fail: function(a) {
                        c(a);
                    }
                });
            });
        }
    };
})();