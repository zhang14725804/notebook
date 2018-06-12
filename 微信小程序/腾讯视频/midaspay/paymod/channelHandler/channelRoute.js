var e = require("./wechat"), t = require("./jifenWechat");

module.exports = {
    wechat: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1];
        new e(t, n);
    },
    jifenWechat: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1];
        new t(e, n);
    }
};