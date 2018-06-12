Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.wallBaseInfo = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
    switch (e.type) {
      case "INIT":
        return e.starUp || [];

      default:
        return t;
    }
}, exports.paopaoStarData = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
    switch (e.type) {
      case "INIT_PAOPAO":
        return e.starUp || [];

      default:
        return t;
    }
}, exports.toMiniProgram = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    switch (arguments[1].type) {
      case "SET":
        return !!wx.canIUse && wx.canIUse("navigateToMiniProgram");

      default:
        return t;
    }
};