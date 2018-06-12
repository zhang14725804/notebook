function e(e) {
    return e ? (t.default.storage.handleStorageMuti("get", "SEARCH_RECORD") || []).indexOf(e) : -1;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/utils/util"));

exports.default = {
    save: function(a) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 6, u = e(a), o = t.default.storage.handleStorageMuti("get", "SEARCH_RECORD") || [];
        return u >= 0 && o.splice(u, 1), o.unshift(a), o.length > r && o.pop(), t.default.storage.handleStorageMuti("set", "SEARCH_RECORD", o), 
        t.default.storage.handleStorageMuti("get", "SEARCH_RECORD");
    },
    remove: function(a) {
        var r = e(a);
        if (r >= 0) {
            var u = t.default.storage.handleStorageMuti("get", "SEARCH_RECORD") || [], o = u.splice(r, 1);
            return t.default.storage.handleStorageMuti("set", "SEARCH_RECORD", u), o[0];
        }
    },
    getAll: function() {
        return t.default.storage.handleStorageMuti("get", "SEARCH_RECORD") || [];
    }
};