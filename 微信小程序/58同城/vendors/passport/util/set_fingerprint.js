var t = require("./fetch"), r = require("./store");

module.exports = function() {
    t("https://passport.58.com/fingerprint", {}, function(t, e) {
        e && 0 == (e = e.data).code && r.setSync("fingerprint", e.data.fingerprint);
    });
};