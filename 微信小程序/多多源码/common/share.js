function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("./object_util")), t = e(require("./data_util")), u = require("../constants/tracking/keys.js"), s = e(require("../storage/user_storage")), a = function() {
    var e = {
        code: null,
        from: null,
        isappinstalled: null,
        at: null,
        share_id: null,
        is_back: null
    };
    return u.ReferPageKeys.forEach(function(r) {
        return e[r] = null;
    }), e;
}();

exports.default = {
    dealWithSharePathQueries: function(e, u) {
        return e = e || {}, u = u || {}, this.userId || (this.userId = s.default.getUserId()), 
        e = e || {}, r.default.assign({}, e, {
            _wv: 1,
            refer_share_id: u.shareId || t.default.getRandomString(),
            refer_share_uid: this.userId,
            refer_share_channel: "message"
        }, a);
    }
};