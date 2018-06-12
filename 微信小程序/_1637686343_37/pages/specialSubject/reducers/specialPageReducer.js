Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.pageDataInit = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "INIT":
        return t.specialPageData || {};

      default:
        return e;
    }
}, exports.voteInfo = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "INIT_VOTE":
      case "CHANGE_VOTE":
        return t.voteInfo;

      default:
        return e;
    }
}, exports.btnDisabled = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = arguments[1];
    switch (t.type) {
      case "BTN_STATUS":
        return t.btnDisabled;

      default:
        return e;
    }
}, exports.hideRules = function() {
    var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], t = arguments[1];
    switch (t.type) {
      case "SHOW_RULES":
        return t.hideRules;

      default:
        return e;
    }
}, exports.playInfo = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "EDIT_PLAY_INFO":
        return Object.assign({}, t.playInfo);

      default:
        return e;
    }
};