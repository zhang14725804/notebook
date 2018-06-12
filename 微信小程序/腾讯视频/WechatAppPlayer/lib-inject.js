var e = "./src/lib/es6-promise", r = "./src/lib/request";

try {
    var s = require("../tvp.js");
    e = s.Promise || e, r = s.request || r;
} catch (e) {}

module.exports = {
    Promise: require(e),
    request: require(r).get
};