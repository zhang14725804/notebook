Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getSurlInfo = void 0;

var e = require("../netdisk_utils/wxRequestApi.js");

exports.getSurlInfo = function(r) {
    return (0, e.wxReq)("sharedir/invite/info?s=" + r, {}, "GET");
};