Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.subscribeCount = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "INIT":
        return "-";

      case "INIT_COUNT":
      case "ADD_COUNT":
        return t.subscribeCount;

      case "MINUS_COUNT":
        return t.subscribeCount >= 0 ? t.subscribeCount : 0;

      default:
        return e;
    }
};