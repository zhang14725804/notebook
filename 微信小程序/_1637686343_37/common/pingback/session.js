var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../utils/util")), t = {
    get: function(t) {
        return e.default.storage.handleStorageMuti("get", t) || null;
    },
    set: function(t, a) {
        e.default.storage.handleStorageMuti("set", t, a);
    },
    clear: function() {
        e.default.storage.handleStorageMuti("remove", "weapp_session_page_time_shortchannel");
    }
};

module.exports = {
    Session: t,
    SESSION_SHORT_TIME_KEY: "weapp_session_page_time_shortchannel"
};