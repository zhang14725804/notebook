function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("index")), r = e(require("../util"));

exports.default = {
    getQiyiQtsc: function(e) {
        for (var t = "", a = this.keys(e).sort(), n = 0, c = a.length; n < c; n++) t += a[n] + "=" + e[a[n]] + "&";
        return t = t.slice(0, -1) + "w0JD89dhtS7BdPLU2", r.default.md5(unescape(encodeURIComponent(t)));
    },
    keys: function(e) {
        var t = [], r = 0;
        for (t[r++] in e) ;
        return t;
    },
    RSAEncryption: function(e) {
        var r = t.default.getKeyPair("10001", "", "ab86b6371b5318aaa1d3c9e612a9f1264f372323c8c0f19875b5fc3b3fd3afcc1e5bec527aa94bfa85bffc157e4245aebda05389a5357b75115ac94f074aefcd");
        return t.default.encryptedString(r, encodeURIComponent(e)).replace(/\s/g, "-");
    }
};