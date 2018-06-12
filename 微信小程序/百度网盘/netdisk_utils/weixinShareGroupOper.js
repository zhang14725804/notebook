Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.shareGroupOper = void 0;

var e = require("../netdiisk_requestapi/weixinGroup.js"), t = require("../netdiisk_requestapi/decodeEncryptedData.js"), a = require("../netdiisk_requestapi/fileOper.js"), n = function(t, a, n, d) {
    e.weixinGroup.queryIsBind(n).then(function(e) {
        0 == +e.data.errno ? 0 == +e.data.is_bind ? "createGroup" === d ? o(t, a, n) : "shareToWeixinGroup" === d && (wx.log.normal.normalBtnShareToCreate.send(), 
        r(t, a, n)) : "createGroup" === d ? (i(t, a, n), wx.log.share.createShareJoinSuccess.send()) : "shareToWeixinGroup" === d && (u(t, a, e.data.path, n), 
        wx.log.normal.normalBtnShareToCopy.send()) : (wx.hideLoading(), wx.wetoast({
            content: "查询群共享出错",
            duration: 3e3
        }));
    });
}, o = function(t, n, o) {
    var r = /[\\\/\:\*\?'<>\|]+/gi, i = /(?:[\xA9\xAE\u2122\u23E9-\u23EF\u23F3\u23F8-\u23FA\u24C2\u25B6\u2600-\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDE51\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF])+/g, u = "/[" + n.data.userWxInfo.nickName.replace(i, " ").replace(r, "") + "] 创建的群共享";
    a.fileOper.createDir(u).then(function(t) {
        if (0 == +t.data.errno) {
            var a = t.data.fs_id;
            return u = t.data.path, e.weixinGroup.createShareDir(o, a);
        }
        wx.hideLoading(), wx.wetoast({
            content: "创建文件夹出错",
            duration: 3e3
        });
    }).then(function(e) {
        wx.hideLoading(), 0 == +e.data.errno ? n.setData({
            dialogData: {
                isShow: !0,
                errorText: null,
                value: u.substr(1),
                defaultText: u.substr(1),
                inputText: null,
                selectionEnd: u.length - 1,
                className: null,
                titleClassName: null,
                title: "设置共享名称",
                placeholder: "请输入共享的名称",
                showExampleText: !0,
                exampleText: "举例：学习资料、新西兰之旅、家有萌宝等"
            }
        }) : wx.wetoast({
            content: "创建群共享失败",
            duration: 3e3
        });
    });
}, r = function(t, a, n) {
    var o = a.data.bottomModalData.tapListItem.fs_id, r = function(e) {
        wx.hideLoading(), 0 == +e.data.errno ? wx.wetoast({
            content: "共享给微信群成功",
            duration: 3e3
        }) : 18402 == +e.data.errno ? wx.wetoast({
            content: "该文件已绑定微信群",
            duration: 3e3
        }) : wx.wetoast({
            content: "共享给微信群失败",
            duration: 3e3
        });
    };
    a.data.bottomModalData.tapListItem.share ? e.weixinGroup.bindShareDir(n, o).then(r) : e.weixinGroup.createShareDir(n, o).then(r);
}, i = function(t, a, n) {
    e.weixinGroup.joinShareDir(n).then(function(e) {
        wx.hideLoading(), 0 == +e.data.errno ? wx.wetoast({
            content: "加入已有群共享成功",
            duration: 3e3
        }) : 18215 == +e.data.errno ? wx.wetoast({
            content: "已经加入该群共享",
            duration: 3e3
        }) : wx.wetoast({
            content: "加入群共享失败",
            duration: 3e3
        });
    });
}, u = function(t, n, o, r) {
    e.weixinGroup.joinShareDir(r).then(function(e) {
        if (0 == +e.data.errno || 18215 == +e.data.errno) {
            var t = n.data.bottomModalData.tapListItem.path;
            a.fileOper.copyDir(t, o).then(function(e) {
                wx.hideLoading(), 0 == +e.data.errno ? wx.wetoast({
                    content: "共享成功",
                    duration: 3e3
                }) : wx.wetoast({
                    content: "共享失败",
                    duration: 3e3
                });
            });
        } else wx.hideLoading(), wx.wetoast({
            content: "加入群共享失败",
            duration: 3e3
        });
    });
};

exports.shareGroupOper = {
    bindWeixinGroupByShareTicket: function(e, a, o) {
        o.shareTickets && (wx.showLoading({
            title: "创建中"
        }), wx.getShareInfo({
            shareTicket: o.shareTickets[0],
            success: function(o) {
                var r = o.iv, i = o.encryptedData;
                (0, t.decodeEncryptedData)(r, i).then(function(t) {
                    if (0 == +t.data.errno) {
                        var o = t.data.data.openGId;
                        n(e, a, o, "createGroup");
                    } else wx.hideLoading(), wx.wetoast({
                        content: "获取微信群信息出错",
                        duration: 3e3
                    });
                });
            }
        }));
    }
};