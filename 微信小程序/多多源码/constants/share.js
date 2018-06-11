Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    Success: "shareAppMessage:ok",
    Cancel: [ "shareAppMessage:cancel", "shareAppMessage:fail cancel" ],
    Fail: "shareAppMessage:fail"
}, s = {
    Unknown: "unknown",
    AppMessage: "message",
    Timeline: "timeline"
}, a = {
    Success: "success",
    Fail: "fail",
    Cancel: "cancel",
    Complete: "complete"
};

exports.ShareChannel = s, exports.ShareResult = a, exports.getShareResultByErrMsg = function(s) {
    var n = s.indexOf(e.Success) >= 0, c = s.indexOf(e.Fail) >= 0, l = e.Cancel.some(function(e) {
        return s.indexOf(e) >= 0;
    });
    return n ? a.Success : l ? a.Cancel : c ? a.Fail : a.Complete;
};