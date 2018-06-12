var r = require("../../../module/dataset/history/index");

module.exports = function() {
    return r.list().then(function(r) {
        return 0 != r.errCode ? {} : r.recordList;
    }).then(function(r) {
        return console.info("history done"), r;
    }).catch(function(r) {
        throw console.error("history error"), r;
    });
};