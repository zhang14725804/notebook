var d = require("./pay_request.js");

module.exports = {
    addAddress: function(e, r) {
        var a = e;
        a.rgid = "", a.isglobal = 0, a.idcard = "", a.t = Date.parse(new Date()), d.get("https://wq.jd.com/deal/recvaddr/addrecvaddr4jdv2", a, {
            success: function(d) {
                0 == d.errCode ? r(null, d) : r(d, null);
            },
            fail: function(d) {
                r(d);
            }
        });
    },
    modifyAddress: function(e, r) {
        var a = e;
        a.rgid = "", a.isglobal = e.isglobal ? e.isglobal : 0, a.idcard = e.idcard ? e.idcard : "", 
        a.idRequired = e.idRequired ? e.idRequired : "0", a.t = Date.parse(new Date()), 
        d.get("https://wq.jd.com/deal/recvaddr/modifyrecvaddr4jd", a, {
            success: function(d) {
                0 == d.errCode ? r(null, null) : r(d, null);
            },
            fail: function(d) {
                r(d, null);
            }
        });
    }
};