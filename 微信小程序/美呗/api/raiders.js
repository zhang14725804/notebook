var t = require("../utils/http.js");

module.exports = {
    getList: function(e) {
        return t.request("GET", "/api/wxa/v1.0/raiders/list", e);
    },
    getDetail: function(e) {
        return t.request("GET", "/api/wxa/v1.0/raiders/details?id=" + e);
    }
};