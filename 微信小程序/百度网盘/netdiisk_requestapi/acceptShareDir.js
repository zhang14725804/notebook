Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.acceptShareDir = void 0;

var e = require("../netdisk_utils/wxRequestApi.js");

exports.acceptShareDir = function(r) {
    return (0, e.wxReq)("sharedir/invite/accept", r, "POST");
};