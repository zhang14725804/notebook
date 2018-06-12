Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.trackParams = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "GET_TRACK_PARAM":
        return Object.assign({}, e, t.pingback);

      default:
        return e;
    }
}, exports.setCurrentVideoParams = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "SET_CURRENT_TRACK_PARAM":
        return Object.assign({}, e, t.currentVideoPingback);

      default:
        return e;
    }
};