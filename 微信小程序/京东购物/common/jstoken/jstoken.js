function o(i) {
    console.log("getJSToken:");
    var c = t.getCookie("wid"), u = t.getCookie("wq_skey");
    n.get("http://wq.jd.com/pinbind/GetJsFunction?wq_uin=" + c + "&wq_skey=" + u + "&_t=" + Math.round(2147483647 * Math.random()), {}, {
        success: function(n) {
            if (13 == n.retcode) return e.doLogin().then(function() {
                o(i);
            }).catch(function(o, n) {
                "function" == typeof i && i(-1, {});
            }), !1;
            0 == n.retcode ? (console.log(n.func), n.func(n.token), "function" == typeof i && i(0, n)) : "function" == typeof i && i(-1, {});
        },
        fail: function(o) {
            "function" == typeof i && i(-1, {});
        }
    });
}

var n = require("../http_json.js"), e = require("../login/login.js"), t = require("../cookie-v2/cookie.js");

module.exports = {
    getJSToken: o
};