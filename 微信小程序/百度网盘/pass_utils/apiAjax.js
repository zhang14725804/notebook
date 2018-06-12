Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../pass_config"), t = function(t, o, n, a, c) {
    wx.request({
        url: e.hostName + t,
        data: o,
        method: n || "GET",
        dataType: "json",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            a(e, c);
        },
        fail: function() {},
        complete: function() {}
    });
};

exports.apiAjax = function(o, n, a, c, i) {
    void 0 === a && (a = "POST"), e.DEBUG || t(o, n, a, c, i);
};