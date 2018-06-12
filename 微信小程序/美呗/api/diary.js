var e = require("../utils/http.js");

module.exports = {
    getBaseDiary: function(t) {
        return e.request("GET", "api/wxa/v1.0/diary/books/" + t);
    },
    getDiaryDetail: function(t) {
        return e.request("GET", "api/wxa/v1.0/diary/details/" + t);
    },
    getDiaryComment: function(t) {
        return e.request("GET", "api/wxa/v1.0/diary/comment", t);
    },
    createDiaryComment: function(t) {
        return e.request("POST", "api/wxa/v1.0/diary/comment", t);
    },
    diaryClicklike: function(t) {
        return e.request("POST", "api/wxa/v1.0/diary/clicklike", t);
    },
    getDoctorDiaries: function(t) {
        return e.request("GET", "api/wxa/v1.0/doctor/doctordiaries", t);
    },
    getHospitalDiaries: function(t) {
        return e.request("GET", "api/wxa/v1.0/hospital/hospitaldiaries", t);
    }
};