var e = require("xxtea.js"), n = null;

module.exports = {
    genSignToken: function() {
        var a = "";
        n || (n = getApp()), n && (a = n.storageData.xm_open_id);
        var t = Math.random(), o = a + "_" + new Date().valueOf() + "_" + Math.round(1e3 * t);
        return encodeURIComponent(e.encryptToBase64(o, "opak5zddf7d2"));
    }
};