var e = require("../../../module/login"), i = require("../../../module/es6-promise");

module.exports = function(n) {
    return new i(function(i) {
        e.getUserInfo(function(e, r) {
            if ("debugvip" in n) return {
                isVip: n.debugvip
            };
            i(r && r.isVip);
        }, !1, !0);
    }).then(function(e) {
        return console.info("isvip done", e), e;
    }).catch(function(e) {
        throw console.error("isvip error", e), e;
    });
};