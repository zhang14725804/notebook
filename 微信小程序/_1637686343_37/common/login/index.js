Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("login"));

exports.default = {
    login: e.default.login,
    normalLogin: e.default.normalLogin,
    getWxUserInfo: e.default.getWxUserInfo,
    authorize: e.default.authorize,
    getUserInfo: e.default.getUserInfo,
    wxLogin: e.default.wxLogin
};