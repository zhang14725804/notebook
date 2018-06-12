var e = require("../../pass_utils/switchBtnFn"), t = require("../../pass_utils/clearInputFn"), i = require("../../pass_requestapi/checkVcode"), a = require("../../pass_requestapi/getVcode"), n = require("../../pass_config");

Page({
    data: {
        inputValue: "",
        imgcode: "",
        imgurl: "",
        imgHost: n.hostName + "cgi-bin/genimage?"
    },
    onLoad: function(e) {
        this.setData({
            telnum: e.telnum,
            vcodesign: e.vcodesign,
            vcodestr: e.vcodestr,
            notRegist: e.notRegist,
            imgurl: this.data.imgHost + e.vcodestr + "&v=" + new Date().getTime()
        });
    },
    inputEvent: function(t) {
        var i = t.detail.value;
        return i.indexOf(" ") >= 0 ? {
            value: i.replace(/[ ]/g, "")
        } : (this.setData({
            inputValue: t.detail.value.replace(/[ ]/g, "")
        }), void e.changeBtnColorFn(t.detail.value, this));
    },
    submitSmsCode: function() {
        this.data.inputValue.length > 0 && i.checkVcodeFn(this);
    },
    clearInput: function() {
        t.clearInputFn(this, "inputValue"), this.setData({
            btnColor: ""
        });
    },
    changevcode: function() {
        a.getVcodeImg(this);
    }
});