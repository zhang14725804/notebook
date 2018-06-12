var e = require("../../../module/request/request"), t = require("../modules/format");

module.exports = {
    get: function(o, r) {
        var c = [];
        e.vaccess("hot_video_insert", {
            datakey: o.datakey
        }).then(function(e) {
            e && 0 === e.errCode && (c = t(e.data)), r.complete && r.complete({
                content: c
            });
        }, function(e) {
            r.complete && r.complete({
                content: c
            }), console.log("insert_data from hot page, request reject");
        }).catch(function(e) {
            console.log("insert_data error:", e);
        });
    }
};