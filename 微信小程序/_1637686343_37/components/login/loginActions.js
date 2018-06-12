Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    initLogin: function() {
        return {
            type: "INIT_LOGIN_INFO"
        };
    },
    change_loginInfo: function() {
        return {
            type: "CHANGE_LOGIN_INFO",
            options: {
                data: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                wxdata: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                isLogin: arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
            }
        };
    }
};