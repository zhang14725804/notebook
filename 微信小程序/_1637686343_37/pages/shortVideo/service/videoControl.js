Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../actions/index"));

exports.default = {
    showShare: function() {
        var t = this;
        if (!wx.canIUse("button.open-type.share")) {
            clearTimeout(this.showShare.time), this.store.dispatch(e.default.showShare()), this.showShare.time = setTimeout(function() {
                t.store.dispatch(e.default.hideShare());
            }, 1e3);
        }
    }
};