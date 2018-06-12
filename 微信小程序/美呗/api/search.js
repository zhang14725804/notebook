var r = require("../utils/http.js");

module.exports = {
    getHot: function() {
        return r.request("GET", "api/wxa/v1.0/search/hotkeywords");
    },
    searchAll: function(e) {
        return r.request("GET", "api/wxa/v1.0/search/list", {
            keyword: e
        });
    },
    diaryList: function(e) {
        return r.request("GET", "api/wxa/v1.0/search/diarys", e);
    },
    hospitalList: function(e) {
        return r.request("GET", "api/wxa/v1.0/search/hospitals", e);
    },
    knowList: function(e) {
        return r.request("GET", "api/wxa/v1.0/search/knowledge", e);
    },
    doctorList: function(e) {
        return r.request("GET", "api/wxa/v1.0/search/doctors", e);
    },
    raidersList: function(e) {
        return r.request("GET", "api/wxa/v1.0/search/raiders", e);
    },
    QAList: function(e) {
        return r.request("GET", "api/wxa/v1.0/search/questions", e);
    }
};