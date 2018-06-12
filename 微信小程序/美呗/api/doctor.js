var t = require("../utils/http.js"), r = require("./fitlers.js");

module.exports = {
    getDoctorList: function(r) {
        return t.request("GET", "/api/wxa/v1.0/doctor/list", r);
    },
    getDoctorDetail: function(r) {
        return t.request("GET", "/api/wxa/v1.0/doctor/detail/" + r);
    },
    filters: r,
    hospitalDoctor: function(r) {
        return t.request("GET", "/api/wxa/v1.0/hospital/hospitaldoctors", r);
    },
    getDoctorDiaries: function(r) {
        return t.request("GET", "/api/wxa/v1.0/doctor/doctordiaries/", r);
    },
    otherDoctor: function(r) {
        return t.request("GET", "/api/wxa/v1.0/doctor/otherlist", r);
    },
    getDoctorLicense: function(r) {
        return t.request("GET", "/api/wxa/v1.0/doctor/getdocotrlicense/" + r);
    }
};