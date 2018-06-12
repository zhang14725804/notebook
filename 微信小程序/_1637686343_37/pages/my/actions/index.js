Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../components/load/loadActions")), n = require("../../../components/login/loginActions");

exports.default = Object.assign({
    setData: function() {
        return {
            type: "SET",
            records: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            isLogin: arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            pageNum: arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1
        };
    },
    init: n.init,
    change_loginInfo: n.change_loginInfo,
    setSubscribe: function() {
        return {
            type: "SETSUBSCRIBE",
            subscribes: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            isLogin: arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            pageNum: arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1
        };
    }
}, e.default);