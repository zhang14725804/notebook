var e = require("./parse-body"), t = require("./es6-promise"), n = module.exports = {
    request: function(t) {
        return t.success = function(t) {
            return t = t || function() {}, function(n) {
                if (n && 200 == n.statusCode) try {
                    n.data = e(n.data);
                } catch (e) {}
                t(n);
            };
        }(t.success), wx.request(t);
    },
    get: function(e, u) {
        return u = {}, new t(function(t, r) {
            n.request({
                url: e,
                data: u.data || {},
                header: u.header || {},
                method: "GET",
                success: function(e) {
                    t(e);
                },
                fail: function(e) {
                    r(e);
                },
                needlogin: u.needlogin
            });
        });
    }
};