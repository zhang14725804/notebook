var r = require("../../../module/dataset/history/index");

module.exports = function(e) {
    return r.list().then(function(r) {
        if (console.log("video history", r), 0 != r.errCode) return {};
        var t;
        return r.recordList.every(function(r) {
            return r.vid != e || (t = r.strTime, !1);
        }), +t > 0 ? t : 0;
    }).catch(function(r) {
        return {};
    });
};