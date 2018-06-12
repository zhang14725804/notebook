getApp();

Page({
    data: {
        ai: "475467546"
    },
    onReady: function() {
        this.dialog = this.selectComponent("#dialog");
    },
    showDialog: function() {
        this.dialog.showDialog();
    },
    _cancel: function(o) {
        console.log(o.detail), console.log("你点击了取消"), this.dialog.hideDialog();
    },
    _confirm: function() {
        console.log("你点击了确定"), this.dialog.hideDialog();
    }
});