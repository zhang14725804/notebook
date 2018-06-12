var e = require("../utils/http.js");

module.exports = {
    getCity: function() {
        return e.request("GET", "/api/wxa/v1.0/home/areas");
    },
    getProject: function() {
        return e.request("GET", "/api/wxa/v1.0/project/select");
    },
    getPjGroup: function() {
        return e.request("GET", "/api/wxa/v1.0/project/list");
    },
    saveProject: function(t) {
        return e.request("POST", "/api/wxa/v1.0/project/saveproject", t);
    }
};