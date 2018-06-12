Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.reportUser = void 0;

var e = require("../netdisk_utils/wxRequestApi.js");

exports.reportUser = function() {
    return (0, e.wxReq)("api/report/user", {
        timestamp: new Date().getTime(),
        action: "wx_activity"
    }, "POST");
};