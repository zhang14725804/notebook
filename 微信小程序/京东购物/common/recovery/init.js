var e = require("../request/request.js"), t = require("../biz.js"), s = require("./coss.js"), r = require("./search.js"), i = require("./item.js");

module.exports = function() {
    e.get({
        url: "https://wq.360buyimg.com/data/coss/cgi_recovery.jsonp"
    }).then(function(e) {
        var t = e.body;
        Object.keys(t).length > 0 && s.setCossConfigData(t);
    }), t.getPPMS(34006).then(function(e) {
        s.setPpmsConfigData(e && e[0]);
    }), t.getPPMS(34422).then(function(e) {
        var t = void 0, s = void 0;
        e.forEach(function(e) {
            "search" == e.page && void 0 === t ? t = e.status : "item" == e.page && void 0 === s && (s = e.status);
        }), r.setStatus(t), i.setStatus(s);
    });
};