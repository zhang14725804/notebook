Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.countdownTime = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "DISPLAY_TIME":
        return t.time;

      default:
        return e;
    }
};