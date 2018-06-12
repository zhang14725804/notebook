Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.serverTimeBias = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments[1];
    switch (t.type) {
      case "TIME_BIAS":
        return t.timeBias;

      default:
        return e;
    }
}, exports.liveStatus = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1, t = arguments[1];
    switch (t.type) {
      case "SET_LIVE_STATUS":
        return t.liveStatus;

      default:
        return e;
    }
}, exports.countdownTime = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "DISPLAY_TIME":
        return t.time;

      default:
        return e;
    }
}, exports.liveStreamInfo = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "GET_LIVE_STREAM":
        return t.liveStreams;

      default:
        return e;
    }
}, exports.getLiveInterfaceInfo = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "LIVE_INTERFACE_INFO":
        return t.liveInterfaceInfo;

      default:
        return e;
    }
};