Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.shareGroupOper = void 0;

var e = require("../netdiisk_requestapi/weixinGroup.js"), t = (require("../netdiisk_requestapi/decodeEncryptedData.js"), 
require("../netdiisk_requestapi/fileOper.js")), a = function(t, a, n) {
    return new Promise(function(t, u) {
        "function" == typeof a.closeBottomModal && a.closeBottomModal(), 0 == +n.isShare ? e.weixinGroup.v2createShareDir(n.fid).then(function(e) {
            wx.hideLoading(), 0 == +e.data.errno ? (wx.wetoast({
                content: "发送邀请成功",
                duration: 3e3
            }), t(e)) : 18222 == +e.data.errno ? (wx.wetoast({
                content: "含有违规内容，无法共享他人",
                duration: 3e3
            }), u(e)) : 18221 == +e.data.errno ? (wx.wetoast({
                content: "含有敏感词，无法共享他人",
                duration: 3e3
            }), u(e)) : 18203 == +e.data.errno ? (wx.wetoast({
                content: "共享目录数已达上限",
                duration: 3e3
            }), u(e)) : (wx.wetoast({
                content: "发送邀请失败",
                duration: 3e3
            }), u(e));
        }) : (wx.hideLoading(), wx.wetoast({
            content: "发送邀请成功",
            duration: 3e3
        }), t());
    });
};

exports.shareGroupOper = {
    createNewDir: function(e, a, n) {
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var u = /[\\\/\:\*\?'<>\|]+/gi, o = /(?:[\xA9\xAE\u2122\u23E9-\u23EF\u23F3\u23F8-\u23FA\u24C2\u25B6\u2600-\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDE51\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF])+/g, r = "/[" + n.replace(o, " ").replace(u, "") + "] 创建的共享";
        return t.fileOper.createDir(r);
    },
    renameFileName: function(e, a, n, u, o) {
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), t.fileOper.renameDir(n, u).then(function(e) {
            0 == +e.data.errno && 0 == +e.data.info[0].errno ? (wx.wetoast({
                content: "文件夹重命名成功",
                duration: 3e3
            }), o && o()) : wx.wetoast({
                content: "文件夹重命名失败",
                duration: 3e3
            });
        }).catch(function(e) {
            wx.wetoast({
                content: "文件夹重命名失败",
                duration: 3e3
            });
        });
    },
    dirSendWeixinCardSuccess: a,
    createGroupSendWeixinCardSuccess: function(e, n, u) {
        wx.showLoading({
            title: "加载中"
        });
        var o = n.data.dialogData, r = o.fid, i = o.defaultText, l = o.inputText;
        if (null === l || l === i) wx.log.share.createShareDefaultname.send(), a(0, n, {
            isShare: 0,
            fid: r
        }).then(function(t) {
            e.globalData.createSharing = !1, "function" == typeof u && u(t);
        }); else {
            wx.log.share.createShareChangename.send();
            var d = "/" + i;
            t.fileOper.renameDir(d, l).then(function(t) {
                0 == +t.data.errno && 0 == +t.data.info[0].errno ? a(0, n, {
                    isShare: 0,
                    fid: r
                }).then(function(t) {
                    e.globalData.createSharing = !1, "function" == typeof u && u(t);
                }) : (e.globalData.createSharing = !1, wx.wetoast({
                    content: "文件夹重命名失败",
                    duration: 3e3
                }));
            });
        }
        n.setData({
            dialogData: {
                isShow: !1,
                className: null,
                titleClassName: null,
                title: null,
                selectionEnd: null,
                placeholder: null,
                errorText: null,
                showExampleText: !0,
                exampleText: null,
                value: null,
                defaultText: null,
                inputText: null
            }
        });
    },
    createGroupCancel: function(e, a, n) {
        wx.showLoading({
            title: "加载中"
        });
        var u = "/" + a.data.dialogData.defaultText;
        t.fileOper.deleteFile(u).then(function(t) {
            wx.hideLoading(), wx.wetoast({
                content: "创建已被取消",
                duration: 3e3
            }), e.globalData.createSharing = !1, "function" == typeof n && n(t);
        }), a.setData({
            dialogData: {
                isShow: !1,
                className: null,
                titleClassName: null,
                title: null,
                selectionEnd: null,
                placeholder: null,
                errorText: null,
                showExampleText: !0,
                exampleText: null,
                value: null,
                defaultText: null,
                inputText: null
            }
        });
    }
};