Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/data_util")), t = {}, a = {
    setDataToCache: function(a, u) {
        var n = [ a, e.default.getLogId() ].join("_");
        return t[n] = u, n;
    },
    getDataFromCache: function(e) {
        return e ? t[e] : null;
    },
    deleteCacheData: function(e) {
        delete t[e];
    },
    clearCacheData: function() {
        t = {};
    }
};

exports.default = a;