Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../common/request/request"), t = {
    getPPMS: function(t) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, s = o.dataType, p = void 0 === s ? "jsonp" : s, n = (o.expire, 
        o.v), r = void 0 === n || n, a = void 0;
        return a = "json" == p ? "https://wqs.jd.com/data/ppms/js/ppms.pagev" + t + ".json" : "https://wq.360buyimg.com/data/ppms/js/ppms.page" + (r ? "v" : "") + t + ".jsonp", 
        new Promise(function(t, o) {
            e.get({
                url: a
            }).then(function(e) {
                var o = e.body;
                t(o.data);
            }, function(e) {
                o(e);
            });
        });
    }
};

exports.default = t;