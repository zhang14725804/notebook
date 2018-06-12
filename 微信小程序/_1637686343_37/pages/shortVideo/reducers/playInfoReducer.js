function e() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1];
    return Object.assign({}, t, e[0]);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments[1];
    switch (r.type) {
      case "INIT_PLAY_INFO":
        return e(r.videoList, t) || t;

      case "EDIT_PLAY_INFO":
        return Object.assign({}, r.playInfo);

      default:
        return t;
    }
};