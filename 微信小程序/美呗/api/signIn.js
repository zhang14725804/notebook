var e = require("../utils/http.js");

module.exports = {
    getCode: function(t) {
        return e.request("GET", "/api/wxa/v1.0/profile/getcode", t);
    },
    login: function(t) {
        return e.request("POST", "/api/wxa/v1.0/profile/login", t);
    },
    getSession: function(t) {
        return e.request("GET", "/api/wxa/v1.0/wx/getuserinfo", t);
    },
    getUserMobile: function(t) {
        return e.request("GET", "/api/wxa/v1.0/profile/decodedata", t);
    },
    logint: function(t) {
        return e.request("POST", "/api/wxa/v1.0/profile/logint", t);
    }
};