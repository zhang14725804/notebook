Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return !(!e || !/^.{6,14}$/.test(e));
}, t = function(e) {
    return !(!e || !/^.{6,14}$/.test(e));
};

exports.regValidateFunc = function(r, n) {
    return "username" == n ? e(r) : "password" == n ? t(r) : void 0;
};