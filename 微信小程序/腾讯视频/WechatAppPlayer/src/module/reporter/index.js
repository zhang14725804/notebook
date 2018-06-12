var e = new (require("../../lib/message"))(), r = require("./report-queue");

r.onReport = function(e) {
    o.emit("report", e);
};

var t = require("./report-cache"), o = {};

o.any = function(e) {
    r.push(e);
}, o.saveState = function() {
    console.log("reporter.js", "saveState"), o.emit("_save");
}, o.restoreState = function() {
    console.log("reporter.js", "restoreState"), o.emit("_restore");
}, o.checkState = function() {
    console.log("reporter.js", "checkState"), t.getAll().forEach(r.push), t.del();
}, o.reportCache = t, e.assign(o), module.exports = o;