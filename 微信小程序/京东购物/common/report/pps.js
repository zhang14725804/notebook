var e = require("../request/request.js"), s = require("../utils.js");

module.exports = function(t) {
    e({
        method: "GET",
        url: "https://wq.jd.com/mcoss/rpds/report",
        data: {
            pps: s.decode(t)
        },
        priority: "REPORT"
    }).then(function(e) {
        console.log("pps 点击上报成功");
    }).catch(function(e) {
        console.warn("pps 点击上报失败");
    });
};