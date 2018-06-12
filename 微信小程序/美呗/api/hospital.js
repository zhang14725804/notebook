var t = require("../utils/http.js");

module.exports = {
    getHospitalList: function(e) {
        return t.request("GET", "api/wxa/v1.0/hospital/list", e);
    },
    getHospitalDetail: function(e) {
        return t.request("GET", "api/wxa/v1.0/hospital/detail/" + e);
    },
    getHospitalOtherList: function(e) {
        return t.request("GET", "api/wxa/v1.0/hospital/otherlist/", e);
    },
    getHospitalLicense: function(e) {
        return t.request("GET", "api/wxa/v1.0/hospital/gethospitallicense?id=" + e);
    }
};