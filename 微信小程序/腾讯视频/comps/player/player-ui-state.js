var i = require("./lib/State"), e = require("../../module/fns").extend, r = {
    initialize: [ "stop", "limit", "playing", "initialize", "error" ],
    stop: [ "hidden", "playing", "error", "limit", "stop", "initialize" ],
    limit: [ "initialize", "hidden" ],
    hidden: [ "initialize" ],
    playing: [ "hidden", "background", "end", "initialize", "error" ],
    background: [ "playing", "initialize", "error" ],
    end: [ "initialize" ],
    error: [ "initialize" ]
};

module.exports = function(n) {
    var t = {};
    return Object.keys(r).forEach(function(i) {
        t[i] = e(n[i] || {}, {
            to: r[i]
        });
    }), i.create(t);
};