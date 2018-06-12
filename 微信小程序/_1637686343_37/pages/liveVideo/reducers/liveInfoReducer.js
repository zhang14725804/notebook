Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.liveStreamInfo = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "GET_LIVE_STREAM":
        return t.liveStreams;

      default:
        return e;
    }
}, exports.getLiveStatus = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "SET_LIVE_STATUS":
        return t.liveStatus;

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
}, exports.serverTimeBias = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "TIME_BIAS":
        return t.timeBias;

      default:
        return e;
    }
}, exports.showCount = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "NEED_COUNT":
        return t.needCount;

      default:
        return e;
    }
};