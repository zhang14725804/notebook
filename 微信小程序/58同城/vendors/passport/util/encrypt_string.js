var e = require("../util/ppt_security2");

module.exports = function(t, r, n) {
    var i = 1411093327735 - new Date().getTime(), u = new Date().getTime() + i;
    return e.encryptString(u + encodeURIComponent(t), r, n);
};