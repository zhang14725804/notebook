Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.reportAction = void 0;

var e = require("../netdisk_utils/wxRequestApi.js");

exports.reportAction = function(t) {
    var r = t.type, i = void 0 === r ? "" : r, o = t.value, s = void 0 === o ? "" : o;
    return (0, e.wxReq)("api/analytics?type=" + i + "&value=" + s, {}, "GET");
};