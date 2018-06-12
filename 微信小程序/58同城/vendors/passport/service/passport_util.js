var t = require("../util/fetch"), e = require("../util/store"), p = {
    logout: function(p) {
        var u = e.getSync("ppu") ? {
            ppu: e.getSync("ppu")
        } : {};
        t("https://passport.58.com/logout", {}, function(t, e) {
            p && p(e);
        }, u), e.remove("ppu");
    },
    passportEvHandle: require("../util/passport_evHandle")
};

module.exports = p;