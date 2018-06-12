function e(e, i, c) {
    var s = {};
    s.appid = e, s.dealId = i, s.t = Date.parse(new Date()), n.get("https://wq.jd.com/jdpaygw/wxsapay", s, {
        success: function(e) {
            t(e, c);
        },
        fail: function(e) {
            e.__dealId = a, c(e, a);
        }
    });
}

function t(e, t) {
    if (0 == e.errno) {
        var n = e.data;
        wx.requestPayment({
            timeStamp: n.timeStamp,
            nonceStr: n.nonceStr,
            package: n.package,
            signType: n.signType,
            paySign: n.paySign,
            success: function(e) {
                t(null, a);
            },
            fail: function(e) {
                t(e, a);
            },
            complete: function(e) {}
        });
    } else t(e, a);
}

var n = require("./pay_request.js"), a = void 0;

module.exports = {
    requestPay: function(t, n, i) {
        a = n, e(t, n, i);
    }
};