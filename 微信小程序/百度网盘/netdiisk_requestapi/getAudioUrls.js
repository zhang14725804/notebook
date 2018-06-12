Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getAudiosUrls = void 0;

var e = require("../netdisk_utils/wxRequestApi.js");

exports.getAudiosUrls = function(t) {
    return (0, e.wxReq)("rest/2.0/pcs/file?method=locatedownload&app_id=250528&ver=2.0", {
        path: t
    }, "POST", "https://d.pcs.baidu.com/");
};