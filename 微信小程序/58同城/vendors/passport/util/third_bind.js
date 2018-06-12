var e = require("./fetch"), r = require("./store");

module.exports = function(u, t) {
    r.remove("userName");
    var p = r.getSync("ppu") ? {
        ppu: r.getSync("ppu")
    } : {};
    e(u, {}, function(e, u) {
        u && (0 != (u = u.data).code && r.remove("ppu"), t(u));
    }, p);
};