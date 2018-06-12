var e = require("../../libs/async.min.js"), r = require("./task.js"), n = [ require("./plugins/report.js"), require("./plugins/setCookie.js"), require("./plugins/cache.js"), require("./plugins/coss.js") ];

n.push(require("./plugins/dispatcher.js").Dispatcher);

var s = function(r) {
    return function(n, s) {
        e.applyEachSeries(r.map(function(e) {
            return e.request.bind(e);
        }), n, function() {
            e.applyEachSeries(r.reverse().map(function(e) {
                return e.response.bind(e);
            }), n, function() {
                s(n);
            });
        });
    };
}(n);

module.exports = function(e, n) {
    var t = new r(e, n);
    return t.speed.start = Date.now(), t.requestStart = Date.now(), s(t, function() {
        t.requestEnd = Date.now();
        var e = {
            body: t.body,
            header: t.resHeader,
            handler: t.handler
        };
        return n(t.error, e);
    });
};