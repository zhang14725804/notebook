var e = require("./fetch"), a = require("./push_data");

module.exports = function(t, r) {
    e(t.url, {}, function(e, u) {
        u && 0 == (u = u.data).code && t.name && a(u.data, t.name, r);
    });
};