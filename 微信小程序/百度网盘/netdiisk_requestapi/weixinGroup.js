Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.weixinGroup = void 0;

var e = require("../netdisk_utils/wxRequestApi.js");

exports.weixinGroup = {
    queryIsBind: function(r) {
        return (0, e.wxReq)("sharedir/wx/query", {
            wx_gid: r
        });
    },
    createShareDir: function(r, i) {
        return (0, e.wxReq)("sharedir/wx/create", {
            wx_gid: r,
            fid: i
        });
    },
    bindShareDir: function(r, i) {
        return (0, e.wxReq)("sharedir/wx/bind", {
            wx_gid: r,
            fid: i
        });
    },
    joinShareDir: function(r) {
        return (0, e.wxReq)("sharedir/wx/join", {
            wx_gid: r
        });
    },
    v2createShareDir: function(r) {
        return (0, e.wxReq)("sharedir/wx/v2/create", {
            fid: r
        });
    },
    v2joinShareDir: function(r, i) {
        return (0, e.wxReq)("sharedir/wx/v2/join", {
            uk: r,
            fid: i
        });
    }
};