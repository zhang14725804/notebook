function t() {
    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
}

var r = require("cache"), e = r.get("guid");

e || (e = [ t(), t(), t(), t() ].join(""), r.set("guid", e)), module.exports = {
    getGuid: function() {
        return e;
    },
    s4: t
};