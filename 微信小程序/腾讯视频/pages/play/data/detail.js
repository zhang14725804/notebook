var e = require("../../../module/request/request");

module.exports = function(r) {
    return e.vaccess("video_detail", r).then(function(e) {
        return console.info("detail done"), e;
    }).catch(function(e) {
        throw console.error("detail error"), e;
    });
};