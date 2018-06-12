var e = require("../utils/http.js");

module.exports = {
    getProject: function() {
        return e.request("GET", "api/wxa/v1.0/Home/Projects");
    },
    getDiary: function(t) {
        return e.request("GET", "api/wxa/v1.0/Home/Diaries", t);
    }
};