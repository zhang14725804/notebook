function a() {
    return a.cPage = wx.getCurrentViewPage(), curPage.weDialog = a, this;
}

var t = require("../../netdisk_utils/validation.js");

a.dialog = function(t) {
    a.cPage = wx.getCurrentViewPage(), this.init(t || {});
}, a.init = function(a) {
    this.dialogData = {
        isShow: a.isShow || !1,
        className: a.className || "",
        titleClassName: a.titleClassName || "",
        title: a.title || "",
        selectionEnd: a.selectionEnd || "",
        placeholder: a.placeholder || "",
        errorText: a.errorText || "",
        showExampleText: a.showExampleText || "",
        exampleText: a.exampleText || "",
        value: a.value || "",
        defaultText: a.defaultText || "",
        inputText: a.inputText || ""
    };
}, a.hide = function() {
    var a = this, t = this.cPage;
    this.dialogData.isShow = !1, t.setData({
        dialogData: a.dialogData
    });
}, a.show = function() {
    var a = this, t = this.cPage;
    this.dialogData.isShow = !0, t.setData({
        dialogData: a.dialogData
    });
}, a.dialogCancel = function(a) {
    a ? (this.hide(), a.callback && a.callback()) : this.hide();
}, a.dialogConfirm = function(a) {
    var e = this.cPage.data.dialogData, i = e.inputText;
    if (a && a.isValidation) {
        var l = t.validation.TextValidationCheck(i);
        e.errorText = "legal" === l ? null : l;
    }
}, module.exports = {
    WeDialog: a
};