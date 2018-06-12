var e = require("./pay_request.js");

module.exports = {
    fetchAddressList: function(t, d) {
        "function" == typeof t && (d = t);
        var a = {};
        (t = t || {}) && t.locationid && (a.locationid = t.locationid), a.t = Date.parse(new Date()), 
        e.get("https://wq.jd.com/deal/recvaddr/getrecvaddrlistV3", a, {
            success: function(e) {
                d(null, e.list);
            },
            fail: function(e) {
                d(e, []);
            }
        });
    },
    deleteAddress: function(t, d) {
        var a = {};
        a.adid = t, a.t = Date.parse(new Date()), e.get("https://wq.jd.com/deal/recvaddr/delrecvaddr4jd", a, {
            success: function(e) {
                0 == e.errCode ? d(null, t) : d(e, t);
            },
            fail: function(e) {
                d(e, t);
            }
        });
    }
};