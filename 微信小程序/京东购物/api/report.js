var e = require("../common/http_json.js"), r = require("../common/http_access").errorLog;

module.exports = {
    reportUMPBiz: function() {
        var s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        e.get(r.url, r.getData({
            url: s.url || "APP",
            errCode: s.result || "-1",
            errMsg: s.message ? s.message.replace(/(\r\n|\r|\n)+/g, " ") : "",
            responseTime: s.responseTime || "-1",
            page: s.page || "pages/index/index",
            env: s.env || "ws"
        }), s.callback || r.callback);
    }
};