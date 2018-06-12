var e = require("./wxRequestApi.js");

module.exports = {
    generateFormId: function(e) {
        var o = getApp();
        o.globalData.formIdList ? o.globalData.formIdList.push(e.detail.formId) : o.globalData.formIdList = [ e.detail.formId ];
    },
    uploadFormId: function() {
        return (0, e.wxReq)("api/wechat/collect", {
            formids: getApp().globalData.formIdList.join(",")
        }, "POST").then(function() {
            getApp().globalData.formIdList = [];
        });
    },
    jsonToQuerystring: function(e) {
        var o = "";
        for (var n in e) o += n + "=" + e[n] + "&";
        return o.slice(0, o.length - 1);
    },
    checkPagesLimit: function() {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        return getCurrentPages().length > 9 && (e && wx.wetoast({
            content: "因小程序层级限制，请在百度网盘APP完成操作",
            duration: 1600
        }), wx.log.file.outDirLimit.send(), !0);
    },
    reportSceneAction: function(e) {
        e && e.scene && (1001 == e.scene ? wx.log.common.discover1001.send() : 1007 == e.scene ? wx.log.common.singleChat1007.send() : 1008 == e.scene ? wx.log.common.groupChat1008.send() : 1011 == e.scene ? wx.log.common.scanCode1011.send() : 1012 == e.scene ? wx.log.common.pressImgCode1012.send() : 1013 == e.scene ? wx.log.common.albumCode1013.send() : 1014 == e.scene ? wx.log.common.tmplmsg1014.send() : 1044 == e.scene ? wx.log.common.withshareTicket1044.send() : 1089 == e.scene ? wx.log.common.wechatmain1089.send() : wx.log.send({
            value: "openScene" + e.scene,
            type: "打开场景值为" + e.scene
        }));
    }
};