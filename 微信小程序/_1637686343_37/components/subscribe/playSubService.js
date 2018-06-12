function e(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "id", a = arguments[2];
    return e ? (r.default.storage.handleStorageMuti("get", n(a)) || []).findIndex(function(n) {
        return n[t] == e;
    }) : -1;
}

function t(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "aid", a = arguments[2];
    return e ? (r.default.storage.handleStorageMuti("get", n(a)) || []).findIndex(function(n) {
        return n[t] == e;
    }) : -1;
}

function n() {
    arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    return a;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/utils/util"));

exports.default = {
    save: function(e) {
        var a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100, o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "aid";
        if (e.id && e.aid && e.content && !(e.playTime < 30)) {
            var u = t(e[o], o, a), d = r.default.storage.handleStorageMuti("get", n(a)) || [];
            u >= 0 && d.splice(u, 1), d.unshift(e), d.length > i && d.pop(), r.default.storage.handleStorageMuti("set", n(a), d);
        }
    },
    remove: function(t) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "id";
        if (t) {
            var a = e(t, n);
            if (a >= 0) {
                var i = r.default.storage.handleStorageMuti("get", "VIDEO_SUBSCRIBE_RECORD") || [], o = i.splice(a, 1);
                return r.default.storage.handleStorageMuti("set", "VIDEO_SUBSCRIBE_RECORD", i), 
                o[0];
            }
        } else r.default.storage.handleStorageMuti("remove", "VIDEO_SUBSCRIBE_RECORD");
    },
    get: function(e, t) {
        var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "id";
        return e ? (r.default.storage.handleStorageMuti("get", n(t)) || []).find(function(t) {
            return t[a] == e;
        }) : r.default.storage.handleStorageMuti("get", n(t));
    },
    getRemoveRecord: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "id", a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        return e ? (r.default.storage.handleStorageMuti("get", n(a)) || []).find(function(n) {
            return n[t] == e;
        }) : null;
    },
    getIndex: e,
    getRemoveRecordByAid: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "aid";
        return e ? (r.default.storage.handleStorageMuti("get", n(t)) || []).find(function(t) {
            return t[a] == e;
        }) : null;
    }
};

var a = "VIDEO_SUBSCRIBE_RECORD";