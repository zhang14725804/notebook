Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "show", r = arguments[1];
    switch (r.type) {
      case "show":
      case "complete":
      case "nomore":
      case "firstError":
      case "invalid":
      case "empty":
      case "error":
        return r.type;

      default:
        return e;
    }
};