var e = require("../../../module/request/request");

module.exports = {
    del: function(t, c) {
        t = t || {}, e.vaccess("feedback", {
            actionType: 0,
            datakey: t.datakey,
            type: "personl_item"
        }).then(function(e) {
            c && c(e);
        }, function(e) {
            c && c(e);
        }).catch(function(e) {});
    }
};