var e = require("../utils/http.js");

module.exports = {
    getList: function(t) {
        return e.request("GET", "/api/wxa/v1.0/knowledge/list", t);
    },
    getDetail: function(t) {
        return e.request("GET", "/api/wxa/v1.0/knowledge/details?id=" + t);
    }
};