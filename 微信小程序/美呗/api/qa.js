var t = require("../utils/http.js");

module.exports = {
    getQaList: function(e) {
        return t.request("GET", "api/wxa/v1.0/question/list", e);
    },
    getQaDetail: function(e) {
        return t.request("GET", "api/wxa/v1.0/question/details?id=" + e);
    }
};